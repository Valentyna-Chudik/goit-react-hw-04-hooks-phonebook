import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Form.module.css';

export default class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    name: PropTypes.string,
    number: PropTypes.string,
  };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { name, number } = this.state;

    e.preventDefault();
    this.props.onSubmit(name, number);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label className={styles.label}>
          <span className={styles.inputName}>Name</span>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={this.handleInputChange}
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
            onChange={this.handleInputChange}
          ></input>
        </label>
        <button className={styles.buttonAdd} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
