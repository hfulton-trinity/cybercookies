"use strict"

const ce = React.createElement;
const csrfToken = document.getElementById("csrfToken").value;
const getAllCookies = document.getElementById("getCookiesRoute").value;
const custPage = document.getElementById("custPageRoute").value;
const troopPage = document.getElementById("troopPageRoute").value;
const thinmint = document.getElementById("thinmint").value;
const tagalong = document.getElementById("tagalong").value;
const samoas = document.getElementById("samoas").value;
const smores = document.getElementById("smores").value;
const toffeetastic = document.getElementById("toffeetastic").value;
const toast = document.getElementById("toast-yay").value;
const shortbread = document.getElementById("shortbreadtrefoils").value;
const lemonups = document.getElementById("lemonups").value;
const lemonades = document.getElementById("lemonades").value;
const dosidos = document.getElementById("dosidos").value;
const caramelchoc = document.getElementById("caramelchocchip").value;
const abcsmores = document.getElementById("abcsmores").value;
const employees = document.getElementById("employees").value;
const cookie_imgs = [thinmint, tagalong, samoas, smores, toffeetastic, toast, shortbread, lemonups, lemonades, dosidos, caramelchoc, abcsmores];

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
        ce('nav',{className: "navbar_home"},
          ce('button', {onClick: e => this.handleChange(e,"H")}, 'Home'),
          ce('button', {onClick: e => this.handleChange(e,"About")}, 'About Us'),
          ce('button', {onClick: e => this.handleChange(e,"Cookies")}, 'Cookies'),
          ce('div',{className: "dropdown"},
            ce('button', {onClick: e => this.showMenu(e)}, 'Login'),
            ce('div', {className: "menu",ref: element => {this.dropdownMenu = element}},
              ce('a',{href: '/customer'},'Customer Login'),
              ce('a',{href: '/troop'},'Troop Login'),
            )
          ),
          ce('button', {onClick: e => this.handleChange(e,"Contact")}, 'Contact Us')
        )
      );
    } else {
      return ce('div', 'null', ce('h2', null, 'CyberCookies'),
        ce('nav',{className: "navbar_home"},
          ce('button', {onClick: e => this.handleChange(e,"H")}, 'Home'),
          ce('button', {onClick: e => this.handleChange(e,"About")}, 'About Us'),
          ce('button', {onClick: e => this.handleChange(e,"Cookies")}, 'Cookies'),
          ce('button', {onClick: e => this.showMenu(e)}, 'Login'),
          ce('button', {onClick: e => this.handleChange(e,"Contact")}, 'Contact Us')
        )
      );
    }
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

  render(){
    console.log("rendering home");
    return ce('div',{className: "home_component"},
      ce('h3',null,'Welcome one and all to your virtual connection with your girl scout cookie dealer'),
      ce('h5',null,'Most Popular Cookies'),
      ce('div',{className: "cookie_bar"},
        ce('img', {src: thinmint, alt: "Thin Mint", width: 400},null),
        ce('img', {src: tagalong, alt: "Tagalong", width: 400},null),
        ce('img', {src: samoas, alt: "Samoas", width: 400},null),
        ce('img', {src: smores, alt: "Smores", width: 400},null)
        //hover method?
      )
    );
  }
}

class AboutComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return ce('div', {className: "about_component"},
      ce('h2',null,'About Us'),
      ce('br'),
      //Mission Statement
      ce('h2',null,"Why We're Here"),
      ce('br'),
      ce('h3',null,'Our Corporate Mission is to Empower Individuals Worldwide to Enjoy Girl Scout Cookies™ in any Way Possible'),
      ce('br'),
      //Vision for Future
      ce('h2',null,"Our Vision For The Future"),
      ce('br'),
      ce('h3',null,'We envision a bright future where anyone and everyone may enjoy delicious Girl Scout Cookies ™. By connecting customers with Girl Scout Troops of their area, we will be able to ensure the enjoyment of cookies throughout the United States and eventually the world'),
      ce('br'),
      //Company History- 
      ce('h2',null,'Our History'),
      ce('br'),
      ce('h3',null,'Founded in 1719 by a group of visionaries, we at CyberCookies quickly expanded from our home in San Antonio into the surrounding areas of Central Texas.  Since then, the team has expanded rapidly and we look forward to a bright future.'),
      //Photos and descriptions for us
      ce('h2',null,'Who We Are'),
      ce('img', {id: "employee_bios", src: employees, width: 1000},null)
    );
  }
}
//Needs testing
class CookieComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cookies: ["Thin Mint: a thin mint cookie,0"]
    };
  }

  componentDidMount(){
    this.loadCookies();
  }

  render(){
    return ce('div',{className:"cookies"},
      ce('div',{className:"featured_cookies"},
        ce('h2', null, 'Featured Cookies:'),
        ce('img', {src: thinmint, alt: "Thin Mint", width: 400},null),
        ce('img', {src: tagalong, alt: "Tagalong", width: 400},null),
        ce('img', {src: samoas, alt: "Samoas", width: 400},null),
        ce('img', {src: smores, alt: "Smores", width: 400},null),
        ce('br'),
        'Cookies shown above (left to right): Thin Mints, Tagalongs, Samoas, Smores'
      ), ce('div',{className:"all_cookies"},
        ce('h2', null, 'All Cookies:'),
        ce('ul', null,
          this.state.cookies.map((cookie_details,index) => ce('li', {key: index},ce('img',{src: cookie_imgs[cookie_details.split(',')[1]], alt: "", width: 200},null),ce('p',null,cookie_details.split(',')[0])))
            //)
          //)
        )
      )
    );
  }

  loadCookies(){
    console.log("getting cookies");
    fetch(getAllCookies).then(res=>res.json()).then(cookies => this.setState({cookies}));
    console.log(this.state.cookies);
  }
}

class ContactComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {name: "", email: "", message: ""};
  }

  render(){
    return ce('div', {className: "contact_us"},
      ce('h2',null,'Contact Us'),
      ce('p',null,'We would love to hear from you! Our typical response time is <never>'),
      'Name:',ce('input',{type: "text", id: "name", value: this.state.name, onChange: e => this.typingHandler(e)}),
      ce('br'),'Email:',ce('input',{type: "text", id: "email", value: this.state.email, onChange: e => this.typingHandler(e)}),
      ce('br'),'Comments:',ce('input',{type: "text", id: "message", value: this.state.message, onChange: e => this.typingHandler(e)}),
      ce('br'), ce('button', {onClick: e => this.contact(e)}, 'Send')
    );
  }

  typingHandler(e) {
    this.setState({[e.target['id']]: e.target.value});
    console.log([e.target['id']]);
  }

  contact(e) {
    this.setState({name: "", email: "", message: ""});
  }
}

ReactDOM.render(
  React.createElement(ApplicationMainComponent, null, null),
  document.getElementById('main-root')
);
