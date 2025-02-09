import * as SecureStore from 'expo-secure-store'; // ✅ Import SecureStore

const API_BASE_URL = 'http://192.168.1.60:5000';

const apiService = {
    getImages: async () => {
        try {
            const token = await SecureStore.getItemAsync('authToken');
            if (!token) {
                console.log("No auth token found in SecureStore for getImages.");
                throw new Error("No auth token found. User not logged in?");
            }
            console.log("Token being sent for getImages:", token);
            const response = await fetch(`${API_BASE_URL}/images/get-all`, {

                headers: {
                    'Authorization': `Bearer ${token}`, // ✅ Use retrieved token
                    'Content-Type': 'application/json',
                },
            });

            console.log("Raw API Response:", response);
            if (!response.ok) {
                const message = `Error fetching images: ${response.status} - ${await response.text()}`; // Include response text for better error info
                throw new Error(`Error fetching images: ${message}`); // Include status in error
            }
            return await response.json();
        } catch (error) {
            console.error("API Error getting images:", error);
            throw error;
        }
    },
    saveImage: async (imageData: any) => {
        try {
            const token = await SecureStore.getItemAsync('authToken');
            if (!token) {
                console.log("No auth token found in SecureStore for saveImage.");
                throw new Error("No auth token found. User not logged in?");
            }
            console.log("Token being sent for saveImage:", token);
            const response = await fetch(`${API_BASE_URL}/images/save`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(imageData),
            });
            if (!response.ok) {
                const message = `Error saving image: ${response.status} - ${await response.text()}`; // Include response text for better error info
                throw new Error(`Error saving image: ${message}`); //
            }
            return await response.json();
        } catch (error) {
            console.error("API Error saving image:", error);
            throw error;
        }
    },
    deleteImage: async (imageId: any) => {
        try {
            const token = await SecureStore.getItemAsync('authToken');
            if (!token) {
                console.log("No auth token found in SecureStore for deleteImage.");
                throw new Error("No auth token found. User not logged in?");
            }
            console.log("Token being sent for deleteImage:", token); // ✅ Debug log token
            const response = await fetch(`${API_BASE_URL}/images/${imageId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, // ✅ Use retrieved token
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const message = `Error deleting image: ${response.status} - ${await response.text()}`; // Include response text for better error info
                throw new Error(`Error deleting image: ${message}`); // Include status in error
            }
            return response.ok;
        } catch (error) {
            console.error("API Error deleting image:", error);
            throw error;
        }
    },
};

export default apiService;