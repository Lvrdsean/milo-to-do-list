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

interface TodoContextType {
	todoLists: TodoList[];
	addTodoList: (title: string, id: string) => void;
	deleteTodoList: (id: string) => void;
	updateTodoListTitle: (id: string, newTitle: string) => void;
	addTask: (listId: string, taskTitle: string) => void;
	deleteTask: (listId: string, taskId: string) => void;
	updateTaskTitle: (listId: string, taskId: string, newTitle: string) => void;
}

const TodoContext = createContext<TodoContextType>({
	todoLists: [],
	addTodoList: () => {},
	deleteTodoList: () => {},
	updateTodoListTitle: () => {},
	addTask: () => {},
	deleteTask: () => {},
	updateTaskTitle: () => {},
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

	const value: TodoContextType = {
		todoLists,
		addTodoList,
		deleteTodoList,
		updateTodoListTitle,
		addTask,
		deleteTask,
		updateTaskTitle,
	};

	return (
		<TodoContext.Provider value={value}>{children}</TodoContext.Provider>
	);
};
