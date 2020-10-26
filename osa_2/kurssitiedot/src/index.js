import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
            },
            {
                name: "State of a component",
                exercises: 14,
            },
        ],
    };
    return (
        <>
            <Course course={course} />
        </>
    );
};

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

const Header = (props) => {
    return <h1>{props.course}</h1>;
};

const Content = (props) => {
    return (
        <>
            <Part
                part={props.parts[0].name}
                exercises={props.parts[0].exercises}
            />
            <Part
                part={props.parts[1].name}
                exercises={props.parts[1].exercises}
            />
            <Part
                part={props.parts[2].name}
                exercises={props.parts[2].exercises}
            />
        </>
    );
};

const Total = ({ parts }) => {
    const total = parts.reduce((sum, order) => {
        return sum + order.exercises;
    }, 0);

    return <p>total of {total} exercises</p>;
};

const Part = (props) => {
    return (
        <>
            <p>
                {props.part} {props.exercises}
            </p>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
