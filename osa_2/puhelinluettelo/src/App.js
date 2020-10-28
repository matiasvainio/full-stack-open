import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [number, setNumber] = useState("");

    useEffect(() => {
        personService.getAll().then((returnedPersons) => {
            setPersons(returnedPersons);
        });
    }, []);

    const addName = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: number,
        };

        const alreadyOnList = persons.find((o) => o.name === newName);

        if (alreadyOnList === undefined) {
            personService.create(personObject).then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson));
            });
            setPersons(persons.concat(personObject));
            setNewName("");
            setNumber("");
        } else {
            alert(`${newName} is already on the list`);
        }
    };

    const handlePersonChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };

    const handleFilter = (event) => {
        setPersons(filterPersons(persons, event.target.value));
    };

    const filterPersons = (persons, f) => {
        return persons.filter((person) => person.name.includes(f));
    };

    const deletePerson = (id) => {
        personService.remove(id).then(() => {
            personService.getAll().then((returnedPersons) => {
                setPersons(returnedPersons);
            });
        });
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <h2>Search</h2>
            <Filter onChange={handleFilter} />
            <form onSubmit={addName}>
                <div>
                    <h2>Add a new</h2>
                    <PersonForm
                        name={newName}
                        number={number}
                        personChange={handlePersonChange}
                        numberChange={handleNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <Person persons={persons} deletePerson={deletePerson} />
        </div>
    );
};

export default App;
