import React  from 'react';
import PropTypes from 'prop-types';
import { observable, computed, autorun, action } from 'mobx';
import { observer } from 'mobx-react';
import styles from './liveEditor.scss';

import VideoInput from './Models/VideoField.js'
import TextInput from './Models/Textarea.js'
import InputModel from './Models/Inputbox.js'

/* Observable methods - data inputs */
// const TitleInput = (props) => {
//     return (
//         <div className="form-group">
//             <input value={props.title} name="title" id="title" />
//         </div>
//     )
// }

/* Computed methods */
const inputModel = new InputModel();

@observer
class TitleAlias ex tends React.Component {

    @observable alias = inputModel.calcTitle;

    render() {
        // Build the URL
       // const alias = this.alias;
        let safeURL =  encodeURIComponent(this.alias);
        return (
            <div className="title-alias">
                <code>
                    {safeURL}
                </code>
            </div>
        )
    }
}

/**
 * Build the entire Editor compoent
 */
@observer
class Editor extends React.Component{

    @observable alias = inputModel.calcTitle;

    constructor(props) {
        super(props);

        // Bind the methods to the component
        this.updateProperty = this.updateProperty.bind(this)
   }

    // Needed for the changing of the input's value
    @action
    updateProperty = (e) => {
        console.log('updateProperty')
        console.log( 'it is ' + e +  inputModel.calcTitle )
        //console.log(key + ' ' + value)
    }

    render() {
        const data = this.props;
       return (
            <div className="single">
                <div className={`col-md-6 ${styles['single__editor']}`} >
                    <form action="" onChange={this.updateProperty}>
                        <InputModel type="text" id="title" value={data.title} name="title"  />
                        <TitleAlias alias={inputModel.calcTitle} />
                        <TextInput text="" />
                        <VideoInput id={data.id} />
                        {inputModel.calcTitle}
                    </form>
                </div>
                <div className={`col-md-6 ${styles['single__preview']}`}>
                    <h1>{inputModel.calcTitle} =</h1>
                </div>
            </div>
        )
    }
}
export default Editor