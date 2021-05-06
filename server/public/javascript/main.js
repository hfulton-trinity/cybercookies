"use strict"

const ce = React.createElement;
const csrfToken = document.getElementById("csrfToken").value;
const logInCust = document.getElementById("custLoginRoute").value;
const logInTroop = document.getElementById("troopLoginRoute").value;
const addCust = document.getElementById("newCustRoute").value;
const addTroop = document.getElementById("newTroopRoute").value;
const getAllCookies = document.getElementById("getCookiesRoute").value;


class ApplicationMainComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {page: "H", login: ""};
  }
//need login change option
  render(){
    switch(this.state.page) {
      case "H": ce('div', 'null', ce(HeaderComponent), ce(HomeComponent, {changePage: page => this.setState(page)}), ce(BaseComponent));
      case "About": ce('div', 'null', ce(HeaderComponent), ce(AboutComponent, {changePage: page => this.setState(page)}), ce(BaseComponent));
      case "Cookies": ce('div', 'null', ce(HeaderComponent), ce(CookieComponent, {changePage: page => this.setState(page)}), ce(BaseComponent));
      case "Login": {
        if(this.state.login == ""){
          ce('div', 'null', ce(HeaderComponent), ce(LoginCustComponent, {changePage: page => this.setState(page)}), ce(BaseComponent));
        } else if(this.state.login == "c") {
          ce('div', 'null', ce(HeaderComponent), ce(LoginCustComponent, {changePage: page => this.setState(page)}), ce(BaseComponent));
        } else if(this.state.login == "t") {
          ce('div', 'null', ce(HeaderComponent), ce(LoginTroopComponent, {changePage: page => this.setState(page)}), ce(BaseComponent));
        } else if(this.state.login == "nc") {
          ce('div', 'null', ce(HeaderComponent), ce(NewCustComponent, {changePage: page => this.setState(page)}), ce(BaseComponent));
        } else if(this.state.login == "nt") {
          ce('div', 'null', ce(HeaderComponent), ce(NewTroopComponent, {changePage: page => this.setState(page)}), ce(BaseComponent));
        }

      }
      case "Contact": ce('div', 'null', ce(HeaderComponent), ce(ContactComponent, {changePage: page => this.setState(page)}), ce(BaseComponent));
    }
  }

}

class HeaderComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {current_page: "H"};
  }

  render(){
    ce('div', 'null', ce('h2', null, 'Cyber',ce('h3', null, 'Cookies')),
      ce('nav',{id: "navbar_home"},
        ce('button', {onClick: e => changePage("H")}, 'Home'),
        ce('button', {onClick: e => changePage("About")}, 'About Us'),
        ce('button', {onClick: e => changePage("Cookies")}, 'Cookies'),
        ce('button', {onClick: e => changePage("Login"), onHover: e => dispOptions()}, 'Login'),
        //login button dropdown menu needs to be implemented
        ce('button', {onClick: e => changePage("Contact")}, 'Contact Us')
      )
    );
  }

  dispOptions(){
    //dropdown menu
  }
}

class BaseComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    ce('div', 'null',
      ce('div',{id: "basebar_home"},
        ce('a',,),
        ce('a',,)
      )
    );
  }
}

class HomeComponent extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){

  }

  render(){
    ce('div',null,
      ce('h3',null,'Welcome one and all to your virtual connection with your girl scout cookie dealer'),
      ce('h5',null,'Most Popular Cookies'),
      ce('div',{id = "cookie_bar"},
        //images here with hover method
      )
    );
  }
}

class AboutComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    ce('div', null,
      ce('h1',null,'About Us'),
      ce('br'),
      //Mission Statement
      ce('h2',null,"Why We're Here"),
      ce('br'),
      ce('h4',null,'Our Corporate Mission is to Empower Individuals Worldwide to Enjoy Girl Scout Cookies(TM) in any Way Possible'),
      ce('br'),
      //Vision for Future
      ce('h2',null,"Our Vision For The Future"),
      ce('br'),
      'We envision a bright future where anyone and everyone may enjoy delicious Girl Scout Cookies (TM).',
      '  By connecting customers with Girl Scout Troops of their area, we will be able to ensure the enjoyment of cookies throughout the United States and eventually the world',
      ce('br'),
      //Company History
      ce('h2',null,'Our History'),
      ce('br'),
      'Founded in 2017 by a group of visionaries, we at _______ quickly expanded from our home in San Antonio into the surrounding areas of Central Texas.  Since then, the team as expanded rapidly and __________',
      //Photos and descriptions for us
      ce('h2',null,'Who We Are')
    );
  }
}

class CookieComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    //Featured cookie bar (images with names)
    //Scroll through cookie images and descriptions

  }
}

class LoginCustComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {username: "", password: "", loginErrorInfo: ""};
  }

  render(){
    ce('form', {id = "cust_login"},
      ce('h2',null,'Login'),
      'Username:',ce('input',{type: "text", value: this.state.username, onChange: e => this.typingHandler(e)}),
      ce('br'),'Password:',ce('input',{type: "text", value: this.state.password, onChange: e => this.typingHandler(e)}),
      ce('br'), ce('button', {onClick: e => login(e)}, 'Login'),
      //ce('a', {href: ""},'Click here to create a new account'),
      //ce('a', {href: ""},'Click here to access the troop login')
    );
  }

  typingHandler(e) {
    this.setState({[e.target['id']]: e.target.value});
    console.log([e.target['id']]);
  }

  login(e) {
    const username = this.state.username;
    const password = this.state.password;
    fetch(validateCustRoute, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
        body: JSON.stringify({username, password})
    }).then(res => res.json()).then(data => {
      console.log(data);
      if(data) {
        //switch to customer page
      } else {
        this.setState({loginErrorInfo: "Do not pass GO"});
      }
    });
  }
}

class LoginTroopComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {troop_no: "", password: "", loginErrorInfo: ""};
  }

  render(){
    ce('form', {id = "troop_login"},
      ce('h2',null,'Troop Login'),
      'Troop No.:',ce('input',{type: "text", value: this.state.troop_no, onChange: e => this.typingHandler(e)}),
      ce('br'),'Password:',ce('input',{type: "text", value: this.state.password, onChange: e => this.typingHandler(e)}),
      ce('br'), ce('button', {onClick: e => login(e)}, 'Login')
      //ce('a', {href: ""},'Click here to create a new account'),
      //ce('a', {href: ""},'Click here to access the troop login')
    );
  }

  typingHandler(e) {
    this.setState({[e.target['id']]: e.target.value});
    console.log([e.target['id']]);
  }

  login(e) {
    const no = this.state.troop_no;
    const pass = this.state.password;
    fetch(validateTroopRoute, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
        body: JSON.stringify({no, pass})
    }).then(res => res.json()).then(data => {
      console.log(data);
      if(data) {
        //switch to troop page
      } else {
        this.setState({loginErrorInfo: "Do not pass GO"});
      }
    });
  }
}

class NewTroopComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {troop_no: "", password: "", email: "", address: "", createErrorInfo: ""};
  }

  render(){
    //no,pass,email,address
    ce('form', {id = "create_troop"},
      ce('h2',null,'Create a Troop Account'),
      'Troop No.:',ce('input',{type: "text", value: this.state.troop_no, onChange: e => this.typingHandler(e)}),
      ce('br'),'Password:',ce('input',{type: "text", value: this.state.password, onChange: e => this.typingHandler(e)}),
      'Email:',ce('input',{type: "text", value: this.state.email, onChange: e => this.typingHandler(e)}),
      ce('br'),'Address:',ce('input',{type: "text", value: this.state.address, onChange: e => this.typingHandler(e)}),
      ce('br'), ce('button', {onClick: e => makeUser()}, 'Create Account')
      //ce('a', {href: ""},'Click here to create a new account'),
      //ce('a', {href: ""},'Click here to access the troop login')
    );
  }

  typingHandler(e) {
    this.setState({[e.target['id']]: e.target.value});
    console.log([e.target['id']]);
  }

  makeUser() {
    const ntroop = this.state.troop_no;
    const npass = this.state.password;
    const temail = this.state.email;
    const taddress = this.state.address;
    fetch(newCustRoute, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
        body: JSON.stringify({"user": ntroop , "pass": npass, "email": temail, "address": taddress })
    }).then(res => res.json()).then(data => {
      if(data) {
        //switch to troop page
      } else {
        this.setState({createErrorInfo: "You are not welcome here"});
      }
    });
  }
}

class NewCustComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: "", username: "", password: "", email: "", troop: "", createErrorInfo: ""};
  }

  render(){
    //name,user,pass,email,troop
    ce('form', {id = "create_customer"},
      ce('h2',null,'Create a Customer Account'),
      'Name:',ce('input',{type: "text", value: this.state.name, onChange: e => this.typingHandler(e)}),
      'Username:',ce('input',{type: "text", value: this.state.username, onChange: e => this.typingHandler(e)}),
      ce('br'),'Password:',ce('input',{type: "text", value: this.state.password, onChange: e => this.typingHandler(e)}),
      'Email:',ce('input',{type: "text", value: this.state.email, onChange: e => this.typingHandler(e)}),
      ce('br'),'Troop:',ce('input',{type: "text", value: this.state.troop, onChange: e => this.typingHandler(e)}),
      ce('br'), ce('button', {onClick: e => makeUser()}, 'Create Account')
      //ce('a', {href: ""},'Click here to create a new account'),
      //ce('a', {href: ""},'Click here to access the troop login')
    );
  }

  makeUser() {
    const nname = this.state.name;
    const nuser = this.state.username;
    const npass = this.state.password;
    const cemail = this.state.email;
    const troop = this.state.troop;
    fetch(newCustRoute, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
        body: JSON.stringify({"name": nname, "user": nuser , "pass": npass, "email": cemail, "troop": troop })
    }).then(res => res.json()).then(data => {
      if(data) {
        //switch to cust page
      } else {
        this.setState({createErrorInfo: "You are not welcome here"});
      }
    });
}

class ContactComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: "", email: "", message: ""};
  }

  render(){
    //central box
    ce('form', {id = "contact_us"},
      ce('h2',null,'Contact Us'),
      ce('p',null,'We would love to hear from you! Our typical response time is <never>'),
      'Name:',ce('input',{type: "text", value: this.state.name, onChange: e => this.typingHandler(e)}),
      ce('br'),'Email:',ce('input',{type: "text", value: this.state.email, onChange: e => this.typingHandler(e)}),
      ce('br'),'Comments:',ce('input',{type: "text", value: this.state.message, onChange: e => this.typingHandler(e)}),
      ce('br'), ce('button', null, 'Send')
    );
  }

  typingHandler(e) {
    this.setState({[e.target['id']]: e.target.value});
    console.log([e.target['id']]);
  }
}

ReactDOM.render(
  React.createElement(ApplicationMainComponent, null, null),
  document.getElementById('main-root')
);
