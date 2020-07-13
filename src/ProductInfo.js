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
                <React.Fragment>
                    <td>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </td>
                    <td>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>    
                    </td>
                    <td>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </td>
                    <td>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </td>
                </React.Fragment>
            );
        }

        return(
            <React.Fragment>
                <td>{productInfo.name}</td>
                <td>{productInfo.brand}</td>
                <td>{productInfo.description}</td>
                <td>${productInfo.price}</td>
            </React.Fragment>
        );
    }

}


export default ProductInfo;
