import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Table, Tag, Space, Pagination } from 'antd';

import { fetchPeople } from '../../redux/actions/people';
import { logoImg } from '../../constants';

import './styles.scss';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'left',
    render: text => <b>{text}</b>,
    fixed: 'left'
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
  }
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
        bordered={true}
        columns={columns}
        dataSource={formattedData}
        pagination={false}
        scroll={{ x: 1000 }}
        sticky
        loading={peopleLoading}
        footer={() => <Pagination onChange={(page, pageSize) => setPage(page)} current={page} defaultCurrent={1} total={82} showSizeChanger={false} />}
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

