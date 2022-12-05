import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { Container } from './Container/Container';
import { GlobalStyle } from './GlobalStyle';

export class App extends Component {
  static propTypes = {};

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  addContact = (name, number) => {
    const contactsNames = this.state.contacts.map(contact =>
      contact.name.toLowerCase()
    );

    if (!contactsNames.includes(name.toLowerCase())) {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, { id: nanoid(), name, number }],
      }));
    } else {
      alert(`${name} is already in contacts`);
    }
  };
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
    console.log(id);
  };
  filterByName = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };
  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.filterByName();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact}></ContactForm>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter}></Filter>
        {contacts.length > 0 && (
          <ContactList
            items={filter ? filteredContacts : contacts}
            onDeleteContact={this.deleteContact}
          ></ContactList>
        )}

        <GlobalStyle></GlobalStyle>
      </Container>
    );
  }
}
