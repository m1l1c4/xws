import React, { Component } from 'react';
import { RoleAwareComponent } from 'react-router-role-authorization';
import {Redirect} from 'react-router-dom';
import { MDBCard, MDBCardTitle } from "mdbreact";
import StarRatings from 'react-star-ratings';
import {
    Button,
    Col,
    Row,
} from 'reactstrap';

class RenderStatistics extends RoleAwareComponent {

    constructor(props) {
        super(props);
        this.state = {
        };

        let arr = new Array();
        arr.push(localStorage.getItem('role'));        
        this.userRoles = arr;
        this.allowedRoles = ['ROLE_SELLER', 'ROLE_CUSTOMER', 'ROLE_ADMIN'];

        this.getColor = this.getColor.bind(this);
        this.saznajVise = this.saznajVise.bind(this);
        this.getImage = this.getImage.bind(this);
    }

    getColor(index) {
        if (index === 0) {
            return "gold";
        }
        if (index === 1) {
            return "silver";
        }
        if (index === 2) {
            return "#CD7F32";
        }
    }

    getImage(car, colType){
        if(colType === "crossed"){
            return car.image;
        }
        else{
            return car.images[0].imageUrl;
        }
    }

    saznajVise(id) {
        window.location.assign('showAd/' + id);
      }

    render() {
        let ret = (<div className="content">

            <section className="bar pt-0">
                <div className="row">
                    {this.props.cars.map((car, index) => (

                        <MDBCard style={{ backgroundColor: this.getColor(index), "width":"95%" }} key={car.id} data-key={car.id}>
                            <br></br>
                            <h3 style={{ textAlign: "center" }} className="font-weight-bold">{car.model} {car.make}</h3>

                            <div style={{ "width": "100%", height: "13rem" }}>
                                <img style={{ "maxWidth": "99%", maxHeight: "12rem", display: "block", marginLeft: "auto", marginRight: "auto" }}
                                    src= {this.getImage(car, this.props.typeCol)} alt="Fotografija" top hover
                                    overlay="white-slight" />
                            </div>
                            <div>
                                <div style={{ backgroundColor: "white", padding:5 }}>
                                    <br></br>
                                    <MDBCardTitle tag="h6">Rating: &nbsp; <StarRatings style={{ justifyContent: "right" }}
                                        rating={car.raiting}
                                        starRatedColor="orange"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="20px"
                                        starSpacing="5px"
                                    />  </MDBCardTitle>
                                   
                                    <h6 hidden={this.props.typeCol !== "comments"}>Comments: {car.commentsNumber}</h6>
                                    <h6 hidden={this.props.typeCol !== "rating"}>&nbsp;</h6>
                                    <h6 hidden={this.props.typeCol !== "crossed"}>Kilometers crossed: {car.mileageLimit}</h6>

                                    <Row>
                                        <Col>
                                            <MDBCardTitle tag="h6"> Car class: <p style={{ color: "red" }}>{car.carClass}</p>  </MDBCardTitle>
                                            <MDBCardTitle tag="h6"> Mileage: <p style={{ color: "red" }}>{car.mileage}</p>  </MDBCardTitle>
                                            <MDBCardTitle tag="h6"> Fuel type: <p style={{ color: "red" }}>{car.fuel}</p> </MDBCardTitle>
                                        </Col>
                                        <Col>
                                            <MDBCardTitle tag="h6"> Kids seats: <p style={{ color: "red" }}>{car.kidsSeats}</p>  </MDBCardTitle>
                                            <MDBCardTitle tag="h6"> Collision Damage Waiver: <i style={{ color: "red" }} hidden={!car.insurance} className="fa fa-check" /><i style={{ color: "red" }} hidden={car.insurance} className="fa fa-close" />  </MDBCardTitle>
                                            <MDBCardTitle tag="h6"> Gearbox type: <p style={{ color: "red" }}>{car.gearbox}</p>  </MDBCardTitle>
                                        </Col>
                                    </Row>
                                    <Button color="primary" size="md" onClick={(e) => this.saznajVise(car.id)}>
                                        Details
                    </Button>

                                </div>
                            </div>
                        </MDBCard>
                    ))}
                </div>
            </section>
        </div>);

        return this.rolesMatched() ? ret : <Redirect to="/ads" />;
    }
}

export default RenderStatistics;
