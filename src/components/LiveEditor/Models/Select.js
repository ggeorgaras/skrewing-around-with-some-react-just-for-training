import React  from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class SelectModel extends React.Component {

    @observable input;

    // constructor(props) {
    //     super(props);
    //     this.onChange = this.onChange.bind(this)
    //
    //     // Depending on the multiple boolean assign an empty array or an empty string instead
    //     //( this.props.multiple === true ) ? this.input = [] : this.input = '';
    // }

    // Handling the changing of the value
    // @action
    // onChange = (event) => {
    //     // //this.props.onChange(event.target.name, event.target.value)
    //     if (this.props.multiple === true )
    //     {
    //         this.input = []
    //         this.input.push(event.target.value)
    //         console.log(this.input)
    //         console.log(event.target.value)
    //     }
    //     else
    //     {
    //         this.input = event.target.value;
    //     }
    // }

    render() {
        // Shorthand
        const input = this.props
        return (
            <div className="form-group">
                <label htmlFor={input.id}>
                    {input.label}
                </label>
                <select
                    multiple={input.multiple}
                    value={this.input}
                    name={input.name}
                    id={input.id}
                    //onChange={this.onChange}
                    className="form-control"
                >
                    {input.children}
                </select>
            </div>
        )
    }
}

SelectModel.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    multiple: PropTypes.bool,
   // value: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
}

SelectModel.defaultProps = {
    multiple: false
}
