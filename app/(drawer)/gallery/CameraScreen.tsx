import { Image, StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, Animated, Pressable, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import CameraComponent from "../../../components/Camera";
import apiService from "../../../service/apiService";
import Loading from "../../../components/Loading";
import Ionicons from "@expo/vector-icons/Ionicons";

const MyPicturesPage = () => {
    const [lastPicture, setLastPicture] = useState<string>("");
    const [pictures, setPictures] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [isEnlargedViewVisible, setIsEnlargedViewVisible] = useState(false);
    const enlargeAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = async () => {
        console.log("loadImages: Starting to load images"); // Añadido console.log
        setLoading(true);
        setError(null);
        try {
            const fetchedPicturesResponse = await apiService.getImages();
            console.log("loadImages: API Response received:", fetchedPicturesResponse); // Añadido console.log

            if (fetchedPicturesResponse && fetchedPicturesResponse.images) {
                const fetchedPicturesArray = fetchedPicturesResponse.images;
                if (Array.isArray(fetchedPicturesArray)) {
                    setPictures(fetchedPicturesArray);
                    console.log("loadImages: Pictures state updated:", fetchedPicturesArray);
                    if (fetchedPicturesArray.length === 0) {
                        console.log("loadImages: No images found in fetched data array");
                    }
                } else {
                    console.warn("loadImages: API response did not return an array of images. Check API response format.");
                    setPictures([]);
                }
            } else {
                console.warn("loadImages: API response is not in the expected format (missing 'images' property). Check API response.");
                setPictures([]);
            }


        } catch (err) {
            setError(err.message || "Failed to load images.");
            setPictures([]);
            console.error("loadImages: Error loading images:", err);
            alert("Failed to load images. Please check your connection or try again later.");
        } finally {
            setLoading(false);
            console.log("loadImages: Loading finished"); // Añadido console.log
        }
    };

    const handleImagePress = (image) => {
        setSelectedImage(image);
        setIsEnlargedViewVisible(true);
        Animated.timing(enlargeAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeEnlargedView = () => {
        Animated.timing(enlargeAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setIsEnlargedViewVisible(false);
            setSelectedImage(null);
        });
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.thumbnailContainer} onPress={() => handleImagePress(item)}>
                <Image
                    style={styles.thumbnail}
                    source={{ uri: `data:image/jpg;base64,${item.encodedData}` }}
                />
                <Pressable
                    style={styles.deleteButton}
                    onPress={() => handleDeleteImage(item.id)}
                >
                    <Ionicons name="trash-bin" size={24} color="red" />
                </Pressable>
            </TouchableOpacity>
        );
    };

    const openCamera = () => {
        setIsCameraActive(true);
    };

    const handlePictureSaved = async () => {
        console.log("handlePictureSaved: Picture saved callback triggered"); // Añadido console.log
        setLoading(true);
        try {
            await loadImages(); // Recarga imágenes después de guardar
            setIsCameraActive(false);
            console.log("handlePictureSaved: Images reloaded and camera closed"); // Añadido console.log
        } catch (apiError) {
            alert("Error saving picture to API.");
            console.error("handlePictureSaved: Error saving to API:", apiError);
        } finally {
            setLoading(false);
            console.log("handlePictureSaved: Loading finished after saving"); // Añadido console.log
        }
    };

    const handleDeleteImage = async (imageId) => {
        setLoading(true);
        setError(null);
        try {
            await apiService.deleteImage(imageId);
            alert("Image deleted successfully!");
            loadImages();
        } catch (err) {
            setError(err.message || "Failed to delete image.");
            console.error("Error deleting image:", err);
            alert("Failed to delete image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const enlargedImageStyle = {
        transform: [{
            scale: enlargeAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
            }),
        }],
        opacity: enlargeAnimation,
    };

    return (
        <View style={styles.pageContainer}>
            <Text style={styles.title}>My Pictures</Text>

            <View style={styles.listContainer}>
                {loading ? (
                    <Loading visible={true} />
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : pictures.length > 0 ? (
                    <FlatList
                        data={pictures}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id?.toString() || item.id}
                        numColumns={3}
                        contentContainerStyle={styles.thumbnailsGrid}
                    />
                ) : (
                    <Text style={styles.message}>No images saved yet.</Text>
                )}
            </View>

            <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
                <Text style={styles.cameraButtonText}>Open Camera</Text>
            </TouchableOpacity>

            {isCameraActive && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={isCameraActive}
                    onRequestClose={() => { setIsCameraActive(false); }}
                >
                    <CameraComponent
                        setLastPicture={setLastPicture}
                        setIsCameraActive={setIsCameraActive}
                        onPictureSaved={handlePictureSaved}
                    />
                </Modal>
            )}

            <Modal
                visible={isEnlargedViewVisible}
                transparent={true}
                onRequestClose={closeEnlargedView}
            >
                <View style={styles.modalOverlay}>
                    <Animated.View style={[styles.enlargedContainer, enlargedImageStyle]}>
                        {selectedImage && (
                            <Image
                                style={styles.enlargedImage}
                                source={{ uri: `data:image/jpg;base64,${selectedImage.encodedData}` }}
                                resizeMode="contain"
                            />
                        )}
                        <TouchableOpacity style={styles.closeIcon} onPress={closeEnlargedView}>
                            <Ionicons name="close-circle" size={40} color="white" />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>

            <Loading visible={loading} />
        </View>
    );
};

export default MyPicturesPage;

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    thumbnailsGrid: {
        paddingVertical: 10,
    },
    thumbnailContainer: {
        flexDirection: 'row',
        margin: 5,
        width: (Dimensions.get('window').width / 3) - 10,
        height: (Dimensions.get('window').width / 3) - 10,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    message: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        color: 'gray',
    },
    errorText: {
        textAlign: 'center',
        color: 'red',
        marginTop: 20,
    },
    cameraButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    cameraButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    enlargedContainer: {
        width: '90%',
        aspectRatio: 1,
        maxWidth: 500,
        maxHeight: 500,
    },
    enlargedImage: {
        width: '100%',
        height: '100%',
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    deleteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 15,
        padding: 2,
    },
});