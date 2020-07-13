import React from 'react';
import {Alert} from 'react-bootstrap';

class FailedStockAlert extends React.Component{
    
    render(){
        return(
            <Alert variant="danger">
                <Alert.Heading>Failed to retrieve store stock</Alert.Heading>
                <hr />
                <p className="mb-0">
                    <strong>Try again by reloading the page</strong>
                </p>
            </Alert>
        );
    }
}

export default FailedStockAlert;
