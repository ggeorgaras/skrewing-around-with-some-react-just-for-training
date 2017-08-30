import React  from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import styles from './liveEditor.scss';

import TextInput from './Models/Textarea.js'
import InputModel from './Models/Inputbox.js'

//@observer
class TitleAlias extends React.Component {

    render() {
        // Build the URL
       // const alias = this.alias;
        let safeURL = encodeURIComponent(this.props.alias);

        return (
            <div className="title-alias form-group">
                <label>
                    Alias (auto generated)
                </label>
                <br />
                <code>
                    {safeURL}
                </code>
            </div>
        )
    }
}

TitleAlias.propTypes = {
    alias: PropTypes.string.isRequired,
}

TitleAlias.defaultProps = {
    alias: 'start-typing',
}

/**
 * Build the entire Editor compoent
 */
@observer
class Editor extends React.Component{

    // Observable Values
    // Will be rendered in the live editor
    @observable alias;
    @observable introtext;
    @observable fulltext;
    @observable videoid = '';

    constructor(props) {
        super(props);

        // Bind the methods to the component
        this.updateTitleProperty = this.updateTitleProperty.bind(this)
   }

    // Invoked on the form's change
    @action
    updateTitleProperty = (e) => {
        // Depending on the input's name update the according @observable value
        switch(e.target.name) {
            case 'title' :
                this.alias =  e.target.value
                break;
            case 'introtext' :
                this.introtext =   e.target.value
                break;
            case 'fulltext' :
                this.fulltext =   e.target.value
                break;
            case 'videoid' :
                this.videoid =   e.target.value
                break;
            default :
                break;
        }
    }

    render() {
       return (
            <div className={`row ${styles['single']}`}>
                <div className={`col-md-6 ${styles['single__editor']}`} >
                    <form action="" onChange={this.updateTitleProperty}>
                        <InputModel
                            type="text"
                            id="title"
                            value={this.alias}
                            name="title"
                            label="Title"
                        />

                        <TitleAlias alias={this.alias} />

                        <TextInput
                            name="introtext"
                            id="introtext"
                            label="Intro Text"
                            text=""
                        />

                        <TextInput
                            name="fulltext"
                            id="fulltext"
                            label="Full Text"
                            text=""
                        />

                        {/* <VideoInput id={data.id} /> */}

                        <InputModel
                            type="text"
                            id="videoid"
                            value={this.videoid}
                            name="videoid"
                            label="YouTube Video ID"
                        />

                    </form>
                </div>

                <div className={`col-md-6 ${styles['single__preview']}`}>
                    <h1 className={styles['single__title']}>
                        {this.alias}
                    </h1>
                    <div className={styles['single__body']}>

                        <div className={styles['single__introtext']}
                             dangerouslySetInnerHTML={{
                                 __html: this.introtext
                             }} />

                        <div className={styles['single__fulltext']}
                            dangerouslySetInnerHTML={{
                            __html: this.fulltext
                        }} />
                    </div>

                    {this.videoid !== '' &&
                    <div className={styles['single__video']}>
                        <iframe src={`https://www.youtube.com/embed/${this.videoid}`}/>
                    </div>
                    }
                </div>
            </div>
        )
    }
}
export default Editor