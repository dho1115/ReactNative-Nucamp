// import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseURL';

// import { CAMPSITES } from '../shared/campsites';
// import { PROMOTIONS } from '../shared/promotions';
// import { PARTNERS } from '../shared/partners';

const FeaturedItem = ({ item }) => {
    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={ uri: baseUrl + item.image }>
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
    // const [campsites, setCampsites] = useState(CAMPSITES);
    // const [partners, setPartners] = useState(PARTNERS);
    // const [promotions, setPromotions] = useState(PROMOTIONS);

    const campsites = useSelector(state => state.campsites);
    const partners = useSelector(state => state.partners);
    const promotions = useSelector(state => state.promotions);

    const featCampsite = campsites.campsitesArray.find(item => item.featured);
    const featPartners = partners.partnersArray.find(item => item.featured);
    const featPromotions = promotions.promotionsArray.find(item => item.featured);


    return (
        <ScrollView>
            <FeaturedItem item={ featCampsite } />
            <FeaturedItem item={ featPartners } />
            <FeaturedItem item={ featPromotions } />
        </ScrollView>
    )
}

export default HomeScreen
