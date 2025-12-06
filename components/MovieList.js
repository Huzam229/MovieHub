import React from 'react';
import {
    View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback,
    Image, Dimensions
} from 'react-native';
import tw from 'twrnc'
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { image185, noImage } from '../api/moviedb.js';


var { width, height } = Dimensions.get('window');


export default function MovieList({ title, data, hideSeeAll }) {
    const Navigation = useNavigation();
    return (
        <View style={tw`mb-5 mt-2`}>
            <View style={tw`mx-4 flex-row justify-between items-center`}>
                <Text style={tw`text-white text-xl font-bold mb-5`}>{title}</Text>
                {
                    !hideSeeAll && (
                        < TouchableOpacity >
                            <Text style={[styles.text, tw`text-sm`]}>See All</Text>
                        </TouchableOpacity>
                    )
                }

            </View>

            {/* movie row */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}>

                {
                    data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => Navigation.push ('Movie', item)}>
                                <View style={tw`mr-4`}>
                                    <Image source={{uri:image185(item.poster_path) || noImage }}
                                        style={[{ width: width * 0.33, height: height * 0.22 }, tw`rounded-3xl border border-neutral-500`]}
                                         />
                                    <Text style={tw`text-neutral-300 ml-2 mt-2`}>
                                        {
                                            item.title.length > 15 ?item.title.slice(0, 14) + '...' : item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )

                    })
                }

            </ScrollView>

        </View >
    )

}
