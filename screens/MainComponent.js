// import { useState } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
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
                options={({ navigation }) => ({ 
                    title: 'MY HOME SCREEN.',
                    headerLeft: () => (
                        <Icon
                            name="home"
                            type="font-awesome"
                            iconStyle={ styles.stackIcon }
                            onPress = { () => navigation.toggleDrawer() }
                        />
                    ) 
                })}
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
                options={({ navigation }) => (
                    {
                        title: 'Campsite Directory',
                        headerLeft: () => (
                            <Icon
                                name="list"
                                type="font-awesome"
                                iconStyle={ styles.stackIcon }
                                onPress={() => navigation.toggleDrawer()}
                            />
                        )
                    }
                )}
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
                options={
                    ({ navigation }) => (
                        {
                            headerLeft: () => (
                                <Icon
                                    name="info-circle"
                                    type="font-awesome"
                                    iconStyle={ styles.stackIcon }
                                    onPress={() => navigation.toggleDrawer()}
                                />
                            )
                        }
                    )
                 }
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
                options = {
                    ({ navigation }) => (
                        {
                            title: "Contact Us.",
                            headerLeft: () => (
                                <Icon
                                    name="address-card"
                                    type="font-awesome"
                                    iconStyle={styles.stackIcon}
                                    onPress={() => navigation.toggleDrawer()}
                                />
                            )
                        }
                    )
                }
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
                    options={{ 
                        title: 'Home',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name="home"
                                type="font-awesome"
                                size={ 25 }
                                iconStyle={{ width: 24 }}
                                color={ color }
                            />
                        ) 
                    }}
                 />
                 <Drawer.Screen
                    name='Directory'
                    component={ DirectoryNavigator }
                    options={{ 
                        title: 'Campsite Directory',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name= "list"
                                type= "font-awesome"
                                size={ 25 }
                                iconStyle={{ width: 24 }}
                                color={ color }
                            />
                        ) 
                    }}
                />
                <Drawer.Screen
                    name="About"
                    component={ AboutNavigator }
                    options={{
                        title: 'About',
                        drawerIcon: ({ color }) => (
                            <Icon
                                name="info-circle"
                                type="font-awesome"
                                size={ 25 }
                                iconStyle={{ width: 24 }}
                                color={ color }
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Contact"
                    options={{ 
                        title: "Contact Us.", 
                        drawerIcon: ({color}) => (
                            <Icon
                                name="address-card"
                                type="font-awesome"
                                size={ 25 }
                                iconStyle={{ width: 24 }}
                                color={ color }
                            />
                        )
                    }}
                    component={ ContactNavigator }
                />
            </Drawer.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    stackIcon: {
        margin: 10,
        color: "white",
        fontSize: 25
    }
})

export default Main;