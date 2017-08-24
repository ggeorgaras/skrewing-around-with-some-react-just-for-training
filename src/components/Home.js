import React from 'react';
import AnimatedWrapper from "../AnimatedWrapper";

// Changed the const name and the class in order to have it animated
// https://hackernoon.com/animated-page-transitions-with-react-router-4-reacttransitiongroup-and-animated-1ca17bd97a1a
const HomeComponent = () => (
    <div className="jumbotron">
        <h1>First Experiment</h1>
        <p>Use the menu to navigate</p>
    </div>
);

// Wrap the component in the AnimatedWrapper method
const Home = AnimatedWrapper(HomeComponent);
export default Home
