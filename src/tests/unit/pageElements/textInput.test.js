
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import TextInput from '../../../pageElements/textInput';

// Tests render of a text input and its dynamic behavior
test('TextInoput renders with placeolder text and diplays inputted values', async () => {
     render(<TextInput placeholder="Model" />)
     const makeInput = screen.getByPlaceholderText("Model");
     await userEvent.type(makeInput, "Ford");
     expect(makeInput.value).toBe("Ford")
});