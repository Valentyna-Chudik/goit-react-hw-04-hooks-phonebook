import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Container from './components/Container/Container';
import Section from './components/Section/Section';
import Form from './components/Form/Form';
import Filter from './components/Filter/Filter';
import ContactsList from './components/ContactsList/ContactsList';
import useLocalStorage from './hooks/useLocalStorage';
import defContacts from './data/contacts.json';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', defContacts);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
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
      setContacts(prevContacts => [contact, ...prevContacts]);
    }
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <Container>
      <Section title="Phonebook">
        <Form onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <ContactsList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </Section>
    </Container>
  );
}
