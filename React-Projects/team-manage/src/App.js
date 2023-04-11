import { useState } from 'react';
import './App.scss';
import AddTask from './Components/AddTask/AddTask';
import Header from './Components/Header/Header';
import Task from './Components/Tasks/Tasks';
import Teams from './Components/Teams/Teams';
import { initialValue } from './DataBase/TaskData';
import { teamMembers } from './DataBase/TaskData';
function App() {
	// point : initial State values
	const [members, setMembers] = useState([...teamMembers]);
	const [tasks, setTasks] = useState([...initialValue]);
	const [editedData, setEditedData] = useState('');

	const handleSetMembers = (data) => {
		// error const words = data.split(' ');
		// error setMembers([...members, ...words]);

		setMembers((prev) => [...prev, data]); ///:)

		// let oldData = [...members];
		// oldData.push(data);
		// setMembers(oldData);
	};

	const handleSetTasks = (task, type) => {
		if (type === 'Add') {
			let oldData = [...tasks];
			oldData.push(task);
			setTasks(oldData);
		} else if (type === 'Update') {
			let oldData = [...tasks];
			let index = oldData.findIndex((item) => item.id === task.id);
			oldData[index] = task;
			setTasks(oldData);
			setEditedData('');
		}
	};

	// console.log('task', tasks);
	// console.log(members);
	// console.log(tasks);

	const editEnable = (data) => {
		setEditedData(data);
		// console.log(editedData, 'clicked');
	};
	return (
		<div className='App'>
			<Header />

			<main className='layout'>
				<div className='sideBar'>
					<AddTask
						editedData={editedData}
						members={members}
						handleSetTasks={handleSetTasks}
					/>
					<Teams handleSetMembers={handleSetMembers} members={members} />
				</div>
				<div className='mainContent'>
					<Task editEnable={editEnable} tasks={tasks} />
				</div>
			</main>
		</div>
	);
}

export default App;
