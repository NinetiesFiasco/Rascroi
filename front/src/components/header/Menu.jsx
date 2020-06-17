import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Login from "./Login.jsx";

class Menu extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      links: [
        {name:"Главная",url:"/",login: false},
        {name:"О нас",url:"/about",login: false},
        {name:"Туториал",url:"/tutorial",login: false},
        {name:"Заказы",url:"/cart",login: true},
        {name:"Examle",url:"/example", login: false}
      ]
    };

  }

  render(){
    var isLogin = this.props.user.login;
    return(
      <nav className="navbar navbar-default">
          {
            this.state.links.map((item,idx)=>{
              if (isLogin)
                return <NavLink exact activeClassName='text-warning' className="p-2" to={item.url} key={idx}>{item.name}</NavLink>
              else if (!item.login)
                return <NavLink exact activeClassName='text-warning' className="p-2" to={item.url} key={idx}>{item.name}</NavLink>
            })
          }            
        <Login/>        
        {this.renderRegistration()}
      </nav>
    );
  }
  renderRegistration(){
    if (!this.props.user.login)
      return <NavLink exact activeClassName='text-warning' className="p-2" to="/register">Регистрация</NavLink>
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  dispatch => ({})
)(Menu);