import { View, Text, StyleSheet, Modal } from "react-native";
import { Card, Icon } from "react-native-elements";
import { baseUrl } from "../../shared/baseUrl";

const RenderCampsite = (props) => {
    console.log({ props })
    const { campsite } = props;

    if (campsite) {
        console.log({ image: campsite.image })
        return(
            <Card containerStyle={styles.cardContainer}>
                <Card.Image source={{ uri: baseUrl + campsite.image }}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text style={styles.cardText}>{ campsite.name }</Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 17 }}>{ campsite.description }</Text>
                <View style={styles.cardRow}>
                    {/* ===== START: HEART ICON ===== */}
                    <Icon
                        name={ props.isFavorite ? "heart" : "heart-o"}
                        type="font-awesome"
                        color="crimson"
                        raised
                        reverse
                        onPress={() => props.isFavorite ? console.log("Already marked a favorite.") : props.markFavorite()}
                    />
                    {/* ===== END: HEART ICON ===== */}

                    {/* ===== START: PENCIL ICON ===== */}
                    <Icon
                        name="pencil"
                        type="font-awesome"
                        color="#5637DD"
                        raised
                        reverse
                        onPress={() => props.onShowModal()}
                    />
                    {/* ===== END: PENCIL ICON ===== */}
                 </View>           
           </Card>
        )
    }

    return <View />
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        margin: 0,
        marginBottom: 17
    },
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    cardText: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }
})

export default RenderCampsite;