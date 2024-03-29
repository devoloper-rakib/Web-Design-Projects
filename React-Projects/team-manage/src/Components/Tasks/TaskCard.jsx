import React from 'react';
import Button from '../Shared/UI/Button/Button';
import './task.scss';
const TaskCard = ({ task, editEnable, handleSetTasks }) => {
	// console.log(task);
	const { taskName, category, teamMember, status, deadLine } = task;
	// console.log(taskName, category, teamMember, status);

	return (
		<div className='taskCard'>
			{/* <p>this is unit test </p>
			<h4>Category</h4>
			<h4>Rakib Hasan</h4>
			<h4>DeadLine : 5-3-3</h4>
			<Button label='Edit' />
			<Button label='Complete' /> */}

			<p>{taskName} </p>
			<h4>
				Category : <span>{category}</span>{' '}
			</h4>
			<h4> {teamMember} </h4>
			<h4>
				DeadLine : <span>{deadLine}</span>
			</h4>
			<Button onClick={() => editEnable(task)} label='Edit' />

			{task.status === 'Pending' && (
				<Button
					onClick={() => handleSetTasks(task, 'Completed')}
					label='Completed'
				/>
			)}
		</div>
	);
};

export default TaskCard;
