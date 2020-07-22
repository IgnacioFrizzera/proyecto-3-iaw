import React from 'react';
import './styles/Stock.css';
import ReactPaginate from 'react-paginate';
import ProductInfo from './ProductInfo';
import FailedStockAlert from './FailedStockAlert';
import {Spinner, Container, Table} from 'react-bootstrap';
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
     * If there's no more than 5 items to display
     * Fullfills the table with -
     */
    fullFillTable(postData) {
        while(postData.length < 5) {
                postData.push(
                    <React.Fragment key={postData.length}>
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </React.Fragment>
                );
            }
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
                <tr>
                    <td>{pd.product_code}</td>
                    <td>{pd.s_stock}</td>
                    <td>{pd.m_stock}</td>
                    <td>{pd.l_stock}</td>
                    <td>{pd.xl_stock}</td>
                    <ProductInfo code={pd.product_code}></ProductInfo>
                </tr>
            </React.Fragment>)

            // In case there's no more data, fullfills the table with -
            this.fullFillTable(postData);

            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                loadingData: false,
                stock: postData,
            })
            
        } catch (error) {
            console.log(error);
            this.setState({ errorFetching: true })
        }
    }

    /**
     * Handles a page click
     * Loads data on each click to fill the table 
     */
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
                <Container>
                    <FailedStockAlert></FailedStockAlert>
                </Container>
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
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Product Code</th>
                            <th>S stock</th>
                            <th>M stock</th>
                            <th>L Stock</th>
                            <th>Xl Stock</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stock}
                    </tbody>
                </Table>
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
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