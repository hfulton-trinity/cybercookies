"use strict"

const ce = React.createElement;
const csrfToken = document.getElementById("csrfToken").value;


class ApplicationMainComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {page: "H"};
  }

  render(){
    switch(this.state) {
      case "H": ce(div, 'null', ce(HeaderComponent), ce(HomeComponent, {changePage: s => this.setState({page: s})}));
      case "About": ce(div, 'null', ce(HeaderComponent), ce(AboutComponent, {changePage: s => this.setState({page: s})}));
      case "Cookies": ce(div, 'null', ce(HeaderComponent), ce(CookieComponent, {changePage: s => this.setState({page: s})}));
      case "Login": ce(div, 'null', ce(HeaderComponent), ce(LoginComponent, {changePage: s => this.setState({page: s})}));
      case "Contact": ce(div, 'null', ce(HeaderComponent), ce(ContactComponent, {changePage: s => this.setState({page: s})}));
    }
  }

}

class HeaderComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {current_page: "H"};
  }

  render(){

  }
}

class HomeComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {current_page: "H"};
  }

  render(){

  }
}

class AboutComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {current_page: "H"};
  }

  render(){

  }
}

class CookieComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {current_page: "H"};
  }

  render(){

  }
}

class LoginComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {current_page: "H"};
  }

  render(){

  }
}

class ContactComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {current_page: "H"};
  }

  render(){

  }
}
