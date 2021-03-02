import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table, Tag, Pagination } from 'antd';

import { fetchPeople } from '../../redux/actions/people';
import { logoImg, basicColorSet } from '../../constants';

import './styles.scss';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'left',
    fixed: 'left',
    render: text => <b>{text}</b>,
  },
  {
    title: 'Height',
    dataIndex: 'height',
    key: 'height',
    align: 'center',
  },
  {
    title: 'Mass',
    dataIndex: 'mass',
    key: 'mass',
    align: 'center',
  },
  {
    title: 'Hair color',
    dataIndex: 'hair_color',
    key: 'hair_color',
    align: 'center',
    render: hair_color => (
      hair_color === 'n/a' ? hair_color.toUpperCase() : hair_color
    )
  },
  {
    title: 'Skin color',
    dataIndex: 'skin_color',
    key: 'skin_color',
    align: 'center',
  },
  {
    title: 'Eye color',
    dataIndex: 'eye_color',
    key: 'eye_color',
    align: 'center',
    render: eye_color => {
      if (_.indexOf(basicColorSet, eye_color) > -1) {
        return <Tag color={eye_color === 'white' ? 'default' : eye_color}>
          {eye_color.toUpperCase()}
        </Tag>
      } else return (
        <Tag color='warning'>
          {eye_color.toUpperCase()}
        </Tag>
      );
    }
  },
  {
    title: 'Birth year',
    dataIndex: 'birth_year',
    key: 'birth_year',
    align: 'center',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    align: 'center',
    render: gender => {
      return <Tag color={gender === 'n/a' ? 'default' : gender === 'male' ? '#2DA9D9' : '#B73377'}>
        {gender.toUpperCase()}
      </Tag>
    }
  },
  {
    title: 'Species',
    dataIndex: 'species',
    key: 'species',
    align: 'center',
    render: species => {
      if (species.length) {
        return _.map(species, (per, idx) => <p key={idx}>{per}</p>)
      } else {
        return <p>unknown</p>
      }
    }
  },
  {
    title: 'Vehicles',
    dataIndex: 'vehicles',
    key: 'vehicles',
    align: 'center',
    render: vehicles => {
      if (vehicles.length) {
        return _.map(vehicles, (per, idx) => <p key={idx}>{per}</p>)
      } else {
        return <p>N/A</p>
      }
    }
  },
  {
    title: 'Starships',
    dataIndex: 'starships',
    key: 'starships',
    align: 'center',
    render: starships => {
      if (starships.length) {
        return _.map(starships, (per, idx) => <p key={idx}>{per}</p>)
      } else {
        return <p>N/A</p>
      }
    }
  },
  {
    title: 'Homeworld',
    dataIndex: 'homeworld',
    key: 'homeworld',
    align: 'center',
  },
]


/**
 *
 * @param {object} obj
 * @returns {object}
 */

const filterNull = (obj) => {
  _.forEach(obj, (val, key) => {
    if (!_.isArray) {
      if (_.isEmpty(val)) obj[key] = 'N/A'
    }
  })
  return obj
}

const Home = ({
  fetchPeople,
  peopleData,
  peopleLoading
}) => {
  const [page, setPage] = React.useState(1);


  React.useEffect(() => {
    fetchPeople({ page });
  }, [fetchPeople, page]);


  let formattedData = []
  if (peopleData) {
    _.map(peopleData.results, (i, idx) => {
      formattedData.push({ key: idx, ...filterNull(i) })
    })
  }

  return (<div className="Home">
    <div className="header">
      <img src={logoImg} alt="" className="logo" />
    </div>
    <div className="container">
      <Table
        size="small"
        // bordered={true}
        columns={columns}
        dataSource={formattedData}
        pagination={false}
        scroll={{ x: 1000, y: 400 }}
        sticky
        loading={peopleLoading}
        footer={() => <Pagination
          onChange={(page) => setPage(page)}
          current={page}
          defaultCurrent={1}
          total={peopleData && peopleData.count}
          showSizeChanger={false} />}
      />

    </div>
  </div>);
};

const mapStateToProps = state => ({
  peopleLoading: state.people.isLoading,
  peopleData: state.people.data,
  peopleError: state.people.error,

});

const mapDispatchToProps = dispatch => (bindActionCreators({
  fetchPeople
}, dispatch));

Home.propTypes = {
  fetchPeople: PropTypes.func,
  peopleData: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

