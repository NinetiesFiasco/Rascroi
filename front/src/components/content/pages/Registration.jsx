class Registration extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      errors: {
        login: false,
        password: false,
        fio: false,
        phone: false,
        email: false
      },
      success: false
    }
  }

  _register(){

    var register = {
        login: this.login.value,
        password: this.password.value,
        fio: this.fio.value,
        phone: this.phone.value,
        email:this.email.value
    }

    var ers = {
      login: register.login.length<4,
      password: register.password.length<4,
      fio: register.fio === "",
      phone: register.phone === "",
      email: register.email === ""
    };

    this.setState({errors: ers});

    var obj = this.state.errors;
    if (obj.login)return;
    if(obj.password)return;
    if (obj.fio)return;
    if(obj.phone)return;
    if(obj.email)return;
    
    $.ajax({
      method: "POST",
      url: window.BackEndURL+"registrationData",
      data: JSON.stringify(register),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: (data)=>{
        if (data.success === 0)
          alert(data.message);

        if (data.success === 1)
          this.setState({success: true});
      }
    });
  }



  render(){
    if (this.state.success){
      return <div className="alert alert-success" role="alert">Вы успешно зарегистрировались</div>
    }else{
      return (
<form>
  <div className="form-group">
    <label htmlFor="LoginField">Логин</label>
    <input type="text" className="form-control" id="LoginField" placeholder="Логин" ref={(node)=>{this.login = node;}}/>
  </div>
  <div className="form-group">
    <label htmlFor="PasswordField">Пароль</label>
    <input type="password" className="form-control" id="PasswordField"  placeholder="Пароль" ref={(node)=>{this.password = node;}}/>
  </div>
  <div className="form-group">
    <label htmlFor="FIOField">ФИО</label>
    <input type="text" className="form-control" id="FIOField"  placeholder="ФИО" ref={(node)=>this.fio = node}/>
  </div>
  <div className="form-group">
    <label htmlFor="PhoneField">Телефон</label>
    <input type="text" className="form-control" id="PhoneField" placeholder="Телефон" ref={(node)=>this.phone = node}/>
  </div>
  <div className="form-group">
    <label htmlFor="EmailField">Email</label>
    <input type="email" className="form-control" id="EmailField" aria-describedby="emailHelp" placeholder="Email"  ref={(node)=>this.email = node}/>
    <small id="emailHelp" className="form-text text-muted">Мы не передаём email и телефон пользователя третьим лицам.</small>
  </div>
  {this.renderErrors()}
  <div>
    <button type="button" className="btn btn-primary" onClick={this._register.bind(this)}>Зарегистрироваться</button>
  </div>
</form>
    )}
  }
  renderErrors(){
      return (
    <div >
      {this.renderAlert(this.state.errors.login,"Логин должен быть минимум 4-ре символа")}
      {this.renderAlert(this.state.errors.password,"Пароль должен быть минимум 4-ре символа")}
      {this.renderAlert(this.state.errors.fio, "Заполните ФИО")}
      {this.renderAlert(this.state.errors.phone, "Введите телефон")}
      {this.renderAlert(this.state.errors.email, "Введите email")}
    </div>)
  }
  renderAlert(display,text){
    if(display)
      return <div className="alert alert-danger" role="alert">{text}</div>
  }
}


export default Registration;