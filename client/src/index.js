import ReactDOM from 'react-dom';
import { makeMainRoutes } from './routes';
import * as serviceWorker from './serviceWorker';

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
