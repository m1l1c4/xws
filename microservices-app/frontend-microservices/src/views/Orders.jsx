import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Card, Popover, PopoverBody,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  Modal,
  Badge,
  ModalHeader,
  ModalBody,
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  ModalFooter
} from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { RoleAwareComponent } from 'react-router-role-authorization';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

//import "../../../node_modules/react-notifications/lib/notifications.css"
//import "../../../node_modules/react-notifications/lib/Notifications.js"


const url = (process.env.REACT_APP_DOMAIN) + ':' + (process.env.REACT_APP_PORT) + '/';
const certPerPage = 5;
   
function CertRow(props) {
  const order = props.certificate;  
  const btnKey = "key" + order.id.toString() + "key" + order.id.toString() ;
  const cars = props.displayCars(order.id.toString())
  
  return (
    <>
    <tr key={order.id.toString()}>
    <td>{order.agentUsername}</td>
      <td>{props.changeDate(order.startDate)}</td>
      <td>{props.changeDate(order.endDate)}</td>
      <td><Badge className="mr-1" href="#" color="info">{order.state}</Badge></td>
      <td><Button id={btnKey} color="info" type="button" size="sm" onClick={() => props.togglePopover(order.id)} >CARS</Button>      
      </td> 
      {order.state === "RESERVED" && <td><Button color="danger" size="sm" onClick={() => props.cancelReservation(order.id)}>Cancel reservation</Button></td> }    
      {order.state === "RESERVED" && <td><Button color="danger" size="sm" onClick={() => props.payForCar(order.id.toString())}>PAY</Button></td> }
      {order.state === "RESERVED" && <td><Button color="danger" size="sm" onClick={() => props.openModal(order)}>SEND MESSAGE</Button></td> }
    </tr>

    <Popover placement="right" isOpen={props.popoverOpen[order.id]} target={btnKey} >        
    <PopoverBody>          
    <Table responsive >                
        <tbody>
        {(cars.map((car, index) =>
          <tr key={index} className="crow">
            <td className="crow">{car.make}</td>
            <td className="crow">{car.model}</td>
            <td className="crow">{car.fuel}</td>                
            <td className="crow"><Button color="primary" size="sm" onClick={() => props.showDetails(car.id.toString())}> {}
          Details</Button></td>
          </tr>
        ))}
      </tbody>
        </Table>
    </PopoverBody>
    </Popover></>
  )
}

class Orders extends RoleAwareComponent {
  constructor(props) {
    super(props);
    this.state = {
      orders: [], 
      showCertificates: [],     
      activePage: 1 ,
      primary: false,
      subject: "",
      to: "",
      message: "",
      popoversOpen: [],
      ordersRequests: []
    };

    let arr = [];
    arr.push(localStorage.getItem('role'));    
    this.userRoles = arr;
    this.allowedRoles = ['ROLE_CUSTOMER'];
   
    this.payForCar = this.payForCar.bind(this);
    this.displayCars = this.displayCars.bind(this);
    this.displayAllOrders = this.displayAllOrders.bind(this);
    this.transformResponse = this.transformResponse.bind(this);
    this.togglePopover = this.togglePopover.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.getDateString = this.getDateString.bind(this);
    this.initializePopovers = this.initializePopovers.bind(this);
    this.covertToRequests = this.covertToRequests.bind(this)
  }

  componentDidMount()
  {
    this.displayAllOrders();
  }

  showDetails = (id) => {
    this.props.history.push('showAd/' + id);
  }

  initializePopovers = (size) => {
    let tempArray = []
    for (let i=0; i < size; i++) {
      tempArray.push(false)
    }
    this.setState({popoversOpen: tempArray})
  }

  cancelReservation = id => {
    let data = sessionStorage.getItem('basket');
    let token = localStorage.getItem("ulogovan")
    let AuthStr = 'Bearer '.concat(token);    
    
    axios({
        method: 'put',
        url: url + 'orders/request/' + id + '/' + false,
        headers: { "Authorization": AuthStr } ,            
      }).then((response) => {
        if (response.data.status === 200)
          this.displayAllOrders();
        else {
          NotificationManager.error(response.data.entity, '', 3000);   
        }
      }, (error) => {
        console.log(error);
      });
  }

  sendMessage = () => {

    let token = localStorage.getItem("ulogovan")
    let AuthStr = 'Bearer '.concat(token);

    let data = {
      receiverUsername: this.state.to,
      subject: this.state.subject,
      text: this.state.message,
      timeSent: new Date()
    };

    console.log(data);

    axios({
      method: 'post',
      url: url  + 'message/message',
      headers: { "Authorization": AuthStr } ,
      data: data
    }).then((response)=>{
      if (response.status === 200)  {
        NotificationManager.info("Message sent.");
      } else {
        NotificationManager.info("Failed to send message.");
      }
      this.clear();
      this.togglePrimary();
    },(error)=>{
      console.log(error);
    });

  };

  clear = () => {
    this.setState({message:"",to:"",subject:""});
  };

  togglePrimary = (order) => {
    if(!this.state.primary)
    {
      this.setState({to:order.agentUsername});
    }else{
      this.clear();
    }
    this.setState({
      primary: !this.state.primary
    });
  };

  displayAllOrders = () => {
    let token = localStorage.getItem("ulogovan")
    let AuthStr = 'Bearer '.concat(token);
    axios({
      method: 'get',
      url: url  + 'orders/request/true',
      headers: { "Authorization": AuthStr } ,   
    }).then((response)=>{ 
      if (response.status == 200)  {
        this.initializePopovers(response.data.length)
        this.covertToRequests(response.data)
      } else {
        NotificationManager.info("No orders requested!", '', 3000);   
      } 
      
    },(error)=>{
      console.log(error);
    });
  }

  covertToRequests = input => {
    let tempo = []
    for (let i=0; i< input.length; i++) {
        for (let j=0; j < input[i].requests.length; j++) {
          tempo.push(input[i].requests[j])
        }
    }
    this.setState({ordersRequests: tempo, orders: input})
    this.setState({showCertificates: this.state.ordersRequests.slice(0, certPerPage)})

  }

  togglePopover = (index) => {    
    let tempArray = []
    for (let i=0; i < this.state.popoversOpen.length; i++) {
      if (i == index) {
        tempArray.push(!this.state.popoversOpen[i])
      } else
      tempArray.push(false)
    }
    this.setState({popoversOpen: tempArray})
  }

  displayCars = (id) => {
    let cars = [];
    for (let i=0; i< this.state.ordersRequests.length ; i++) {
        if (id == this.state.ordersRequests[i].id) {
          cars = this.state.ordersRequests[i].cars;
          break;
        }
    }
    return cars;
  }

  payForCar = id => {
    let token = localStorage.getItem("ulogovan")
    let AuthStr = 'Bearer '.concat(token);
    axios({
      method: 'put',
      url: url  + 'orders/request/pay/' + id,
      headers: { "Authorization": AuthStr } ,   
    }).then((response)=>{ 
      if (response.data)  {
        this.displayAllOrders();
        NotificationManager.success("Successfully paid!", '', 3000);  
      } else {
        NotificationManager.error("Your payment is canceled!", '', 3000);   
      } 
      
    },(error)=>{
      console.log(error);
    });
  }

  transformResponse = transform => {
    for (let i = 0; i < transform.length; i++) {
      let start = this.getDateString(transform[i].startDate);
      let end = this.getDateString(transform[i].endDate);
      transform[i].startDate = start;
      transform[i].endDate = end;
    }
    this.setState({orders:transform, showCertificates: transform.slice(0, certPerPage)})

  }

  getDateString(miliseconds) {
    let date = new Date(miliseconds);
    let month = date.getMonth() + 1;
    let ret = date.getDate() + '.' + month + '.' + date.getFullYear() + ', ';
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    ret = ret + hours + ':' + minutes;
    return ret;
  }

  handlePageChange(pageNumber) {
    let temp = (pageNumber - 1)*certPerPage;
    this.setState({activePage: pageNumber, showCertificates: this.state.orders.slice(temp, temp + certPerPage)})
  }

  render() {

    const len = this.state.orders.length;    
    const pageNumbers = Array.from(Array(Math.ceil(len/certPerPage)).keys())

  let ret = (<div className="animated fadeIn content">
        <Row>
          <Col xl={11}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Orders
              </CardHeader>
              <CardBody>
                <Table responsive hover striped>
                  <thead>
                    <tr>
                      <th scope="col">Agent</th>
                      <th scope="col">Start date</th>
                      <th scope="col">End date</th>                      
                      <th scope="col">Status</th>
                      <th scope="col">Cars</th>
                      <th scope="col">Reservation</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Contact</th>                      
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.showCertificates.map((order, index) =>
                      <CertRow key={index} 
                               certificate={order}                                
                               payForCar = {this.payForCar}
                               displayCars = {this.displayCars}
                               openModal = {this.togglePrimary}
                               cancelReservation = {this.cancelReservation}
                               popoverOpen = {this.state.popoversOpen}
                               togglePopover = {this.togglePopover}
                               showDetails = {this.showDetails}
                               changeDate = {this.getDateString}
                               />
                    )}              
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink disabled = {this.state.activePage === 1} previous tag="button" onClick={(event) => this.handlePageChange(this.state.activePage - 1)}></PaginationLink></PaginationItem>
                    {pageNumbers.map((pageNumber) =>
                    <div>
                      <PaginationItem active hidden = {this.state.activePage !== pageNumber + 1}>
                        <PaginationLink tag="button" >{pageNumber + 1}</PaginationLink>
                      </PaginationItem>
                       <PaginationItem hidden = {this.state.activePage === pageNumber + 1}>
                         <PaginationLink tag="button"  onClick={(event) => this.handlePageChange(pageNumber + 1)}>
                           {pageNumber + 1}
                          </PaginationLink>
                        </PaginationItem>
                    </div>
                    )}
                    <PaginationItem><PaginationLink disabled = {this.state.activePage === (Math.ceil(len/certPerPage))} next tag="button" onClick={(event) => this.handlePageChange(this.state.activePage + 1)}></PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>

    <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
           className={'modal-primary ' + this.props.className}>
      <ModalHeader>Send message</ModalHeader>
      <ModalBody>
        <Form>
          <InputGroup className="mb-3">
            <InputGroupAddon>
              <InputGroupText>
                Subject:
              </InputGroupText>
            </InputGroupAddon>
            <Input type="text" onChange={event => this.setState({subject: event.target.value})} value={this.state.subject}
                   />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupText>
              Message:
            </InputGroupText>
            <Input type="textarea" onChange={event => this.setState({message: event.target.value})} value={this.state.message}
            />
          </InputGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.sendMessage} >Send</Button>{' '}
        <Button color="secondary" onClick={this.togglePrimary}>Cancel</Button>
      </ModalFooter>
    </Modal>
       
        <NotificationContainer/>
      </div>);
      
    
    return this.rolesMatched() ? ret : <Redirect to="/ads" />;
  }
}

export default Orders;
