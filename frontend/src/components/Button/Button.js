import styles from './Button.module.scss';

const Button = ({ theme, children, ...props }) => (
  <button className={`${styles.Button} ${styles[theme]}`} {...props}>
    {children}
  </button>
);

export default Button;
