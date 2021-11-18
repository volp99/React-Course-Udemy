const {render, screen} = require('@testing-library/react');
import Async from './Async';

describe('Async component', () => {
	test('render posts if request succeds', async () => {
		// overwrite fecth - Simulo il test per la chiamata fecth
		window.fetch = jest.fn();
		window.fetch.mockResolvedValueOnce({
			json: async () => [{id: 'p1', title: 'First post'}],
		})
		render(<Async/>)
		const listItemElements = await screen.findAllByRole('listitem') // return a promise
		expect(listItemElements).not.toHaveLength(0)
	})
})