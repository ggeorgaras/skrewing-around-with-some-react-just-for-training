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
class TitleAlias extends React.Component {
    render() {
        // Build the URL
       // const alias = this.alias;
        const safeURL =  encodeURIComponent(this.props.alias);
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

    constructor(props) {
        super(props);

        // Bind the methods to the component
        this.updateProperty = this.updateProperty.bind(this)
   }

    // Needed for the changing of the input's value
    updateProperty (key, value) {
        //this.props.value = value
        //this.props.data[key] = value;
        // console.log(value);
        // console.log(this.props);
    }

    @computed get buildAlias() {
        console.log('e');
    }

    render() {
        const data = this.props;

        return (
            <div className="single">
                <div className={`col-md-6 ${styles['single__editor']}`} >
                    <form action="">
                        <InputModel type="text" id="title" value={data.title} name="title" />
                        <TitleAlias alias={InputModel.value} />
                        <TextInput text="" />
                        <VideoInput id={data.id} />
                    </form>
                </div>
                <div className={`col-md-6 ${styles['single__preview']}`}>
                </div>
            </div>
        )
    }
}
export default Editor