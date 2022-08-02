// import { useState } from 'react';
import { FlatList, Text, View } from "react-native";
import { Tile } from "react-native-elements";
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';
import * as Animatable from 'react-native-animatable'

// import { Avatar, ListItem } from "react-native-elements";
// import { CAMPSITES } from '../shared/campsites'

const DirectoryScreen = ({ navigation }) => {
    const campsites = useSelector(state => state.campsites);

    if (campsites.isLoading) {
        return <Loading />
    }

    if (campsites.errMess) {
        return(
            <View>
                <Text>{ campsites.errMess }</Text>
            </View>
        )
    }

    const renderDirectoryItem = ({ item: campsite }) => {
        console.log({ campsite })

        return(
            <Tile onPress={() => navigation.navigate('CampsiteInfo', { campsite })} title={ campsite.name } caption={ campsite.description} featured imageSrc={{ uri: baseUrl + campsite.image }} />
        )
    }

    return (
        <FlatList
            data={ campsites.campsitesArray }
            renderItem={ renderDirectoryItem }
            keyExtractor={ item => item.id.toString() }
        />
    )
}

export default DirectoryScreen;