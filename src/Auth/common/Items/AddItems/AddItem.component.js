//call item form


import React, { Component } from 'react'
import { ItemForm } from '../ItemForm/ItemForm.component'
import t from '../../../../utils/notify.js';
import httpClient from './../../../../utils/httpClient'

export class AddItem extends Component {
    constructor() {
        super()
        this.state = {
            isSubmitting: false
        }
    }
    add = (data, files) => {
        console.log('I am rom additem component .js >>', data);
        // httpClient.POST(`/item`, data, true)
        httpClient.UPLOAD('POST',`/item`, data, files)     
            .then(response => {
                t.successs('success')
                this.props.history.push('/showItem')
            })
            .catch(err => {
                t.warns('failed')
                this.setState({
                    isSubmitting: false
                })
            })
    }

    render() {
        return (

            <ItemForm title="React Practice" callBackFunction={this.add}></ItemForm>

        )
    }
}
