import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchItems_ac } from '../../../../actions/items/items.ac.js';


import { DateFormat } from '../../../../utils/DateProcessing.js';
import t from '../../../../utils/notify.js';
import { Loader } from '../../Loader/loader.component.js';
import httpVerb from './../../../../utils/httpClient.js';
import httpClient from './../../../../utils/httpClient.js'
const IMG_URL = process.env.REACT_APP_IMG_URL;

 export class ViewItem extends Component {


    constructor() {
        super();

        this.state = {

            isLoading: false,
            items: []



        }
    }

    componentDidMount() {
        console.log('this.props view ok >>', this.props.itemData)

        // this.props.fetch();
        // return;
        // if(this.props.itemData)
        // {
        //     return this.setState({
        //         items: this.props.itemData
        //     })
        // }
        this.setState({
            isLoading: true
        })
        httpClient.GET(`/item`, true)
            .then(response => {
                console.log('resposne', response.data)
                this.setState({
                    items: response.data
                })


            })
            .catch(err => {

            })
            .finally(() => {
                this.setState({
                    isLoading: false
                })
            })
    }

    delete = (id, index) => {
        const confirm = window.confirm("Are you sure you want to delete");
        if (confirm) {
            httpVerb.DELETE(`item/${id}`, true)
                .then(response => {
                    const { items } = this.state;
                    items.splice(index, 1);
                    this.setState({
                        items: items
                    })
                    t.successs('Deleted Successfully');
                    // this.props.history.push('/showItem');
                })
                .catch(err => {
                    t.handleError(err);

                })
        }

    }
    info = (item) => {
        // if(!this.props.itemData)
        // {
            this.props.history.push(`/edit_item/${item}`);
        // }
        // else
        // {
        //     this.props.history.push(`/edit_item/${item}`);
        // }
       
        console.log('props for edit', this.props);
    }


    render() {
        console.log('item here', this.state.items);
        let content = this.state.isLoading
            ? <Loader></Loader>
            : <table className='table table-border'>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Inserted Date</th>
                        <th>Images</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.items.map((item, index) => (
                            <tr key={index} >
                                <td>{index + 1}</td>
                                <td> <Link to={`/view_items/${item._id}`} >{item.name}</Link></td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{DateFormat(item.createdAt, 'YYYY:MM:DD')}</td>
                                <td>
                                    <img src={`${IMG_URL}${item.images[0]}`} alt='item_image'></img>
                                    {/* <img src={`uploads/images/${item.images[0]}`} alt='item_image'></img> */}
                                </td>

                                <td>
                                    <button className='btn-sm, btn-success' onClick={() => this.info(item._id,index)}>edit</button>
                                    <button 
                                    Name='btn-sm, btn-warning' onClick={() => this.delete(item._id, index)}>delete</button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>

            </table>
        return (
            <>
                <h2>View Products Item</h2>
                {
                    this.props.itemData &&
                    <button className='btn btn-sm btn-success' onClick={this.props.searchAgain}>Search Again</button>
                }
                {content}

            </>
        )
    }
}

// const mapStatetoProps = rootStore => ({    
// isLoading: rootStore.items.isLoading,
// items: rootStore.items.items
// })
// console.log('sadads',fetchItems_ac)
// const mapDispatchtoProps = {
    
//     fetch: fetchItems_ac
// }
// export const ViewItem = connect(mapStatetoProps,mapDispatchtoProps)(ViewItemComponent)