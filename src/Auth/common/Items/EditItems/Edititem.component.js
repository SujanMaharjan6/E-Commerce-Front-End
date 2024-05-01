import React, { Component } from 'react'
import httpVerb from '../../../../utils/httpClient';
import t from '../../../../utils/notify';
import { Loader } from '../../Loader/loader.component';
import { ItemForm } from '../ItemForm/ItemForm.component';

export class Edititem extends Component {
    constructor() {
        super();
        this.state = {
            item: {},
            isLoading: false,
            isSubmitting: false
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        console.log('edit item props', this.props);
        const itemId = this.props.match.params['id'];
        httpVerb.GET(`/item/${itemId}`, true)
            .then(response => {
                this.setState({
                    item: response.data
                })
            })
            .catch(err => {
                t.handleError(err);
            })
            .finally(data => {
                this.setState({
                    isLoading: false
                })
            })
    }

    edit = (data, files) => {
        console.log('here at edit call back >>', data);
        this.setState({
            isSubmitting: true
        })
        httpVerb.UPLOAD('PUT',`/item/${data._id}`, data, files)
            .then(response => {
                t.successs('Item updated');
                this.props.history.push('/showItem')
            })
            .catch(err => {
                t.handleError(err);
                this.setState({
                    isSubmitting: false
                })
            })
    }
    render() {
        let content = this.state.isLoading
            ? <Loader></Loader>
            : <ItemForm title='Edit item' submitCallback={this.edit} itemData={this.state.item} ></ItemForm>
        return (
            <div>
                {content}
            </div>
        )
    }
}
