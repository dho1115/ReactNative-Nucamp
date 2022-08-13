import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { CheckBox, Input, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import { baseUrl } from '../shared/baseUrl';
import logo from '../assets/images/logo.png';
import * as ImageManipulator from 'expo-image-manipulator';

//===== START: Inside Login Screen/Component. =====
const LoginTab = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const handleLogin = () => {
        console.log('username:', username);
        console.log('password:', password);
        console.log('remember:', remember);

        //See if the 'remember me' is checked.
        if (remember) {
            SecureStore.setItemAsync(
                'userinfo', //This is the key.
                JSON.stringify({ username, password }) //This is the value.
            ).catch(error => console.error({ error, errorCode: error.code, errorMessage: "Cound Not Save Data: " + error.message }));
        } else {
            SecureStore.deleteItemAsync('userinfo')
                .then(() => console.log("Successfully Deleted."))
                .catch(error => console.error({ error, errorCode: error.code, errorMessage: "Cound Not Delete Data: " + error.message }))
        }
    };

    useEffect(() => {
        //Retrieve login info IF 'remember me' was checked.
        SecureStore.getItemAsync('userinfo')
            .then(userData => {
                console.log({ userData })
                const userinfo = JSON.parse(userData);
                console.log({ userinfo })

                if (userinfo) {
                    setUsername(userinfo.username);
                    setPassword(userinfo.password);
                    setRemember(true);
                }
            }).catch(error => console.error({error, errorCode: error.code, errorMessage: "Error from useEffect(SecurStore.getItemAsync): " + error.message}))

        return () => {
            
        }
    }, []);

    return (
        //===== START: Create Login Form. =====
        <View style={styles.container}>
            <Text>Hello, {username}.</Text>
            <Input
                placeholder='Login Username'
                leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                onChangeText={(text) => setUsername(text)}
                value={username}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <Input
                placeholder='Login Password'
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                containerStyle={styles.formInput}
                leftIconContainerStyle={styles.formIcon}
            />
            <CheckBox
                title='Remember Me.'
                center
                checked={remember}
                onPress={() => setRemember(!remember)}
                containerStyle={styles.formCheckbox}
            />
            <View style={styles.formButton}>
                <Button
                    onPress={() => handleLogin()}
                    title='Login'
                    color='#5637DD'
                    icon={
                        <Icon
                            name='sign-in'
                            type='font-awesome'
                            color='mediumspringgreen'
                            iconStyle={{ marginRight: 9 }}
                        />
                    }
                    buttonStyle={{ backgroundColor: 'fushia'}}
                />
            </View>
            <View style={styles.formButton}>
                <Button
                    onPress={() => navigation.navigate('Register')}
                    title='Register'
                    type='clear'
                    icon={
                        <Icon
                            name='user-plus'
                            type='font-awesome'
                            color='orangered'
                            iconStyle={{ marginRight: 9 }}
                        />
                    }
                    titleStyle={{ color: 'rosybrown'}}
                />
            </View>
        </View>
        //===== END: Create Login Form. =====
    )
}
//===== END: Inside Login Screen/Component. =====

console.log({ ImageManipulator })


//===== START: INSIDE Register Screen/Component. =====
const RegisterTab = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [remember, setRemember] = useState(false);
    const [imageUrl, setImageUrl] = useState(baseUrl + "images/logo.png");

    const handleRegister = () => {
        console.log({ username, password, firstName, lastName, email, remember });

        if (remember) {
            SecureStore.setItemAsync(
                'userinfo', //This is the key.
                JSON.stringify({ username, password }) //This is the value.
            ).catch(error => console.error({ error, errorCode: error.code, errorMessage: "Cound Not Save Data: " + error.message }));
        } else {
            SecureStore.deleteItemAsync('userinfo')
                .then(() => console.log("Successfully Deleted."))
                .catch(error => console.error({ error, errorCode: error.code, errorMessage: "Cound Not Delete Data: " + error.message }))
        }
    }

    //START: CREATE FUNCTION TO BE CALLED WHEN CAMERA IS CLICKED.
    /*
        Steps to take a picture:
        (1) Get permission via await ImagePicker.requestCameraPermissionAsync().
        (2) Set up TWO scenarios if/when permission is granted:
            (a) If the picture is taken: await ImagePicker.launchCameraAsync({ ...options here }).
            (b) If the user cancels the picture after the camera is on but then changes their mind about taking the picture.
    */
    const getImageFromCamera = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync() //Get permission from app first.

        if (cameraPermission.status === 'granted') {
            console.log("Camera Image has been granted.");
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1]
            })

            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                // setImageUrl(capturedImage.uri);
                //===== START: Call processImage =====
                processImage(capturedImage.uri)
                //===== END: ProcessImage =====
            }
        }
    }
    //END: CREATE FUNCTION TO BE CALLED WHEN CAMERA IS CLICKED.

    //START: CREATE FUNCTION CALLED 'getImageFromGallery'.
    const getImageFromGallery = async () => {
        const mediaLibraryPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync() //Get permission from app first.

        if (mediaLibraryPermissions.status === 'granted') {
            console.log("Media Library has been granted.");
            const capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1]
            })
            console.log("If Media Library captured image is NOT cancelled, continue.");
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                // setImageUrl(capturedImage.uri);
                //===== START: Call processImage =====
                processImage(capturedImage.uri)
                //===== END: ProcessImage =====
            }
        }
    }
    //END: CREATE FUNCTION CALLED 'getImageFromGallery'.

    //===== START: processImage FUNCTION. =====
    const processImage = async (imgUri) => {
        const processedImage = await ImageManipulator.manipulateAsync(
            imgUri,
            [
                { resize: { width: 400 } }
            ],
            { format: "png" }
        )

        setImageUrl(processedImage.uri)

        console.log({ imageUrl })
    }
    //===== END: processImage FUNCTION. =====

    console.log({ imageUrl })

    return ( 
        <ScrollView>
            <View style={styles.container}>
                {/* START: ADD CONTAINER THAT WILL HOLD NUCAMP IMAGE AND CAMERA. */}
                <View style={styles.imageContainer}>
                    {/* The imageUrl is the NuCamp logo that will change to whatever image you take a picture with on the 'camera' */}
                    <Image
                        source={{uri: imageUrl}}
                        loadingIndicatorSource={logo}
                        style={styles.image}
                    />
                    {/* START: ADD BUTTON FOR 'camera'. */}
                    <Button title="camera" onPress={getImageFromCamera} buttonStyle={{backgroundColor: "maroon"}}/>
                    {/* END: ADD BUTTON FOR 'camera'. */}

                    {/* START: ADD BUTTON FOR 'gallery'. */}
                    <Button title="gallery" onPress={getImageFromGallery} buttonStyle={{backgroundColor: "crimson"}}/>
                    {/* END: ADD BUTTON FOR 'gallery'. */}
                </View>
                {/* END: ADD CONTAINER THAT WILL HOLD NUCAMP IMAGE AND CAMERA. */}

                {/* START: REGISTER FORM. */}
                <Input
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='First Name'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(text) => setFirstName(text)}
                    value={firstName}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Last Name'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(text) => setLastName(text)}
                    value={lastName}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='email'
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <CheckBox
                    title='Remember Me.'
                    center
                    checked={remember}
                    onPress={() => setRemember(!remember)}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                {/* START: CREATE 'REGISTER NEW USER' BUTTON. THIS WILL BE ON THE REGISTER <STACK.SCREEN></STACK.SCREEN> WHICH CAN BE ACCESSED VIA LOGIN. */}
                    <Button
                        onPress={() => handleRegister()}
                        title='REGISTER NEW USER.'
                        color='lightseagreen'
                        icon={
                            <Icon
                                name='star'
                                type='font-awesome'
                                color='whitesmoke'
                                iconStyle={{ marginRight: 9 }}
                            />
                        }
                        buttonStyle={{ backgroundColor: 'crimson' }}
                    />
                    {/* END: CREATE 'REGISTER NEW USER' BUTTON. */}
                </View>
                {/* END: REGISTER FORM */}
            </View>
        </ScrollView> 
    )
}
//===== END: INSIDE Register Screen/Component. =====



const Tab = createBottomTabNavigator();



//===== START: CREATE BOTTOM TABS (Login/Register). =====
const LoginScreen = () => {
    //=== Start: Styles for the bottom two tabs (Login/Register). ===
    const tabBarOptions = {
        activeBackgroundColor: 'black',
        inactiveBackgroundColor: 'ivory',
        activeTintColor: 'whitesmoke',
        inactiveTintColor: 'lightgrey',
        labelStyle: { fontSize: 17 }
    }
    //=== End: Styles for the bottom two tabs (Login/Register). ===

    return (
        <Tab.Navigator tabBarOptions={tabBarOptions}>
            <Tab.Screen 
                name="Login"
                component={ LoginTab }
                options={{
                    tabBarIcon: (props) => {
                        return(
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                color={props.color}
                            />
                        )
                    }
                }}
            />
            <Tab.Screen 
                name="Register"
                component={ RegisterTab }
                options={{
                    tabBarIcon: (props) => {
                        return(
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                color={props.color}
                            />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}
//===== END: CREATE BOTTOM TABS (Login/Register). =====


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 9
    },
    formIcon: {
        marginRight: 9
    },
    formInput: {
        padding: 8,
        height: 57
    },
    formCheckbox: {
        margin: 8,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10,
        backgroundColor: 'lightseagreen'
    },
    image: {
        width: 60,
        height: 60
    }
});

export default LoginScreen
