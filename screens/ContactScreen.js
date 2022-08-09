import { ScrollView, Text } from "react-native"
// import { createStackNavigator } from "@react-navigation/stack";
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';


const ContactScreen = () => {
    const sendMail = () => {
        MailComposer.composeAsync({
            recipients: ['campsites@nucamp.co', 'davidhorph@gmail.com'],
            subject: 'Hello from NuCamp!!!',
            body: 'Welcome to Nucamp... we are so glad you can join us. Enjoy!'
        })
    }
    return (
        <ScrollView style={{ backgroundColor: 'bisque' }}>
            <Animatable.View
                animation='fadeInUp'
                duration={1900}
                delay={1500}
            >
                <Card wrapperStyle={{ margin: 20 }}>
                    <Card.Title>CONTACT INFORMATION</Card.Title>
                    <Card.Divider />
                    <Text>1 Nucamp Way</Text>
                    <Text>Seattle, WA 98001</Text>
                    <Text>U.S.A.</Text>
                    <Text></Text>
                    <Text>Phone: 1-206-555-1234</Text>
                    <Text>Email: campsites@nucamp.co</Text>
                    <Button
                        title="SEND NEW EMAIL."
                        buttonStyle={{backgroundColor: 'maroon', margin: 35}}
                        icon = {
                            <Icon
                                name="envelope-o"
                                type="font-awesome"
                                color='crimson'
                                iconStyle={{marginRight: 9}}
                            />
                        }
                        onPress={() => sendMail()}
                    />
                </Card>
            </Animatable.View>
        </ScrollView>
    )
}

export default ContactScreen
