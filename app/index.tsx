import { useStyles } from "@/hooks/useStyles";
import { Text, View, Button, TextInput } from "react-native";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const HomeScreen = () => {
	const handleCreateTodoList = () => {
		// Add logic here
	};

	const handleDeleteTodoList = (id: string) => {
		// Add logic here
	};

	const handleUpdateTodoListTitle = (id: string, newTitle: string) => {
		// Add logic here
	};

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
			<Text>Todo List Title Here</Text>
			<TextInput
				placeholder="Enter New Todo List Title"
				// Add the rest here
			/>
			<Button
				title="Create New To Do List"
				onPress={/*Add function here*/}
			/>
			<Button title="See Todos" onPress={/*Add routing here */} />
		</View>
	);
};

export default HomeScreen;
