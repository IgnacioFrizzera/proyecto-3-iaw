import React from 'react';
import './Stock.css';
import ReactPaginate from 'react-paginate';
import ProductInfo from './ProductInfo';
import {Spinner, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Stock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loadingData: true,
            stock: [],
            errorFetching: false,
            offset: 0,
            perPage: 5,
            currentPage: 0
        };
    }

    /**
     * Retrieves all the stock from the store
     * While loading, renders the products information
     */
    async getData() {
        try {
            const url = "https://mygenericshop.herokuapp.com/api/stock";
            const response = await fetch(url);
            if (!response.ok) {
              throw Error(response.statusText);
            }

            const data = await response.json();
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            const postData = slice.map(pd => 
            <React.Fragment key={pd.product_code}>
                <h2>Product stock</h2>
                <li>Product code: {pd.product_code}</li>
                <li>S size stock: {pd.s_stock}</li>
                <li>M size stock: {pd.m_stock}</li>
                <li>L size stock: {pd.l_stock}</li>
                <li>XL size stock: {pd.xl_stock}</li>
                <ProductInfo code={pd.product_code}></ProductInfo>
                <br/>
            </React.Fragment>)

            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                loadingData: false,
                stock: postData,
                postData,
            })
            
        } catch (error) {
            console.log(error);
            this.setState({ errorFetching: true })
        }
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getData()
        });

    };

    componentDidMount() {
        this.getData();
    }

    render(){
        const { loadingData, stock, errorFetching } = this.state;

        if(errorFetching) {
            return (
                <Container>Failed to retrieve data. Try again later!</Container>
            );
        }

        if(loadingData || stock.length === 0) {
            return(
                <Container>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Container>
            );
        }
        
        return (
            <Container>
                {this.state.postData}
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
            </Container>
        );
    }
    
}

export default Stock;