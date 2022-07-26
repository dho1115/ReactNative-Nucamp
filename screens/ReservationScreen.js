import { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable'
import * as Notifications from 'expo-notifications'

const ReservationScreen = () => {
    const [campers, setCampers] = useState(1);
    const [hikeIn, setHikeIn] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showModal, setShowModal] = useState(false)

    const onDateChange = ( event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowCalendar(Platform.OS === 'ios');
        setDate(currentDate);
    }

    //===== START: HANDLE RESERVATION Alert.alert() =====
    const handleReservation = () => {
        console.log({ campers, hikeIn, date, showCalendar });
        Alert.alert(
            `Begin Search?`,
            `Number of Campers: ${campers}.\nHike In? ${hikeIn}.\nDate: ${date}`,
            [
                { text: 'CANCEL', onPress: () => console.log("RESERVATION IS CANCELLED.") },

                { text: 'OK.', onPress: () => {
                    presentLocalNotification(date.toLocaleDateString('en-US'));
                    console.log("OK is logged.");
                } }
            ],
            { cancelable: false }

        )
    } //Called inside the <Button /> below.
    //===== END: HANDLE RESERVATION Alert.alert() =====

    const resetForm = () => {
        setCampers(1);
        setHikeIn(false);
        setDate(new Date());
        setShowCalendar(false);
    }

    const presentLocalNotification = async (reservationDate) => {
        const sendNotification = () => {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: true
                })
            });

            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Your campsite Reservation Search.',
                    body: `Search for ${reservationDate} requested.`
                },
                trigger: null
            });
        }

        let permissions = await Notifications.getPermissionsAsync()

        if (!permissions.granted) {
            permissions = await Notifications.requestPermissionsAsync();
        }

        if (permissions.granted) {
            sendNotification()
        }
    } //Called inside the Alert.alert() that is inside the body of handleReservation.

    return (
        <ScrollView>
            <Animatable.View
                animation='zoomIn'
                duration={2500}
                delay={1000}
            >
                <View style={ styles.formRow }>
                    <Text style={ styles.formLabel }>Number of Campers:</Text>
                    <Picker
                        style={ styles.formItem }
                        selectedValue={ campers }
                        onValueChange={(itemValue) => setCampers(itemValue)}
                    >
                        <Picker.Item label='1' value={1} />
                        <Picker.Item label='2' value={2} />
                        <Picker.Item label='3' value={3} />
                        <Picker.Item label='4' value={4} />
                        <Picker.Item label='5' value={5} />
                        <Picker.Item label='6' value={6} />
                    </Picker>
                </View>
                <View style={ styles.formRow }>
                    <Text style={ styles.formLabel }>Hike In?</Text>
                    <Switch 
                        style={ styles.formItem }
                        value={ hikeIn }
                        trackColor={{ true: 'red', false: null}}
                        onValueChange={(value) => setHikeIn(value)}
                    />
                </View>
                <View style={ styles.formRow }>
                    <Text style={ styles.formLabel }></Text>
                    <Button
                        onPress={() => {
                            console.log(`About to set show calendar to: ${showCalendar}.`)
                            setShowCalendar(!showCalendar)
                            console.log({ showCalendar })
                        }}
                        title={date.toLocaleDateString(`en-US`)}
                        color='purple'
                        accessibilityLabel='Tap me to select a reservation date.'
                    />
                </View>
                    {showCalendar && (
                        <DateTimePicker
                            style={styles.formItem}
                            value={date}
                            mode='date'
                            display='default'
                            onChange={onDateChange}
                        />
                    )}
                <View style={ styles.formRow }>
                    <Button
                        onPress={() => handleReservation()}
                        title="SEARCH AVAILABILITY"
                        color="red"
                        accessibilityLabel="Tap me to search for available campsties to reserve."
                    />
                </View>
            </Animatable.View>

            {/*===== START: REMOVE MODAL BETWEEN COMMENTS ===== */}
            <Modal
                animationType='slide'
                transparent={ false }
                visible={ showModal }
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>
                        Search Campsite Reservations
                    </Text>
                    <Text style={styles.modalText}>
                        Number of Campers: {campers}
                    </Text>
                    <Text style={styles.modalText}>
                        Hike-In?: {hikeIn ? 'Yes' : 'No'}
                    </Text>
                    <Text style={styles.modalText}>
                        Date: {date.toLocaleDateString('en-US')}
                    </Text>
                    <Button
                        onPress={
                            () => {
                                setShowModal(!showModal)
                                resetForm()
                            }
                        }
                        title="CLOSE THIS MODAL"
                        color="orange"
                    />
                </View>
            </Modal>
            {/*===== END: REMOVE MODAL BETWEEN COMMENTS =====*/}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1,
        backgroundColor: 'red'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: 'maroon',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default ReservationScreen;