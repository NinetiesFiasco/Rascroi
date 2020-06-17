import Logo from "./Logo.jsx";
import Menu from "./Menu.jsx";

class Header extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <Logo/>
        <Menu/>
      </div>
    );
  }
}

export default Header;