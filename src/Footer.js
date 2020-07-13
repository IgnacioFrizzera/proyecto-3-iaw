import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon} from "mdbreact";
import 'mdbreact/dist/css/mdb.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/Footer.css';


class Footer extends React.Component{
    render(){
        return(
            <MDBFooter color="stylish-color-dark" className="font-small darken-3 pt-0">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12" className="py-2">
                                <div className="mb-2 flex-center">
                                    <a className="tw-ic" href="https://github.com/IgnacioFrizzera" target="blank">
                                        <MDBIcon icon="github" size="4x"/>
                                    </a>
                                    <a className="gplus-ic" href="mailto: ignaciofrizzera@gmail.com" target="blank">
                                        <i>
                                            <MDBIcon icon="envelope" size="4x"/>
                                        </i>
                                    </a>
                                    <a className="li-ic" href="https://www.linkedin.com/in/ignacio-frizzera-1a94ab195/" target="blank">
                                        <i>
                                            <MDBIcon icon="linkedin" size="4x"/>
                                        </i>
                                    </a>
                                </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBFooter>
        );
    }
}

export default Footer;