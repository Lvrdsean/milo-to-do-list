import { useStyles } from "@/hooks/useStyles";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
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

	// Styles
	const styles = useStyles({
		container: {
			flex: 1,
			backgroundColor: Colors.blue2,
		},
		container2: {
			alignItems: "center",
		},
		container3: {
			flex: 0.25,
			alignItems: "center",
			justifyContent: "space-around",
			flexDirection: "row",
		},
		container4: {
			flex: 0.13,
			alignItems: "center",
			paddingHorizontal: 4,
		},
		container5: {
			alignItems: "center",
		},
		container6: {
			flex: 10,
			paddingTop: 50,
			alignItems: "center",
		},
		container7: {
			flex: 10,
			paddingTop: 50,
			position: "absolute",
			bottom: -575,
			right: 10,
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
		},
		task: {
			fontSize: 40,
			color: Colors.black2,
			fontFamily: "Roboto",
			fontWeight: "bold",
			paddingVertical: 3,
			textAlign: "center",
		},
		task2: {
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
		btntext: {
			fontSize: 25,
			color: Colors.blue2,
			fontFamily: "Roboto-Regular.ttf",
		},
		button: {
			alignItems: "center",
			paddingVertical: 9,
			paddingHorizontal: 24,
			borderRadius: 4,
			elevation: 3,
			backgroundColor: Colors.green,
		},
		button2: {
			alignItems: "center",
			paddingVertical: 9,
			paddingHorizontal: 24,
			borderRadius: 4,
			elevation: 3,
			backgroundColor: Colors.purple2,
		},
		button3: {
			alignItems: "center",
			paddingVertical: 9,
			paddingHorizontal: 24,
			borderRadius: 4,
			elevation: 3,
			backgroundColor: Colors.red2,
		},
		button4: {
			alignItems: "center",
			paddingVertical: 9,
			paddingHorizontal: 24,
			borderRadius: 4,
			elevation: 3,
			backgroundColor: Colors.blue3,
		},
		button5: {
			alignItems: "center",
			paddingVertical: 9,
			paddingHorizontal: 24,
			borderRadius: 4,
			elevation: 3,
			backgroundColor: Colors.gray,
		},
		button6: {
			alignItems: "center",
			paddingVertical: 9,
			paddingHorizontal: 24,
			borderRadius: 4,
			elevation: 3,
			backgroundColor: Colors.orange2,
		},
	});

	return (
		<View style={styles.container}>
			<View style={styles.container2}>
				<Text style={styles.title} selectable={false}>
					{todoList.title}
				</Text>
			</View>
			{/* Buttons to filter tasks */}
			<View style={styles.container3}>
				<Pressable
					style={styles.button6}
					onPress={() => handleFilterTask(null)}
				>
					<Text style={styles.btntext} selectable={false}>
						Show All Tasks
					</Text>
				</Pressable>
				<Pressable
					style={styles.button6}
					onPress={() => handleFilterTask(true)}
				>
					<Text style={styles.btntext} selectable={false}>
						Show Completed Tasks
					</Text>
				</Pressable>
				<Pressable
					style={styles.button6}
					onPress={() => handleFilterTask(false)}
				>
					<Text style={styles.btntext} selectable={false}>
						Show Incompleted Tasks
					</Text>
				</Pressable>
			</View>
			<View style={styles.container3}>
				<View style={styles.border}>
					<TextInput
						style={styles.task}
						placeholder="Enter Task Here"
						value={newTaskTitle}
						onChangeText={(text) => setNewTaskTitle(text)}
					/>
				</View>
			</View>
			<View style={styles.container5}>
				<Pressable style={styles.button} onPress={handleAddTask}>
					{" "}
					<Text style={styles.btntext} selectable={false}>
						Add Task
					</Text>
				</Pressable>
			</View>
			<ScrollView>
				<View style={styles.container6}>
					{todoList.tasks
						// Filter tasks based on completion status
						.filter((task) =>
							showCompleted === null
								? true
								: task.complete === showCompleted
						)
						.map((task) => (
							<View key={task.id}>
								<Text style={styles.task2} selectable={false}>
									{task.title}
								</Text>
								{/* Button to toggle task status (complete or incomplete) */}
								<Pressable
									style={styles.button2}
									onPress={() =>
										handleToggleTaskStatus(task.id)
									}
								>
									<Text
										style={styles.btntext}
										selectable={false}
									>
										{task.complete
											? "Mark Incomplete"
											: "Mark Complete"}
									</Text>
								</Pressable>
								{/* Button to update the task title */}
								<Pressable
									style={styles.button4}
									onPress={
										() =>
											handleUpdateTask(
												task.id,
												newTaskTitle
											) // Pass newTaskTitle as the new title
									}
								>
									<Text
										style={styles.btntext}
										selectable={false}
									>
										Update Task
									</Text>
								</Pressable>
								{/* Button to delete the task */}
								<Pressable
									style={styles.button3}
									onPress={() => handleDeleteTask(task.id)}
								>
									<Text
										style={styles.btntext}
										selectable={false}
									>
										Delete Task
									</Text>
								</Pressable>
							</View>
						))}
				</View>
				<View style={styles.container7}>
					{/* Button to navigate back */}
					<Pressable
						style={styles.button5}
						onPress={() => router.back()}
					>
						{" "}
						<Text style={styles.btntext} selectable={false}>
							Go Back
						</Text>
					</Pressable>
				</View>
			</ScrollView>
		</View>
	);
};

export default TodoListScreen;
