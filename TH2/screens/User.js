import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import ContactThumbnail from '../components/ContactThumbnail';
import colors from '../utility/colors';
import { fetchUserContact } from '../utility/api';

const User = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchUserContact()
        .then((userData) => {
            setUser(userData);
            setLoading(false);
            setError(false);
        })
        .catch(() => {
            setLoading(false);
            setError(true);
        });
    }, []);

    const { avatar, name, phone } = user;

    return (
        <View style={styles.container}>
        {loading && <ActivityIndicator size="large" color="#fff" />}
        {error && <Text style={styles.errorText}>Error loading user data.</Text>}
        {!loading && !error && (
            <ContactThumbnail avatar={avatar} name={name} phone={phone} />
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.blue,
    },
    errorText: {
        color: 'white',
        fontSize: 16,
    },
});

export default User;
