import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dataAPI from '../../api/dataAPI';
import AnimatedWrapper from "../../AnimatedWrapper";
import Lightbox from 'react-image-lightbox';

import styles from './Feed.scss';

/**
 * Construct the single feed (item)
 * @param title
 * @param inrotext
 * @param image
 * @param video
 * @constructor
 */
class FeedModel extends React.Component {

    constructor(props){
        super(props);

        // Initial lightbox state
        this.state = {
            isOpen: false,
        }
    }

    render() {

        // initial state
        const {
            isOpen,
        } = this.state;

        return (
            <article className={`col-md-8 ${styles.single}`}>
                <header className={styles['single__header']}>
                    <h1 className={styles['single__title']}>
                        {this.props.title}
                    </h1>
                    <span className={styles['single__date']}>
                        {this.props.date}
                    </span>
                </header>

                {this.props.image &&
                <figure className={styles['single__image-blk']} onClick={() => this.setState({isOpen: true})}>
                    <img
                        className={styles['single__image']}
                        src={`http://joomlaworks.net/${this.props.image}`}
                        alt={this.props.title}
                    />
                </figure>
                }

                {this.props.imageXL && isOpen &&
                <Lightbox
                    mainSrc={`http://joomlaworks.net/${this.props.imageXL}`}
                    onCloseRequest={() => this.setState({isOpen: false})}
                />
                }

                <div
                    className={ ( this.props.fulltext ? `${styles['single__introtext']}` : `${styles['single__fulltext']}` ) }
                    dangerouslySetInnerHTML={{__html: this.props.text}}
                />

                {this.props.fulltext &&
                <div
                    className={styles['single__fulltext']}
                    dangerouslySetInnerHTML={{__html: this.props.fulltext}}
                />
                }

                {this.props.video > 0 &&
                <div className={styles['single__video']}>
                    {this.props.video}
                </div>
                }

                <Link to='/feed-reader'>Back</Link>
            </article>
        );
    }
}
// Initial prop values
FeedModel.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    fulltext: PropTypes.string,
    image: PropTypes.string,
    imageXL: PropTypes.string,
    date: PropTypes.string,
    video: PropTypes.string,
};

FeedModel.defaultProps = {
    title: '',
    text: '',
    fulltext: '',
    image: '',
    imageXL: '',
    date: '',
    video: '',
};

/**
 * The actual functionality based on the model above
 * @uses <FeedModel>
 */
const FeedComponent = (props) => {

    // Construct the Data based on our api
    const item = dataAPI.get(
        String(props.match.params.alias)
    )

    // Raise a 404 if the alias is not found
    if(!item) {
        return(
            <div className={styles.error}>
                <h1>404 - Item not Found</h1>
                <Link to='/feed-reader'>Back to the list</Link>
            </div>
        )
    }

    return (
        <div className="col-md-12">
            <FeedModel
                title={item.title}
                image={item.image}
                imageXL={item.imageXLarge}
                text={item.introtext}
                fulltext={item.fulltext}
                date={item.created}
                video={item.video}
            />
        </div>
    );

}

// Wrap the component in the AnimatedWrapper method
const Feed = AnimatedWrapper(FeedComponent);
export default Feed;