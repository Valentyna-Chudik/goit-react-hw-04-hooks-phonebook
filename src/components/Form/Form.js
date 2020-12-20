import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.css';

export default function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        <span className={styles.inputName}>Name</span>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleInputChange}
        ></input>
      </label>
      <label className={styles.label}>
        <span className={styles.inputName}>Number</span>
        <input
          className={styles.input}
          type="tel"
          name="number"
          placeholder="Number"
          value={number}
          onChange={handleInputChange}
        ></input>
      </label>
      <button className={styles.buttonAdd} type="submit">
        Add contact
      </button>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
