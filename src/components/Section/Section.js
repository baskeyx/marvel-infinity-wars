import styles from './Section';

const Section = ({ children }) => (
  <section className={styles.Section}>
    {children}
  </section>
);

export default Section;
