import React, { Component } from 'react'
import { Button } from '../../Button/button.component'


const IMG_URL = process.env.REACT_APP_IMG_URL;
const defaultForm = {
    name: '',
    description: '',
    price: '',
    category: '',
    color: '',
    brand: '',
    size: '',
    isReturnEligible: '',
    returnTimePeriodInDay: '',
    modelNo: '',
    offers: '',
    tags: '',
    quantity: '',
    warrentyStatus: '',
    warrentyPeriod: '',
    discountedItem: '',
    discountType: '',
    discountValue: '',
}

export class ItemForm extends Component {
    constructor() {
        super()

        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            filesToUpload: [],
            isSubmitting: false,
            isValidform: false

        }
    }

    componentDidMount() {
        if (this.props.itemData) {
            const { itemData } = this.props
            this.setState({
                data: {
                    ...defaultForm,
                    ...this.props.itemData,
                    discountedItem: itemData.discount ? itemData.discount.discountedItem : '',
                    discountValue: itemData.discount ? itemData.discount.discountValue : '',
                    discountType: itemData.discount ? itemData.discount.discountType : '',
                }
            })
        }

    }


    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            isSubmitting: true
        })

        setTimeout(() => {
            this.setState({
                isSubmitting: false
            })
        }, 2000);
        if (this.props.itemData) {
            this.props.submitCallback(this.state.data, this.state.filesToUpload);
        }
        else {
            this.props.callBackFunction(this.state.data, this.state.filesToUpload);
        }

    }

    handleChange = (e) => {

        let { value, checked, type, name, files } = e.target;
        console.log('value', value)

        if (type === 'file') {
            const { filesToUpload } = this.state;
            filesToUpload.push(files[0]);
            console.log('file Image', files);
            return this.setState({
                // filesToUpload: files
                filesToUpload: filesToUpload
            })
        }
        if (type === 'checkbox') {
            value = checked;
        }
        this.setState((prev) => ({
            data: {
                ...prev.data,
                [name]: value
            }
        }), () => {
            this.validateForm(name);
        })
        console.log('disc', this.state.data.discountedItem)
        console.log('discwarr   ', this.state.data.warrantyStatus)
    }

    validateForm = (fieldname) => {
        let errmsg;
        switch (fieldname) {
            case 'name':
                errmsg = this.state.data[fieldname] ? ''
                    : 'required name'
                break;
        }


        this.setState((prev) => ({
            error: {
                ...prev.error,
                [fieldname]: errmsg
            }
        }), () => {
            const value = Object.values(this.state.error).filter(err => err);
            this.setState({
                isValidform: value.length === 0
            })
        })
    }

    render() {
        const { data, err } = this.state;
        return (
            <>
                <h2>{this.props.title}</h2>
                <form className='form-control' onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input type='text' className='form-control' name='name' value={data.name} placeholder='Name' onChange={this.handleChange} ></input>
                    <p>{this.state.error.name}</p>
                    <label>Description</label>
                    <textarea className='form-control' name='description' value={data.description} placeholder='Description' onChange={this.handleChange} rows={5} ></textarea>
                    <label>Category</label>
                    <input type='text' className='form-control' name='category' placeholder='Category' value={data.category} onChange={this.handleChange} ></input>
                    <label>Brand</label>
                    <input type='text' className='form-control' value={data.brand} name='brand' placeholder='Brand' onChange={this.handleChange} ></input>
                    <label>Price</label>
                    <input type='text' className='form-control' value={data.price} name='price' placeholder='Price' onChange={this.handleChange} ></input>
                    <label>Color</label>
                    <input type='text' className='form-control' value={data.color} name='color' placeholder='Color' onChange={this.handleChange} ></input>
                    <label>Model no.</label>
                    <input type='text' className='form-control' value={data.modelNo} name='modelNo' placeholder='Model no.' onChange={this.handleChange} ></input>
                    <label>Size</label>
                    <input type='text' className='form-control' value={data.size} name='size' placeholder='Size' onChange={this.handleChange} ></input>
                    <label>Discounted Item</label>
                    <input type='checkbox' name='discountedItem' checked={data.discountedItem} onChange={this.handleChange} ></input>
                    {
                        this.state.data.discountedItem && (
                            <>
                                <label>Discounted Type</label>
                                <select className='form-control' name='discountType' value={data.discountType} onChange={this.handleChange} >
                                    <option value=''>Select Discount type</option>
                                    <option value='percentage'>Percentage</option>
                                    <option value='quantity'>Quantity</option>
                                    <option value='value'>Value</option>
                                </select>

                                <label>Discounted Value</label>
                                <input type='text' className='form-control' value={data.discountValue} name='discountValue' placeholder='Discounted Value' onChange={this.handleChange} ></input>
                            </>
                        )

                    }
                    <br />

                    <label>Warranty Item</label>
                    <input type='checkbox' name='warrentyStatus' checked={data.warrentyStatus} onChange={this.handleChange} ></input>
                    <br />
                    {
                        this.state.data.warrentyStatus && (
                            <><label>Warranty Period</label>
                                <input type='text' className='form-control' name='warrentyPeriod' value={data.warrentyPeriod} placeholder='Warranty Period' onChange={this.handleChange} ></input></>
                        )
                    }

                    <label>Return Eligibility</label>
                    <input type='checkbox' name='isReturnEligible' checked={data.isReturnEligible} onChange={this.handleChange} ></input>
                    <br />
                    {
                        this.state.data.isReturnEligible && (
                            <>
                                <label>Return Time In Day</label>
                                <input type='text' className='form-control' value={data.returnTimePeriodInDay} name='returnTimeInDay' placeholder='Return Time In Day' onChange={this.handleChange} ></input>
                            </>
                        )

                    }

                    <label>Tags</label>
                    <input type='text' className='form-control' value={data.tags} name='tags' placeholder='Tags' onChange={this.handleChange} ></input>
                    <label>Offers</label>
                    <input type='text' className='form-control' name='offers' value={data.offers} placeholder='Offers' onChange={this.handleChange} ></input>

                    <br />

                    {
                        this.props.itemData && this.props.itemData.images && this.props.itemData.images.length > 0 &&
                        (
                            <>
                                <label>Previous Image</label>
                                <br></br>
                                <img src={`${IMG_URL}${this.props.itemData.images[0]}`} alt='Item_Image.png'></img>
                                <br></br>
                            </>
                        )
                    }
                    <label>Choose Image</label>
                    <br></br>
                    <input type='file' onChange={this.handleChange} ></input>
                    <br></br>
                    <br></br>
                    <Button
                        isSubmitting={this.state.isSubmitting}
                        isValidForm={this.state.isValidform}
                    ></Button>

                </form>
            </>
        )
    }
}
