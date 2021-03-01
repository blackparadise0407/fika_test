import produce from 'immer';
import { PEOPLE_FAILED, PEOPLE_LOADED, PEOPLE_LOADING } from '../actions/types';

// Reducer with inital state
const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

const peopleState = produce((draft, action) => {
  switch (action.type) {
    case PEOPLE_LOADING:
      draft.isLoading = true;
      draft.error = null;
      break;
    case PEOPLE_LOADED:
      draft.isLoading = false;
      draft.data = action.payload;
      break;
    case PEOPLE_FAILED:
      draft.isLoading = false;
      draft.error = true;
      break;
    default:
      break;
  }
}, initialState);

export default peopleState;