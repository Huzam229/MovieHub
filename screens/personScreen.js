import React, { useEffect, useState } from 'react';
import {
    View, Text, ScrollView, Dimensions, Platform, SafeAreaView,
    TouchableOpacity, Image
} from 'react-native';
import tw from 'twrnc';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles } from '../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/MovieList';
import Loading from '../components/loading';
import { fetchPersonDetail, fetchPersonMovie, image342, unKnownPerson } from '../api/moviedb';

const { width, height } = Dimensions.get('window')
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '' : 'my-1';

export default function PersonScreen() {
    const { params: item } = useRoute()
    const [isFavourite, setisFavourite] = useState(false);
    const [personMovies, setpersonMovies] = useState([]);
    const navigation = useNavigation();
    const [loading, setloading] = useState(false);
    const [person, setperson] = useState({})



    useEffect(() => {
        setloading(true)
        getPersonMovie(item.id);
        getPersonDetail(item.id)
    }, [item])

    const getPersonDetail = async (id) => {
        const data = await fetchPersonDetail(id)
        setloading(false)
        if (data) {
            setperson(data);
        }
    }
    const getPersonMovie = async (id) => {
        const data = await fetchPersonMovie(id)
        setloading(false)
        if (data && data.cast) {
            setpersonMovies(data.cast);
        }
    }


    return (
        <ScrollView style={tw`flex-1 bg-neutral-900 `}
            contentContainerStyle={{ paddingBottom: 20 }}>
            {/* back button and hearticon */}
            <SafeAreaView style={[tw`z-20 w-full justify-between px-1 flex-row `,]}>
                <TouchableOpacity style={tw`rounded-xl p-1`} onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon
                        size="28" strokeWidth={2.5} color="white"
                        style={[styles.background, tw`p-3.5 , rounded-lg ${verticalMargin}`]} />

                </TouchableOpacity>
                <TouchableOpacity onPress={() => setisFavourite(!isFavourite)}>
                    <HeartIcon
                        size="35" strokeWidth={2.5} color={isFavourite ? "#eab308" : "white"}
                        style={[tw`mr-1.5 , rounded-lg ${verticalMargin}`]} />
                </TouchableOpacity>
            </SafeAreaView>
            {/* person detail */}
            {
                loading ? (
                    <Loading />
                ) : (
                    <View> 
                        <View style={[{
                            elevation: 10,
                        }, tw`flex-row justify-center`]}>
                            <View style={tw`rounded-full items-center overflow-hidden border-2 border-neutral-500 h-68 w-68`}>
                                <Image
                                    source={{ uri: image342(person?.profile_path) || unKnownPerson }}
                                    style={{ height: height * 0.40, width: width * 0.70 }}
                                />
                            </View>

                        </View>
                        <View style={tw`mt-5 `}>
                            <Text style={tw`text-white font-bold text-center text-3xl`}>
                                {person?.name}
                            </Text>
                            <Text style={tw`text-neutral-500 text-center text-base`}>
                                {
                                    person?.place_of_birth

                                }
                            </Text>
                        </View>

                        <View style={tw`mx-2 p-3 mt-5 justify-between flex-row bg-neutral-700 items-center rounded-full`}>
                            <View style={tw`border-r-2 border-r-neutral-400 px-1 items-center`}>
                                <Text style={tw`text-white font-semibold`}>Gender</Text>
                                <Text style={tw`text-neutral-300 text-sm`}>
                                    {
                                        person?.gender == '1' ? 'Female' : 'Male'
                                    }
                                </Text>
                            </View>
                            <View style={tw`border-r-2 border-r-neutral-400 px-1 items-center`}>
                                <Text style={tw`text-white font-semibold mr-1`}>Birthday</Text>
                                <Text style={tw`text-neutral-300 text-sm mr-1`}>
                                    {
                                        person?.birthday
                                    }
                                </Text>
                            </View><View style={tw`border-r-2 border-r-neutral-400 px-1 items-center`}>
                                <Text style={tw`text-white font-semibold mr-1`}>Profession</Text>
                                <Text style={tw`text-neutral-300 text-sm mr-1`}>
                                    {
                                        person?.known_for_department
                                    }
                                </Text>
                            </View><View style={tw` px-1 items-center`}>
                                <Text style={tw`text-white font-semibold`}>Popularity</Text>
                                <Text style={tw`text-neutral-300 text-sm`}>
                                    {person?.popularity?.toFixed(2)}%
                                </Text>
                            </View>
                        </View>
                        <View style={tw`my-5 mx-4`}>
                            <Text style={tw`text-white text-lg`}>Biography</Text>
                            <Text style={tw`text-neutral-400 tracking-wide text-sm `}>
                                {
                                    person?.biography
                                }
                            </Text>

                        </View>
                        <View style={tw`-mt-4`}>
                            <MovieList title='Movies' data={personMovies} hideSeeAll={true} />
                        </View>
                    </View>

                )
            }

        </ScrollView>
    )
}