import React from 'react';
import {Alert} from 'react-bootstrap';

class FailedProductAlert extends React.Component{
    
    render(){
        return(
            <Alert variant="danger">
                <p>
                    <strong>Failed to retrieve product information</strong>
                </p>
            </Alert>
        );
    }
}

export default FailedProductAlert;