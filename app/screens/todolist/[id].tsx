import { View, Text } from "react-native";

const TodoListScreen = () => {
	const handleAddTask = () => {
		// Add logic here
	};

	const handleDeleteTask = (taskId: string) => {
		// Add logic here
	};

	const handleUpdateTask = (taskId: string, newTitle: string) => {
		// Add logic here
	};
};

return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome to the ToDoList App!</Text>
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

export default TodoListScreen;
