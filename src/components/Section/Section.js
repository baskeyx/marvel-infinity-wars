import styles from './Section.module.scss';

const Section = ({ children }) => (
  <section className={styles.Section}>
    {children}
  </section>
);

export default Section;
