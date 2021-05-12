"use strict"

const ce = React.createElement;
const csrfToken = document.getElementById("csrfToken").value;
const logInCust = document.getElementById("custLoginRoute").value;
const addCust = document.getElementById("newCustRoute").value;
const sendTransact = document.getElementById("transactionRoute").value;
const getTroopEmail = document.getElementById("troopEmailRoute").value;
const getNextDelivery = document.getElementById("getNextDeliveryRoute").value;
const getAvailCookies = document.getElementById("getAvailCookiesRoute").value;
const delivery_estimate = document.getElementById("getEstimatedDeliveryRoute").value;

class CustomerMainComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {page: "H", loggedIn: true, cart: []};
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleCartChange = this.handleCartChange.bind(this);
  }

  handlePageChange(page){
    console.log(page);
    this.setState({page});
  }

  handleCartChange(cookie, quantity){
    this.setState({cart: cart.append(cookie + "Quantity desired: "+ quantity)});
  }

  render(){
    if(!this.state.loggedIn){
      console.log(this.state.page);
      switch(this.state.page) {
        case "H": return ce('div', null, ce(HeaderComponent, {changePage: this.handlePageChange}), ce(HomeComponent));
        case "Order": return ce('div', null, ce(HeaderComponent, {changePage: this.handlePageChange}), ce(OrderComponent, {changeCart: this.handleCartChange}));
        case "Cart": return ce('div', null, ce(HeaderComponent, {changePage: this.handlePageChange}), ce(CartComponent));
        case "Contact": return ce('div', null, ce(HeaderComponent, {changePage: this.handlePageChange}), ce(ContactComponent));
        case _: return ce('p',null,'FAIL');
      }
    } else {
      return ce('div', null, ce(LoginCustComponent, {doLogin: () => this.setState({loggedIn: false})}));
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
          ce('button', {onClick: e => this.handleChange(e,"Order")}, 'Place Order'),
          ce('button', {onClick: e => this.handleChange(e,"Cart")}, 'Cart'),
          ce('button', {onClick: e => this.handleChange(e,"Contact")}, 'Contact Us'),
          ce('button', {onClick: e => this.props.doLogout()}, 'Logout')
        )
    );
  }

  logout(e){
    //implement logout method
  }
}

class LoginCustComponent extends React.Component {
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
    return ce('div', null, ce('div', {id: "cust_login"},
        ce('h2',null,'Login'),
        'Username:',ce('input',{type: "text", id: "username", value: this.state.username, onChange: e => this.typingHandler(e)}),
        ce('br'),'Password:',ce('input',{type: "text", id: "password", value: this.state.password, onChange: e => this.typingHandler(e)}),
        ce('br'), ce('button', {onClick: e => this.login(e)}, 'Login'),
        ce('span', {id: "login-message"}, this.state.loginErrorInfo),
        ce('br')
      ), ce('div', {id: "create_customer"},
        ce('h2',null,'Create a Customer Account'),
        'Name:',ce('input',{type: "text", id: "name", value: this.state.name, onChange: e => this.typingHandler(e)}),
        ce('br'),'Username:',ce('input',{type: "text", id: "new_username", value: this.state.new_username, onChange: e => this.typingHandler(e)}),
        ce('br'),'Password:',ce('input',{type: "text", id: "new_password", value: this.state.new_password, onChange: e => this.typingHandler(e)}),
        ce('br'),'Email:',ce('input',{type: "text", id: "email", value: this.state.email, onChange: e => this.typingHandler(e)}),
        ce('br'),'Troop:',ce('input',{type: "number", id: "troop", value: this.state.troop, onChange: e => this.typingHandler(e)}),
        ce('br'), ce('button', {onClick: e => this.makeUser()}, 'Create Account'), ce('span', {id: "login-message"}, this.state.createErrorInfo),
      ), ce('br'), ce('span',null,ce('a',{href:"/"},"Home Page")),
      ce('br'),
      ce('span',null,ce('a',{href:"/troop"},"Troop Login Page"))
    );
  }

  typingHandler(e) {
    this.setState({[e.target['id']]: e.target.value});
  }

  login(e) {
    const username = this.state.username;
    const password = this.state.password;
    fetch(logInCust, {
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
    fetch(addCust, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
        body: JSON.stringify({"name": nname, "user": nuser , "pass": npass, "email": cemail, "troop": troop })
    }).then(res => res.json()).then(data => {
      if(data) {
        this.props.doLogin();
      } else {
        this.setState({createErrorInfo: "Could not create new account. Please try again."});
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
    return ce('div', {id: "contact_us"},
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
  }

  contact(e) {
    this.setState({name: "", email: "", message: ""});
  }
}

class HomeComponent extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      next_delivery: "",
      troop_email: ""
    }
  }

  componentDidMount(){
    this.loadTroopEmail();
    this.loadNextDelivery();
  }

  render(){
    return ce('div', null,
      ce('h2',null,'Next Scheduled Delivery'),
      ce('div',{id: "delivery_details"},
        ce('p',null,this.state.next_delivery)
        // implement receipts? ce('link',{},'Click here to view order receipt')
      ),
      ce('h2',null,'Contact Your Troop'),
      ce('div',{id: "contact_troop"},
        'Your troop would love to hear from you with any questions or concerns.',
        ' In the case of special delivery instructions, accommodations are made on a case by case basis and are fulfilled at the troop’s discretion. ',
        ce('a',{href: this.state.troop_email},'Click here to email your troop directly'),', or feel free to use the Contact Us page if you would like to speak with corporate.'
      )
    );
  }

  loadTroopEmail(){
    fetch(getTroopEmail).then(res=>res.json()).then(email => this.setState({troop_email: "mailto: " + email}));
  }

  loadNextDelivery(){
    fetch(getNextDelivery).then(res=>res.json()).then(delivery => this.setState({next_delivery: delivery}));
  }
}

class OrderComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: "",
      cookies: [],
      quantity: 0
    };
    this.cartUpdate = this.cartUpdate.bind(this);
  }

  componentDidMount(){
    this.loadAvailCookies();
  }

  render(){
    console.log(this.state.cookies);
    return ce('div', null,
      'Search for cookies: ', ce('input',{type: "text", value: this.state.search, onChange: e => this.typingHandler(e)}),
      ce('button',{onClick: e => this.search(e)},'Search'),
      //Show cookies??? Image, name, descrip, price, avail
      //quantity input, add to cart button
      ce('div', {id: "avail_cookies"},
        ce('ul', null,
          this.state.cookies.map((cookie_details,index) => 
            ce('li', {key: index}, ce('img',{src: cookie_imgs[cookie_details.split(',')[1]], alt: "", width: 200}, null), ce('p', null, cookie_details.split(',')[0]), ce('input',{type: "number", id: "quantity", value: this.state.quantity, onChange: e => this.typingHandler(e)}),ce('button',{id: cookie_details.split(',')[0], onClick: e => this.cartUpdate(e)},'Add to Cart'))))));
  }

  loadAvailCookies(){
    fetch(getAvailCookies).then(res=>res.json()).then(cookies => this.setState({cookies}));
  }

  search(e){
    //filter
    this.setState({cookies: cookies.filter(x => x.contains(this.state.search))});
  }

  cartUpdate(e){
    //update cart with additions
    this.props.changeCart(e.target['id'],quantity);
  }

  typingHandler(e) {
    this.setState({[e.target['id']]: e.target.value});
  }
}

class CartComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      address: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zip: 0,
      apt: 0,
      card_no: "",
      crv: "",
      exp: "",
      orderStatus: "",
      orders: [""],
      est_date: ""
    };
  }

  componentDidMount(){
    this.setState({orders: this.props.cart});
    this.loadDeliveryDate();
  }

  loadDeliveryDate(){
    fetch(delivery_estimate).then(res=>res.json()).then(date => this.setState({est_date: date}));
  }

  render(){
    return ce('div',null,
      ce('div', {id: "order"},
        ce('h2', null, 'Current Order'),
        ce('ul', null,
          this.state.orders.map((cookie,index) => ce('li', {key: index}, cookie))
        )
      ), ce('aside',{id: "checkout"},
        'Shipping Address:', ce('br'),
        'Street: ', ce('input',{type: "text", value: this.state.street, onChange: e => this.typingHandler(e)}), ce('br'),
        'Apt: ', ce('input',{type: "number", value: this.state.apt, onChange: e => this.typingHandler(e)}), ce('br'),
        'City: ', ce('input',{type: "text", value: this.state.city, onChange: e => this.typingHandler(e)}), ce('br'),
        'State: ', ce('input',{type: "text", value: this.state.state, onChange: e => this.typingHandler(e)}), ce('br'),
        'Country: ', ce('input',{type: "text", value: this.state.country, onChange: e => this.typingHandler(e)}), ce('br'),
        'Zip Code: ', ce('input',{type: "number", value: this.state.zip, onChange: e => this.typingHandler(e)}), ce('br'),
        'Estimated Date of Delivery:', ce('br'),
        ce('p',null,this.state.est_date), ce('br'),
        'Payment Info: (This is super duper secure so please use real card info)', ce('br'),
        'Card No.: ', ce('input',{type: "text", value: this.state.card_no, onChange: e => this.typingHandler(e)}),
        ce('br'),
        'CSV: ', ce('input',{type: "text", value: this.state.crv, onChange: e => this.typingHandler(e)}),
        'Exp. Date (MM/YY): ', ce('input',{type: "text", value: this.state.exp, onChange: e => this.typingHandler(e)}),
        ce('br'), ce('button', {onClick: e => e.sendTransaction()}, 'Confirm and order'),
        ce('br'),ce('span', {id: "order-message"}, this.state.orderStatus),
      )
    );
  }

  sendTransaction() {
    const address = [this.state.street, this.state.city, this.state.state, this.state.zip, this.state.apt_no];
    const cookies = orders;

    fetch(sendTransact, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
        body: JSON.stringify({"address": address, "cookies": cookies})
    }).then(res => res.json()).then(data => {
      if(data) {
        this.props.doLogin();
      } else {
        this.setState({orderStatus: "Order failed. Please try again."});
      }
    });
  }
}


ReactDOM.render(
  React.createElement(CustomerMainComponent, null, null),
  document.getElementById('main-root')
);
