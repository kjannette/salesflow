import React from 'react';

const TextInput = (props) => {
	const { className, name, placeholder, value, onChange } = props
	return (
		<input
			className={className}
			name={name}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	)
}

export default TextInput