import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';
import { nanoid } from '../../node_modules/nanoid/index';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else {
      this.setState({
        contacts: [...this.state.contacts, { id: nanoid(), name, number }],
      });
      form.reset();
    }
  };

  handleChange = key => {
    this.setState({
      [key.target.name]: key.target.value,
    });
  };

  handleFilter = e => {
    const filter = e.currentTarget.value;
    this.setState({ filter: filter });
  };

  handleDelete = id => {
    const deletedContact = this.state.contacts.find(
      contact => contact.id === id
    );

    const deletedContactIndex = this.state.contacts.indexOf(deletedContact);

    this.state.contacts.splice(deletedContactIndex, 1);
    this.setState({
      contacts: this.state.contacts,
    });
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div style={{ marginLeft: 10 }}>
        <h1>Phonebook</h1>
        <ContactForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />

        <h2>Contacts</h2>
        <Filter handleFilter={this.handleFilter} />
        <ContactList
          contacts={contacts}
          filter={filter}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
};
