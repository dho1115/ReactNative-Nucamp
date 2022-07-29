import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Card, ListItem, Avatar } from 'react-native-elements';
import Mission from './MissionScreen';
import { baseUrl } from "../shared/baseUrl"
import { useSelector } from 'react-redux';
import Loading from '../components/LoadingComponent'
// import { PARTNERS } from '../shared/partners';


const AboutScreen = () => {
    const partners = useSelector(state => state.partners);

    if (partners.isLoading) {
        return (
            <ScrollView>
                <Mission />
                <Card>
                    <Card.Title>Community Partners.</Card.Title>
                    <Card.Divider />
                </Card>
                <Loading />
            </ScrollView>
        )
    } 

    if (partners.errMess) {
        return (
            <ScrollView>
                <Mission />
                <Card>
                    <Card.Title></Card.Title>
                    <Card.Divider />
                    <Text>{partners.errMess}</Text>
                </Card>    
            </ScrollView>            
        )
    }

    return (
        <ScrollView>
            <Mission />
            {
                partners.partnersArray.map(partner => (
                    <ListItem key={partner.id}>
                        <Avatar source={{ uri: baseUrl + partner.image }} rounded />
                        <ListItem.Content>
                            <ListItem.Title>{ partner.name }</ListItem.Title>
                            <ListItem.Subtitle>{ partner.description }</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </ScrollView>
    )
}

export default AboutScreen
