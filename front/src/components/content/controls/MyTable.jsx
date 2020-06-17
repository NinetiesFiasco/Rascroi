class MyTable extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      headers: this.props.headers,
      content: this.props.content
    };
  }

  render(){
    var that = this;
    return <table>
      <thead>
        <tr>
          {this.state.headers.map(function(item,idx){
            return <th key={idx}>{item}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {that.state.content.map((row,rowIdx)=>{
          return <tr key={rowIdx}>{row.map((cell,cellIdx)=>{
            return <td key={cellIdx}>{cell}</td>
          })}</tr>
        })}
      </tbody>
    </table>;
  }
  
}

export default MyTable;