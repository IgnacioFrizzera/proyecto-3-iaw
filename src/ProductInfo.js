import React from 'react';

class ProductInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loadingData: true,
            productInfo: [],
            errorFetching: false
        };
    }

    /**
     * Gets the product information from API
     * After the response is done, renders the data
     * https://mygenericshop.herokuapp.com/api/product-info/product-code-here
     */
    async componentDidMount() {
        try {
            //var code = ""; // Product Code should go here
            const url = "https://mygenericshop.herokuapp.com/api/product-info/NHBW1220"; // testing url
            const response = await fetch(url);
            if (!response.ok) {
              throw Error(response.statusText);
            }
            var data = await response.json();
            data = data[0]; // One element array - each product has an unique code
            this.setState({ productInfo: data , loadingData: false });
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
        else{
            if(loadingData || productInfo.length === 0) {
                return(
                    <div>Loading product data...</div>
                );
            }
            else {
                return(
                    <div>
                        <h1>Selected product information</h1>
                        <li>{productInfo.name}</li>
                        <li>{productInfo.brand}</li>
                        <li>{productInfo.description}</li>
                        <li>{productInfo.price}</li>  
                    </div>
                );
            }
        }
    }

}


export default ProductInfo;
