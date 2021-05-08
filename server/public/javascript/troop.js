
"use strict"

const ce = React.createElement;
const csrfToken = document.getElementById("csrfToken").value;
//const logInCust = document.getElementById("custLoginRoute").value;
//const addTroop = document.getElementById("newTroopRoute").value;

class TroopMainComponent extends React.Component {
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
  render(){//TODO fix changerHandler
    return ce('div', null, 
    ce('h2', null, 'Login'),
    ce('br'),
    'Username: ', 
    ce('input', {type: "text", id: "username", value: this.state.username, onChange: e => this.changerHandler(e)}),
    ce('br'),
    'Password: ',
    ce('input', {type: "password", id: "password", value: this.state.password, onChange: e => this.changerHandler(e)}),
    ce('br'),
    ce('button', {onClick: e=> this.login(e)},'login'),
    ce('span', {id: "login-message"}, this.state.loginErrorInfo),
    ce('h2', null, 'Create User:'),
    ce('br'),
    'Username: ',
    ce('input', {type: "text", id: "new_username", value: this.state.new_username, onChange: e => this.changerHandler(e)}),
    ce('br'),
    'Password: ',
    ce('input', {type: "password", id: "new_password", value: this.state.new_password, onChange: e => this.changerHandler(e)}),
    ce('br'),
    ce('button', {onClick: e => this.makeUser(e)}, 'Create User'),
    ce('span', {id: "create-message"}, this.state.createErrorInfo)
    );
  }
  // transferTroop(e){
  //   ce('Redirect',{to: troopPage});
  // }

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
        //fill in relevant info
        //switch to Troop page//TODO
      } else {
        this.setState({loginErrorInfo: "Login Failed"});
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
        //fill in relevant info
        //TODO switch to Troop Page
      } else {
        this.setState({createErrorInfo: "Make New Troop Failed"});
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
      ce('p',null,'For general suggestions only.  For technical problems, idk figure it out.  Our typical response time is <never>!'),
      'Name:',ce('input',{type: "text",  id: "name",value: this.state.name, onChange: e => this.typingHandler(e)}),
      ce('br'),'Email:',ce('input',{type: "text", id:"email", value: this.state.email, onChange: e => this.typingHandler(e)}),
      ce('br'),'Comments:',ce('input',{type: "text",id:"message", value: this.state.message, onChange: e => this.typingHandler(e)}),
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
    this.state={orders: [], out: []};
  }

  compmonentDidMount(){
    this.loadOrders();
    this.loadOut();
  }
  render(){
    return ce('div',null,
      ce('h2', null, 'Upcoming Orders'),
      ce('div',{id:"order_details"}),//TODO flesh out div

      ce('h2', null, 'Out of Stock Cookies'),
      ce('div',{id:"out_stock_details"})//TODO flesh out div
    
    
    );

  }

  loadOrders(){
    //TODO load all orders from troop
  }


  loadOut(){
    //TODO load all out of stock cookies
  }





}

class StockComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //TODO figure out states
    };
  }
  compmonentDidMount(){
    loadStock();
  }

  render(){
    return ce('div', null,
      ce('h2',null, 'Current Stock'),
      ce('div',{id:'Current_Stock'}),//TODO fill out div
      ce('h2',null,'Enter Inventory'),
      ce('div',{id:'Enter_Inventory'})//TODO fill out div// Inputs that send message
    );
  }
  loadStock(){
    //TODO load the current stock of all cookies
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
      //TODO figure out what will be tracked
    };
  }
  compmonentDidMount(){
    this.loadTrans();
    this.loadSales();
  }
  render(){
    return ce('div',null,
      ce('h2',null, 'Transaction List'),
      ce('div',{id:'Transac_List'}),//TODO flesh out div
      ce('h2',null,'Monthly Sales'),
      ce('div',{id:'Month_Sales'})//TODO flesh out div
    
    );
  }

  loadTrans(){
    //TODO load all transactions into list  
  }

  loadSales(){
    //TODO fill out summary div
  }
}


ReactDOM.render(
  React.createElement(TroopMainComponent, null, null),
  document.getElementById('troop-root')
);
