// import { useState } from 'react';
import { Platform, View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import DirectoryScreen from './DirectoryScreen';
import CampsiteInfoScreen from './CampsiteInfoScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Constants from 'expo-constants';
import HomeScreen from './HomeScreen';
import AboutScreen from './AboutScreen';
import ContactScreen from './ContactScreen';
import logo from '../assets/images/logo.png';

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

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props} >
        <View style={ styles.drawerHeader }>
            <View style={{ flex: 1 }}>
                <Image source={ logo } style={ styles.drawerImage } />
            </View>
            <View style={{ flex: 2 }}>
                <Text style={ styles.drawerHeaderText }>NuCamp.</Text>
            </View>
        </View>
        <DrawerItemList {...props} labelStyle={{ fontWeight: "bold" }} />
    </DrawerContentScrollView>
)

const Main = () => {

    return (
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
            <Drawer.Navigator
                initialRouteName='Home'
                drawerContent={ CustomDrawerContent }
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
    drawerHeader: {
        backgroundColor: 'beige',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'maroon',
        marginLeft: 10,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 70,
        width: 70
    },
    stackIcon: {
        margin: 10,
        color: "white",
        fontSize: 25
    }
})

export default Main;