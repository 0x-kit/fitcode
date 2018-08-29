import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { bindActionCreators } from 'redux';
import { authOperations } from 'app/root/duck';
import { withRouter } from 'react-router';
import _ from 'lodash';


import SecondaryMenu from 'app/common/menu/SecondaryMenu.jsx';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...authOperations }, dispatch);
};

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    mainTab: state.auth.mainTab,
    secondaryTab: state.auth.secondaryTab,
    activeIndex: state.auth.activeIndex,
    date: state.food.date
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  lifecycle({
    componentWillMount() {
      const path = this.props.location.pathname.split('/');
      const mainTab = path[1];
      const secondaryTab = _.isUndefined(path[2]) ? '' : path[2];

      this.props.selectMainTab(mainTab);
      this.props.selectSecondaryTab(secondaryTab);
    }
  })
)(SecondaryMenu);
