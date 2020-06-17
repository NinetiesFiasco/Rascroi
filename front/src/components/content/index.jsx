import {Switch,Route} from 'react-router-dom';

import Title from './pages/Title';
import About from './pages/About';
import Tutorial from './pages/Tutorial';
import Cart from './pages/Carts/Cart';
import Registration from './pages/Registration';
import Example from './pages/Example';
import Armatura from './pages/Armatura/Armatura'; 
import Rascroi from './pages/Rascroi/Rascroi'; 


class Content extends React.Component{
  constructor(props){
    super(props);    
  }
  render(){
    return <div className='container'>
      <div className='content'>
        <Switch>
          <Route path="/" component={Title} exact />
          <Route path="/about" component={About} />
          <Route path="/tutorial" component={Tutorial} />
          <Route path="/cart" component={Cart} />
          <Route path="/armatura" component={Armatura} />
          <Route path="/rascroi" component={Rascroi} />
          <Route path="/register" component={Registration} />
          <Route path="/example" component={Example} />
          <Route path="*" component={Title} />
        </Switch>
      </div>
    </div>
  }
}

export default Content;