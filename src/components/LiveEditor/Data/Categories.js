import React  from 'react';
import { observable } from 'mobx';

class Categories extends React.Component {

    @observable
    tax = [
        {
            name: 'Demo'
        },
        {
            name: 'Test'
        },
        {
            name: 'Demo Category'
        }
    ]

}

export default Categories