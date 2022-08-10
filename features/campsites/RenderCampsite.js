import { useRef } from 'react';
import { View, Text, StyleSheet, Modal, PanResponder, Alert, Share } from "react-native";
import { Card, Icon } from "react-native-elements";
import { baseUrl } from "../../shared/baseUrl";
import * as Animatable from 'react-native-animatable'

const RenderCampsite = (props) => {
    console.log({ props })
    const { campsite } = props;

    const view = useRef();

    const isLeftSwipe = ({dx}) => dx < -200;

    //===== START: isRightSwipe =====
    const isRightSwipe = ({dx}) => dx > 200
    //===== END: isRightSwipe =====

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => { 
            view.current
                .rubberBand(1500)
                .then(endState => console.log(endState.finished ? "finished." : "cancelled."))
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log({ gestureState });

            if (isLeftSwipe(gestureState)) {
                Alert.alert(
                    'About To Add Favorite...',
                    `Are you sure you want to add ${campsite.name} to your favorites list?`,
                    [
                        {
                            text: 'CANCEL',
                            style: 'cancel',
                            onPress: () => console.log("CANCEL HAS BEEN PRESSED.")
                        },
                        {
                            text: 'OKAY',
                            onPress: () => props.isFavorite ? console.log("This is already a favorite"): props.markFavorite()
                        }
                    ],
                    {cancelable: false}
                )
            } else if (isRightSwipe(gestureState)) {
                //===== START: CODE TO SHOW MODAL. =====
                    props.onShowModal();
                //===== END: CODE TO SHOW MODAL. =====
            }
        }
    })

    const shareCampsite = (title, message, url) => {
        Share.share(
            {
                title,
                message: `${title}: ${message} ${url}.`,
                url
            },
            {
                dialogTitle: 'Share' + title
            }
        )
    }

    if (campsite) {
        console.log({ image: campsite.image })
        return(
            <Animatable.View
                animation='fadeInDownBig'
                duration={1700}
                delay={1500}
                ref={view}
                {...panResponder.panHandlers}
            >
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

                        {/* ===== START: SHARE ICON ===== */}
                        <Icon
                            name="share"
                            type="font-awesome"
                            color="#5637DD"
                            raised
                            reverse
                            onPress={() => shareCampsite(campsite.name, campsite.description, baseUrl + campsite.image)}
                        />
                        {/* ===== END: SHARE ICON ===== */}
                    </View>           
                </Card>
           </Animatable.View>
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