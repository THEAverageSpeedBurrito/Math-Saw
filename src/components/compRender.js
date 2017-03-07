import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

const CompRender = React.createClass({
  getInitialState() {
    var rotationY = Math.floor(Math.random(10)*10)
    return ({
      cubeRotation: new THREE.Euler(0, rotationY, 0)
    })
  },

  onAnimate() {
    this.setState({
      cubeRotation: new THREE.Euler(
        0,
        this.state.cubeRotation.y + 0.005,
        0
      ),
    });
  },

  render() {
    const width = 200; // canvas width
    const height = 179; // canvas height
    const cameraPosition = new THREE.Vector3(0, 0, 5);


    return (<React3
      mainCamera="camera"
      width={width}
      height={height}
      antialias={true}
      clearColor={0xffffff}

      onAnimate={this.onAnimate}
    >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={70}
          aspect={width/height}
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
          <meshLambertMaterial color={0x00ff00}/>
        </mesh>
      </scene>
    </React3>);
  }
});

export default CompRender;
