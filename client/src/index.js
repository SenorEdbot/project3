import ReactDOM from 'react-dom';
import { makeMainRoutes } from './routes';
import * as serviceWorker from './serviceWorker';

// import StatsBreakdown from './components/Stats/StatsBreakdown'
import Stats from './components/Stats/Stats'
import UserStats from './components/Stats/UserStats/UserStats'
import CompareFriend from './components/Stats/CompareFriend/CompareFriend'
import FriendComp from './components/Stats/CompareFriend/FriendComp'

const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

export {
  UserStats, CompareFriend, FriendComp, Stats
}