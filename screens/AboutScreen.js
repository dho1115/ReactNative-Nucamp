import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Card } from 'react-native-elements';
import Mission from './MissionScreen';
import { PARTNERS } from '../shared/partners';

const AboutScreen = () => {
    const [partners, setPartners] = useState(PARTNERS);

    return (
        <ScrollView>
            <Mission />
        </ScrollView>
    )
}

export default AboutScreen
