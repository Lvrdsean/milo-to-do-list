import React, { useState } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTodoContext } from "@/context/TodoContext";
import { router } from "expo-router";

const TodoListScreen: React.FC = () => {
	const id = useLocalSearchParams<{ id?: string }>().id;
	const {
		todoLists,
		addTask,
		deleteTask,
		updateTaskTitle,
		toggleTaskStatus,
	} = useTodoContext();
	const [newTaskTitle, setNewTaskTitle] = useState<string>("");
	const [showCompleted, setShowCompleted] = useState<boolean | null>(null); // Use null to indicate no filter applied

	const todoList = todoLists.find((todoList) => todoList.id === id);

	if (!todoList) {
		return <Text>Todo list not found</Text>;
	}

	const handleAddTask = () => {
		if (typeof id === "string" && newTaskTitle.trim() !== "") {
			addTask(id, newTaskTitle.trim());
			setNewTaskTitle("");
		} else {
			console.error("No ID provided for adding task");
		}
	};

	const handleDeleteTask = (taskId: string) => {
		deleteTask(todoList.id, taskId);
	};

	const handleUpdateTask = (taskId: string, newTitle: string) => {
		updateTaskTitle(todoList.id, taskId, newTitle);
	};

	const handleToggleTaskStatus = (taskId: string) => {
		toggleTaskStatus(todoList.id, taskId);
	};

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
