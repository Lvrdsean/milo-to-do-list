import { useStyles } from "@/hooks/useStyles";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import { useTodoContext } from "@/context/TodoContext";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "expo-router";

const HomeScreen: React.FC = () => {
	const router = useRouter(); // Initialize useRouter
	const { todoLists, addTodoList, deleteTodoList, updateTodoListTitle } =
		useTodoContext();
	const [newTitle, setNewTitle] = useState<string>("");

	const handleCreateTodoList = () => {
		if (newTitle.trim() !== "") {
			const id = uuidv4(); // Generate unique ID
			addTodoList(newTitle.trim(), id); // Add new todo list
			setNewTitle("");
		}
	};

	const handleDeleteTodoList = (id: string) => {
		deleteTodoList(id);
	};

	const handleUpdateTodoListTitle = (id: string, newTitle: string) => {
		updateTodoListTitle(id, newTitle);
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
			<Text style={styles.title}>Welcome to the ToDoList App!</Text>
			<TextInput
				placeholder="Enter New Todo List Title"
				value={newTitle}
				onChangeText={(text) => setNewTitle(text)}
				style={styles.header}
			/>
			<Button
				title="Create New To Do List"
				onPress={handleCreateTodoList}
			/>
			<ScrollView>
				<View>
					{todoLists.map((todoList) => (
						<View key={todoList.id}>
							<Text>{todoList.title}</Text>
							<Button
								title="Delete"
								onPress={() =>
									handleDeleteTodoList(todoList.id)
								}
							/>
							<Button
								title="Update Title"
								onPress={() =>
									handleUpdateTodoListTitle(
										todoList.id,
										"New Title"
									)
								}
							/>
							<Button
								title="See Todos"
								onPress={
									{
										/*Add routing here */
									}
								}
							/>
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default HomeScreen;
