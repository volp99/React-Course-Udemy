import React, {useState} from 'react';
import Card from '../UI/Card';
import './Expenses.css';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';

const Expenses = (props) => {
	const [filterYear, setFilterYear] = useState('2020')

	const filterChangeHandler = selectedYear => {
		setFilterYear(selectedYear)
	}

	const filteredExpenses = props.items.filter(expense => {
		return expense.date.getFullYear().toString() === filterYear;
	})


	return (
		<div>
			<Card className="expenses">
				<ExpensesFilter selected={filterYear} onChangeFilter={filterChangeHandler}/>
				<ExpensesChart expenses={filteredExpenses}/>
				<ExpensesList items={filteredExpenses}/>
			</Card>
		</div>
	)

}

export default Expenses;