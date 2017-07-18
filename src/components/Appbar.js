import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Menu, icon } from 'semantic-ui-react';
import { logout } from  '../actions/authActions';
import PropTypes from 'prop-types';

class AppBar extends Component {

  logout(e){
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuth } = this.props.auth;
    
    const userLink = (
      <Menu.Item position='right' name='user'>
        <Link to='/login' onClick={this.logout.bind(this)}>Logout</Link>
      </Menu.Item>
    );
  
    const guestLink = (
      <Menu.Item position='right' name='user'>
        <Link to='/signup'>Signup</Link>
        <Link to='/login'>login</Link>
      </Menu.Item>
    );

    return (
      <Menu fixed='top' inverted borderless style={this.props.style}>
        <Menu.Item>
          <Menu.Header as={NavLink} to='/'>
            <span style={{ fontSize: 18 }}>
              DRC
              <span style={{ color: 'red' }}>
                VIGILANTE
              </span>
            </span>
          </Menu.Header>
        </Menu.Item>
        <Menu.Item name='user' >
        <Link to='/'>{this.props.client.name}</Link>
        </Menu.Item>
        { isAuth ? userLink : guestLink }
      </Menu>
    );
  }
}

AppBar.propTypes = {
  client: PropTypes.object.isRequired, 
  style: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
      auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(AppBar);
