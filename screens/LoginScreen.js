import { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';


const LoginScreen = () => {
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
                const userinfo = JSON.parse(userData);

                if (userInfo) {
                    setUsername(userinfo.username);
                    setPassword(userinfo.password);
                    setRemember(true);
                }
            })

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
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 10
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 40
    }
});

export default LoginScreen
