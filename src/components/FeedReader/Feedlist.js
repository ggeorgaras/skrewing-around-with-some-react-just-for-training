import styles from './Feedlist.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import dataAPI from '../../api/dataAPI';
import AnimatedWrapper from "../../AnimatedWrapper";

// Static Files
import logo from '../../logo.svg';
import json from '../../data.json';

// Masonry
import Masonry from 'react-masonry-component';

// Stateless component
// Written as a class

// class Statictext extends React.Component {
//   render() {
//     return(
//       <div className="col-md-12">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>{this.props.title}</h2>
//         </div>
//         <p className="App-intro">
//           {this.props.text}
//         </p>
//       </div>
//     );
//   }
// }

// Stateless component
// Written as a shorthand ES6 arrow function

const Statictext = ({title, text}) => (
    <div className="text-center feedreader-header">
        <div className={ styles.header} >
            <img src={logo} className={styles.logo} alt="logo" />
            <h2>{title}</h2>
        </div>
        <p className={styles.intro}>
            {text}
        </p>
    </div>
);

// Initial prop values
Statictext.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
};

Statictext.defaultProps = {
    title: '',
    text: '',
};


/**
 * The single feed item's template
 * @return string
 *
 */

// Stateless component
// Written as a class

// class Single extends React.Component {
//   render() {
//     return (
//       <div className="text-left col-md-4">
//         <h2 className="single-title">
//           {this.props.title}
//         </h2>
//         <div className="single-text" dangerouslySetInnerHTML={{ __html : this.props.text }} />
//       </div>
//     );
//   }
// }

// Stateless componentq
// Written as a shorthand ES6 arrow function - 50% reduction
const Single = ({title, text, alias}) => (
    <div className="col-md-4">
        <h2 className={styles['single-title']}>
            <Link to={`/feed-reader/${alias}`}>{title}</Link>
        </h2>
        <div className={styles['single-text']} dangerouslySetInnerHTML={{ __html : text }} />
    </div>
);

Single.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
};

Single.defaultProps = {
    title: '',
    text: '',
};

/**
 * The list of the items in question
 * @return string
 * @uses <Single>
 * stateless uses ref= for reference in the DOM
 */

class List extends React.Component {

    // DEPRECATED - to be removed
    // The AJAX call
    // DEPRECATED
    loadItems() {

        // Parse the JSON - reAct does this natively
        // no need for fetch /
        let response = {json};
        return response.json.items;
    }

    // Component Events
    // https://facebook.github.io/react/docs/react-component.html#componentwillreceiveprops
    // The event where the items are being loaded
    componentWillMount() {
        console.log('Will Mount');
    }

    // After mounting
    componentDidMount() {
        console.log('Did Mount!');
    }

    componentWillReceiveProps() {
        console.log('Recieved new props');
    }

    render() {
        // Older method, to be deprecated
        //let feedItems = this.loadItems();

        // ES6 Arrow function instead of a for statement again
        //let items = feedItems.map((item) => {
        let items = dataAPI.data.items.map((item) => {
            return (
                <Single key={item.id} title={item.title} text={item.introtext} alias={item.alias} />
            );
        });

        // Masonry's Options
        var masonryOptions = {
           // transitionDuration: 0
        };

        return (
            <div className={`row-demo-class ${styles['single-list']} `} ref="list" id="List">
                <Masonry
                    className={styles['single-masonry']} // default ''
                    elementType={'div'} // default 'div'
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                >
                    {items}
                </Masonry>
            </div>
        );
    }
}

/**
 * Adding some interactivity
 * Demo Stateful Component
 * Stateful Component
 * @return string
 *
 */
const AddButton = (props) => (
    <button className={`btn btn-lg btn-success`} onClick={props.onClick}>
        Add feed
    </button>
);

const RemoveButton = (props) => (
    <button className={`btn btn-lg btn-danger`} onClick={props.onClick}>
        Remove feed
    </button>
);

/**
 * The button's controller
 * @return string
 * @uses <addButton>, <removeButton>
 *
 */
class ButtonController extends React.Component {
    constructor(props) {
        super(props);

        //
        // Each method is declared and bound in the constructor
        //
        this.handleAddClick    = this.handleAddClick.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);

        // The initial state
        this.state = {
            isLoggedIn: false
        };
    }

    // The functions that alter the state
    handleAddClick(e) {
        e.preventDefault();

        this.setState(
            {
                isRemoved: true
            }
        );
    }

    handleRemoveClick(e) {
        e.preventDefault();

        this.setState(
            {
                isRemoved: false
            }
        );

        // let mountNode = ReactDOM.findDOMNode(refs.list);
        // console.log(mountNode);
        // let unmount   = ReactDOM.unmountComponentAtNode(document.getElementById('List'));
        //ReactDOM.unmountComponentAtNode(document.getElementById('List'));
    }

    render() {
        // The methods are not bound to .bind(this) on the element
        // since a function is invoked in every render
        const isRemoved = this.state.isRemoved;

        let button = null;

        if (isRemoved) {
            button = <AddButton onClick={this.handleAddClick} />;

        } else {

            button = <RemoveButton onClick={this.handleRemoveClick} />;
        }

        return (
            <div className="col-md-12">
                {button}
            </div>
        );
    }
}


/**
 * The entire App
 * @returns object
 * @uses <Single> <List> <Static>
 *
 */

class FeedListComponent extends React.Component {

    renderStatic(title, text) {
        return <Statictext title={title} text={text} />;
    }

    render() {
        return (
            <div className="feed-reader">
                {this.renderStatic("This is a dynamic Header #2", "To get started, edit <code>src/App.js</code> and save to reload.")}

                <List />
                <ButtonController />
            </div>
        );
    }

}

// Wrap the component in the AnimatedWrapper method
const FeedList = AnimatedWrapper(FeedListComponent);
export default FeedList;