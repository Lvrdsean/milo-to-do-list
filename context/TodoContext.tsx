import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// Interfaces for Task and TodoList
interface Task {
	id: string;
	title: string;
	complete: boolean;
}

interface TodoList {
	id: string;
	title: string;
	tasks: Task[];
}

// Interfaces for filtering options
interface TodoListFilterOptions {
	status: "all" | "complete" | "incomplete";
}

interface TaskFilterOptions {
	status: "all" | "complete" | "incomplete";
}

// Define the type for the context
interface TodoContextType {
	todoLists: TodoList[];
	addTodoList: (title: string, id: string) => void;
	deleteTodoList: (id: string) => void;
	updateTodoListTitle: (id: string, newTitle: string) => void;
	addTask: (listId: string, taskTitle: string) => void;
	deleteTask: (listId: string, taskId: string) => void;
	updateTaskTitle: (listId: string, taskId: string, newTitle: string) => void;
	toggleTaskStatus: (listId: string, taskId: string) => void;
	filterTodoList: (options: TodoListFilterOptions) => TodoList[];
	filterTask: (
		listId: string,
		options: TaskFilterOptions
	) => Task[] | undefined;
}

// Create the context
const TodoContext = createContext<TodoContextType>({
	todoLists: [],
	addTodoList: () => {},
	deleteTodoList: () => {},
	updateTodoListTitle: () => {},
	addTask: () => {},
	deleteTask: () => {},
	updateTaskTitle: () => {},
	toggleTaskStatus: () => {},
	filterTodoList: () => [],
	filterTask: () => undefined,
});

// Custom hook to use the context
export const useTodoContext = () => useContext(TodoContext);

// Define props for TodoContextProvider
interface TodoContextProviderProps {
	children: React.ReactNode;
}

// TodoContextProvider component to provide the context to its children
export const TodoContextProvider: React.FC<TodoContextProviderProps> = ({
	children,
}) => {
	// State to store the todo lists
	const [todoLists, setTodoLists] = useState<TodoList[]>([]);

	// Function to add a new todo list
	const addTodoList = (title: string, id: string) => {
		const newTodoList: TodoList = {
			id,
			title,
			tasks: [],
		};
		setTodoLists([...todoLists, newTodoList]);
	};

	// Function to delete a todo list
	const deleteTodoList = (id: string) => {
		setTodoLists(todoLists.filter((todoList) => todoList.id !== id));
	};

	// Function to update the title of a todo list
	const updateTodoListTitle = (id: string, newTitle: string) => {
		setTodoLists(
			todoLists.map((todoList) =>
				todoList.id === id ? { ...todoList, title: newTitle } : todoList
			)
		);
	};

	// Function to filter todo lists based on status
	const filterTodoList = ({ status }: TodoListFilterOptions): TodoList[] => {
		switch (status) {
			case "all":
				return todoLists;
			case "complete":
				return todoLists.filter((todoList) =>
					todoList.tasks.every((task) => task.complete)
				);
			case "incomplete":
				return todoLists.filter((todoList) =>
					todoList.tasks.some((task) => !task.complete)
				);
			default:
				return todoLists;
		}
	};

	// Function to add a task to a todo list
	const addTask = (listId: string, taskTitle: string) => {
		const newTask: Task = {
			id: uuidv4(),
			title: taskTitle,
			complete: false,
		};
		setTodoLists(
			todoLists.map((todoList) =>
				todoList.id === listId
					? { ...todoList, tasks: [...todoList.tasks, newTask] }
					: todoList
			)
		);
	};

	// Function to delete a task from a todo list
	const deleteTask = (listId: string, taskId: string) => {
		setTodoLists(
			todoLists.map((todoList) =>
				todoList.id === listId
					? {
							...todoList,
							tasks: todoList.tasks.filter(
								(task) => task.id !== taskId
							),
					  }
					: todoList
			)
		);
	};

	// Function to update the title of a task
	const updateTaskTitle = (
		listId: string,
		taskId: string,
		newTitle: string
	) => {
		setTodoLists(
			todoLists.map((todoList) =>
				todoList.id === listId
					? {
							...todoList,
							tasks: todoList.tasks.map((task) =>
								task.id === taskId
									? { ...task, title: newTitle }
									: task
							),
					  }
					: todoList
			)
		);
	};

	// Function to toggle the status (complete/incomplete) of a task
	const toggleTaskStatus = (listId: string, taskId: string) => {
		setTodoLists(
			todoLists.map((todoList) =>
				todoList.id === listId
					? {
							...todoList,
							tasks: todoList.tasks.map((task) =>
								task.id === taskId
									? { ...task, complete: !task.complete }
									: task
							),
					  }
					: todoList
			)
		);
	};

	// Function to filter tasks based on status
	const filterTask = (
		listId: string,
		{ status }: TaskFilterOptions
	): Task[] | undefined => {
		const todoList = todoLists.find((todoList) => todoList.id === listId);
		if (!todoList) return undefined;

		switch (status) {
			case "all":
				return todoList.tasks;
			case "complete":
				return todoList.tasks.filter((task) => task.complete);
			case "incomplete":
				return todoList.tasks.filter((task) => !task.complete);
			default:
				return todoList.tasks;
		}
	};

	// Value to be provided by the context
	const value: TodoContextType = {
		todoLists,
		addTodoList,
		deleteTodoList,
		updateTodoListTitle,
		addTask,
		deleteTask,
		updateTaskTitle,
		toggleTaskStatus,
		filterTodoList,
		filterTask,
	};

	// Provide the context to its children
	return (
		<TodoContext.Provider value={value}>{children}</TodoContext.Provider>
	);
};
