import styles from "./LoadingSpinner.module.css";

// Check https://loading.io/css for the source of this spinner.
const LoadingSpinner = () => {
  return (
    <div className={`${styles.lds}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
