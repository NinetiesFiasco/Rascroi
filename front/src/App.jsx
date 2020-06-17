import {BrowserRouter} from 'react-router-dom';

import Header from "./components/header/Index";
import Content from "./components/content";

import {Provider} from "react-redux";
import store from "./redux/index.js";


class App extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Header/>
          <Content/>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;