import { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import Container from './components/Container/Container';
import Section from './components/Section/Section';
import Form from './components/Form/Form';
import Filter from './components/Filter/Filter';
import ContactsList from './components/ContactsList/ContactsList';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
      }),
    ),
    filter: PropTypes.string,
  };

  addContact = (name, number) => {
    const { contacts } = this.state;

    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    if (name.trim() === '' || number.trim() === '') {
      alert(`All fields must be completed.`);
    } else if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.number === number)) {
      alert(`${number} is already in contacts.`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <Container>
          <Section title="Phonebook">
            <Form onSubmit={this.addContact} />
          </Section>
          <Section title="Contacts">
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactsList
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          </Section>
        </Container>
      </div>
    );
  }
}
