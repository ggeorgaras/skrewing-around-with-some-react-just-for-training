import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Import the much needed component
import FeedList from './Feedlist'
import Feed from './Feed'

/**
 * The Router for FeedReader App
 * @constructorgith
 * @returns react component
 */
const FeedReader = () => (
    <Switch>
        <Route exact path='/feed-reader' component={FeedList} />
        <Route path='/feed-reader/:alias' component={Feed} />
    </Switch>
);

export default FeedReader;