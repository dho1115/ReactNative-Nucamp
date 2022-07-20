import { View, Text } from "react-native";
import { Card } from "react-native-elements";


const RenderCampsite = ({ campsite }) => {
    if (campsite) {
        return(
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image src={{ campsite.image }}>
                    <View style={{ justifyContent: 'center', flex: 1 }}>
                        <Text style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 15
                        }}>{ campsite.name }</Text>
                    </View>
                </Card.Image>
                <Text style={{ margin: 17 }}>{ campsite.description }</Text>
            </Card>
        )
    }
}

export default RenderCampsite;