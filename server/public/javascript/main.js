"use strict"

import {Redirect} from 'react-router-dom'

const ce = React.createElement;
const csrfToken = document.getElementById("csrfToken").value;
const getAllCookies = document.getElementById("getCookiesRoute").value;
const custPage = document.getElementById("custPageRoute").value;
const troopPage = document.getElementById("troopPageRoute").value;


class ApplicationMainComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {page: "H", login: ""};
  }

  render(){
    switch(this.state.page) {
      case "H": ce('div', 'null', ce(HeaderComponent), ce(HomeComponent, {changePage: page => this.setState(page)}));
      case "About": ce('div', 'null', ce(HeaderComponent), ce(AboutComponent, {changePage: page => this.setState(page)}));
      case "Cookies": ce('div', 'null', ce(HeaderComponent), ce(CookieComponent, {changePage: page => this.setState(page)}));
      case "Contact": ce('div', 'null', ce(HeaderComponent), ce(ContactComponent, {changePage: page => this.setState(page)}));
    }
  }

}

class HeaderComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {showMenu: false};

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  render(){
    if(this.state.showMenu){
      ce('div', 'null', ce('h2', null, 'Cyber',ce('h3', null, 'Cookies')),
        ce('nav',{id: "navbar_home"},
          ce('button', {onClick: e => changePage("H")}, 'Home'),
          ce('button', {onClick: e => changePage("About")}, 'About Us'),
          ce('button', {onClick: e => changePage("Cookies")}, 'Cookies'),
          ce('button', {onClick: e => showMenu(e)}, 'Login'),
          ce('div', {className="menu",ref={(element) => this.dropdownMenu = element;}},
            ce('button',{onClick: e => transferCust(e)},'Customer Login'),
            ce('button',{onClick: e => transferTroop(e)},'Troop Login'),
          ),
          ce('button', {onClick: e => changePage("Contact")}, 'Contact Us')
        )
      );
    } else {
      ce('div', 'null', ce('h2', null, 'Cyber',ce('h3', null, 'Cookies')),
        ce('nav',{id: "navbar_home"},
          ce('button', {onClick: e => changePage("H")}, 'Home'),
          ce('button', {onClick: e => changePage("About")}, 'About Us'),
          ce('button', {onClick: e => changePage("Cookies")}, 'Cookies'),
          ce('button', {onClick: e => showMenu(e)}, 'Login'),
          ce('button', {onClick: e => changePage("Contact")}, 'Contact Us')
        )
      );
    }
  }

  transferCust(e){
    ce('Redirect',{to=custPage});
  }

  transferTroop(e){
    ce('Redirect',{to=troopPage});
  }

  showMenu(e){
      e.preventDefault();

      this.setState({showMenu: true}, () => {
        document.addEventListener('click',this.closeMenu);
      });
  }

  closeMenu(e) {
    if(!this.dropdownMenu.contains(event.target)){
      this.setState({showMenu: false}, () => {document.removeEventListener('click',this.closeMenu);});
    }
  }
}

class HomeComponent extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    //load cookies
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
      //Company History- NEEDS WORK
      ce('h2',null,'Our History'),
      ce('br'),
      'Founded in 2017 by a group of visionaries, we at _______ quickly expanded from our home in San Antonio into the surrounding areas of Central Texas.  Since then, the team as expanded rapidly and __________',
      //Photos and descriptions for us
      ce('h2',null,'Who We Are')
      //INSERT photos and descriptions
    );
  }
}

class CookieComponent extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    //load cookies
  }

  render(){
    //Featured cookie bar (images with names)
    //Scroll through cookie images and descriptions

  }
}

class ContactComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: "", email: "", message: ""};
  }

  render(){
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
