// import { useState } from 'react';
import { Platform, View } from 'react-native';
// import { CAMPSITES } from '../shared/campsites';
import DirectoryScreen from './DirectoryScreen';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import Constants from 'expo-constants';

const DirectoryNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='Directory'
            screenOptions={{
                headerStyle: { backgroundColor: 'maroon' },
                headerTintColor: 'whitesmoke'
            }}
        >
            <Stack.Screen
                name='Directory'
                component={DirectoryScreen}
                options={{ title: 'Campsite Directory.' }}
            />
            <Stack.Screen
                name='CampsiteInfo'
                component={CampsiteInfoScreen}
                options={({ route }) => ({ title: route.params.campsite.name })}
            />
        </Stack.Navigator>
    )
}

const Main = () => {

    return (
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
            <DirectoryNavigator />
        </View>
    )
}

export default Main;