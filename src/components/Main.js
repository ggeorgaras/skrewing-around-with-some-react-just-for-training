import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Import the much needed components
import FilterableProductTable from './Filter/Filter';
import FeedReader from './FeedReader/Feedreader';
import Home from './Home';
// // The transitions
//import TransitionGroup from "react-transition-group/TransitionGroup";

// The animations
// https://hackernoon.com/animated-page-transitions-with-react-router-4-reacttransitiongroup-and-animated-1ca17bd97a1a
// const firstChild = props => {
//     const childrenArray = React.Children.toArray(props.children);
//     return childrenArray[0] || null;
// };

// The main view of our app
const Main = () => (
    <main className="main-app-space">
        <div className="container">
            <div className="col-md-12">
                <Switch>
                    <Route
                        exact
                        path='/'
                        component={Home}
                        // children={({ match, ...rest }) => (
                        //     <TransitionGroup component={firstChild}>
                        //         {match && <Home {...rest} />}
                        //     </TransitionGroup>
                        // )}
                    />
                    <Route
                        path='/filter'
                        component={FilterableProductTable}
                        // children={({ match, ...rest }) => (
                        //     <TransitionGroup component={firstChild}>
                        //         {match && <FilterableProductTable {...rest} />}
                        //     </TransitionGroup>
                        // )}
                    />
                    <Route
                        path='/feed-reader'
                        component={FeedReader}
                        // children={({ match, ...rest }) => (
                        //     <TransitionGroup component={firstChild}>
                        //         {match && <FeedReader {...rest} />}
                        //     </TransitionGroup>
                        // )}
                    />
                </Switch>
            </div>
        </div>
    </main>
);

export default Main