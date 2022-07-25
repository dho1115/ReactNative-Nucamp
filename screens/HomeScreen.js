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
                        }}>{ item.name }</Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 21 }}>{ item.description }</Text>
            </Card>
        )
    }

    return (
        <View>
            <Text>NO ITEMS AVAILABLE TO VIEW....</Text>
        </View>
    )
}

const HomeScreen = () => {
    const [campsites, setCampsites] = useState(CAMPSITES);
    const [partners, setPartners] = useState(PARTNERS);
    const [promotions, setPromotions] = useState(PROMOTIONS);

    const featCampsite = campsites.find(item => item.featured);
    const featPartners = partners.find(item => item.featured);
    const featPromotions = promotions.find(item => item.featured);


    return (
        <ScrollView>
            <FeaturedItem item={ featCampsite } />
            <FeaturedItem item={ featPartners } />
            <FeaturedItem item={ featPromotions } />
        </ScrollView>
    )
}

export default HomeScreen
