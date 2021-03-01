import { PEOPLE_LOADED, PEOPLE_FAILED, PEOPLE_LOADING } from './types';
import { peopleApi } from '../../apis';


export const fetchPeople = ({ page = 1 }) => async (dispatch) => {
  dispatch({ type: PEOPLE_LOADING });
  try {
    const { results, count } = await peopleApi.get(page);
    dispatch({ type: PEOPLE_LOADED, payload: { results, count } });
  } catch (error) {
    dispatch({ type: PEOPLE_FAILED });
  }
};