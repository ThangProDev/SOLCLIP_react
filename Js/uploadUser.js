import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadUser = () => {
    const [publicKey, setPublicKey] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [imageUri, setImageUri] = useState(null);

    const handleChoosePhoto = async () => {
        // Request permission to access the photo library
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Sorry, we need media library permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspecct: [4, 3],
            quality: 1,
          });
      
          console.log(result);

          if (!result.canceled) {
            setImageUri(result.assets[0].uri);
          }    
    };

    const handleSubmit = async () => {
        if (!name || !email || !imageUri) {
            Alert.alert('Error', 'Please fill all fields and select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('publickey', publicKey);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('img', {
            uri: imageUri,
            name: 'profile.jpg',
            type: 'image/jpeg'
        });

        try {
            const response = await fetch('http://192.168.1.18:3000/api/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (response.ok) {
                Alert.alert('Success', 'User added successfully.');
            } else {
                Alert.alert('Error', 'Failed to add user.');
            }
        } catch (error) {
            console.error('Error uploading user:', error);
            Alert.alert('Error', 'An error occurred while uploading the user.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Public Key: {publicKey}</Text>
          
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
           />

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <Button title="Choose Photo" onPress={handleChoosePhoto} />

           

            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        
        borderColor: 'red',
    },
});

export default UploadUser;
