import React, { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "050 1234568" },
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
        console.log(alreadyOnList);

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

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
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
            <ul>
                {persons.map((person, i) => {
                    return (
                        <li key={i}>
                            {person.name} {person.number}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default App;
