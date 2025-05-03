import React from 'react';
import { StyleSheet, View } from 'react-native';
import DetailListItem from '../components/DetailListItem';

const Options = () => {
    const options = [
        { title: "Update Profile" },
        { title: "Change Language" },
        { title: "Sign Out" },
    ];

    return (
        <View style={styles.container}>
        {options.map((option, index) => (
            <DetailListItem key={index} title={option.title} />
        ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default Options;