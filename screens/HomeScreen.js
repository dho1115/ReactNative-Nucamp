import { Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from '../components/LoadingComponent';


const FeaturedItem = (props) => {
    const { item } = props;

    if (props.isLoading) {
        return <Loading />
    }

    if (props.errMess) {
        return(
            <View>
                <Text>{ props.errMess}</Text>
            </View>
        )
    }

    if (item) {
        return (
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={{ uri: baseUrl + item.image }}>
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

    console.log({ item })

    return (
        <View>
            <Text>NO ITEMS AVAILABLE TO VIEW....</Text>
        </View>
    )
}

const HomeScreen = () => {
    const campsites = useSelector((state) => {
        return state.campsites
    });
    const promotions = useSelector((state) => state.promotions);
    const partners = useSelector((state) => state.partners);

    const featCampsite = campsites.campsitesArray.find(item => item.featured);
    const featPromotion = promotions.promotionsArray.find(item => item.featured);
    const featPartner = partners.partnersArray.find(item => item.featured);

    return (
        <ScrollView>
            <FeaturedItem isLoading={campsites.isLoading} errMess={ campsites.errMess} item={featCampsite} />
            <FeaturedItem isLoading={partners.isLoading} errMess={partners.errMess} item={featPartner} />
            <FeaturedItem isLoading={promotions.isLoading} errMess={promotions.errMess} item={featPromotion} />
        </ScrollView>
    )
}

export default HomeScreen
