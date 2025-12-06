import React, { useEffect, useState } from 'react';
import {
    StyleSheet, Text, View, StatusBar, Platform,
    TouchableOpacity, ScrollView, SafeAreaView, TouchableWithoutFeedback
} from 'react-native';
import tw from 'twrnc'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme/index'
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
const ios = Platform.OS === 'ios';
export default function HomeScreen() {
    const [trending, settrending] = useState([]);
    const [upComing, setupComing] = useState([]);
    const [topRated, settopRated] = useState([]);
    const [loading, setloading] = useState(true)
    const navigation = useNavigation();

    useEffect(() => {

        getTrendingMovies();
        getupComngMovies();
        gettopRatedMovies();

        const timer = setTimeout(() => {
            setloading(false);
        }, 2000);

        return () => clearTimeout(timer);

    }, [])


    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data?.results) {
            settrending(data.results)

        } else {
            console.error('No results found in API data.');
        }
    }
    const getupComngMovies = async () => {
        const data = await fetchUpcomingMovies();

        if (data?.results) {
            setupComing(data.results)


        } else {
            console.error('No results found in API data.');
        }

    }
    const gettopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if (data?.results) {
            settopRated(data.results)


        } else {
            console.error('No results found in API data.');
        }
    }

    return (
        <View style={tw`flex-1 bg-neutral-800 pb-10`}>

            {/* searchBar and logo */}

            <SafeAreaView >
                <View style={tw`flex-row justify-between items-center mx-3 -my-1 mt-1 mb-1`}>
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    {/* <TouchableWithoutFeedback onPress={() => navigation.push('Home')}> */}
                    <Text style={tw`text-white text-3xl font-bold `} >
                        <Text style={styles.text}>M</Text>ovie<Text style={styles.text}>s</Text>
                    </Text>
                    {/* </TouchableWithoutFeedback> */}

                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
                {
                    loading ? (
                        <Loading />
                    ) : (

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 10 }}
                        >
                            {/* TrendingMovies */}

                            {trending.length > 0 && <TrendingMovies data={trending} />}

                            {/* Upcoming Movies */}

                            <MovieList title='Upcoming' data={upComing} />

                            {/* TopRated Movie */}

                            <MovieList title='Top Rated' data={topRated} />

                            <View style={tw`border-t border-[1px] border-gray-600 mt-2 p-2`}>

                                <Text style={tw`bg-neutral-800 text-center text-white text-xs mt-2`}>
                                    Powered by Khuzama
                                </Text >
                                <Text style={tw`bg-neutral-800 text-center text-white text-xs mt-2 `} >
                                    Contact : +92-3201496219
                                </Text>
                                <Text style={tw`bg-neutral-800 text-center text-white text-xs mt-1 `}>
                                    Email : huzamkhan99@gmail.com
                                </Text>
                            </View>
                        </ScrollView>



                    )
                }

            </SafeAreaView>


        </View>
    );
}

