import { useState } from 'react';
import { View } from 'react-native';
import { CAMPSITES } from '../shared/campsites';
import DirectoryScreen from './DirectoryScreen';
import CampsiteInfoScreen from './CampsiteInfoScreen';

const Main = () => {
    const [campsites, setcampsites] = useState(CAMPSITES);
    const [selectedCampsiteId, setselectedCampsiteId] = useState();

    return (
        <View>
            <DirectoryScreen campsites={campsites} />
            <CampsiteInfoScreen campsite = {
                campsite.find(campsite => campsite.id === selectedCampsiteId)
            } />
        </View>
    )
}

export default Main;