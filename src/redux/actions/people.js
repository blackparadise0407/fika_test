import { PEOPLE_LOADED, PEOPLE_FAILED, PEOPLE_LOADING } from './types';
import _ from 'lodash';
import { peopleApi } from '../../apis';
import axios from 'axios';

function uniq_fast(a) {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for (var i = 0; i < len; i++) {
    var item = a[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}

export const fetchPeople = ({ page = 1 }) => async (dispatch) => {
  dispatch({ type: PEOPLE_LOADING });
  try {
    const { results, count } = await peopleApi.get(page);
    const requests = []
    _.map(results, ({ species }) => {
      if (species.length) {
        requests.push(...species)
      }
    })

    Promise.all(_.map(uniq_fast(requests), per => axios.get(per))).then(data => {
      _.map(data, ({ data }) => console.log(data.name))
    })
    dispatch({ type: PEOPLE_LOADED, payload: { results, count } });
  } catch (error) {
    dispatch({ type: PEOPLE_FAILED });
  }
};