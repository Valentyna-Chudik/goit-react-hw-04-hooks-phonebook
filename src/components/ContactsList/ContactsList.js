import PropTypes from 'prop-types';

import styles from './ContactsList.module.css';

export default function ContactsList({ contacts, onDeleteContact }) {
  return (
    <ul className={styles.contactsList}>
      {contacts.map(({ id, name, number }) => (
        <li className={styles.contactsItem} key={id}>
          <p className={styles.contactName}>
            {name}: {number}
          </p>
          <button
            className={styles.buttonDelete}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
