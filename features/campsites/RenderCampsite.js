import { View, Text } from "react-native";
import { Card } from "react-native-elements";


const RenderCampsite = ({ campsite }) => {
    if (campsite) {
        console.log({ image: campsite.image })
        return(
            <Card containerStyle={{ padding: 0 }}>
                <Card.Image source={ campsite.image }>
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

    return <View />
}

export default RenderCampsite;