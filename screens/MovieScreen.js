import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
    View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions,
    Platform, Animated, Image
} from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import tw from 'twrnc'
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/MovieList';
import Loading from '../components/loading';
import { fetchMovieCredit, fetchMovieDetail, fetchSimilarMovie, image500 } from '../api/moviedb';
import { split } from 'postcss/lib/list';

const { width, height } = Dimensions.get('window')
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'my-1'

export default function MovieScreen() {
    let moviename = "Prince Of Persia:The Sands of Times";
    const { params: item } = useRoute();
    const [isFavourite, setisFavourite] = useState(false)
    const [cast, setcast] = useState([])
    const [similarMovies, setsimilarMovies] = useState([])
    const [loading, setloading] = useState(false)
    const [movie, setmovie] = useState({});



    // const [fadeAnim] = useState(new Animated.Value(1)); // Initial opacity: 1 (fully visible)
    const navigation = useNavigation();

    // const handleGoBack = () => {
    //     // Start fade-out animation
    //     Animated.timing(fadeAnim, {
    //       toValue: 0, // Fade to opacity 0 (invisible)
    //       duration: 500, // Duration of the fade-out (500 ms)
    //       useNativeDriver: true,
    //     }).start(() => {
    //       // After the animation ends, go back
    //       navigation.goBack();
    //     });
    //   };

    useEffect(() => {

        setloading(true)
        getMovieDetail(item.id);
        getMovieCredit(item.id);
        getSimilarMovie(item.id);
    }, [item])

    const getMovieDetail = async (id) => {
        const data = await fetchMovieDetail(id)
        if (data) {
            setmovie(data)
            setloading(false)

        }

    }
    const getMovieCredit = async (id) => {
        const data = await fetchMovieCredit(id)
        if (data && data.cast) {
            setcast(data.cast)
            setloading(false)
        }

    }
    const getSimilarMovie = async (id) => {

        const data = await fetchSimilarMovie(id)
        if (data && data.results) {
            setsimilarMovies(data.results)

        }

    }
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
            style={tw`flex:1 bg-neutral-900 w-full`}>

            {/* back button and movie poster */}

            <SafeAreaView style={[tw`absolute z-20 w-full justify-between px-1 flex-row `,]}>
                <TouchableOpacity style={tw`rounded-xl p-1`} onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon
                        size="28" strokeWidth={2.5} color="white"
                        style={[styles.background, tw`p-3.5 , rounded-lg ${topMargin}`]} />

                </TouchableOpacity>
                <TouchableOpacity onPress={() => setisFavourite(!isFavourite)}>
                    <HeartIcon
                        size="35" strokeWidth={2.5} color={isFavourite ? "#eab308" : "white"}
                        style={[tw`mr-1.5 , rounded-lg ${topMargin}`]} />
                </TouchableOpacity>

            </SafeAreaView>
            {
                loading ? (
                    <Loading />
                ) : (

                    <View>
                        <View>
                            <Image
                                source={{ uri: image500(movie?.poster_path) }}
                                style={[{ width, height: height * 0.55 }]}
                                resizeMode='stretch' />
                            <LinearGradient
                                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                style={[{ width, height: height * 0.40 }, tw`absolute bottom-0`]}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }} />
                        </View>
                        <View style={[{ marginTop: - (height * 0.1) }, tw`mb-3`]}>
                            {
                                movie?.id ? (
                                    <>
                                        <Text style={tw`text-white text-center text-3xl font-bold tracking-wider`}>
                                            {movie.title}
                                        </Text>


                                        <Text style={tw`text-neutral-400 text-center text-base font-semibold`}>
                                            {movie?.status} - {movie?.release_date?.split('-')[0]} - {movie?.runtime} min
                                        </Text>
                                    </>
                                ) : null
                            }
                        </View>
                        {/* Genres */}
                        <View style={tw`flex-row justify-center mx-4 mr-2`}>
                            {
                                movie?.id ? (

                                    <>
                                        {
                                            movie?.genres?.map((genre, index) => {
                                                let showDot = index + 1 != movie.genres.length
                                                return (
                                                    <Text style={tw`text-neutral-400 text-base font-semibold text-center ml-1 `}
                                                        key={index}>
                                                        {genre?.name} {showDot ? '·' : null}
                                                        {/* to place dot in the middle hold the alt key and press 0183 on the 
                        numeric keypad and then release the alt key */}
                                                    </Text>
                                                )
                                            })
                                        }

                                    </>
                                ) : null
                            }
                        </View>

                        <View>
                            {
                                movie?.id ? (
                                    <Text style={tw`text-neutral-400 mx-4 text-left my-2`}>
                                        {movie?.overview}
                                    </Text>
                                ) : null
                            }

                        </View>

                        <Cast cast={cast} navigation={navigation}  />

                      {similarMovies.length > 0? <MovieList title={'Similar Movies'} data={similarMovies} hideSeeAll={true} />  : null } 

                    </View>


                )
            }



        </ScrollView>
    )
}
