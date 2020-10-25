import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(
        new Array(props.anecdotes.length).fill(0)
    );

    const generateRandom = (length) => {
        return Math.floor(Math.random() * length);
    };

    const voteAnecdote = () => {
        const copy = [...votes];
        copy[selected] += 1;
        setVotes(copy);
    };

    const mostVotes = (arr) => {
        let max = arr[0];
        let maxIndex = arr[0];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }
        return maxIndex;
    };

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]} <br />
            <p>has {votes[selected]} votes</p>
            <button
                onClick={() =>
                    setSelected(generateRandom(props.anecdotes.length))
                }
            >
                Next anecdote
            </button>
            <button onClick={() => voteAnecdote()}>vote</button>
            <h1>Anecdote with the most votes</h1>
            <p>
                {props.anecdotes[mostVotes(votes)]} has{" "}
                {votes[mostVotes(votes)]} votes
            </p>
        </div>
    );
};

const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
