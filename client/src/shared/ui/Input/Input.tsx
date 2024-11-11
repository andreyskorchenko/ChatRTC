import { useState } from 'react';
import cn from 'classnames';
import { InputProps } from './Input.props';
import styles from './Input.module.scss';

export const Input = ({ size = 'l', ...props }: InputProps) => {
	const [isFocus, setIsFocus] = useState(false);

	const inputStyles = cn(
		styles.input,
		{
			[styles.input_focus]: isFocus
		},
		{
			[styles.input_size_l]: size === 'l',
			[styles.input_size_s]: size === 's',
			[styles.input_size_m]: size === 'm'
		}
	);

	return (
		<div className={inputStyles}>
			<input
				{...props}
				data-testid="input"
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
			/>
		</div>
	);
};
