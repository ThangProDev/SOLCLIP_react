import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,Alert } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    const handleStartPress = async () => {
        try {
            const response = await fetch('http://192.168.1.18:3000/api/create-wallet', {
                method: 'GET', // Hoặc 'POST' nếu bạn cần gửi dữ liệu
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('API response:', data);

            // Điều hướng đến WalletH và truyền dữ liệu
            navigation.navigate('WalletH', {
                publicKey: data.publicKey,
                seedPhrase: data.seedPhrase,
            });
        } catch (error) {
            console.error('Error calling API:', error);
            Alert.alert('Error', 'Có lỗi xảy ra khi gọi API');
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.overlay}>
                <Image 
                    source={require('../image/logo.png')} // Đảm bảo đường dẫn đúng
                    style={styles.logo}
                    resizeMode="contain" // Điều chỉnh theo tỷ lệ gốc của hình ảnh
                />
                <Text style={styles.title}>Chào Mừng bạn đến với NFT</Text>
                <Text style={styles.subtitle}>Ứng dụng NFT tất cả trong một dành cho bạn - kiếm tiền điện tử, đúc NFT, kết nối với những người cùng đam mê tiền điện tử và tận hưởng hành trình này!</Text>
                <TouchableOpacity
                    onPress={handleStartPress} // Gọi hàm khi bấm nút
                    style={styles.button}
                    activeOpacity={0.8} // Hiệu ứng nhấn
                >
                    <Text style={styles.buttonText}>Bắt đầu</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Recoverwallet')}
                    style={styles.transparentButton}
                    activeOpacity={0.8} // Hiệu ứng nhấn
                >
                    <Text style={styles.buttonText}>Nhập ví đang có</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#1e2639',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    logo: {

        width: 150, // Kích thước của logo
        height: 150,
        marginBottom: 100, // Khoảng cách giữa logo và văn bản
    },
    button: {
        backgroundColor: '#6E3D99', // Màu nền cho nút
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 50,
        marginBottom: 10, // Khoảng cách giữa các nút
    },
    transparentButton: {
        backgroundColor: 'transparent', // Không có màu nền
        borderWidth: 1, // Thêm viền nếu cần
        borderColor: '#6E3D99', // Màu viền
        height: 50,
        width: '90%',
        justifyContent: 'center', // Căn giữa nội dung
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        color: '#ddd',
        marginBottom: 20,
    },
});

export default WelcomeScreen;
