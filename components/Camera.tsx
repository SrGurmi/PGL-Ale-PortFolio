
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImageManipulator from 'expo-image-manipulator';
import apiService from "../service/apiService";
import Loading from "./Loading";

type CameraProps = {
    setLastPicture: Function;
    setIsCameraActive: Function;
    onPictureSaved: Function; // ✅ Removed token prop
};

const CameraComponent = ({ setLastPicture, setIsCameraActive, onPictureSaved }: CameraProps) => { // ✅ Removed token prop
    const cameraRef = useRef<CameraView>(null);
    const [permission, requestPermission] = useCameraPermissions();

    const [facing, setFacing] = useState<CameraType>("back");
    const [flash, setFlash] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState(false);


    useEffect(() => {
        return () => {
            setIsCameraActive(false);
        };
    }, []);


    const toggleFacing = () =>
        setFacing((face) => (face === "back" ? "front" : "back"));

    const toggleFlash = () => setFlash((flash) => !flash);

    const takePicture = async () => {
        setIsSaving(true);
        console.log("taking picture...");
        try {
            const picture = await cameraRef.current?.takePictureAsync({ base64: true });

            if (picture != null && picture.base64 != null) {
                const resizedImage = await ImageManipulator.manipulateAsync(
                    picture.uri,
                    [{ resize: { width: 800 } }],
                    { base64: true, format: ImageManipulator.SaveFormat.JPEG }
                );

                const imageData = {
                    encodedData: resizedImage.base64,
                    width: resizedImage.width,
                    height: resizedImage.height,
                };

                try {
                    await apiService.saveImage(imageData); // ✅ No token parameter
                    alert("Picture saved successfully!");
                    onPictureSaved();
                    setIsCameraActive(false);
                } catch (apiError) {
                    alert("Error saving picture to API.");
                    console.error("Error saving to API:", apiError);
                } finally {
                    setIsSaving(false);
                }

            } else {
                alert("Ocurrió un error sacando una foto.");
                setIsSaving(false);
            }
        } catch (error) {
            console.error("Error taking picture:", error);
            alert("Failed to take picture.");
            setIsSaving(false);
        }
    };

    const closeCamera = () => {
        setIsCameraActive(false);
    };


    if (!permission) {
        return <View />;
    } else if (!permission.granted) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', marginBottom: 10 }}>Camera permission required</Text>
                <Button onPress={requestPermission} title="Grant camera permission" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <CameraView
                enableTorch={flash}
                style={styles.camera}
                facing={facing}
                mode="picture"
                ref={cameraRef}
                onCameraReady={() => console.log("Camera ready!")}
            >
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.iconButton} onPress={toggleFlash}>
                        <Ionicons
                            name={flash ? "flash-off" : "flash"}
                            size={32}
                            color="white"
                        />
                    </Pressable>
                    <Pressable style={styles.pictureButton} onPress={takePicture}>
                        <Text> </Text>
                    </Pressable>
                    <Pressable style={styles.iconButton} onPress={toggleFacing}>
                        <Ionicons name="camera-reverse" size={32} color="white" />
                    </Pressable>
                </View>
            </CameraView>
            <View style={styles.topButtons}>
                <Button title="Close Camera" onPress={closeCamera} />
            </View>
            <Loading visible={isSaving} />
        </View>

    );
};

export default CameraComponent;

const styles = StyleSheet.create({
    message: {
        textAlign: "center",
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        alignItems: "flex-end",
        justifyContent: "space-between",
        margin: 40,
    },
    iconButton: {
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: "50%",
        borderColor: "transparent",
        borderWidth: 2,
        padding: 8,
    },
    pictureButton: {
        height: 80,
        width: 80,
        alignItems: "center",
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: "50%",
        borderColor: "gray",
        borderWidth: 6,
    },
    topButtons: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});