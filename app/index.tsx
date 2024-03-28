import { useStyles } from "@/hooks/useStyles";
import { Text, View, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const HomeScreen = () => {
	// styles
	const styles = useStyles({
		container: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: Colors.blue,
		},
		title: {
			main: {
				fontSize: 100,
				color: Colors.white,
			},
			phoneSm: {
				fontSize: 15,
			},
			phone: {
				fontSize: 25,
			},
			tablet: {
				fontSize: 50,
			},
		},
	});

	return (
		<View style={styles.container}>
			<Pressable onPress={() => router.push("/screens/HomeScreen")}>
				<Text>HomeScreen</Text>
			</Pressable>
			<Pressable onPress={() => router.push("/screens/ToDoList")}>
				<Text>ToDoList</Text>
			</Pressable>
		</View>
	);
};

export default HomeScreen;
