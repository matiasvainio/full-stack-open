import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseByOne = (props) => {
    if (props === "good") {
      setGood(good + 1);
    } else if (props === "neutral") {
      setNeutral(neutral + 1);
    } else if (props === "bad") {
      setBad(bad + 1);
    }
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => increaseByOne("good")} text="Good" />
      <Button onClick={() => increaseByOne("neutral")} text="Neutral" />
      <Button onClick={() => increaseByOne("bad")} text="Bad" />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;
  if (all === 0) {
    return <p>no feedback given</p>;
  } else {
    return (
      <p>
        good {good}
        <br />
        neutral {neutral}
        <br />
        bad {bad}
        <br />
        all {all}
        <br />
        average {(good - bad) / all}
        <br />
        positive {(good / all) * 100} %
      </p>
    );
  }
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

ReactDOM.render(<App />, document.getElementById("root"));
