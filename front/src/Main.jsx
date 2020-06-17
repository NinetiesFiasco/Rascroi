// В Styles.scss прописана ссылка на bootstrap.scss
import './Styles';
// React и ReactDOM Подключаются во все файлы автоматически

// Подключение jQuery и внедрение её в глобальную область видимости
import $ from 'jquery';
window.$ = $;
import Popper from 'popper.js';

// Странная лавочка
import 'bootstrap/dist/js/bootstrap.bundle.min';

window.BackEndURL = "http://localhost:8082/";
// Приложение
import App from './App';

// Отрисовка приложения в узле с id="app"
$(()=>{
  ReactDOM.render(
    <App />,
    document.getElementById("app"));
});