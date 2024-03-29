import React from 'react';
import './history.scss';
import HistoryList from './HistoryList';
const History = ({ transaction }) => {
	return (
		<div className='history'>
			<h2>transaction History</h2>

			<ul className='historyList'>
				{/* <li className='income'>transaction - 5/03/2023 - $5000</li> */}

				{transaction.map((money, index) => {
					return (
						<HistoryList
							key={index}
							type={money.type}
							name={money.name}
							amount={money.amount}
							date={money.date}
						/>
					);
				})}

				{/* <HistoryList
					type={'expense'}
					name={'electricity bill'}
					amount={500}
					date={new Date().toDateString()}
				/>
				<HistoryList
					type={'income'}
					name={'by begging'}
					amount={5000}
					date={new Date().toDateString()}
				/> */}
			</ul>
		</div>
	);
};

export default History;
