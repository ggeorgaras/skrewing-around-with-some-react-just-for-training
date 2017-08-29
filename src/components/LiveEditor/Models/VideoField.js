import React  from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import styles from '../liveEditor.scss';

@observer
class VideoInput extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    @observable input = '';

    render() {
        return (
            <div className="form-group">
                <label htmlFor="video-input">
                    Enter YT ID
                </label>
                <textarea name="video-input" className="form-control" id="video-input" onChange={this.handleChange} defaultValue={this.input} value={this.input} />

                <div className="col-md-12">
                    <div className="video-preview">
                        <iframe title={this.input} src={`https://www.youtube.com/embed/${this.input}`}/>
                    </div>
                </div>
            </div>
        )
    }

    // Handling the changing of the value
    @action handleChange = (event) => {
        this.input = event.target.value
    }
}

VideoInput.propTypes = {
   // handleChange: PropTypes.func.isRequired
}

VideoInput.defaultProps = {
    id: 'CKZbFMEnvIA'
}

export default VideoInput