import React from 'react';

const Button = (props) => {
	const { className, variant, color, onClick, labelText } = props
	return (
		<button
			className={className}
			variant={variant}
			color={color}
			onClick={onClick}
		>
			{labelText}
		</button>
	)
}

export default Button;