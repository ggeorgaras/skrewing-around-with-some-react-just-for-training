import React  from 'react';
import { observable } from 'mobx';

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

}

export default Tags