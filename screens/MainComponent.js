// import { useState } from 'react';
import { Platform, View } from 'react-native';
// import { CAMPSITES } from '../shared/campsites';
import DirectoryScreen from './DirectoryScreen';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';

const DirectoryNavigator = () => {
    const State = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='Directory'
            screenOptions={{
                headerStyle: { backgroundColor: 'beige' },
                headerTintColor: 'whitesmoke'
            }}
        >
            <Stack.Screen
                name='Directory'
                component={DirectoryScreen}
                options={{ title: 'Campsite Directory.' }}
            />
            <Stack.Screen
                name="CampsiteInfo"
                component={CampsiteInfoScreen}
                options={({ route }) => ({ title: route.params.campsite.name })}
            />
        </Stack.Navigator>
    )
}

const Main = () => {

    return (
        <View>
            <DirectoryScreen campsites={campsites} onPress={(campsiteId) => setselectedCampsiteId(campsiteId)} />
            <CampsiteInfoScreen campsite = {
                campsites.find(campsite => campsite.id === selectedCampsiteId)
            } />
        </View>
    )
}

export default Main;