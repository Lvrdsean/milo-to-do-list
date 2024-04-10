import React, { useState } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTodoContext } from "@/context/TodoContext";
import { router } from "expo-router";

const TodoListScreen: React.FC = () => {
	// Get the ID of the todo list from local search params
	const id = useLocalSearchParams<{ id?: string }>().id;
	// Retrieve todo list related functions and data from context
	const {
		todoLists,
		addTask,
		deleteTask,
		updateTaskTitle,
		toggleTaskStatus,
	} = useTodoContext();

	// State to store the title of the new task
	const [newTaskTitle, setNewTaskTitle] = useState<string>("");

	// Find the todo list based on the ID provided
	const todoList = todoLists.find((todoList) => todoList.id === id);

	// If no todo list is found, display a message
	if (!todoList) {
		return <Text>Todo list not found</Text>;
	}

	// Function to handle adding a new task
	const handleAddTask = () => {
		if (typeof id === "string" && newTaskTitle.trim() !== "") {
			// Check if the ID is a valid string and the new task title is not empty
			addTask(id, newTaskTitle.trim());
			setNewTaskTitle(""); // Clear the TextInput field after adding a task
		} else {
			console.error("No ID provided for adding task");
		}
	};

	// Function to handle deleting a task
	const handleDeleteTask = (taskId: string) => {
		deleteTask(todoList.id, taskId);
	};

	// Function to handle updating a task title
	const handleUpdateTask = (taskId: string, newTitle: string) => {
		updateTaskTitle(todoList.id, taskId, newTitle);
	};

	// Function to handle toggling task status (complete or incomplete)
	const handleToggleTaskStatus = (taskId: string) => {
		toggleTaskStatus(todoList.id, taskId);
	};

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text>{todoList.title}</Text>
			{/* TextInput field to enter the title of the new task */}
			<TextInput
				placeholder="Enter New Task Title"
				value={newTaskTitle}
				onChangeText={(text) => setNewTaskTitle(text)} // Update newTaskTitle state with user input
			/>
			<Button title="Add Task" onPress={handleAddTask} />{" "}
			{/* Button to add a new task */}
			<Button title="Go Back" onPress={() => router.back()} />{" "}
			{/* Button to navigate back */}
			<ScrollView>
				<View>
					{/* Map through the tasks of the todo list and display each task */}
					{todoList.tasks.map((task) => (
						<View key={task.id}>
							<Text>{task.title}</Text>
							{/* Button to toggle task status (complete or incomplete) */}
							<Button
								title={
									task.complete
										? "Mark Incomplete"
										: "Mark Complete"
								}
								onPress={() => handleToggleTaskStatus(task.id)}
							/>
							{/* Button to delete the task */}
							<Button
								title="Delete Task"
								onPress={() => handleDeleteTask(task.id)}
							/>
							{/* Button to update the task title */}
							<Button
								title="Update Task"
								onPress={
									() =>
										handleUpdateTask(task.id, newTaskTitle) // Pass newTaskTitle as the new title
								}
							/>
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default TodoListScreen;
