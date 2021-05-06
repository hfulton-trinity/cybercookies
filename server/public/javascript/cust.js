"use strict"

const ce = React.createElement;
const csrfToken = document.getElementById("csrfToken").value;
const logInCust = document.getElementById("custLoginRoute").value;
const addCust = document.getElementById("newCustRoute").value;



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
    fetch(logInCust, {
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
    fetch(addCust, {
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
}
