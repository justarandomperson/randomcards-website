import { useEffect, useRef, useState } from 'react';
import styles from './Card.module.css'

interface StatValueProps {
    value: number;
    className?: string;
}

const StatValue: React.FC<StatValueProps> = ({ value, className }) => {
    const previousValue = useRef(value);
    const [animation, setAnimation] = useState('');

    useEffect(() => {
        if (value !== previousValue.current) {
            setAnimation(value > previousValue.current ? 'increase' : 'decrease');
            previousValue.current = value;

            const timeout = setTimeout(() => setAnimation(''), 500);
            return () => clearTimeout(timeout);
        }
    }, [value]);

    return (
        <span className={`${className} ${styles[animation]}`}>
            {value}
        </span>
    );
}

export default StatValue