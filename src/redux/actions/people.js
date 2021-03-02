import { PEOPLE_LOADED, PEOPLE_FAILED, PEOPLE_LOADING } from './types';
import _, { replace } from 'lodash';
import axios from 'axios';
import bluebird from 'bluebird';

import { peopleApi } from '../../apis';

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
    _.map(results, ({ species, vehicles, starships, homeworld }) => {
      if (species.length) {
        requests.push(...species)
      }
    })
    const species = []
    await bluebird.map(_.map(uniq_fast(requests), per => axios.get(per)), ({ data: { name, url } }) => {
      species.push({ name, url })
    })
    _.forEach(results, ({ species: spec }) => {
      if (spec.length) {
        _.forEach(spec, (per, idx) => {
          // let temp = ;
          spec.splice(idx, 1, _.find(species, perSpec => perSpec.url === per).name)
        })
      }
    });
    dispatch({ type: PEOPLE_LOADED, payload: { results, count } });
  } catch (error) {
    dispatch({ type: PEOPLE_FAILED });
  }
};