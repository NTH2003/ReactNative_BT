import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { fetchContacts } from '../utility/api';
import ContactThumbnail from '../components/ContactThumbnail';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchContactsLoading,
    fetchContactsSuccess,
    fetchContactsError,
} from '../store';

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
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

    const favorites = contacts.filter((contact) => contact.favorite);

    const renderFavoriteThumbnail = ({ item }) => {
        const { avatar } = item;
        return (
        <ContactThumbnail
            avatar={avatar}
            onPress={() => navigation.navigate('Profile', { contact: item })}
        />
        );
    };

    return (
        <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text style={styles.errorText}>Đã có lỗi khi tải dữ liệu.</Text>}
        {!loading && !error && (
            <FlatList
            data={favorites}
            keyExtractor={keyExtractor}
            numColumns={3}
            contentContainerStyle={styles.list}
            renderItem={renderFavoriteThumbnail}
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
    },
    list: {
        alignItems: 'center',
    },
    errorText: {
        textAlign: 'center',
        color: 'red',
        fontSize: 16,
    },
});

export default Favorites;
