import React from 'react';

class Stock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loadingData: true,
            stock: []
        };
    }

    /**
     * Gets the store total stock from API
     * After the response is done, renders the data
     */
    async componentDidMount() {
        const url = "https://mygenericshop.herokuapp.com/api/stock";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ stock: data , loadingData: false });

        // TODO: add error handling from fetch
    }

    render(){
        const { loadingData, stock} = this.state;
        if(loadingData || stock.length === 0) {
            return <div> Loading store stock...</div>;
        }
        else {
            return (
                <div>
                    <h1>Store stock info</h1>
                        <ul>
                            {stock.map(product => (
                                <li key={product.product_code}>
                                    Product code: {product.product_code}
                                    <ul>
                                        <li>S size stock: {product.s_stock}</li>
                                        <li>M size stock: {product.m_stock}</li>
                                        <li>L size stock: {product.l_stock}</li>
                                        <li>XL size stock: {product.xl_stock}</li>
                                    </ul>
                                </li>
                            ))}    
                        </ul>
                </div>
            );
        }
    }
}

export default Stock;