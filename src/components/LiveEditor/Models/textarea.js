import React  from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

/**
 * The class that generated the textarea elements
 */
@observer
class TextInput extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    @observable input = '';

    // Update the input on the change event
    @action
    onChange = (event) => {
        this.input = event.target.value;
    }


    render() {
        const input = this.props

        return (
            <div className="form-group">
                <label htmlFor="textarea">
                    {input.label}
                </label>
                <textarea
                    name={input.name}
                    id={input.id}
                    className="form-control"
                    onChange={this.onChange}
                    defaultValue={this.input}
                />
            </div>
        )
    }
}

TextInput.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.string,
}

export default TextInput