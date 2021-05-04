"use strict"

const ce = React.createElement;
const csrfToken = document.getElementById("csrfToken").value;
const logInCust = document.getElementById("custLoginRoute").value;
const logOutCust = document.getElementById("custLogoutRoute").value;
const logInTroop = document.getElementById("troopLoginRoute").value;
const logOutTroop = document.getElementById("troopLogoutRoute").value;
const addCust = document.getElementById("newCustRoute").value;
const addTroop = document.getElementById("newTroopRoute").value;
const getAllCookies = document.getElementById("getCookiesRoute").value;


class ApplicationMainComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {page: "H"};
  }

  render(){
    switch(this.state) {
      case "H": ce('div', 'null', ce(HeaderComponent), ce(HomeComponent, {changePage: s => this.setState({page: s})}), ce(BaseComponent));
      case "About": ce('div', 'null', ce(HeaderComponent), ce(AboutComponent, {changePage: s => this.setState({page: s})}), ce(BaseComponent));
      case "Cookies": ce('div', 'null', ce(HeaderComponent), ce(CookieComponent, {changePage: s => this.setState({page: s})}), ce(BaseComponent));
      case "Login": ce('div', 'null', ce(HeaderComponent), ce(LoginComponent, {changePage: s => this.setState({page: s})}), ce(BaseComponent));
      case "Contact": ce('div', 'null', ce(HeaderComponent), ce(ContactComponent, {changePage: s => this.setState({page: s})}), ce(BaseComponent));
    }
  }

}

class HeaderComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {current_page: "H"};
  }

  render(){
    ce('div', 'null', ce('h2', null, 'Cyber'), ce('h3', null, 'Cookies'),
      ce('div',{id: "navbar_home"},
        ce('button', {onClick: e => changePage("H")}, 'Home'),
        ce('button', {onClick: e => changePage("About")}, 'About Us'),
        ce('button', {onClick: e => changePage("Cookies")}, 'Cookies'),
        ce('button', {onClick: e => changePage("Login")}, 'Login'),
        //login button dropdown menu needs to be implemented
        ce('button', {onClick: e => changePage("Contact")}, 'Contact Us')
      )
    );
  }
}

class BaseComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    ce('div', 'null',
      ce('div',{id: "basebar_home"},
        //links to troop login and customer login
      )
    );
  }
}

class HomeComponent extends React.Component {
  constructor(props){
    super(props);
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
      //Mission Statement
      //Vision for Future
      //Company History
      //Photos and descriptions for us
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

class LoginComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    //two login pages- troop and customer
    //also need create user
  }
}

class ContactComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: "", email: "", message: ""};
  }

  render(){
    //central box
    ce('div', {id = "contact_us"},
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
