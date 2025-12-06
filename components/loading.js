import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import tw from 'twrnc';
import * as Progress from 'react-native-progress'
import { theme } from '../theme';

var { width, height } = Dimensions.get('window')

export default function Loading() {
    return (
        <View style={[{ height, width }, tw`absolute flex-row justify-center items-center`]}>

            
            <Progress.CircleSnail
                thickness={5}
                size={90}
                color={theme.background}
                strokeCap={'butt'}
                spinDuration={5000}
                />
            
            
        </View>
    )
}