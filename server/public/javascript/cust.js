"use strict"

const ce = React.createElement;
const csrfToken = document.getElementById("csrfToken").value;
const logInCust = document.getElementById("custLoginRoute").value;
const addCust = document.getElementById("newCustRoute").value;

class CustomerMainComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {page: "H", loggedIn: false};
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page){
    console.log(page);
    this.setState({page});
  }

  render(){
    if(loggedIn){
      console.log(this.state.page);
      switch(this.state.page) {
        case "H": return ce('div', null, ce(HeaderComponent, {changePage: this.handlePageChange}), ce(HomeComponent));
        case "Order": return ce('div', null, ce(HeaderComponent, {changePage: this.handlePageChange}), ce(OrderComponent));
        case "Cart": return ce('div', null, ce(HeaderComponent, {changePage: this.handlePageChange}), ce(CartComponent));
        case "Contact": return ce('div', null, ce(HeaderComponent, {changePage: this.handlePageChange}), ce(ContactComponent));
        case _: return ce('p',null,'FAIL');
      }
    } else {
      return ce('div', null, ce(LoginCustComponent));
    }
  }

}

class HeaderComponent extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  //changePage(str){
    //super.setState({page: str});
  //}

  handleChange(e, str) {
    this.props.changePage(str);
  }

  render(){
    return ce('div', 'null', ce('h2', null, 'CyberCookies'),
        ce('nav',{id: "navbar_home"},
          ce('button', {onClick: e => this.handleChange(e,"H")}, 'Home'),
          ce('button', {onClick: e => this.handleChange(e,"Order")}, 'Place Order'),
          ce('button', {onClick: e => this.handleChange(e,"Cart")}, 'Cart'),
          ce('button', {onClick: e => this.handleChange(e,"Contact")}, 'Contact Us'),
          ce('button', {onClick: e => /*logout method*/}, 'Logout')
        )
    );
  }
}

class LoginCustComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "", 
      password: "", 
      loginErrorInfo: "",
      name: "",
      new_username: "", 
      new_password: "", 
      email: "", 
      troop: "", 
      createErrorInfo: ""
    };
  }

  render(){
    return ce('div', null, ce('form', {id = "cust_login"},
        ce('h2',null,'Login'),
        'Username:',ce('input',{type: "text", value: this.state.username, onChange: e => this.typingHandler(e)}),
        ce('br'),'Password:',ce('input',{type: "text", value: this.state.password, onChange: e => this.typingHandler(e)}),
        ce('br'), ce('button', {onClick: e => login(e)}, 'Login'), ce('br')
      ), ce('form', {id = "create_customer"},
        ce('h2',null,'Create a Customer Account'),
        'Name:',ce('input',{type: "text", value: this.state.name, onChange: e => this.typingHandler(e)}),
        'Username:',ce('input',{type: "text", value: this.state.new_username, onChange: e => this.typingHandler(e)}),
        ce('br'),'Password:',ce('input',{type: "text", value: this.state.new_password, onChange: e => this.typingHandler(e)}),
        'Email:',ce('input',{type: "text", value: this.state.email, onChange: e => this.typingHandler(e)}),
        ce('br'),'Troop:',ce('input',{type: "text", value: this.state.troop, onChange: e => this.typingHandler(e)}),
        ce('br'), ce('button', {onClick: e => makeUser()}, 'Create Account')
      ), ce('br'), ce('button', {onClick: e => transferTroop(e)}, 'Click here if you are a troop')
    );
  }

  transferTroop(e){
    ce('Redirect',{to: troopPage});
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

  makeUser() {
    const nname = this.state.name;
    const nuser = this.state.new_username;
    const npass = this.state.new_password;
    const cemail = this.state.email;
    const troop = this.state.troop;
    fetch(addCust, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
        body: JSON.stringify({"name": nname, "user": nuser , "pass": npass, "email": cemail, "troop": troop })
    }).then(res => res.json()).then(data => {
      if(data) {

      } else {
        this.setState({createErrorInfo: "You are not welcome here"});
      }
    });
  }
}

class ContactComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: "", email: "", message: ""};
  }

  render(){
    return ce('form', {id: "contact_us"},
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

class OrderComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){

  }
}

class CartComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    
  }
}

ReactDOM.render(
  React.createElement(CustomerMainComponent, null, null),
  document.getElementById('main-root')
);
