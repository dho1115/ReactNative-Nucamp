// import { useState } from 'react';
import { Platform, View, Text } from 'react-native';
import { CAMPSITES } from '../shared/campsites';
import DirectoryScreen from './DirectoryScreen';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Constants from 'expo-constants';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';

const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: 'whitesmoke',
    headerStyle: { backgroundColor: 'maroon' }
}

const HomeNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={ screenOptions }>
            <Stack.Screen
                name='Home'
                component={ HomeScreen }
                options={{ title: 'MY HOME SCREEN.' }}
            />
        </Stack.Navigator>
    )
}

const DirectoryNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='Directory'
            screenOptions={ screenOptions }
        >
            <Stack.Screen
                name='DEFAULT DIRECTORY NAME.'
                component={DirectoryScreen}
                options={{title: 'Directory Page.'}}
            />
            <Stack.Screen
                name='CampsiteInfo'
                component={CampsiteInfoScreen}
                options={ ({ route }) => ({ title: `${route.params.campsite.name}.` }) }
            />
        </Stack.Navigator>
    )
}

const AboutNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={ screenOptions }>
            <Stack.Screen
                name='About Us Page.'
                component={ AboutScreen }
            />
        </Stack.Navigator>
    )
}

const ContactNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={ screenOptions }>
            <Stack.Screen 
                name="Contact"
                options={{ title: "Contact Us" }}
                component={ ContactScreen }
            />
        </Stack.Navigator>
    )
}

const Main = () => {

    return (
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
            <Drawer.Navigator
                initialRouteName='Home'
                drawerStyle={{ backgroundColor: 'lightseagreen' }}
            >
                <Drawer.Screen
                    name='Home'
                    component={ HomeNavigator }
                    options={{ title: 'Home' }}
                 />
                 <Drawer.Screen
                    name='Directory'
                    component={ DirectoryNavigator }
                    options={{ title: 'Directory' }}
                />
                <Drawer.Screen
                    name="About"
                    component={ AboutNavigator }
                />
                <Drawer.Screen
                    name="Contact"
                    options={{ title: "Contact Us." }}
                    component={ ContactNavigator }
                />
            </Drawer.Navigator>
        </View>
    )
}

export default Main;