import { useStyles } from "@/hooks/useStyles";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { useTodoContext } from "@/context/TodoContext";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "expo-router";

// Defining the HomeScreen component
const HomeScreen: React.FC = () => {
	const router = useRouter(); // Initializing useRouter for navigation
	const { todoLists, addTodoList, deleteTodoList, updateTodoListTitle } =
		useTodoContext();
	const [newTitle, setNewTitle] = useState<string>("");

	// Function to handle creation of a new todo list
	const handleCreateTodoList = () => {
		if (newTitle.trim() !== "") {
			// Check if newTitle is not empty
			const id = uuidv4(); // Generate unique ID
			addTodoList(newTitle.trim(), id); // Add new todo list with trimmed title and generated ID
			setNewTitle(""); // Clear newTitle after adding todo list
		}
	};

	// Function to handle deletion of a todo list
	const handleDeleteTodoList = (id: string) => {
		deleteTodoList(id);
	};

	// Function to navigate to TodoListScreen with the selected todo list's ID
	const handleTodoListPress = (id: string) => {
		router.navigate(`/screens/todolist/${id}`);
	};

	// Styles
	const styles = useStyles({
		container: {
			flex: 1,
			backgroundColor: Colors.blue2,
		},
		container2: {
			flex: 0.25,
			alignItems: "center",
		},
		container3: {
			flex: 0.13,
			alignItems: "center",
			paddingHorizontal: 4,
		},
		container4: {
			flex: 10,
			paddingTop: 14,
		},
		container5: {
			flex: 10,
			paddingTop: 50,
			alignItems: "center",
		},
		title: {
			main: {
				fontSize: 100,
				color: Colors.black2,
				fontFamily: "RubikBold",
				textAlign: "center",
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
		header: {
			fontSize: 40,
			color: Colors.black2,
			fontFamily: "Roboto",
			fontWeight: "bold",
			textAlign: "center",
		},
		todolist: {
			fontSize: 40,
			color: Colors.black2,
			fontFamily: "Roboto",
			fontWeight: "bold",
			paddingVertical: 3,
			textAlign: "center",
		},
		todolist2: {
			fontSize: 40,
			color: Colors.black2,
			fontFamily: "Roboto",
			fontWeight: "bold",
			paddingVertical: 6,
			textAlign: "center",
		},
		border: {
			borderColor: Colors.black2,
			borderWidth: 2,
			borderRadius: 4,
		},
		button: {
			paddingVertical: 9,
			paddingHorizontal: 24,
			borderRadius: 10,
			elevation: 3,
			backgroundColor: Colors.green,
		},
		button2: {
			alignItems: "center",
			paddingVertical: 9,
			paddingHorizontal: 24,
			borderRadius: 10,
			elevation: 3,
			backgroundColor: Colors.red2,
		},
		button3: {
			alignItems: "center",
			paddingVertical: 9,
			paddingHorizontal: 24,
			borderRadius: 10,
			elevation: 3,
			backgroundColor: Colors.gray,
		},
		btntext: {
			fontSize: 25,
			color: Colors.blue2,
			fontFamily: "Roboto-Regular.ttf",
		},
	});

	return (
		<View style={styles.container}>
			<View style={styles.container2}>
				<Text style={styles.title} selectable={false}>
					Welcome to Sean's ToDoList App!
				</Text>
			</View>
			<View>
				<View style={styles.container3}>
					<View style={styles.border}>
						<TextInput
							placeholder="Todo List Title"
							value={newTitle}
							onChangeText={(text) => setNewTitle(text)}
							style={styles.todolist}
						/>
					</View>
					<View style={styles.container4}>
						<Pressable
							style={styles.button}
							onPress={handleCreateTodoList}
						>
							<Text style={styles.btntext} selectable={false}>
								Create New To Do List
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
			<ScrollView>
				<View style={styles.container5}>
					{todoLists.map((todoList) => (
						<View key={todoList.id}>
							<Text style={styles.todolist2} selectable={false}>
								{todoList.title}
							</Text>
							<Pressable
								style={styles.button3}
								onPress={() => handleTodoListPress(todoList.id)}
							>
								<Text style={styles.btntext} selectable={false}>
									See Todos
								</Text>
							</Pressable>
							<Pressable
								style={styles.button2}
								onPress={() =>
									handleDeleteTodoList(todoList.id)
								}
							>
								<Text style={styles.btntext} selectable={false}>
									Delete
								</Text>
							</Pressable>
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default HomeScreen;
