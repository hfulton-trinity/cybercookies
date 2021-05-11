
"use strict"

const ce = React.createElement;
const csrfToken = document.getElementById("csrfToken").value;
 const validateTroop=document.getElementById("troopValidateRoute").value;
 const addTroop=document.getElementById("addTroopRoute").value;
 const allOrders=document.getElementById("allOrdersRoute").value;
 const OutStock=document.getElementById("OutStockRoute").value;
 const AllStock=document.getElementById("AllStockRoute").value;
 const salesRoute=document.getElementById("TroopSalesRoute").value;
 const addStock=document.getElementById("AddStockRoute").value;

class TroopMainComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {page: "H", loggedIn: true};
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page){
   // console.log(page);
    this.setState({page});
  }

  render(){
    if(this.state.loggedIn){
     // console.log(this.state.page);
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
    //return null;
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
      username: 0,
      password: "",
      loginErrorInfo: "",
      new_username: 0,
      new_password: "",
      createErrorInfo: "",
      new_addy:"",
      new_zip:"",
      new_city:"",
      new_state:"",
      restock:"",
      email:""
    };
  }
  render(){
    return ce('div', null, 
    ce('h2', null, 'Login'),
    ce('br'),
    'Troop Number: ', 
    ce('input', {type: "number", id: "username", value: this.state.username, onChange: e => this.changerHandler(e)}),
    ce('br'),
    'Password: ',
    ce('input', {type: "password", id: "password", value: this.state.password, onChange: e => this.changerHandler(e)}),
    ce('br'),
    ce('button', {onClick: e=> this.login(e)},'login'),
    ce('span', {id: "login-message"}, this.state.loginErrorInfo),
    ce('h2', null, 'Create User:'),
    ce('br'),
    'Troop Number: ',
    ce('input', {type: "number", id: "new_username", value: this.state.new_username, onChange: e => this.changerHandler(e)}),
    ce('br'),
    'Password: ',
    ce('input', {type: "password", id: "new_password", value: this.state.new_password, onChange: e => this.changerHandler(e)}),
    ce('br'),
    'Street Address:',
    ce('input',{type:"text", id:"new_addy",value:this.state.new_addy, onChange:e=> this.changerHandler(e)}),
    ce('br'),
    'City:',
    ce('input',{type:"text", id:"new_city",value:this.state.new_city, onChange:e=> this.changerHandler(e)}),
    ce('br'),
    "State:",
    ce('input',{type:"text", id:"new_state",value:this.state.new_state, onChange:e=> this.changerHandler(e)}),
    ce('br'),
    "Zip Code:",
    ce('input',{type:"text", id:"new_zip",value:this.state.new_zip, onChange:e=> this.changerHandler(e)}),
    ce('br'),
    // ce('input',{type:"text", id:"restock",value:this.state.restock, onChange:e=> this.changerHandler(e)}),
    // ce('br'),
    'Email',
    ce('input',{type:"text", id:"email",value:this.state.email, onChange:e=> this.changerHandler(e)}),
    ce('br'),
    ce('button', {onClick: e => this.makeUser(e)}, 'Create User'),
    ce('span', {id: "create-message"}, this.state.createErrorInfo),
    ce('br'),
    ce('span',null,ce('a',{href:"/"},"Home Page")),
    ce('br'),
    ce('span',null,ce('a',{href:"/customer"},"Customer Login Page"))
    );
  }

  typingHandler(e) {
    this.setState({[e.target['id']]: e.target.value});
  }
  changerHandler(e) {
    this.setState({ [e.target['id']]: e.target.value });
  }

//get troop information
  login(e) {
    const n = this.state.username;
    const password = this.state.password;
    fetch(ValidateTroop, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
        body: JSON.stringify({n, password})
    }).then(res => res.json()).then(data => {
      if(data) {
        this.props.doLogin();
      } else {
        this.setState({loginErrorInfo: "Login Failed"});
      }
    });
  }
  makeUser() {
    const n= this.state.new_username;
    const address= [this.state.new_addy,this.state.new_city,this.state.new_state,this.state.new_zip];
    const password=this.state.password;
    const next_restock="2021-05-26";
    const email=thist.state.email;
    fetch(addTroop, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
        body: JSON.stringify({"n": n, "address": address , "password": password, "next_restock": next_restock, "email": email })
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
    this.state={
      orders:[],
      out:[]
    }
  }

  componentDidMount(){
    this.loadOrders();
  }
  render(){
    console.log(this.state.orders);
    console.log(this.state.out);
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

    fetch(allOrders).then(res=>res.json()).then(orders=>{
      this.setState({orders});});
    fetch(OutStock).then(res=>res.json()).then(out=>{
      this.setState({out});
    });
  }
}

class StockComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //Stock:["TEST stock 1", "test stock 2"],
      Stock:[],
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
    fetch(AllStock).then(res=>res.json()).then(stock=>{
      this.setState({stock});});
  }
  SendStock(e){
    
    fetch(addStock, { 
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
      body: JSON.stringify({username,password,cost:"0.0"})
    }).then(res => res.json()).then(data => {
      if(data) {
        this.loadTasks();
        this.setState({ errorMessage: "", newMessage: "" ,newUser:""});
      } else {
        this.setState({ errorMessage: "Failed to add." });
      }
    });
  }
  typingHandler(e) {
    this.setState({[e.target['id']]: e.target.value});
    
  }
}

class BookKeepingComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      transactions:[],
      sales:[]
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
      ce('br')),
      ce('h2',null,'Monthly Sales'),
      ce('div',{id:'Month_Sales'},ce('ul', null,this.state.sales.map((message, index) => ce('li', { key: index }, message))))
    
    );
  }

  loadTrans(){
    fetch(allOrders).then(res=>res.json()).then(transactions=>{
      this.setState({transactions});});
  }

  loadSales(){
    fetch(salesRoute).then(res=>res.json()).then(sales=>{
      this.setState({sales});});
  }
}


ReactDOM.render(
  React.createElement(TroopMainComponent, null, null),
  document.getElementById('troop-root')
);
