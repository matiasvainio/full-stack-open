import React, { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");

    const addName = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
        };

        const alreadyOnList = persons.find((o) => o.name === newName);
        console.log(alreadyOnList);

        if (alreadyOnList === undefined) {
            setPersons(persons.concat(personObject));
            setNewName("");
        } else {
            alert(`${newName} is already on the list`);
        }
    };

    const handlePersonChange = (event) => {
        // console.log(event.target.value);
        setNewName(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addName}>
                <div>
                    name:{" "}
                    <input value={newName} onChange={handlePersonChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {persons.map((person, i) => {
                    return <li key={i}>{person.name}</li>;
                })}
            </ul>
        </div>
    );
};

export default App;
