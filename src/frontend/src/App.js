import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Button} from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar'
import {GiCoffeePot} from 'react-icons/gi';
import {BiCoffee} from 'react-icons/bi';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      coffeeStatus : "OFF",
      beforeCoffeeStatus : "OFF", 
      seconds: 12 ,
      remainingCups : 0,
      coffeeProgress: 0
    };
    this.timer = 0;

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.takePot = this.takePot.bind(this);
    this.placePot = this.placePot.bind(this);
    this.fillTank = this.fillTank.bind(this);
    this.setDone = this.setDone.bind(this);
    this.reset = this.reset.bind(this);
    this.startTime  = this.startTime.bind(this);
    this.countDown = this.countDown.bind(this);
    this.stopTime = this.stopTime.bind(this);
    this.showTimeAndCoffee = this.showTimeAndCoffee.bind(this);
    this.showCoffeeStatus = this.showCoffeeStatus.bind(this);
    this.lightOnOff = this.lightOnOff.bind(this);
  }

  lightOnOff(){
    if(this.state.coffeeStatus == "DONE"){
    return(
      <div className="squareON">
      </div>
    );
    }else{
      return(
        <div className="squareOFF">
        </div>
      );
    }
  }
        
  showTimeAndCoffee(){
    return (<div>
      <Card className="CoffeeMakerStatus" style={{ width: '18rem' }}>
        <Card.Title>Coffee Maker Status:</Card.Title>
        <Card.Body>
          <Card.Text className="TextAlign">
          {this.state.coffeeStatus}
          <br />
          {this.state.coffeeStatus == "BREWING" || this.state.beforeCoffeeStatus == "BREWING" ? ("Brewing Time: " + this.state.seconds) : <br />}   
          <h1>
          <GiCoffeePot/> <BiCoffee/><this.lightOnOff />
        </h1>
        </Card.Text>
        <ProgressBar striped now={this.state.coffeeProgress} label={`${parseInt(this.state.coffeeProgress)}%`} />
        </Card.Body>
        </Card>    
    </div>);
  }

  showCoffeeStatus(){
    return (
    /*<Card className="CardCoffee" style={{ width: '18rem' }}>
      <Card.Title>Coffee Status</Card.Title>
      <Card.Body>
        <Card.Text>
        Cup of Coffee: {this.state.remainingCups}
        </Card.Text>
      </Card.Body>
    </Card>)*/
    <div className="CardCoffee">
      <h3>Coffee Status:</h3>
      <p>Cup of Coffee: {this.state.remainingCups}</p>
    </div>
    );
  }

  stopTime(){
    clearInterval(this.timer);
    console.log("Time is STOPPED! Remaining brewing time: ", this.state.seconds);
  }

  countDown(){
    if(this.state.seconds > 0){
    this.setState((state) =>({seconds : state.seconds - 1}));
    console.log("Remaining brewing time: ", this.state.seconds);
    this.setState((state) =>({remainingCups : state.remainingCups + 1}));
    this.setState((state) =>({coffeeProgress : (state.remainingCups / 12) * 100}));
    console.log("Remaining new cups: " , this.state.remainingCups);
    } else{
      clearInterval(this.timer);
      console.log("Remaining brewing time: ", this.state.seconds, " and timer is stopped.");
      this.setDone();
    }
  }

  startTime(){
    console.log("startTime() funciton is running...");
    this.timer = setInterval(this.countDown, 1000);
  }

  async start(){
    console.log("Start");
    await fetch('http://localhost:8080/maker/start',
    {
    	method: "GET"
    })
    .then(response => response.text())
    .then((response) => {
        console.log(response);
        if(response != "Error"){
          this.setState({
            coffeeStatus : "BREWING"
          });
          this.startTime();
        }
    })
    .catch(err => console.log(err));
  }

  async stop(){
    console.log("Stop");
    await fetch('http://localhost:8080/maker/stop',
    {
    	method: "GET"
    })
    .then(response => response.text())
    .then((response) => {
        console.log(response);
        if(response != "Error"){
          if(this.state.coffeeStatus ==  "BREWING"){
            this.setState({
              beforeCoffeeStatus : "BREWING",
            });
            // stop the timer 
            this.stopTime();
          }
          this.setState({
            coffeeStatus : "OFF",
          });
        }
    })
    .catch(err => console.log(err))
  
  }
  
  async takePot(){
    console.log("Take Pot");
    await fetch('http://localhost:8080/maker/takePot',
    {
    	method: "GET"
    })
    .then(response => response.text())
    .then((response) => {
        console.log(response);
        if(response != "Error"){
          if(this.state.coffeeStatus ===  "BREWING"){
            this.setState({beforeCoffeeStatus : "BREWING"});
          // stop the timer 
          this.stopTime();
          }

          if(this.state.coffeeStatus != "WAITING" && this.state.remainingCups > 0){
            this.setState((state) =>({remainingCups : state.remainingCups - 1}));
            console.log("Remainging cups after take pot: " , this.state.remainingCups);
            this.setState((state) =>({coffeeProgress : (state.remainingCups / 12) * 100}));
          }

          this.setState({
            coffeeStatus : "WAITING"
          });
        } else {
          return (<p>pot is already taekn</p>);
        }
    })
    .catch(err => console.log(err))
  
  }

  async placePot(){
    console.log("Place Pot");
     await fetch('http://localhost:8080/maker/placePot',
    {
    	method: "GET"
    })
    .then(response => response.text())
    .then((response) => {
        console.log(response);
        if(response != "Error"){
          if(this.state.beforeCoffeeStatus ==  "BREWING"){
            this.setState({coffeeStatus : "BREWING", beforeCoffeeStatus : "WAITING"});
            // start the timer 
            this.startTime();
          } else if ( this.state.remainingCups == 0){
            this.reset();
          }else{
          this.setState({
            coffeeStatus : "DONE"
          });
        }
    }
  })
    .catch(err => console.log(err))
  
  }

  async fillTank(){
    console.log("Fill Tank");
    await fetch('http://localhost:8080/maker/fillTank',
    {
    	method: "GET"
    })
    .then(response => response.text())
    .then((response) => {
        console.log(response);
        if(response != "Error"){
          this.setState({
            coffeeStatus : "FILL WITH WATER"
          });
        }
    })
    .catch(err => console.log(err))
  
  }

  async setDone(){
    console.log("Set Done");
    await fetch('http://localhost:8080/maker/setDone',
    {
    	method: "GET"
    })
    .then(response => response.text())
    .then((response) => {
        console.log(response);
        if(response != "Error"){
          this.setState({
            coffeeStatus : "DONE"
          });
        }
    })
    .catch(err => console.log(err));
  
  }

  async reset(){
    console.log("Reset is invoked");
    await fetch('http://localhost:8080/maker/reset',
    {
    	method: "GET"
    })
    .then(response => response.text())
    .then((response) => {
        console.log(response);
        if(response != "Error"){
          this.setState({
            coffeeStatus : "OFF",
            beforeCoffeeStatus : "OFF", 
            seconds: 12 ,
            remainingCups : 0,
            coffeeProgress: 0
          });
          clearInterval(this.timer);
        }
    })
    .catch(err => console.log(err));
  }

render(){
    return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body className="App-body">
        <this.showCoffeeStatus />
        <this.showTimeAndCoffee stat={this.state.coffeeStatus}/>
        <Button className="Button2" onClick={this.reset}>Reset</Button>
        <ButtonGroup className="buttonGruop">
        <Button className="Button" onClick={this.start}>Start</Button>
        <Button className="Button" onClick={this.stop}>Stop</Button>
        <Button className="Button" onClick={this.takePot}>Take Pot</Button>
        <Button className="Button" onClick={this.placePot}>Place Pot</Button>
        <Button className="Button" onClick={this.fillTank}>Water</Button>
        </ButtonGroup>
      <div className="Bar">
      </div>
      </body>
    </div>
    );
  }
}

export default App;
