import {connect} from 'react-redux';

class Example extends React.Component{

  // Конструктор 
  // Даёт доступ к пропсам элемента
  // Создаёт пустой объект example
  // Задаёт начальное состояние
  // Привязывает this к методам
  constructor(props){
    super(props);

    this.emptyElement = {
      id: "",
      guid: "",
      dateadd: "",
      fio: "",
      age: "",
      man: "",
      _id: ""
    }

    this.state = {
      data: null,
      error: null,
      showRedactor: false,
      redactingElement: this.emptyElement
    };

    this.tbid = React.createRef();
    this.tbguid = React.createRef();
    this.tbdateadd = React.createRef();
    this.tbfio = React.createRef();
    this.tbage = React.createRef();
    this.tbman = React.createRef();

    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.readAnswer = this.readAnswer.bind(this);
    this.renderCreatingForm = this.renderCreatingForm.bind(this);
    this.showRedactor = this.showRedactor.bind(this);
    this.elementRedactor = this.elementRedactor.bind(this);
    this.readAnswer = this.readAnswer.bind(this);
    this.updatedAnswer = this.updatedAnswer.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
    this.redactorRow = this.redactorRow.bind(this);

  }

  // При инициализии объекта идёт запрос за объектами
  componentDidMount(){
    this.read();
  }
  query(pars){
    var ajaxes = {
      method: pars.method,
      url: window.BackEndURL + pars.url,
      headers:{
        "Authorization": localStorage.getItem("Token")
      },
      contentType: "application/json; charset=utf-8", // Мы пошлём серверу JSON
      dataType: "json", // Мы ждём от сервера JSON
      success: pars.success,
      error: pars.error
    };
    if (pars.data !== undefined)
      ajaxes.data = pars.data;

    $.ajax(ajaxes);
  }

  // ***** AJAX запросы *****

  // Запрос за объектами
  read(){
    this.query({
      method: "GET",
      url:"example/read",
      success: this.readAnswer,
      error: null
    });
  }

  // Merge создать или обновить объект в зависимости от наличия _id (идентификатора MongoDB)
  create(){

    var postData = this.state.redactingElement;

    var url = "", method = "";

    if (postData._id === ""){
      url = "example/create";
      method = "POST";
      delete postData._id;
    } else {
      url = "example/update/"+postData._id;
      method = "PUT";
    }
    
    this.query({
      method: method,
      url:url,
      success: this.updatedAnswer,
      error: null,
      data: JSON.stringify(postData)
    });
    
    this.showRedactor(false);
  }
  // Удалить объект
  _delete(xKey){
    this.query({
      method: "DELETE",
      url: "example/delete/"+this.state.data[xKey]._id,
      success: this.deleteAnswer
    });
  }

  // ***** ***** ***** ***** ***** 

  // ***** Обработчики AJAX ответов *****

  // Отобразить прочитанные объекты
  readAnswer(answer){
    if (answer.success === 0)
      this.setState({
        error: answer.message,
        data: null,
      });
    else if (answer.success === 1){
      this.setState({
        data: answer.data,
        error: null
      });
    }
  }
  // После обновления объекта перезагрузить все
  updatedAnswer(answer){
    if (answer.success === 0)
      this.setState({
        error: answer.message,
        data: null,
      });
    else if (answer.success === 1){
      this.read();
    }
  }
  // После удаления объекта перезагрузить все
  deleteAnswer(answer){
    if (answer.success === 0)
      this.setState({
        error: answer.message,
        data: null,
      });
    else if (answer.success === 1){
      this.read();
    }
  }

  // ***** ***** ***** ***** *****

  // Отобразить/Спрятать редактор
  showRedactor(val){
    this.setState({
      showRedactor: val
    });
  }
  
  // Показать нужный объект в редакторе
  elementRedactor(obj){

    this.showRedactor(true);

    this.setState({
      redactingElement: obj
    });
  
    this.tbage.current.value = obj.age;
    this.tbdateadd.current.value = obj.dateadd;
    this.tbfio.current.value = obj.fio;
    this.tbguid.current.value = obj.guid;
    this.tbid.current.value = obj.id;
    this.tbman.current.value = obj.man;    
  }  

  // Обновить объект
  update(xKey){
    this.elementRedactor(this.state.data[xKey]);       
  }  
  
  // Обработчик изменения поля
  hndFieldChange(event,field){
    var obj = {
      redactingElement: JSON.parse(JSON.stringify(this.state.redactingElement))
    };

    obj.redactingElement[field]=event.target.value;
    this.setState(obj);
  }

  // Главный рендер
  // Заголовок, кнопка новый объект, таблица объектов и редактор объектов
  render(){     
    return <div>
        <div>Example</div>
        <div>
          <button onClick={()=>{this.elementRedactor(this.emptyElement)}}>Добавить</button> новый example
        </div>
        {this.renderCreatingForm()}
        {this.renderData()}
      </div>;
  }

  // Рендер таблицы объектов
  renderData(){
    if (!this.state.data && this.state.error){
      return <div>Ошибка {this.state.error}</div>
    }else if (!this.state.data && !this.state.error){
      return <div>Элементов нет</div>
    } else {
      return <table>
        <thead>
          <tr><th>_id</th><th>id</th><th>guid</th><th>dateadd</th><th>fio</th><th>age</th><th>man</th><th>xKey</th><th colspan='2'>Действия</th></tr>
        </thead>
        <tbody>
        {this.state.data.map((ex,xKey)=>{
          return <tr key={xKey}>
            <td>{ex._id}</td><td>{ex.id}</td><td>{ex.guid}</td><td>{ex.dateadd}</td><td>{ex.fio}</td><td>{ex.age}</td><td>{ex.man}</td><td>{xKey}</td>
            <td><input type='button' value='Редактировать' onClick={()=>{this.update(xKey)}} /></td>
            <td><input type='button' value='Удалить' onClick={()=>{this._delete(xKey)}} /></td>
          </tr>
        })}
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    }
  }
  // Рендер формы редактирования
  renderCreatingForm(){
    let fields = ['id','guid','dateadd','fio','age','man'];
      return (
<table style={{display: this.state.showRedactor ? 'block' : 'none'}}>
  <thead>
    <tr><th>Поле</th><th>Значение</th></tr>
  </thead>
  <tbody>
    {fields.map((field)=>{
      return this.redactorRow(field);
    })}
  </tbody>
  <tfoot>
    <tr>
      <td><button onClick={()=>{this.showRedactor(false)}}>Отменить</button></td>
      <td><button onClick={this.create}>Добавить</button></td>
    </tr>
  </tfoot>
</table>)
  }
    
  redactorRow(name){
    return <tr>
      <td>{name}</td>
      <td><input type='text' ref={this['tb'+name]} placeholder={name} onChange={()=>{this.hndFieldChange(event,name)}} /></td>
    </tr>
  }

}

export default Example;