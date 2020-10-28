import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get("http://restcountries.eu/rest/v2/all").then((response) => {
            setCountries(response.data);
        });
    }, []);

    const handleSearch = (event) => {
        setCountries(filterCountries(countries, event.target.value));
    };

    const filterCountries = (countries, c) => {
        return countries.filter((country) => country.name.includes(c));
    };

    return (
        <div>
            <div>
                find countries
                <input onChange={handleSearch} />
                <Countries countries={countries} />
            </div>
        </div>
    );
}

const Countries = (props) => {
    const countries = props.countries;
    const [newCountry, setNewCountry] = useState("");

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter.</p>;
    } else if (countries.length === 1) {
        return <Country country={countries[0]} />;
    } else if (newCountry !== "") {
        return <Country country={newCountry} />;
    }
    return (
        <ul>
            {countries.map((c, i) => {
                return (
                    <li key={i}>
                        {c.name}{" "}
                        <button onClick={() => setNewCountry(c)}>show</button>
                    </li>
                );
            })}
        </ul>
    );
};

const Country = (props) => {
    const country = props.country;

    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map((lan, i) => (
                    <li key={i}>{lan.name} </li>
                ))}
            </ul>
            <img alt="flag" src={country.flag} width="200" height="auto" />
            <h2>Weather in {country.capital}</h2>
            <p>temperature </p>
        </div>
    );
};

export default App;
