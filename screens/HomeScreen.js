import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { PROMOTIONS } from '../shared/promotions';
import { PARTNERS } from '../shared/partners';

const FeaturedItem = ({ item }) => {
    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={ item.image }>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text style={{
                            color: 'whitesmoke',
                            textAlign: 'center',
                            fontSize: 17
                        }}>{ item }</Text>
                    </View>
                </Card.Image>
            </Card>
        )
    }

    return
}

const HomeScreen = () => {
    const [campsites, setCampsites] = useState(CAMPSITES);
    const [partners, setPartners] = useState(PARTNERS);
    const [promotions, setPromotions] = useState(PROMOTIONS);

    return (
        <ScrollView>
            <Text>The Home Screen.</Text>
        </ScrollView>
    )
}

export default HomeScreen
