const {render, screen} = require('@testing-library/react');
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';

describe('Greetin component', () => {
	test('renders Hello World as a text', () => {
		// Arrange
		render(<Greeting/>)

		// Act
		// ... nothing now

		// Assert
		const helloWorldElement = screen.getByText('Hello World', {exact: false}) // se a false il test passerà comunque anche se il mio Hello World contiene '!'
		expect(helloWorldElement).toBeInTheDocument()
	})

	test('renders "good to se you" if the btn was NOT clicked', () => {
		render(<Greeting/>)
		const outputElement = screen.getByText(' good to see you', {exact: false}) // se a false il test passerà comunque anche se il mio Hello World contiene '!'
		expect(outputElement).toBeInTheDocument()
	})

	test('renders "Changed!" if the btn was clicked', () => {
		// Arrange
		render(<Greeting/>)
		// Act
		const buttonElement = screen.getByRole('button');
		userEvent.click(buttonElement)
		// Assert
		const outputElement = screen.getByText('Changed!')
		expect(outputElement).toBeInTheDocument()

	});

	test('does not render "good to see you" if the btn was clicked', () => {
		// Arrange
		render(<Greeting/>)
		// Act
		const buttonElement = screen.getByRole('button');
		userEvent.click(buttonElement)
		// Assert
		const outputElement = screen.queryByText('good to see you', {exact: false})
		expect(outputElement).toBeNull();
	})
})