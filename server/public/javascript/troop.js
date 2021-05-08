
"use strict"

const ce = React.createElement;
const csrfToken = document.getElementById("csrfToken").value;
// const validateTroop=document.getElementById("troopValidateRoute").value;
// const addTroop=document.getElementById("addTroopRoute").value;
// const allOrders=document.getElementById("allOrdersRoute").value;
// const OutStock=document.getElementById("OutStockRoute").value;
// const AllStock=document.getElementById("AllStockRoute").value;
// const allTrans=document.getElementById("TroopTransRoute").value;
// const sales=document.getElementById("TroopSalesRoute").value;
// const addStock=document.getElementById("AddStockRoute").value;

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
      return ce(LoginTroopComponent,{doLogin: ()=>this.setState({loggedIn:true})});
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
          //ce('button', {onClick: e => this.handleChange(e,"H")}, 'Logout')//TODO log out feature
          ce('button',{onClick: e=> this.props.doLogout()}, 'Log Out')
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
      new_username: "",
      new_password: "",
      createErrorInfo: ""
    };
  }
  render(){
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
    ce('span', {id: "create-message"}, this.state.createErrorInfo),
    ce('br'), ce('button', {onClick: e => transferTroop(e)}, 'Click here for the regular login page')
    );
  }
   transferTroop(e){//TODO fix
     ce('Redirect',{to: custPage});
   }

  typingHandler(e) {
    this.setState({[e.target['id']]: e.target.value});
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
        this.props.doLogin();
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
        this.props.doLogin();
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
   
  }
}

class HomeComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={orders: ["test order 1", "test order 2"], out: ["test out 1", "test out 2"]};
  }

  compmonentDidMount(){
    this.loadOrders();
    this.loadOut();
  }
  render(){
    return ce('div',null,
      ce('h2', null, 'Upcoming Orders'),
      ce('div',{id:"order_details"},
        ce('ul',null,this.state.orders.map((order,index)=>ce('li',{key:index},order)))
      ),
    ce('br'),
      ce('h2', null, 'Out of Stock Cookies'),
      ce('div',{id:"out_stock_details"},ce('ul',null,this.state.out.map((order,index)=>ce('li',{key:index},order))))
      
    );
  }

  loadOrders(){
    //TODO load all orders from troop
    //fetch allOrders
  }


  loadOut(){
    //TODO load all out of stock cookies
    //fetch all OutStock
  }

}

class StockComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Stock:["TEST stock 1", "test stock 2"],
      new_cookie:"",
      new_amount:""
    };
  }
  compmonentDidMount(){
    loadStock();
  }

  render(){
    return ce('div', null,
      ce('h2',null, 'Current Stock'),
      ce('div',{id:'Current_Stock'},
        ce('ul',null,this.state.Stock.map((stock,index)=>ce('li',{key:index},stock)))),
      ce('h2',null,'Enter Inventory'),
      ce('div',{id:'Enter_Inventory'},
          ce('input',{type:'text',id:"new_cookie",value:this.state.new_cookie,onChange: e=>this.typingHandler(e)}),
          ce('br'),
          ce('input',{type:'text',id:"new_amount",value:this.state.new_amount,onChange: e=>this.typingHandler(e)}),
          ce('br'),
          ce('button',{onClick:e=>this.SendStock(e)},'Update Stock'))
    );
  }
  loadStock(){
    //TODO load the current stock of all cookies
    //fetch AllStock
  }
  SendStock(e){
    //TODO
  }
  typingHandler(e) {
    this.setState({[e.target['id']]: e.target.value});
    
  }
}

class BookKeepingComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //TODO figure out what will be tracked
      transactions:["Test transaction 1", "Test Transaction 2"],
      sales:["Test Sale1", "Test Sale2"]
    };
  }
  compmonentDidMount(){
    this.loadTrans();
    this.loadSales();
  }
  render(){
    return ce('div',null,
      ce('h2',null, 'Transaction List'),
      ce('div',{id:'Transac_List'},
      ce('ul', null,this.state.transactions.map((message, index) => ce('li', { key: index }, message))),
      ce('br')),//TODO flesh out div
      ce('h2',null,'Monthly Sales'),
      ce('div',{id:'Month_Sales'},ce('ul', null,this.state.sales.map((message, index) => ce('li', { key: index }, message))))//TODO flesh out div
    
    );
  }

  loadTrans(){
    //TODO load all transactions into list 
    //fetch allTrans
  }

  loadSales(){
    //TODO fill out summary div
    //fetch sales
  }
}


ReactDOM.render(
  React.createElement(TroopMainComponent, null, null),
  document.getElementById('troop-root')
);
