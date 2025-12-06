import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/personScreen';
import SearchScreen from '../screens/searchScreen';
import { StatusBar, Platform,Text } from 'react-native'
const Stack = createStackNavigator();



export default function AppNavigation() {


    return (
        <NavigationContainer>
            <StatusBar barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'} />
            <Stack.Navigator>
                <Stack.Screen name='Home' options={{ headerShown: false }} component={HomeScreen} />
                <Stack.Screen name='Movie' options={{ headerShown: false }} component={MovieScreen} />
                <Stack.Screen name='Person' options={{ headerShown: false }} component={PersonScreen} />
                <Stack.Screen name='Search' options={{ headerShown: false }} component={SearchScreen} />
            </Stack.Navigator>
           
        </NavigationContainer>
    )
}



