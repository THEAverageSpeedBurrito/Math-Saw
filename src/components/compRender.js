import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

const CompRender = React.createClass({
  getInitialState() {
    var rotationY = Math.floor(Math.random(10)*10)
    return ({
      cubeRotation: new THREE.Euler(0, rotationY, 0),
      fullHeight: 200,
      fullWidth: 0,
    })
  },

  onAnimate() {
    this.setState({
      cubeRotation: new THREE.Euler(
        .01,
        this.state.cubeRotation.y + 0.005,
        0
      ),
    });
  },

  componentDidMount() {
    var container = document.getElementById(this.props.container)
    var height = container.offsetHeight;
    var width = container.offsetWidth;

    this.setState({
      fullWidth: width
    })
  },

  render() {

    const cameraPosition = new THREE.Vector3(0, 0, 5);


    return (<React3
      mainCamera="camera"
      width={this.state.fullWidth}
      height={this.state.fullHeight}
      antialias={true}
      clearColor={0x51514F}
      onAnimate={this.onAnimate}
      >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={70}
          aspect={this.state.fullWidth/this.state.fullHeight}
          near={0.1}
          far={1000}
          position={cameraPosition}
        />

        <ambientLight color={0x404040}/>

        <directionalLight
          color={0xffffff}
          position={new THREE.Vector3(0, 10, 10)}
          lookAt={new THREE.Vector3(0, 0, 0)}
        />

        <mesh rotation={this.state.cubeRotation}>

          <boxGeometry
            width={this.props.width/2}
            height={this.props.length/2}
            depth={1}
          />
          <meshLambertMaterial color={0x1E90FF}/>
        </mesh>
      </scene>
    </React3>);
  }
});

export default CompRender;
