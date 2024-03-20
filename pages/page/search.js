import React from 'react';
import CommonLayout from '../../components/shop/common-layout';
import { Container, Row, Col, Input } from 'reactstrap';
// import { withApollo } from '../../helpers/apollo/apollo';

const Search = () => {
    return (
        // <CommonLayout parent="home" title="search">
           
            <section className="authentication-page section-b-space">
                <Container>
                    <section className="search-block">
                        <Container>
                            <Row>
                                <Col lg="6" className="offset-lg-3">
                                    <form className="form-header">
                                        <div className="input-group">
                                            <Input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"
                                                placeholder="buscar productos......" />
                                            <button className="btn btn-solid"><i className="fa fa-search"></i>buscar</button>
                                        </div>
                                    </form>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </Container>
            </section>
      

        // </CommonLayout>
    )
}

export default Search;