import React from 'react';
import './Stock.css';

class Stock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loadingData: true,
            stock: [],
            errorFetching: false,
        };
    }

    /**
     * Gets the store total stock from API
     * After the response is done, renders the data
     */
    async componentDidMount() {
        try {
            const url = "https://mygenericshop.herokuapp.com/api/stock";
            const response = await fetch(url);
            if (!response.ok) {
              throw Error(response.statusText);
            }
            const data = await response.json();
            this.setState({ stock: data , loadingData: false });
        } catch (error) {
            console.log(error);
            this.setState({ errorFetching: true })
        }
    }

    render(){
        const { loadingData, stock, errorFetching } = this.state;
        if(errorFetching) {
            return (
                <div>Failed to retrieve data. Try again later!</div>
            );
        }

        if(loadingData || stock.length === 0) {
            return (
                <div> Loading store stock...</div>
            );
        }
        
        return (
            <div className="StockContainer">
                <h1 className="StockTitle">Store stock info</h1>
                <ul>
                    {stock.map(p => (
                        <li key={p.product_code}>
                            Product code: {p.product_code}
                            <ul>
                                <li>S size stock: {p.s_stock}</li>
                                <li>M size stock: {p.m_stock}</li>
                                <li>L size stock: {p.l_stock}</li>
                                <li>XL size stock: {p.xl_stock}</li>
                            </ul>
                        </li>
                    ))}    
                </ul>
            </div>
        );
    }
    
}

export default Stock;