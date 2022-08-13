// import { useState } from 'react';
import { Platform, View, Text, StyleSheet, Image, Alert, ToastAndroid } from 'react-native';
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
import ReservationScreen from './ReservationScreen';
import logo from '../assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchPartners } from '../features/partners/partnersSlice';
import { fetchCampsites } from '../features/campsites/campsitesSlice';
import { fetchPromotions } from '../features/promotions/promotionsSlice';
import { fetchComments } from '../features/comments/commentsSlice';
import FavoritesScreen from './FavoritesScreen';
import LoginScreen from './LoginScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import NetInfo from '@react-native-community/netinfo'


const Drawer = createDrawerNavigator();

const screenOptions = {
    headerTintColor: 'whitesmoke',
    headerStyle: { backgroundColor: 'maroon' }
}

//===== START ALL STACK.NAVIGATORS & STACK.SCREENS. =====
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
                            onPress = { () => {
                                console.log("Will toggle drawer from home page.")
                                navigation.toggleDrawer()
                            }}
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
                        title: 'Campsite Directory', //This will show after you click the 'Campsite Directory' in the drawer.
                        headerLeft: () => (
                            <Icon
                                name="list"
                                type="font-awesome"
                                iconStyle={ styles.stackIcon }
                                onPress={() => {
                                    console.log("Campsite Directory Will Toggle Drawer...")
                                    navigation.toggleDrawer()
                                }}
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
                                    onPress={() => {
                                        console.log("Will toggle drawer from Contact Us.");
                                        navigation.toggleDrawer()
                                    }}
                                />
                            )
                        }
                    )
                }
            />
        </Stack.Navigator>
    )
}

const ReservationNavigator = () => {
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator>
            <Stack.Screen
                name="reservation"
                component={ReservationScreen}
                title="Reservation Search."
                options={({ navigation }) => ({
                    title: 'Reservation Search',
                    headerLeft: () => (
                        <Icon
                            name='tree'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    )
}

const FavoritesNavigator = () => {
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Favorites"
                component={ FavoritesScreen }
                title="Campsites Marked as Favorites."
                options={({ navigation }) => ({
                    title: 'Favorites',
                    headerLeft: () => (
                        <Icon
                            name='heart'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    )
}

const LoginNavigator = () => {
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={ LoginScreen }
                options={({ navigation, route }) => ({
                    headerTitle: getFocusedRouteNameFromRoute(route),
                    title: 'Login Screen Header.', //Login Screen Header
                    headerLeft: () => (
                        <Icon
                            name={
                                getFocusedRouteNameFromRoute(route) === 'Register' ? 'user-plus' : 'sign-in' //getFocusedRouteNameFromRoute(route) returns either 'Register' or 'Login'.
                            }
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()} //opens and closes the left drawer.
                        />
                    )
                })}
            />
        </Stack.Navigator>
    )
}
//===== END ALL STACK.NAVIGATORS & STACK.SCREENS. =====

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
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCampsites());
        dispatch(fetchPartners());
        dispatch(fetchPromotions());
        dispatch(fetchComments());
        return () => {
            
        }
    }, [dispatch]);

    useEffect(() => {
        //===== OLD FETCH CODE. =====
        // NetInfo.fetch()
        //     .then(connectionInfo => {
        //         Platform.OS === 'ios' ?
        //             Alert.alert("Initial network connectivity type: ", connectionInfo.type)
        //             :
        //             ToastAndroid.show('Initial network connectivity type: ' + connectionInfo.type, ToastAndroid.LONG)
        //     })
        
        // const unsubscribeNetInfo = NetInfo.addEventListener(
        //     connectionInfo => {
        //         handleConnectivityChange(connectionInfo);
        //     }
        // )
        //===== OLD FETCH CODE. =====

        //===== START: NEW ASYNC CODE (CLASS ASSIGNMENT). =====
        const showNetInfo = async () => {
            const connectionInfo = await NetInfo.fetch()
    
            Platform.OS === 'ios' ?
                Alert.alert("Initial network connectivity type: ", connectionInfo.type)
                :
                ToastAndroid.show('Initial network connectivity type: ' + connectionInfo.type, ToastAndroid.LONG)
            
            const unsubscribeNetInfo = NetInfo.addEventListener(
                connectionInfo => {
                    handleConnectivityChange(connectionInfo);
                }
            )

            return unsubscribeNetInfo;
        }
        
        showNetInfo();
        //===== END: NEW ASYNC CODE (CLASS ASSIGNMENT). =====

    }, []);

    const handleConnectivityChange = connectionInfo => {
        let connectionMsg = "You are now connected to and active network.";

        switch (connectionInfo.type) {
            case "none":
                connectionMsg = "You have no network.";
                break;
            
            case "unknown":
                connectionMsg = "You are connected to an UNKNOWN network.";
                break;

            case "cellular":
                connectionMsg = "You are connected to a CELLULAR network.";
                break;
            
            case "wifi":
                connectionMsg = "You are connected to a WIFI network.";
                break;
        }

        Platform.OS === 'ios' ?
            Alert.alert('Connection change: ', connectionMsg)
            :
            ToastAndroid.show(connectionMsg, ToastAndroid.LONG)
    }

    return (
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>        
            {/* START: Drawer.Navigator (DRAWER NAVIGATOR) */}
            <Drawer.Navigator
                initialRouteName='Home'
                drawerContent={ CustomDrawerContent }
                drawerStyle={{ backgroundColor: 'lightseagreen' }}
            >
                <Drawer.Screen
                    name='Register/Login'
                    component={ LoginNavigator }
                    options={{ 
                        title: 'Register/Login', //defaults to name if title absent.
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='sign-in'
                                type="font-awesome"
                                size={ 25 }
                                iconStyle={{ width: 24 }}
                                color={ color }
                            />
                        ) 
                    }}
                />
                <Drawer.Screen
                    name='Home'
                    component={ HomeNavigator }
                    options={{ 
                        title: 'Home Page',
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
                    name="Reserve Campsite"
                    component={ ReservationNavigator }
                    options={{
                        title: "Reserve a Campsite(s).",
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='tree'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Favorites Navigator"
                    component={ FavoritesNavigator }
                    options={{
                        title: "Favorite Campsites List.",
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='heart'
                                type='font-awesome'
                                size={25}
                                iconStyle={{ width: 24 }}
                                color={color}
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
            {/* END: Drawer.Navigator (DRAWER NAVIGATOR) */}
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
        fontSize: 25,
        backgroundColor: 'maroon'
    }
})

export default Main;