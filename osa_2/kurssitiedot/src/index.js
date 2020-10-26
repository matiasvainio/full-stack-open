import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    const courses = [
        {
            name: "Half Stack application development",
            id: 1,
            parts: [
                {
                    name: "Fundamentals of React",
                    exercises: 10,
                    id: 1,
                },
                {
                    name: "Using props to pass data",
                    exercises: 7,
                    id: 2,
                },
                {
                    name: "State of a component",
                    exercises: 14,
                    id: 3,
                },
                {
                    name: "Redux",
                    exercises: 11,
                    id: 4,
                },
            ],
        },
        {
            name: "Node.js",
            id: 2,
            parts: [
                {
                    name: "Routing",
                    exercises: 3,
                    id: 1,
                },
                {
                    name: "Middlewares",
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ];
    return (
        <>
            <Course course={courses} />
        </>
    );
};

const Course = (courses) => {
    const course = courses.course;
    console.log(course);
    return course.map((course) => {
        return (
            <div key={course.id}>
                <Header course={course.name} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
            </div>
        );
    });
};

const Header = ({ course }) => {
    return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
    console.log(parts[0]);
    return (
        <ul key>
            {parts.map((part) => (
                <li key={part.id}>
                    <Part part={part.name} exercises={part.exercises} />
                </li>
            ))}
        </ul>
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
            {props.part} {props.exercises}
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
