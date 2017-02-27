import React from 'react';
import NavBar from '../components/navbar';

const Landing = React.createClass({
  getInitialState: function () {
    return null;
  },

  render: function () {
    return (
      <div>
        <NavBar/>
        <div className='container'>
          Welcome to this woodcutting app. This is going to be fun yay!
        </div>
      </div>
    )
  }
});

export default Landing;
