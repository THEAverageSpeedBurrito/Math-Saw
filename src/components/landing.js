import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router'
import logo from '../assets/CircularSaw.svg'
import thumbnail from '../assets/mathsaw.jpg'

var style = {
  navstyle: {
    backgroundColor: "#0365B5",
    color: "#114B5F",
    position: 'fixed',
    top: '0',
    boxShadow: 'none',
  },
  titlestyle: {
    color: 'white',
    fontFamily: 'VT323, monospace',
    fontSize: 50
  },
  upper: {
    backgroundColor: '#353531',
    borderTop: '5px solid dodgerblue',
    borderBottom: '5px solid dodgerblue',
    color: 'white',
    paddingTop: window.innerHeight/4 - 115
  },
  lower: {
    height: 100,
    width: 100,
    position: 'absolute',
    backgroundColor: '#0365B5',
    paddingTop: 30
  },
  code: {
    width: 225
  },
  button: {
    marginLeft: 15,
    borderBottom: '3px solid #3DE292'
  }
}

const Landing = React.createClass({
  getInitialState: function () {
    var height = window.innerHeight;
    var width = window.innerWidth;
    style.upper.height = height;
    style.upper.width = width;
    style.lower.width = width;

    return ({
      style: style,
      projectCode: ''
    })
  },

  componentDidMount: function () {
    window.addEventListener('resize', this.setFullWidth);
  },

  render: function() {
    return (
      <div>
        <div style={this.state.style.upper} className="landingMain">
          <div className="container center">
            <Row>
              <Col sm={12} className="border">
                <h1>Math</h1>
              </Col>
              <Col sm={12} className="border">
                <img src={logo} className="landingLogo" alt="Circular saw"/>
              </Col>
              <Col sm={12} className="border">
                <h1>Saw</h1>
              </Col>
            </Row>
            <Link to="/editor"><RaisedButton label="New Project"/></Link>
          </div>
        </div>
        <div style={this.state.style.lower} className="center">
          <input type="text" style={style.code} value={this.state.projectCode} onChange={this.getProjectCode}/>
          <Link to='/editor'><RaisedButton label="Load" onClick={this.loadProject} style={style.button}/></Link>
        </div>
      </div>
    )
  },

  setFullWidth() {
    var height = window.innerHeight;
    var width = window.innerWidth;
    style.upper.height = height;
    style.upper.width = width;
    style.lower.width = width;

    this.setState({
      style: style
    })
  },

  getProjectCode(event){
    var code = event.target.value;
    this.setState({
      projectCode: code
    })
  },

  loadProject() {
    if(this.state.projectCode.length === 20){
      sessionStorage.setItem('projectCode', this.state.projectCode);
    }else{
      alert('invalid code');
    }
  }
});

export default Landing;
