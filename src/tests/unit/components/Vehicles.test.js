import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Vehicles from '../../../components/Vehicles'

// Test renders a child compoennt
test('Renders the Vehicles Component And Its Elements', () => {
     const vehicleComponent = render(<Vehicles />)
     const allHeadings = screen.getAllByRole("heading");
     expect(allHeadings).toHaveLength(3);
   
     const allInputs = screen.getAllByRole("textbox");
     expect(allInputs).toHaveLength(9);
   
     const allButtons = screen.getAllByRole("button");
     expect(allButtons).toHaveLength(2);
   
     const someHeadingText = screen.getByText(/Add New Vehicle/i);
     expect(someHeadingText).toBeInTheDocument();
   
     const somebuttonText = screen.getByText(/Add Vehicle/i);
     expect(somebuttonText).toBeInTheDocument();
   });