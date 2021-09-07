import React, { useEffect } from "react";
import ToDoList from "./todolist.jsx";

//create your first component
const Home = () => {
	return (
		<div className="text-center mt-5">
			<ToDoList />
		</div>
	);
};

export default Home;
