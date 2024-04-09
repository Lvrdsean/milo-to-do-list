import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

interface TodoListFilterOptions {
	status: "all" | "complete" | "incomplete";
}

interface TaskFilterOptions {
	status: "all" | "complete" | "incomplete";
}

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

export const useTodoContext = () => useContext(TodoContext);

interface TodoContextProviderProps {
	children: React.ReactNode;
}

export const TodoContextProvider: React.FC<TodoContextProviderProps> = ({
	children,
}) => {
	const [todoLists, setTodoLists] = useState<TodoList[]>([]);

	const addTodoList = (title: string, id: string) => {
		const newTodoList: TodoList = {
			id,
			title,
			tasks: [],
		};
		setTodoLists([...todoLists, newTodoList]);
	};

	const deleteTodoList = (id: string) => {
		setTodoLists(todoLists.filter((todoList) => todoList.id !== id));
	};

	const updateTodoListTitle = (id: string, newTitle: string) => {
		setTodoLists(
			todoLists.map((todoList) =>
				todoList.id === id ? { ...todoList, title: newTitle } : todoList
			)
		);
	};

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

	return (
		<TodoContext.Provider value={value}>{children}</TodoContext.Provider>
	);
};
