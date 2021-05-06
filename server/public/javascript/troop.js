

// Up to you if you want to use, but from ApplicationMain page
const logInTroop = document.getElementById("troopLoginRoute").value;
const addTroop = document.getElementById("newTroopRoute").value;

class LoginTroopComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {troop_no: "", password: "", loginErrorInfo: ""};
  }

  render(){
    ce('form', {id = "troop_login"},
      ce('h2',null,'Troop Login'),
      'Troop No.:',ce('input',{type: "text", value: this.state.troop_no, onChange: e => this.typingHandler(e)}),
      ce('br'),'Password:',ce('input',{type: "text", value: this.state.password, onChange: e => this.typingHandler(e)}),
      ce('br'), ce('button', {onClick: e => login(e)}, 'Login')
      //ce('a', {href: ""},'Click here to create a new account'),
      //ce('a', {href: ""},'Click here to access the troop login')
    );
  }

  class LoginTroopComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {troop_no: "", password: "", loginErrorInfo: ""};
    }

    render(){
      ce('form', {id = "troop_login"},
        ce('h2',null,'Troop Login'),
        'Troop No.:',ce('input',{type: "text", value: this.state.troop_no, onChange: e => this.typingHandler(e)}),
        ce('br'),'Password:',ce('input',{type: "text", value: this.state.password, onChange: e => this.typingHandler(e)}),
        ce('br'), ce('button', {onClick: e => login(e)}, 'Login')
        //ce('a', {href: ""},'Click here to create a new account'),
        //ce('a', {href: ""},'Click here to access the troop login')
      );
    }

    typingHandler(e) {
      this.setState({[e.target['id']]: e.target.value});
      console.log([e.target['id']]);
    }

    login(e) {
      const no = this.state.troop_no;
      const pass = this.state.password;
      fetch(logInTroop, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
          body: JSON.stringify({no, pass})
      }).then(res => res.json()).then(data => {
        console.log(data);
        if(data) {
          //switch to troop page
        } else {
          this.setState({loginErrorInfo: "Do not pass GO"});
        }
      });
    }
  }

  class NewTroopComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {troop_no: "", password: "", email: "", address: "", createErrorInfo: ""};
    }

    render(){
      //no,pass,email,address
      ce('form', {id = "create_troop"},
        ce('h2',null,'Create a Troop Account'),
        'Troop No.:',ce('input',{type: "text", value: this.state.troop_no, onChange: e => this.typingHandler(e)}),
        ce('br'),'Password:',ce('input',{type: "text", value: this.state.password, onChange: e => this.typingHandler(e)}),
        'Email:',ce('input',{type: "text", value: this.state.email, onChange: e => this.typingHandler(e)}),
        ce('br'),'Address:',ce('input',{type: "text", value: this.state.address, onChange: e => this.typingHandler(e)}),
        ce('br'), ce('button', {onClick: e => makeUser()}, 'Create Account')
        //ce('a', {href: ""},'Click here to create a new account'),
        //ce('a', {href: ""},'Click here to access the troop login')
      );
    }

    typingHandler(e) {
      this.setState({[e.target['id']]: e.target.value});
      console.log([e.target['id']]);
    }

    makeUser() {
      const ntroop = this.state.troop_no;
      const npass = this.state.password;
      const temail = this.state.email;
      const taddress = this.state.address;
      fetch(addTroop, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Csrf-Token': csrfToken},
          body: JSON.stringify({"user": ntroop , "pass": npass, "email": temail, "address": taddress })
      }).then(res => res.json()).then(data => {
        if(data) {
          //switch to troop page
        } else {
          this.setState({createErrorInfo: "You are not welcome here"});
        }
      });
    }
  }
