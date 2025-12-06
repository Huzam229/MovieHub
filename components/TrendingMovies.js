import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc'
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');


export default function TrendingMovies({ data }) {
    const Navigation = useNavigation();

    const handleClick = (item) => {

        Navigation.navigate('Movie', item)
    }
    return (
        <View style={tw`mb-8`}>
            <Text style={tw`text-white text-xl mx-4 mb-5 my-4 font-bold`}>Trending
            </Text>
            <Carousel
                data={data}
                renderItem={({ item }) =>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <MovieCard item={item} handleClick={handleClick} />
                    </View>}
                autoPlay={true}
                width={width}
                height={height * 0.4}
                autoPlayInterval={3000}
                loop={true}
                pagingEnabled={true}
            />
        </View>
    )
}

const MovieCard = ({ item, handleClick }) => {

    // console.log('Item.poster_path', item.poster_path)


    return (
        <TouchableWithoutFeedback
            onPress={() => handleClick(item)}>
            <Image
                source={{ uri: image500(item.poster_path) }}
                style={[
                    {
                        width: width * 0.56,
                        height: height * 0.4,
                        resizeMode: 'stretch'


                    },

                    tw`rounded-3xl border border-neutral-500`,

                ]}

            />

        </TouchableWithoutFeedback>
    )
}