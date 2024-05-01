import React, { Component } from 'react'
import httpVerb from '../../../utils/httpClient';
import t from '../../../utils/notify';
import { Button } from '../Button/button.component';
import {ViewItem} from '../Items/ViewItem/viewItem.component'


const defaultValue = {
    name: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    fromDate: '',
    toDate: '',
    tags: '',
    offers: '',
    multipleRangeDate: ''

}


export class Search extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultValue

            },
            err: {
                ...defaultValue
            },
            isValidForm: true,
            isSubmitting: false,
            allItems: [],
            Categories: [],
            Name: [],
            searchItem: []

        }

    }
    componentDidMount() {
        httpVerb.POST(`item/search`, {}, true)
            .then(response => {
                let categories = [];
                console.log('respose search', response);
                response.data.forEach((item, index) => {
                    if (item.category && categories.indexOf(item.category) === -1)
                        categories.push(item.category);
                })

                this.setState({
                    Categories: categories,
                    allItems: response.data
                })
            })
            .catch(error => {

            })
        console.log('respose searchasd', this.state.Categories);
    }

    onSubmit = (e) => {
        // this.setState({
        //     isSubmitting: true
        // })
        e.preventDefault();
        const {data} = this.state;
        if(!data.multipleRangeDate)
        {
            data.toDate = data.fromDate;
        }
        httpVerb.POST(`item/search`, this.state.data, true)
            .then(response => {
                console.log('asdasdsearch', response.data);
                if(!response.data.length)
                {
                    return t.successs('Items didnot matched');
                }

                this.setState({
                    searchItem: response.data
                })
            })
            .catch(error => {
                // console.log('asdasdsearch', error.data);

                t.handleError(error);

            })


    }

    onChange = (e) => {
        let { value, name, type, checked } = e.target;

        if (type === 'checkbox') {
            value = checked
        }

        if (name === 'category') {
            this.NameDropDown(value);
        }

        this.setState((prev) => ({
            data: {
                ...prev.data,
                [name]: value

            }
        }), () => {
            this.validate(name);
        })

    }

    NameDropDown = (value) => {
        // const {allItems} = this.state;
        // console.log('heresdsd',allItems )
        const names = this.state.allItems.filter(data => data.category === value);
        console.log('filter', names)
        this.setState({
            Name: names
        })
        console.log('filtername', this.state.Name)
    }

    validate = (fieldName) => {
        let errmsg;
        switch (fieldName) {
            case 'category':
                errmsg = this.state.data[fieldName] ? '' : 'Required Category'
        }
        this.setState((prev) => ({
            err: {
                ...prev.err,
                [fieldName]: errmsg
            }
        }), () => {
            let valid = Object.values(this.state.err).filter(data => data);
            this.setState({
                isValidForm: valid.length === 0
            })
        })
    }

    repeatSearch = () => {
        this.setState({
            searchItem: [],
            data: {
                ...defaultValue
            }
        })
    }
    render() {
        console.log('loop', this.state.searchItem.length);
       let content = this.state.searchItem.length > 0
        ?<ViewItem itemData= {this.state.searchItem} searchAgain={this.repeatSearch} ></ViewItem>
        :<>
        <h3>Search Section</h3>
        <form className='form-group' noValidate onSubmit={this.onSubmit}>

            <br />
            <br />
            <label>By Category</label>
            <select name='category' value={this.state.data.category} onChange={this.onChange}>
                <option value=''>Select Option</option>
                {

                    this.state.Categories.map((item, index) => (

                        <option name='category' key={index} value={item}>
                            {item}
                        </option>
                    ))
                }
            </select>
            <p>{this.state.err.category}</p>
            <br />
            <br />
            {
                this.state.data.category && (
                    <>
                        <label>By Name</label>
                        <select name='name' value={this.state.data.name} onChange={this.onChange} >

                            <option value='' >Select Name</option>
                            {
                                this.state.Name.map((item, index) => (
                                    <option key={index} value={item.name} >{item.name}</option>
                                ))

                            }
                        </select>

                        {/* <input type='text' name='name' className='form' onChange={this.onChange}></input> */}
                    </>
                )
            }


            {/* <input type='text' name='category' className='form' onChange={this.onChange} ></input> */}
            <br />
            <br />
            <label>By Minimum price</label>
            <input type='number' name='minPrice' className='form' onChange={this.onChange} ></input>
            <br />
            <br />
            <label>By Maximum price</label>
            <input type='number' name='maxPrice' className='form' onChange={this.onChange} ></input>
            <br />
            <br />
            <label>Select Date</label>
            <input type='date' name='fromDate' className='form' onChange={this.onChange} ></input>
            <br />
            <br />
            <label>Multiple date range</label>
            <input type='checkbox' name='multipleRangeDate' onChange={this.onChange}></input>
            <br />
            <br />
            {
                this.state.data.multipleRangeDate && (
                    <>
                      <label>By To Date</label>
            <input type='date' name='toDate' className='form' onChange={this.onChange} ></input>
                    </>
                )
            }
          
            <br />
            <br />
            <label>Tags</label>
            <input type='text' name='tags' className='form' onChange={this.onChange} ></input>
            <br />
            <br />
            <label>Offers</label>
            <input type='text' name='offers' className='form' onChange={this.onChange} ></input>
            <br />
            <br />
            <Button
                isSubmitting={this.state.isSubmitting}
                isValidForm={this.state.isValidForm}>


            </Button>
        </form>
    </>
        return content
    }
}
