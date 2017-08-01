import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import audits from './audits';
import messages from './messages';
import auth from './auth';
import profile from './profile';

const rootReducer = combineReducers({
  audits,
  router: routerReducer,
  messages,
  auth,
  profile,
});

export default rootReducer;
