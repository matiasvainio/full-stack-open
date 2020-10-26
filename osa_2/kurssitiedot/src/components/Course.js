import React from "react";

const Course = (courses) => {
    const course = courses.course;
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

export default Course;
