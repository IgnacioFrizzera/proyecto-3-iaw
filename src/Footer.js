import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon} from "mdbreact";
import 'mdbreact/dist/css/mdb.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/Footer.css';

class Footer extends React.Component{
    render(){
        return(
            <div class="fixed-bottom">
            <MDBFooter color="stylish-color-dark" className="font-small darken-3 pt-0">
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12" className="py-2">
                                <div className="mb-2 flex-center">
                                    <a className="tw-ic" href="https://github.com/IgnacioFrizzera" target="blank">
                                        <MDBIcon icon="github" size="3x"/>
                                    </a>
                                    <a className="gplus-ic" href="mailto: ignaciofrizzera@gmail.com" target="blank">
                                        <i>
                                            <MDBIcon icon="envelope" size="3x"/>
                                        </i>
                                    </a>
                                    <a className="li-ic" href="https://www.linkedin.com/in/ignacio-frizzera-1a94ab195/" target="blank">
                                        <i>
                                            <MDBIcon icon="linkedin" size="3x"/>
                                        </i>
                                    </a>
                                </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </MDBFooter>
            </div>
        );
    }
}

export default Footer;