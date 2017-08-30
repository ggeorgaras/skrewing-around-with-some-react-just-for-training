import React  from 'react';
import PropTypes from 'prop-types';
import { observable, action  } from 'mobx';
import { observer } from 'mobx-react';

@observer
class InputModel extends React.Component {

    @observable input = '';

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)
    }

    // Handling the changing of the value
    @action
    onChange = (event) => {
        //this.props.onChange(event.target.name, event.target.value)
        this.input = event.target.value;

        // Deprecated
        // invoke the calculation of the title
        //this.calcTitle
    }

    // Not needed anympre
    // @computed
    // get calcTitle() {
    //     return this.input
    // }

    render() {
        // Shorthand
        const input = this.props
        return (
            <div className="form-group">
                <label htmlFor={input.id}>
                    {input.label}
                </label>
                <input
                    type={input.type}
                    value={this.input}
                    name={input.name}
                    id={input.id}
                    onChange={this.onChange}
                    className="form-control"
                />
            </div>
        )
    }
}

InputModel.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
}

InputModel.defaultProps = {
    type: 'text'
}

export default InputModel