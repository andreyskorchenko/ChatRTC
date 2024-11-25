import cn from 'classnames';
import { CSSProperties } from 'react';
import { IconProps } from './Icon.props';
import styles from './Icon.module.scss';

export const Icon = ({ name, size, className }: IconProps) => {
	const iconStyless = cn(styles.icon, className);

	const style: CSSProperties = {
		width: `${size}px`,
		height: `${size}px`,
		maskImage: `url(/assets/icons/${name}.svg)`
	};

	return <i className={iconStyless} style={style} />;
};
