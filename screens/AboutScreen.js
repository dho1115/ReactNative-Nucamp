import { ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const AboutNavigator = () => {
    const Stack = createStackNavigator();

    return (
        <ScrollView>
            <Stack.Navigator>
                <Stack.Screen 
                    name="About"
                >
                </Stack.Screen>
            </Stack.Navigator>
        </ScrollView>
    )
}

export default AboutNavigator
