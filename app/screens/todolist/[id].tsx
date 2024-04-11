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
		filterTask,
	} = useTodoContext();

	// State to store the title of the new task
	const [newTaskTitle, setNewTaskTitle] = useState<string>("");

	// State to manage whether to show completed tasks or not
	const [showCompleted, setShowCompleted] = useState<boolean | null>(null);

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

	// Function to handle filtering tasks based on completion status
	const handleFilterTask = (completed: boolean | null) => {
		setShowCompleted(completed);
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
			{/* Buttons to filter tasks */}
			<View style={{ flexDirection: "row" }}>
				<Button
					title="Show All Tasks"
					onPress={() => handleFilterTask(null)}
				/>
				<Button
					title="Show Completed Tasks"
					onPress={() => handleFilterTask(true)}
				/>
				<Button
					title="Show Incomplete Tasks"
					onPress={() => handleFilterTask(false)}
				/>
			</View>
			{/* TextInput to add new tasks */}
			<TextInput
				placeholder="Enter New Task Title"
				value={newTaskTitle}
				onChangeText={(text) => setNewTaskTitle(text)}
			/>
			<Button title="Add Task" onPress={handleAddTask} />
			<Button title="Go Back" onPress={() => router.back()} />
			<ScrollView>
				<View>
					{todoList.tasks
						// Filter tasks based on completion status
						.filter((task) =>
							showCompleted === null
								? true
								: task.complete === showCompleted
						)
						.map((task) => (
							<View key={task.id}>
								<Text>{task.title}</Text>
								<Button
									title={
										task.complete
											? "Mark Incomplete"
											: "Mark Complete"
									}
									onPress={() =>
										handleToggleTaskStatus(task.id)
									}
								/>
								<Button
									title="Delete Task"
									onPress={() => handleDeleteTask(task.id)}
								/>
								<Button
									title="Update Task"
									onPress={() =>
										handleUpdateTask(
											task.id,
											"Updated Title"
										)
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
