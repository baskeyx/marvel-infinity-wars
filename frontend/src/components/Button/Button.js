import styles from './Button.module.scss';

const Button = ({ children, ...props }) => (
  <button className={styles.Button} {...props}>
    {children}
  </button>
);

export default Button;
