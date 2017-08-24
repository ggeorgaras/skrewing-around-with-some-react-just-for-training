import json from '../data.json';
/**
 * A simple DATA API which returns the feed's items
 * Based on https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
 * @type {{data, all: dataAPI.all, get: dataAPI.get}}
 */

const dataAPI = {
    data: json,
    all: function() {
        return this.data
    },
    get: function(alias) {
        const isItem = item => item.alias === alias;
        // .items is specific to this format
        return this.data.items.find(isItem);
    }
}

export default dataAPI