import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import NavBar from '../components/navbar';


const Landing = React.createClass({
  getInitialState: function () {
    return null;
  },

  render: function () {
    return (
      <div>
        <NavBar/>
        <div className="header">
          <Container className="container">
            
          </Container>
        </div>
      </div>
    )
  }
});

export default Landing;
