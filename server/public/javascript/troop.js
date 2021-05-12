
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
    this.state = {page: "H", loggedIn: false};
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
        case "H": return ce('div', null, ce(HeaderComponent, {doLogout:()=>this.setState({loggedIn:false}),changePage: this.handlePageChange}),ce(HomeComponent));
        case "Stock": return ce('div', null, ce(HeaderComponent, {doLogout:()=>this.setState({loggedIn:false}),changePage: this.handlePageChange}), ce(StockComponent));
        case "BookKeeping": return ce('div', null, ce(HeaderComponent, {doLogout:()=>this.setState({loggedIn:false}),changePage: this.handlePageChange}), ce(BookKeepingComponent));
        case "Contact": return ce('div', null, ce(HeaderComponent, {doLogout:()=>this.setState({loggedIn:false}),changePage: this.handlePageChange}), ce(ContactComponent));
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
        ce('nav',{className: "navbar_home"},
          ce('button', {onClick: e => this.handleChange(e,"H")}, 'Home'),
          ce('button', {onClick: e => this.handleChange(e,"Stock")}, 'SetStock'),
          ce('button', {onClick: e => this.handleChange(e,"BookKeeping")}, 'Bookkeeping'),
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
    return ce('div', {className:"troop_login"}, 
    ce('h2', null, 'Login:'),
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
    const username = parseInt(this.state.username);
    const password = this.state.password;
    fetch(validateTroop, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
        body: JSON.stringify({username, password})
    }).then(res => res.json()).then(data => {
      if(data) {
        this.props.doLogin();
      } else {
        this.setState({loginErrorInfo: "Login Failed"});
      }
    });
  }
  makeUser() {
    const n = parseInt(this.state.new_username);
    const address = [this.state.new_addy,this.state.new_city,this.state.new_state,this.state.new_zip];
    const password = this.state.new_password;
    console.log(password);
    const next_restock="2021-05-26";
    const email = this.state.email;
    fetch(addTroop, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken,'Accept':'application/json'},
        body: JSON.stringify({"username": n, "address": address , "password": password, "date": next_restock, "email": email })
    }).then(res => res.json()).then(data => {
       console.log(data);
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
    return ce('div', {className: "contact_us"},
      ce('h2',null,'Contact Us'),
      ce('p',null,'For general suggestions only.  For technical problems, idk figure it out.  Our typical response time is <never>!'),
      'Name:',ce('input',{type: "text",  id: "name",value: this.state.name, onChange: e => this.typingHandler(e)}),
      ce('br'),'Email:',ce('input',{type: "text", id:"email", value: this.state.email, onChange: e => this.typingHandler(e)}),
      ce('br'),'Comments:',ce('input',{type: "text",id:"message", value: this.state.message, onChange: e => this.typingHandler(e)}),
      ce('br'), ce('button', {onClick:e=>this.doNothing()}, 'Send')
    );
  }

  doNothing(){
    console.log("lol you thought");
    this.setState({name: "", email: "", message: ""});
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
      out:[],
      hardcoded_orders:[["mlewis |","1 |","1 Trinity Place |","2021-05-12"],["khardee |", "1 |", "655 E Hildebrand Ave", "2021-05-12"]],//orders never implemented so have to hardocode
      hardcoded_out:["Toast","Shortbread","Lemonade"]
    }
  }

  componentDidMount(){
    this.loadOrders();
  }
  render(){
    console.log(this.state.orders);
    console.log(this.state.out);
    return ce('div',{className:"troop_home"},
      ce('aside',{className:"order_details"}, ce('h2', null, 'Upcoming Orders'),
        ce('ul',null,this.state.hardcoded_orders.map((order,index)=>ce('li',{key:index},order)))
      ),
    ce('br'),
      ce('main',{className:"out_stock_details"},ce('h2', null, 'Out of Stock Cookies'),ce('ul',null,this.state.hardcoded_out.map((order,index)=>ce('li',{key:index},order))))
      
    );
  }

  loadOrders(){

    fetch(allOrders).then(res=>{console.log(res);
      return res.json();}).then(orders=>{
      this.setState({orders});});
    fetch(OutStock).then(res=>{console.log(res);
      return res.json();}).then(out=>{
      this.setState({out});
    });
  }
}

class StockComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stock:[],
      new_cookie:"",
      new_amount:""
    };
  }
  componentDidMount(){
    this.loadStock();
  }

  render(){
    return ce('div', {className: "stock_component"},
      ce('h2',null, 'Current Stock'),
      ce('div',{className:'Current_Stock'},
        ce('ul',null,this.state.stock.map((stock,index)=>ce('li',{key:index},stock)))),
      ce('h2',null,'Enter Inventory'),
      ce('div',{className:'Enter_Inventory'},
          ce('p',null,'Cookie: '),ce('input',{type:'text',id:"new_cookie",value:this.state.new_cookie,onChange: e=>this.typingHandler(e)}),
          ce('br'),
          ce('p',null,'Amount: '),ce('input',{type:'number',id:"new_amount",value:this.state.new_amount,onChange: e=>this.typingHandler(e)}),
          ce('br'),
          ce('button',{onClick:e=>this.SendStock(e)},'Update Stock'))
    );
  }
  loadStock(){
    fetch(AllStock).then(res=>res.json()).then(instock=>{
      console.log(this.state.stock);
      this.setState({stock:instock});
      console.log(this.state.stock);});
  }
  SendStock(e){
    
    fetch(addStock, { 
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken },
      body: JSON.stringify({cookie:this.state.new_cookie, num:parseInt(this.state.new_amount)})
    }).then(res => res.json()).then(data => {
      if(data) {
        this.loadStock();
        this.setState({new_cookie:"",new_amount:""});
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
      sales:[],
      hardcoded_transactions:[["mlewis |","1 |","1 Trinity Place |","2021-05-12"],["khardee |", "1 |", "655 E Hildebrand Ave", "2021-05-12"]],//transactions never got implemented on the customer side so have to fill in info
      hardcoded_sales:[["Thinmint | 5 | 10.99"],['Lemonades | 2 | 9.99'],['Samoas | 3 |8.99']]
    }
  }
  compmonentDidMount(){
    this.loadTrans();
    this.loadSales();
  }
  render(){
    return ce('div',{className:"bookkeeping"},
      
      ce('aside',{className:'Transac_List'}, ce('h2',null, 'Transaction List'),
      ce('ul', null,this.state.hardcoded_transactions.map((message, index) => ce('li', { key: index }, message))),
      ce('br')),
      ce('main',{class_Name:'Month_Sales'},ce('h2',null,'Monthly Sales'),
      ce('ul', null,this.state.hardcoded_sales.map((message, index) => ce('li', { key: index }, message))))
    
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
