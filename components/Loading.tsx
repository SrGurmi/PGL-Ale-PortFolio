
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loading = ({ visible }) => {
    if (!visible) {
        return null;
    }
    return (
        <View style={styles.loadingOverlay}>
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    loadingContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
});

export default Loading;