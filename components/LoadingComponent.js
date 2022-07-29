import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

function Loading() {
    return (
        <View style={ styles.loadingView }>
            <ActivityIndicator size="large" color="maroon" />
            <Text style={ styles.loadingText }>Loading... please wait....</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        color: 'crimson',
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export default Loading;