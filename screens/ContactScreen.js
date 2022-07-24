import { ScrollView } from "react-native"
import { createStackNavigator } from "@react-navigation/stack";
import { Card } from 'react-native-elements';

const ContactNavigator = () => {
    return (
        <ScrollView>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Contact"
                    options={{title: "Contact Us."}}
                >
                    <Card wrapperStyle={{ margin: 20 }}>
                        <Card.Title>CONTACT INFORMATION</Card.Title>
                        
                        <Card.Divider />
                
                        <Text>1 NuCamp Way</Text>
                        <Text>Seattle, WA 98001</Text>
                        <Text syle={{ marginBottom: 10 }}>U.S.A.</Text>

                        <Text>Phone: 1-206-555-1234</Text>
                        <Text>email: campsite@nucamp.co</Text>
                    </Card>
                </Stack.Screen>
            </Stack.Navigator>
        </ScrollView>
    )
}

export default ContactNavigator
