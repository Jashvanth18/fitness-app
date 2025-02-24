import { View, Button, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { ResizeMode } from "expo-av";
import Toast from 'react-native-toast-message';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {
    const videoRef = useRef<Video>(null);

    const handleLogout = async () => {
        try {
            await FIREBASE_AUTH.signOut();
            Toast.show({
                type: 'success',
                text1: 'Logged out successfully',
                position: 'top',
            });
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Logout failed',
                text2: error.message,
                position: 'top',
            });
        }
    };

    return (
        <View style={styles.container}>
            {/* Background Video */}
            <Video
                ref={videoRef}
                source={require('../../assets/video.mp4')} 
                style={styles.backgroundVideo}
                shouldPlay
                isLooping
                resizeMode={ResizeMode.COVER}
                isMuted={true}
            />
            
            {/* Gradient Overlay */}
            <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)']} style={styles.overlay} />
            
            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate('Details')} title='Open Details' color='#ff5722' />
                <Button onPress={handleLogout} title='Logout' color='#ffab91' />
            </View>
            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    backgroundVideo: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 50,
        alignItems: 'center',
        gap: 10,
    },
});

export default List;
