import { View, Text } from "react-native";
import { Card } from "react-native-elements";


const RenderCampsite = ({ campsite }) => {
    if (campsite) {
        return(
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image src={{ campsite.image }}></Card.Image>
            </Card>
        )
    }
}

export default RenderCampsite;