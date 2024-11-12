import cn from 'classnames';
import { ButtonProps } from './Button.props';
import styles from './Button.module.scss';

export const Button = ({
	size = 'l',
	type,
	children,
	className,
	...props
}: ButtonProps) => {
	const buttonStyles = cn(
		styles.button,
		{
			[styles.button_size_l]: size === 'l',
			[styles.button_size_s]: size === 's',
			[styles.button_size_m]: size === 'm',
			[styles.button_type_primary]: type === 'primary'
		},
		className
	);

	return (
		<button {...props} className={buttonStyles}>
			{children}
		</button>
	);
};
