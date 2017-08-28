import React  from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import styles from '../liveEditor.scss';


@observer
class InputModel extends React.Component {

    @observable input = '';

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)
    }

    // Handling the changing of the value
    @action onChange = (event) => {
        //this.props.onChange(event.target.name, event.target.value)
        this.input = event.target.value;
        console.log(this.input)
    }

    render() {
        // Shorthand
        const input = this.props
        return (
            <div className="form-group">
                <label htmlFor={input.id}>Enter Title</label>
                <input
                    type={input.type}
                    value={this.input}
                    name={input.name}
                    id={input.id}
                    onChange={this.onChange}
                    className="form-control"
                    // ref={(input) => this.input = input}
                />
            </div>
        )
    }
}

InputModel.propTypes = {
    //onChange: PropTypes.func.isRequired
}

InputModel.defaultProps = {
    type: 'text'
}

export default InputModel