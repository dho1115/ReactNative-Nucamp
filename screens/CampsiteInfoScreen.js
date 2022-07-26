import { useState } from 'react';
import { View, Text, FlatList, Stylesheet } from 'react-native';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { COMMENTS } from '../shared/comments';


const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;

    const [comments, setComments] = useState(COMMENTS);

    const renderCommentItem = ({ item }) => {
        return(
            <View style={ styles.commentItem }>
                <Text style={{ fontSize: 15 }}>{ item.text } </Text>
                <Text style={{ fontSize: 11 }}>{ item.rating } Stars.</Text>
                <Text style={{ fontSize: 11 }}>{ --${ item.author }, ${ item.date } } </Text>
            </View>
        )
    }

    return (
        <FlatList
            data = { comments.filter(comment => comment.campsiteId === campsiteId) }
            renderItem = { renderCommentItem }
            keyExtractor = { item => item.id.toString() }
        />
    )
}

export default CampsiteInfoScreen;