import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { CheckBox, Input, Button, Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import { baseUrl } from '../shared/baseUrl';
import logo from '../assets/images/logo.png';

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
        <View style={styles.container}>
            <Text>Hello, {username}.</Text>
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
                    buttonStyle={{ backgroundColor: 'fuchsia'}}
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
    )
}

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

    return ( 
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{uri: imageUrl}}
                        loadingIndicatorSource={logo}
                        style={styles.image}
                    />
                </View>
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
                    <Button
                        onPress={() => handleRegister()}
                        title='REGISTER NEW USER.'
                        color='#5637DD'
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                color='lightseagreen'
                                iconStyle={{ marginRight: 9 }}
                            />
                        }
                        buttonStyle={{ backgroundColor: 'magenta'}}
                    />
                </View>
            </View>
        </ScrollView> 
    )
}

const Tab = createBottomTabNavigator();

const LoginScreen = () => {
    const tabBarOptions = {
        activeBackgroundColor: 'black',
        inactiveBackgroundColor: 'seashell',
        activeTintColor: 'crimson',
        inactiveTintColor: 'silver',
        labelStyle: { fontSize: 17 }
    }

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
    }
});

export default LoginScreen
