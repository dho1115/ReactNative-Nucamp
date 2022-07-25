import { View, Text } from 'react-native';
import RenderCampsite from '../features/campsites/RenderCampsite';


const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    return (
        <View>
            {/* <Text>{ JSON.stringify(route.params) } </Text> */}
            <RenderCampsite campsite={ campsite } />
        </View>
    )
}

export default CampsiteInfoScreen;