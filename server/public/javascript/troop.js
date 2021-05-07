
"use strict"

const ce = React.createElement;
const csrfToken = document.getElementById("csrfToken").value;
//const logInCust = document.getElementById("custLoginRoute").value;
//const addTroop = document.getElementById("newTroopRoute").value;

class TroopMainComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {page: "H", loggedIn: true};
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page){
    console.log(page);
    this.setState({page});
  }

  render(){
    if(this.state.loggedIn){
      console.log(this.state.page);
      switch(this.state.page) {
        case "H": return ce('div', null, ce(HeaderComponent, {changePage: this.handlePageChange}),ce(HomeComponent));
        case "Stock": return ce('div', null, ce(HeaderComponent, {changePage: this.handlePageChange}), ce(StockComponent));
        case "BookKeeping": return ce('div', null, ce(HeaderComponent, {changePage: this.handlePageChange}), ce(BookKeepingComponent));
        case "Contact": return ce('div', null, ce(HeaderComponent, {changePage: this.handlePageChange}), ce(ContactComponent));
        default: return ce('p',null,'FAIL');
      }
    } else {
      return ce('div', null, ce(LoginTroopComponent));
    }
  }

}
//Header component- from main- done
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
          ce('button', {onClick: e => this.handleChange(e,"Stock")}, 'SetStock'),
          ce('button', {onClick: e => this.handleChange(e,"BookKeeping")}, 'BookKeeping'),
          ce('button', {onClick: e => this.handleChange(e,"Contact")}, 'Contact Us'),
          ce('button', {onClick: e => this.handleChange(e,"H")}, 'Logout')
        )
    );
  }
}

class LoginTroopComponent extends React.Component {
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
      troop: 0,
      createErrorInfo: ""
    };
  }
  render(){
    return ce('div', null, 
    ce('h2', null, 'Login'),
    ce('br'),
    'Username: ', 
    ce('input', {type: "text", id: "loginName", value: this.state.username, onChange: e => this.changerHandler(e)}),
    ce('br'),
    'Password: ',
    ce('input', {type: "password", id: "loginPass", value: this.state.password, onChange: e => this.changerHandler(e)}),
    ce('br'),
    ce('button', {onClick: e=> this.login(e)},'login'),
    ce('span', {id: "login-message"}, this.state.loginErrorInfo),
    ce('h2', null, 'Create User:'),
    ce('br'),
    'Username: ',
    ce('input', {type: "text", id: "createName", value: this.state.new_username, onChange: e => this.changerHandler(e)}),
    ce('br'),
    'Password: ',
    ce('input', {type: "password", id: "createPass", value: this.state.new_password, onChange: e => this.changerHandler(e)}),
    ce('br'),
    ce('button', {onClick: e => this.makeUser(e)}, 'Create User'),
    ce('span', {id: "create-message"}, this.state.createErrorInfo)
    );
  }
  transferTroop(e){
    ce('Redirect',{to: troopPage});
  }

  typingHandler(e) {
    this.setState({[e.target['id']]: e.target.value});
    console.log([e.target['id']]);
    console.log([e.target.value]);
  }
  changerHandler(e) {
    this.setState({ [e.target['id']]: e.target.value });
  }


  login(e) {
    const username = this.state.username;
    const password = this.state.password;
    fetch(logInTroop, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
        body: JSON.stringify({username, password})
    }).then(res => res.json()).then(data => {
      console.log(data);
      if(data) {
        //switch to Troop page
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
    fetch(addTroop, {
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

//Contact component- from main- done
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

class HomeComponent extends React.Component {
  constructor(props){
    super(props);
  }
  //need to load in things
  render(){
    return ce('div',null,
      ce('h2', null, 'Upcoming Orders'),
      ce('div',{id:"order_details"}),

      ce('h2', null, 'Out of Stock Cookies'),
      ce('div',{id:"out_stock_details"})
    
    
    );
    // return ce('div', null,
    //   ce('h2',null,'Next Scheduled Delivery'),
    //   ce('div',{id: "delivery_details"},
    //     'Troop: ', ce(),
    //     'Delivery Estimate: ', ce(), ' ', ce(),
    //     ce('link',{},'Click here to view order receipt')
    //   ),
    //   ce('h2',null,'Contact Your Troop'),
    //   ce('div',{id: "contact_troop"},
    //     'Your troop would love to hear from you with any questions or concerns.',
    //     ' In the case of special delivery instructions, accommodations are made on a case by case basis and are fulfilled at the troop’s discretion. ',
    //     ce('link',{},'Click here to email your troop directly'),', or feel free to use the Contact Us page if you would like to speak with corporate.'
    //   )
    // );
  }
}

class StockComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: ""
    };
  }

  render(){
    return ce('div', null,
      ce('h2',null, 'Current Stock'),
      ce('div',{id:'Current_Stock'}),//IDK how to have the input field for each cookie price actually change something
      ce('h2',null,'Enter Inventory'),
      ce('div',{id:'Enter_Inventory'})
    );
  }

  typingHandler(e) {
    this.setState({[e.target['id']]: e.target.value});
    console.log([e.target['id']]);
  }
}

class BookKeepingComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
  }

  render(){
    return ce('div',null,
      ce('h2',null, 'Transaction List'),
      ce('div',{id:'Transac_List'}),
      ce('h2',null,'Monthly Sales'),
      ce('div',{id:'Month_Sales'})
    
    );
  }

  //Transaction(customer: String, seller: Int, deliveryMethod: String, deliveryInstructions: String, address: Address, date_ordered: Date)
}


ReactDOM.render(
  React.createElement(TroopMainComponent, null, null),
  document.getElementById('troop-root')
);
