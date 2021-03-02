import { PEOPLE_LOADED, PEOPLE_FAILED, PEOPLE_LOADING } from './types';
import _ from 'lodash';
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
    const speciesRequests = []
    const vehiclesRequests = []
    const starshipsRequests = []
    const homeworldRequests = []

    _.map(results, ({ species, vehicles, starships, homeworld }) => {
      if (species.length) {
        speciesRequests.push(...species)
      }
      if (vehicles.length) {
        vehiclesRequests.push(...vehicles)
      }
      if (starships.length) {
        starshipsRequests.push(...starships)
      }
      if (homeworld) {
        homeworldRequests.push(homeworld)
      }
    })
    const species = []
    const vehicles = []
    const starships = []
    const homeworld = []
    await bluebird.map(_.map(uniq_fast(speciesRequests), per => axios.get(per)), ({ data: { name, url } }) => {
      species.push({ name, url })
    })
    await bluebird.map(_.map(uniq_fast(vehiclesRequests), per => axios.get(per)), ({ data: { name, url } }) => {
      vehicles.push({ name, url })
    })
    await bluebird.map(_.map(uniq_fast(starshipsRequests), per => axios.get(per)), ({ data: { name, url } }) => {
      starships.push({ name, url })
    })
    await bluebird.map(_.map(uniq_fast(homeworldRequests), per => axios.get(per)), ({ data: { name, url } }) => {
      homeworld.push({ name, url })
    })
    _.forEach(results, ({ species: spec, vehicles: veh, starships: sta, homeworld: hom }, idx) => {
      if (spec.length) {
        _.forEach(spec, (per, idx) => {
          spec.splice(idx, 1, _.find(species, perSpec => perSpec.url === per).name)
        })
      }
      if (veh.length) {
        _.forEach(veh, (per, idx) => {
          veh.splice(idx, 1, _.find(vehicles, perVeh => perVeh.url === per).name)
        })
      }
      if (sta.length) {
        _.forEach(sta, (per, idx) => {
          sta.splice(idx, 1, _.find(starships, perSta => perSta.url === per).name)
        })
      }
      if (hom) {
        results[idx].homeworld = _.find(homeworld, perHom => perHom.url === hom).name
      }
    });
    dispatch({ type: PEOPLE_LOADED, payload: { results, count } });
  } catch (error) {
    dispatch({ type: PEOPLE_FAILED });
  }
};