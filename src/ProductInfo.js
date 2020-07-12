import React from 'react';
import {Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class ProductInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingData: true,
            productInfo: [],
            errorFetching: false,
        };
    }

    /**
     * Gets the product information from API
     * After the response is done, renders the data
     */
    async componentDidMount() {
        try {
            const url = "https://mygenericshop.herokuapp.com/api/product-info/" + this.props.code;
            const response = await fetch(url);

            if (!response.ok) {
                throw Error(response.statusText);
            }

            var data = await response.json();
            data = data[0]; // One element array - each product has an unique code

            this.setState({
                productInfo: data,
                loadingData: false
            });
        } catch (error) {
            console.log(error);
            this.setState({ errorFetching: true })
        }
    }

    render() {
        const { loadingData, productInfo, errorFetching } = this.state;
        
        if(errorFetching) {
            return(
                <div>Failed to retrieve product information</div>
            );
        }

        if(loadingData || productInfo.length === 0) {
            return(
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            );
        }

        return(
            <div>
                <h2>Product information</h2>
                <li>Name: {productInfo.name}</li>
                <li>Brand: {productInfo.brand}</li>
                <li>Description: {productInfo.description}</li>
                <li>Price: ${productInfo.price}</li>  
            </div>
        );
    }

}


export default ProductInfo;
