import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function Notifications() {
	const marginHorizontal = 6;

	const rectangleWidth = screenWidth - (2 * marginHorizontal);

	return (
		<SafeAreaView className='bg-white flex-1'>

			<View className='flex-row justify-start items-center pt-16 pb-2 px-6 gap-4'>
				<Text className='text-3xl font-bold text-blue-old'>Notficações</Text>
			</View>

			<View className='mt-8 flex-col items-center justify-center px-6 space-y-4'>
				<TouchableOpacity>
					<View style={[styles.rectangle]} className='w-full'>
						<Text style={styles.texto1}>Transaction Completed</Text>
						<Text style={styles.texto2}>8 minutes ago</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity>
					<View style={[styles.rectangle]} className='w-full'>
						<Text style={styles.texto1}>Transaction Completed</Text>
						<Text style={styles.texto2}>8 minutes ago</Text>
					</View>
				</TouchableOpacity>
			</View>
			
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	rectangle: {
		height: 81,
		backgroundColor: '#445BE6',
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,

	},
	texto1: {
		color: 'white',
		fontSize: 14,
		fontWeight: 'bold',
	},
	texto2: {
		color: 'white',
		fontSize: 8,
		fontWeight: 'medium',
	},
});