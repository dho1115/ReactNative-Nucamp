import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Card, ListItem, Avatar } from 'react-native-elements';
import Mission from './MissionScreen';
import { PARTNERS } from '../shared/partners';

const AboutScreen = () => {
    const [partners, setPartners] = useState(PARTNERS);

    return (
        <ScrollView>
            <Mission />
            {
                partners.map(partner => (
                    <ListItem key={partner.id}>
                        <Avatar source={ partner.image } rounded />
                        <ListItem.Content>
                            <ListItem.Title></ListItem.Title>
                            <ListItem.Subtitle></ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </ScrollView>
    )
}

export default AboutScreen
