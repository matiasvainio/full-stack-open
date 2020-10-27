import React from "react";

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

export default Person;
