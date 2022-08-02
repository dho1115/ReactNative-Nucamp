import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Modal } from 'react-native';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { Rating, Input, Icon } from 'react-native-elements';
import { postComment } from '../features/comments/commentsSlice';
import * as Animatable from 'react-native-animatable'

const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    console.log({ route, campsite })

    const [showModal, setShowModal] = useState(false)
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");
    const [boolean, setBoolean] = useState(false);

    const comments = useSelector(state => state.comments);
    const favorites = useSelector(state => state.favorites);

    const dispatch = useDispatch();

    const handleSubmit = () => {
        const newComment = {
            campsiteId: campsite.id,
            rating,
            author,
            text
        }
        dispatch(postComment(newComment));
        // console.log({ newComment }); //This comment will be added to json-server
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
            <Animatable.View
                animation="fadeInUp"
                duration={1700}
                delay={1500}
            >
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
            </Animatable.View>
            
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
                        ratingColor='green'
                        ratingCount={5}
                        imageSize={40}
                        onFinishRating={ rating => setRating(rating) }
                        style={{paddingVertical: 10, backgroundColor: "ivory"}}
                    />
                    <Input
                        placeholder="Author"
                        leftIcon={
                            <Icon
                            name='user-o'
                            type="font-awesome"
                            size={35}
                            color='maroon'
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
                                size={35}
                                color='forestgreen'
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