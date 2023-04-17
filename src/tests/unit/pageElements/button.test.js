import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../pageElements/Button'

// Tests render of a button and its dynamic behavior
test('Button renders with label text and clicks', async () => {
     const handleClick = jest.fn();
     render(<Button onClick={handleClick} labelText="Add Vehicle"/>)
     const somebuttonText = screen.getByText(/Add Vehicle/i);
     await expect(somebuttonText).toBeInTheDocument();
     fireEvent.click(screen.getByText(/Add Vehicle/i))
     expect(handleClick).toHaveBeenCalledTimes(1)
});
