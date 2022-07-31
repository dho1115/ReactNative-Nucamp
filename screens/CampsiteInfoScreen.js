import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Modal } from 'react-native';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { Rating, Input, Icon } from 'react-native-elements';

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    console.log({ campsiteDetails: campsite })

    const [showModal, setShowModal] = useState(false)
    console.log({ showModal })
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");
    const [boolean, setBoolean] = useState(false);

    const comments = useSelector(state => state.comments);
    const favorites = useSelector(state => state.favorites);

    const dispatch = useDispatch();

    console.log({ favorites })

    //https://snack.expo.dev/@davidhorph/code-challenge:-rne-rating-component

    const handleSubmit = () => {
        const newComment = {
            campsiteId: campsite.id,
            rating,
            author,
            text
        }

        console.log({ newComment })

        setShowModal(!showModal)
    }

    const ResetForm = () => {
        setRating("5");
        setAuthor("");
        setText("");
    }

    //======= START: USER COMMENTS. =======
    const renderCommentItem = ({ item }) => {
        return(
            <View style={ styles.commentItem }>
                <Text style={{ fontSize: 15 }}>{ item.text } </Text>
                {/* <Text style={{ fontSize: 11 }}>{ item.rating } Stars.</Text> */}
                <Rating
                    readonly
                    showRating
                    startingValue={item.rating}
                    imageSize={11}
                    style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
                />
                <Text style={{ fontSize: 11 }}>{ `--${ item.author }, ${ item.date }` } </Text>
            </View>
        )
    }
    //======= END: USER COMMENTS. =======

    return (
        <>
            <FlatList
                data = { comments.commentsArray.filter(comment => comment.campsiteId === campsite.id) }
                renderItem = { renderCommentItem }
                keyExtractor = { item => item.id.toString() }
                contentContainerStyle = {{ marginHorizontal: 20, paddingVertical: 20 }}
                ListHeaderComponent = {
                    <>
                        <RenderCampsite 
                            campsite={ campsite } 
                            isFavorite={ favorites.includes(campsite.id) } markFavorite={() => dispatch(toggleFavorite(campsite.id))} 
                            onShowModal={() => setShowModal(!showModal)} 
                            onSetBoolean={() => setBoolean(!boolean)}
                            boolean={boolean}
                        />
                        <Text style={ styles.commentsTitle }>Comments</Text>
                    </>
                }
            />
            
            {/* START: MODAL ACTION WHEN PENCIL ICON CLICKED. */}
            <Modal
                animationType='slide'
                transparent={ false }
                visible={ showModal }
                onRequestClose={() => setShowModal(!showModal)}
            > 
                <View style={styles.modal}>
                    <Rating
                        showRating
                        startingValue={`${rating}`}
                        ratingCount={5}
                        imageSize="40"
                        onFinishRating={ rating => setRating(rating) }
                        style={{paddingVertical: 10, backgroundColor: "crimson"}}
                    />
                    <Input
                        placeholder="Author"
                        leftIcon={
                            <Icon
                            name='user-o'
                            type="font-awesome"
                            size={25}
                            color='lightseagreen'
                            />
                        }
                        leftIconContainerStyle={{ paddingRight: 9 }}
                        onChangeText= { author => setAuthor(author) }
                        value={ author }
                    /> 
                    <Input
                        placeholder="Insert Comment Here."
                        leftIcon={
                            <Icon
                                name='comment'
                                type="font-awesome"
                                size={25}
                                color='maroon'
                            />
                        }
                        leftIconContainerStyle={{ paddingRight: 9 }}
                        onChangeText={ comment => setText(comment) }
                        value={ text }
                    />
                    <View style={{margin: 10}}>
                        <Button
                            title="SUBMIT."
                            color="maroon"
                            style={{ margin: 11 }}
                            onPress={() => {
                                handleSubmit();
                                ResetForm();
                            }}
                        />
                    </View>
                    <View style={{margin: 10}}>
                        <Button 
                            title="CANCEL."
                            onPress={() => {
                                setShowModal(!showModal);
                                ResetForm();
                            }}
                            color='crimson'  
                        />
                    </View>
                </View>
            </Modal>
            {/* END: MODAL ACTION WHEN PENCIL ICON CLICKED. */}
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