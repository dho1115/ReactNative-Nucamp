import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Modal } from 'react-native';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;

    const [showModal, setShowModal] = useState(false)

    const comments = useSelector(state => state.comments);
    const favorites = useSelector(state => state.favorites);

    const dispatch = useDispatch();

    console.log({ favorites })

    const renderCommentItem = ({ item }) => {
        return(
            <View style={ styles.commentItem }>
                <Text style={{ fontSize: 15 }}>{ item.text } </Text>
                <Text style={{ fontSize: 11 }}>{ item.rating } Stars.</Text>
                <Text style={{ fontSize: 11 }}>{ `--${ item.author }, ${ item.date }` } </Text>
            </View>
        )
    }

    return (
        <>
            <FlatList
                data = { comments.commentsArray.filter(comment => comment.campsiteId === campsite.id) }
                renderItem = { renderCommentItem }
                keyExtractor = { item => item.id.toString() }
                contentContainerStyle = {{ marginHorizontal: 20, paddingVertical: 20 }}
                ListHeaderComponent = {
                    <>
                        <RenderCampsite campsite={ campsite } isFavorite={ favorites.includes(campsite.id) } markFavorite={() => dispatch(toggleFavorite(campsite.id))} onShowModal={() => setShowModal(!showModal)} />
                        <Text style={ styles.commentsTitle }>Comments</Text>
                    </>
                }
            />
             <Modal
                animationType='slide'
                transparent={ false }
                visible={ showModal }
                onRequestClose={() => setShowModal(!showModal)}
            > 
                <View style={styles.modal}>
                    <View style={{margin: 10}}>
                        <Button 
                            title="CANCEL."
                            onPress={() => setShowModal(!showModal)}
                            color='crimson'  
                        />
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: "center",
        margin: 25
    },
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: "maroon",
        fontSize: 25,
        fontWeight: "bold",
        color: "ivory",
        padding: 10,
        paddingTop: 25
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "whitesmoke"
    }
})

export default CampsiteInfoScreen;