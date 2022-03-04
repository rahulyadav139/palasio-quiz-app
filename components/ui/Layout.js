import styles from './Layout.module.css';

const Layout = props => {
  return <main className={`${styles.main} shadow`}>{props.children}</main>;
};
export default Layout;
