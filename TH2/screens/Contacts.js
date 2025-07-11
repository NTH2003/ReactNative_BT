import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../utility/api';
import ContactListItem from '../components/ContactListItem';
import {
    fetchContactsLoading,
    fetchContactsSuccess,
    fetchContactsError,
} from '../store';

const keyExtractor = ({ phone }) => phone;

const Contacts = ({ navigation }) => {
    const dispatch = useDispatch();
    const { contacts, loading, error } = useSelector((state) => state.contacts);

    useEffect(() => {
        dispatch(fetchContactsLoading());
        fetchContacts()
        .then((contacts) => {
            dispatch(fetchContactsSuccess(contacts));
        })
        .catch(() => {
            dispatch(fetchContactsError());
        });
    }, [dispatch]);

    const contactsSorted = contacts.slice().sort((a, b) => a.name.localeCompare(b.name));

    const renderContact = ({ item }) => {
        const { name, avatar, phone } = item;
        return (
        <ContactListItem
            name={name}
            avatar={avatar}
            phone={phone}
            onPress={() => navigation.navigate('Profile', { contact: item })}
        />
        );
    };

    return (
        <View style={styles.container}>
        {loading && <ActivityIndicator color="blue" size="large" />}
        {error && <Text style={styles.errorText}>Đã có lỗi khi tải danh bạ.</Text>}
        {!loading && !error && (
            <FlatList
            data={contactsSorted}
            keyExtractor={keyExtractor}
            renderItem={renderContact}
            />
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
        paddingTop: 10,
    },
    errorText: {
        textAlign: 'center',
        color: 'red',
        fontSize: 16,
    },
});

export default Contacts;
