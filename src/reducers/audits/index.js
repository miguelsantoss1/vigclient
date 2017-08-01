import { APP_INIT } from '../../actions/common';
import {
  FETCH_AUDITS_SUCCESS,
  FETCH_AUDITS_LOADING,
  FETCH_AUDITS_FAIL,
} from '../../actions/audits';

const initialState = {
  list: [],
  fetchLoading: false,
  fetchError: false,
};

export default function audits(state = initialState, action) {
  switch (action.type) {
    case APP_INIT:
      return {
        ...state,
      };
    case FETCH_AUDITS_LOADING:
      return {
        ...state,
        fetchLoading: true,
      };
    case FETCH_AUDITS_SUCCESS:
      return {
        ...state,
        list: action.result,
        fetchLoading: false,
        fetchError: false,
      };
    case FETCH_AUDITS_FAIL:
      return {
        ...state,
        fetchLoading: false,
        fetchError: true,
      };
    default:
      return state;
  }
}
