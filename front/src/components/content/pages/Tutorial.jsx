import MyTable from "../controls/MyTable";

class Tutorial extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      headers: ["Колонка 1","Колонка 2","Колонка 3"],
      content: [
        ["Ячейка 1:1","Ячейка 1:2","Ячейка 1:3"],
        ["Ячейка 2:1","Ячейка 2:2","Ячейка 2:3"],
        ["Ячейка 3:1","Ячейка 3:2","Ячейка 3:3"],
      ]
    }

  }

  render(){
    return <div>Туториал<br/><MyTable headers={this.state.headers} content={this.state.content}/></div>;
  }  
}

export default Tutorial;