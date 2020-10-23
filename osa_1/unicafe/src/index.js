import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [avg, setAvg] = useState(0);

  const increaseByOne = (props) => {
    if (props === "good") {
      setGood(good + 1);
      setAvg(avg + 1);
    } else if (props === "neutral") {
      setNeutral(neutral + 1);
    } else if (props === "bad") {
      setBad(bad + 1);
      setAvg(avg - 1);
    }
    setAll(all + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => increaseByOne("good")} text="Good" />
      <Button onClick={() => increaseByOne("neutral")} text="Neutral" />
      <Button onClick={() => increaseByOne("bad")} text="Bad" />
      <h2>Statistics</h2>
      <p>
        good {good}
        <br />
        neutral {neutral}
        <br />
        bad {bad}
        <br />
        all {all}
        <br />
        <CountAvg good={good} bad={bad} all={all} />
      </p>
    </div>
  );
};

const CountAvg = ({ good, bad, all }) => {
  if (all === 0) {
    return <div>average 0</div>;
  } else {
    return <div>average {(good - bad) / all}</div>;
  }
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

ReactDOM.render(<App />, document.getElementById("root"));
