"use strict"

const ce = React.createElement;
const csrfToken = document.getElementById("csrfToken").value;
const getAllCookies = document.getElementById("getCookiesRoute").value;
const custPage = document.getElementById("custPageRoute").value;
const troopPage = document.getElementById("troopPageRoute").value;

class ApplicationMainComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {page: "H"};
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page){
    console.log(page);
    this.setState({page});
  }

  render(){
    console.log(this.state.page);
    switch(this.state.page) {
      case "H": return ce('div', null, ce(HeaderComponent, {changePage: this.handlePageChange}), ce(HomeComponent));
      case "About": return ce('div', null, ce(HeaderComponent, {changePage: this.handlePageChange}), ce(AboutComponent));
      case "Cookies": return ce('div', null, ce(HeaderComponent, {changePage: this.handlePageChange}), ce(CookieComponent));
      case "Contact": return ce('div', null, ce(HeaderComponent, {changePage: this.handlePageChange}), ce(ContactComponent));
      case _: return ce('p',null,'FAIL');
    }
  }

}

class HeaderComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {showMenu: false};

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //changePage(str){
    //super.setState({page: str});
  //}

  handleChange(e, str) {
    this.props.changePage(str);
  }

  render(){
    if(this.state.showMenu){
      return ce('div', 'null', ce('h2', null, 'CyberCookies'),
        ce('nav',{id: "navbar_home"},
          ce('button', {onClick: e => this.handleChange(e,"H")}, 'Home'),
          ce('button', {onClick: e => this.handleChange(e,"About")}, 'About Us'),
          ce('button', {onClick: e => this.handleChange(e,"Cookies")}, 'Cookies'),
          ce('button', {onClick: e => this.showMenu(e)}, 'Login'),
          ce('div', {className: "menu",ref: element => {this.dropdownMenu = element}},
            ce('button',{onClick: e => this.transferCust(e)},'Customer Login'),
            ce('button',{onClick: e => this.transferTroop(e)},'Troop Login'),
          ),
          ce('button', {onClick: e => this.handleChange(e,"Contact")}, 'Contact Us')
        )
      );
    } else {
      return ce('div', 'null', ce('h2', null, 'CyberCookies'),
        ce('nav',{id: "navbar_home"},
          ce('button', {onClick: e => this.handleChange(e,"H")}, 'Home'),
          ce('button', {onClick: e => this.handleChange(e,"About")}, 'About Us'),
          ce('button', {onClick: e => this.handleChange(e,"Cookies")}, 'Cookies'),
          ce('button', {onClick: e => this.showMenu(e)}, 'Login'),
          ce('button', {onClick: e => this.handleChange(e,"Contact")}, 'Contact Us')
        )
      );
    }
  }

  transferCust(e){
    ce('Redirect',{to: custPage});
  }

  transferTroop(e){
    ce('Redirect',{to: troopPage});
  }

  showMenu(e){
      e.preventDefault();

      this.setState({showMenu: true}, () => {
        document.addEventListener('click',this.closeMenu);
      });
  }

  closeMenu(e) {
    if(!this.dropdownMenu.contains(e.target)){
      this.setState({showMenu: false}, () => {document.removeEventListener('click',this.closeMenu);});
    }
  }
}

class HomeComponent extends React.Component {
  constructor(props){
    super(props);
  }

  //componentDidMount(){
    //load cookies
  //}

  render(){
    console.log("rendering home");
    return ce('div',null,
      ce('h3',null,'Welcome one and all to your virtual connection with your girl scout cookie dealer'),
      ce('h5',null,'Most Popular Cookies'),
      ce('div',{id: "cookie_bar"},
        ce('img', {src: "images/ThinMints.jpg"},null)
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
    return ce('div', null,
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
    return ce('div',{id:"cookies"},null);
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

ReactDOM.render(
  React.createElement(ApplicationMainComponent, null, null),
  document.getElementById('main-root')
);
