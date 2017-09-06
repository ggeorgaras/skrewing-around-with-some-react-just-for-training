import React  from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import styles from './liveEditor.scss';

import TextInput from './Models/Textarea.js'
import InputModel from './Models/Inputbox.js'
import Option from './Models/Option.js'
import SelectModel from './Models/Select.js'

import DevTools from 'mobx-react-devtools';

// Importing our demo data
import Categories from './Data/Categories.js'
import Tags from './Data/Tags.js'

// Import the Markdown parser
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';

// Import our dummy data for our taxonomies
const tags = new Tags()
const categories = new Categories()

/**
 * Build the title's alias with URI encode
 */
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
    @observable alias = '';
    @observable introtext = '';
    @observable fulltext = '';
    @observable videoid = '';
    @observable category = '';
    @observable tags = '';
    @observable newtag = '';

    // The
    tagsArray = [];

    constructor(props) {
        super(props);

        // Bind the methods to the component
        this.updateTitleProperty = this.updateTitleProperty.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.addTag       = this.addTag.bind(this)
    }

    // invoked on the form's submit
    handleSubmit(event) {
        event.preventDefault();
        console.log(this);
    }

    @action
    addTag = (event) => {
        // Do not submit the form
        event.preventDefault();

        let toPush = { 'name': this.newtag };
        tags.tax.push(toPush)
        this.newtag = ''
        console.log(this.newtag)
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
            case 'category' :
                this.category = e.target.value
                break;
            case 'tags' :
                this.tagsArray = e.target.selectedOptions
                this.tags = '';
                Object.keys(this.tagsArray).map((key) => {
                    return (
                        this.tags += '<li>' + this.tagsArray[key].value + '</li>'
                    )
                })
                break;
            case 'addTag' :
                this.newtag = e.target.value
                break;
            default :
                break;
        }
    }

   render() {
        /*
         * Build the taxonomies list
         * See the demo data for the format
         */
        let categoriesToPrint = categories.tax.map((cat) => {
            return(
                <Option key={cat.name} value={cat.name} name={cat.name} />
            )
        });

        let tagsToPrint = tags.tax.map((tag) => {
            return(
                <Option key={tag.name} value={tag.name} name={tag.name} />
            )
        });

        /** Calculate the markdown values */
        var markdown      = new Remarkable();
        markdown.renderer = new RemarkableReactRenderer();
        markdown          = markdown.render(this.fulltext);

        // tags.totalTags
        // console.log(tags.tax)

        return (
            <div className={`row ${styles['single']}`}>
                <div className={`col-md-6 ${styles['single__editor']}`} >
                    <form
                        //action=""
                        onSubmit={this.handleSubmit}
                        onChange={this.updateTitleProperty}>

                        <InputModel
                            type="text"
                            id="title"
                            value={this.alias}
                            name="title"
                            label="Title"
                        />

                        <TitleAlias alias={this.alias} />

                        <SelectModel
                            value={this.category}
                            label="Select a category"
                            id="category"
                            name="category"
                            multiple={false}
                            defaultValue=""
                        >
                            <option  value="">Select a category</option>
                            {categoriesToPrint}
                        </SelectModel>

                        <SelectModel
                            value={this.tags}
                            label="Select some tags"
                            id="tags"
                            name="tags"
                            multiple={true}
                            defaultValue={[]}
                        >
                            <option value="" disabled={true}>Select some tags</option>
                            {tagsToPrint}
                        </SelectModel>

                        <InputModel
                            type="text"
                            id="addTag"
                            value={this.toPush}
                            name="addTag"
                            label="Add a new tag"
                        />

                        <div className="form-group">
                            <button onClick={this.addTag} className="button btn bnt-lg">Add a new tag to the list</button>
                        </div>

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
                            rows={8}
                        />

                        <InputModel
                            type="text"
                            id="videoid"
                            value={this.videoid}
                            name="videoid"
                            label="YouTube Video ID"
                        />

                        <div className="form-group">
                            <input type="submit" value="Submit" className="button btn bnt-lg btn-success" />
                        </div>
                    </form>
                </div>

                <div className={`col-md-6 ${styles['single__preview']}`}>
                    <h1 className={styles['single__title']}>
                        {this.alias}
                    </h1>
                    <span className={styles['single__category']}>
                        {this.category}
                    </span>

                    <ul
                        className={styles['single__tags']}
                        dangerouslySetInnerHTML={{
                            __html: this.tags
                        }}
                    />

                    <div className={styles['single__body']}>
                        <div className={styles['single__introtext']}
                             dangerouslySetInnerHTML={{
                                 __html: this.introtext
                             }} />

                        <div className={styles['single__fulltext']}>
                            {markdown}
                        </div>
                    </div>

                    {this.videoid !== '' &&
                    <div className={styles['single__video']}>
                        <iframe title={this.videoid} src={`https://www.youtube.com/embed/${this.videoid}`}/>
                    </div>
                    }
                </div>
                <DevTools />
            </div>
        )
    }
}
export default Editor