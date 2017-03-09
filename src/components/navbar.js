import React from 'react';
import AppBar from 'material-ui/AppBar';
import logo from '../assets/CircularSaw.svg'
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router'

const NavBar = React.createClass({

  getInitialState() {
    return ({
      export: this.props.export
    })
  },

  render: function () {

    return (
      <AppBar
        title="Math Saw"
        style={this.props.style.navstyle}
        titleStyle={this.props.style.titlestyle}
        showMenuIconButton={false}
        iconElementRight={
          <div>
            <Link to="/"><RaisedButton label="Home" style={this.props.style.navstyle.button}/></Link>
            <RaisedButton label="Save Project" onClick={this.props.save} style={this.props.style.navstyle.button}/>
          </div>
        }
      />
    )
  },

})


export default NavBar;
