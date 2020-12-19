import PropTypes from 'prop-types';

import styles from './Filter.module.css';

export default function Filter({ value, onChange }) {
  return (
    <label className={styles.label}>
      <span className={styles.labelName}>Find contacts by name</span>
      <input
        className={styles.input}
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
