import React  from 'react';
import PropTypes from 'prop-types';
import { observable, action  } from 'mobx';
import { observer } from 'mobx-react';

@observer
export default class Option extends React.Component {

    @observable selected = false;

    constructor(props) {

        super(props)
        this.onChange = this.onChange.bind(this)
    }

    @action
    onChange = () => {
        // /console.log(this.selected)
        this.selected = !this.selected
    }

    render() {
        return (
            <option value={this.props.name} onClick={this.onChange}>{this.props.name}</option>
        )
    }
}

Option.propTypes = {
    name: PropTypes.string.isRequired
}
