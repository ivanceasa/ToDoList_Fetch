import React, { useEffect, useState } from "react";

const ToDoList = () => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [taskExists, setTaskExists] = useState(false);

	useEffect(() => {
		let position = tasks.findIndex(task => task === newTask);
		if (position === -1) {
			setTaskExists(false);
		} else {
			setTaskExists(true);
		}
	}, [newTask]);

	async function getTodos() {
		let response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ivanceasa",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		let responseJson = await response.json();
		console.log(responseJson);
		let tasks = responseJson;
		return tasks;
	}

	useEffect(() => {
		getTodos();
	}, []);

	async function createTodos() {
		let response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ivanceasa",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			}
		);
		let responseJson = await response.json();
		console.log(responseJson);
	}

	async function updateTodos(tasks) {
		let response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ivanceasa",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(tasks)
			}
		);
		let responseJson = await response.json();
		console.log(responseJson);
	}

	useEffect(() => {
		updateTodos(tasks);
	}, [tasks]);

	async function deleteTodos() {
		let response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ivanceasa",
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		let responseJson = await response.json();
		console.log(responseJson);
		createTodos();
		setTasks([]);
	}

	const addNewTask = event => {
		if (event.key.toLowerCase() == "enter" && newTask !== "") {
			let position = tasks.findIndex(task => task === newTask);
			if (position === -1) {
				setTasks(tasks.concat(newTask));
				setNewTask("");
			}
		}
	};

	const deleteTask = index => {
		tasks.splice(index, 1);
		setTasks([...tasks]);
	};

	return (
		<div className="container">
			<h1>To Do List</h1>
			<div className="container-task">
				<input
					type="text"
					onChange={e => setNewTask(e.target.value)}
					value={newTask}
					onKeyUp={addNewTask}
					placeholder={
						tasks.length == 0
							? "No tasks, add new task"
							: "Add task"
					}
				/>
				<ul>
					{tasks.map((task, index) => (
						<li key={index}>
							<span>{task}</span>
							<span onClick={() => deleteTask(index)}>
								<i className="fas fa-times"></i>
							</span>
						</li>
					))}
				</ul>
				<p>{tasks.length + " item left"}</p>
				<p>
					<button onClick={deleteTodos}>Delete all tasks</button>
				</p>
			</div>
		</div>
	);
};

export default ToDoList;
