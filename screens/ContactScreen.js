import { ScrollView, Text } from "react-native"
// import { createStackNavigator } from "@react-navigation/stack";
import { Card } from 'react-native-elements';

const ContactScreen = () => {
    // const Stack = createStackNavigator();
    return (
        <ScrollView style={{ backgroundColor: 'bisque' }}>
            <Card wrapperStyle={{ margin: 20 }}>
                <Card.Title>CONTACT INFORMATION</Card.Title>
                <Card.Divider />
                <Text>1 Nucamp Way</Text>
                <Text>Seattle, WA 98001</Text>
                <Text>U.S.A.</Text>
                <Text></Text>
                <Text>Phone: 1-206-555-1234</Text>
                <Text>Email: campsites@nucamp.co</Text>
            </Card>
        </ScrollView>
    )
}

export default ContactScreen
