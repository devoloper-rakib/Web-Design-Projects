import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from '../Shared/UI/Button/Button';
import InputBox from '../Shared/UI/InputBOx/InputBox';
import './addTask.scss';
import { v4 as uuidv4 } from 'uuid';

const init = {
	taskName: '',
	category: '', /// unit test
	teamMember: '', /// Rakib Hasan
	deadLine: '', /// 2023-04-03
	status: 'Pending', /// it depends on status ( Completed ,Pending)
};

const AddTask = ({ members, handleSetTasks, editedData }) => {
	const [data, setData] = useState({ ...init });
	const [buttonLabel, setButtonLabel] = useState('Add');

	const handleChange = (e) => {
		const { name, value } = e.target;
		let oldData = { ...data };

		oldData[name] = value;
		setData(oldData);
		// console.log(data); /// showing the onchange event
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const { taskName, category, teamMember, deadLine } = data;

		if (!taskName || !category || !teamMember || !deadLine) {
			alert('Please fill up all the fields or try again');
			return;
		}

		if (editedData !== '') {
			handleSetTasks(data, 'Update');
			setData(init);
			setButtonLabel('Add');
		} else {
			let newDateWithId = { ...data, id: uuidv4() };
			handleSetTasks(newDateWithId, 'Add');
			setData(init);
		}
	};

	useEffect(() => {
		if (editedData !== '') {
			setData({ ...editedData });
			setButtonLabel('Update');
		}
	}, [editedData]);

	// console.log(editedData);
	// console.log(data.teamMember);
	// console.log(members);

	return (
		<div className='addTaskMain'>
			<h1>{buttonLabel}</h1>
			<form onSubmit={handleSubmit} className='taskForm'>
				<InputBox
					name='taskName'
					placeholder='Task Name'
					value={data.taskName}
					onChange={handleChange}
				/>
				<select name='category' onChange={handleChange} value={data.category}>
					<option value='none'>Select Category</option>
					<option value='Unit-Test'>Unit Test</option>
					<option value='Front-End'>Front-End</option>
					<option value='Back-End'>Back-End</option>
				</select>
				<select
					name='teamMember'
					onChange={handleChange}
					value={data.teamMember || ''}
				>
					<option value='none'>Select Team</option>

					{members.map((member, id) => (
						<option key={id} value={member.toString()}>
							{member}
						</option>
					))}
				</select>
				<InputBox
					name='deadLine'
					onChange={handleChange}
					type='date'
					value={data.deadLine}
				/>
				<Button label={buttonLabel} type='submit' />
			</form>
		</div>
	);
};

export default AddTask;
