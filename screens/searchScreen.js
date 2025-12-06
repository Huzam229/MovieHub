import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
    View, Text, Dimensions, SafeAreaView, TextInput, TouchableOpacity,
    ScrollView, Image
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { XMarkIcon } from 'react-native-heroicons/outline';
import tw from 'twrnc'
import Loading from '../components/loading';
import debounce from 'lodash/debounce'
import { fetchSearchMovie, image185, noImage } from '../api/moviedb';

var { width, height } = Dimensions.get('window')

export default function SearchScreen() {


    const navigation = useNavigation();
    const [result, setresult] = useState([]);
    const [loading, setloading] = useState(false)

    const handleSearch = (value) => {

        if (value && value.length > 2) {

            setloading(true);
            fetchSearchMovie({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then((data) => {
                setloading(false);
                if (data && data.results) {
                    setresult(data.results)
                }
            })
        } else {
            setloading(true);
            setresult([]);
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 500), [])

    return (
        <SafeAreaView style={tw`bg-neutral-800 flex-1`}>
            <View style={tw`mx-7 mt-3 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full`}>
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor='lightgray'
                    style={tw`pb-2 pt-2 pl-6 flex-1 text-white text-base font-semibold tracking-wider`} />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={tw`rounded-full p-1 m-1 bg-neutral-500`}
                >
                    <XMarkIcon size={'25'} color={'white'} />
                </TouchableOpacity>
            </View>
            {
                loading ? (

                    <Loading />

                ) :

                    result.length ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}>
                            <Text style={tw`text-white font-semibold ml-5 mb-1`}>Result ({result.length})</Text>
                            <View style={tw`flex-row flex-wrap justify-between`}>
                                {
                                    result.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={() => navigation.push('Movie', item)}>
                                                <View style={tw`mb-3 mt-1  `}>
                                                    <Image
                                                        // source={require('../assets/movieposter.png')}
                                                       source={{uri:image185(item.poster_path)} || noImage}
                                                        style={[{ height: height * 0.3, width: width * 0.41 }, tw`rounded-3xl ml-1 border border-neutral-500 mr-2`]}
                                                         />
                                                    <Text style={tw`text-neutral-300 ml-2 mt-1 `}>
                                                        {
                                                            item?.title.length > 18 ? item?.title.slice(0, 17) + '...' : item?.title
                                                        }
                                                    </Text>
                                                </View>

                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }

                            </View>


                        </ScrollView>
                    ) : (
                        <View style={tw`flex-row justify-center items-center`}>
                            <Image
                                source={require('../assets/movieTimeRebg.png')}
                                style={tw`h-86 w-86 mt-15 ml-15 mr-15`}
                                resizeMode='contain'
                            />

                        </View>
                    )


            }

        </SafeAreaView>
    )
} 