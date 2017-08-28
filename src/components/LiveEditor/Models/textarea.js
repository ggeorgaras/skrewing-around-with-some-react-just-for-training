import React  from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { autorun }  from 'mobx';
import { observer } from 'mobx-react';
import styles from '../liveEditor.scss';

@observer
class TextInput extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    @observable input = '';

    render() {
        return (
            <div className="form-group">
                <label htmlFor="textarea">Enter full text</label>
                <textarea name="text" id="textarea" className="form-control" onChange={this.onChange} defaultValue={this.input} value={this.input} />
            </div>
        )
    }

    @action onChange = (event) => {
        this.input = event.target.value;
    }
}

TextInput.propTypes = {
    //onChange: PropTypes.func.isRequired
}


export default TextInput