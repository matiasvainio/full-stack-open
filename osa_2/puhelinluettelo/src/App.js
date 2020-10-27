import React, { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" },
    ]);
    const [newName, setNewName] = useState("");
    const [number, setNumber] = useState("");

    const addName = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: number,
        };

        const alreadyOnList = persons.find((o) => o.name === newName);

        if (alreadyOnList === undefined) {
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

    return (
        <div>
            <h2>Phonebook</h2>
            <h2>Search</h2>
            <div>
                filter shown with: <input onChange={handleFilter} />
            </div>
            <form onSubmit={addName}>
                <div>
                    <h2>Add a new</h2>
                    <div>
                        name:
                        <input value={newName} onChange={handlePersonChange} />
                    </div>
                    <div>
                        number:
                        <input value={number} onChange={handleNumberChange} />
                    </div>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <Person persons={persons} />
        </div>
    );
};

const Person = (props) => {
    const persons = props.persons;
    return (
        <ul>
            {persons.map((person, i) => {
                return (
                    <li key={i}>
                        {person.name} {person.number}
                    </li>
                );
            })}
        </ul>
    );
};

export default App;
