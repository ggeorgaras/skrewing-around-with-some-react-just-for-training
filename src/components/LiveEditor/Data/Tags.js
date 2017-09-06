import React  from 'react';
import { observable, computed } from 'mobx';

class Tags extends React.Component {

    @observable
    tax = [
        {
            name: 'Demo'
        },
        {
            name: 'Test'
        },
        {
            name: 'Demo Tags'
        }
    ]

    @computed
    get totalTags() {
        return console.log('There are ' + this.tax.length + ' tags present')
    }

}

export default Tags