import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import ReactDOM from 'react-dom';

const CompRender = React.createClass({
  getInitialState() {
    return null;
  },

  render() {
    const width = 500; // canvas width
    const height = 179; // canvas height
    const cameraPosition = new THREE.Vector3(0, 0, 5);

    return (<React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={width}
      height={height}
      antialias={true}
      clearColor={0xffffff}
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
        <mesh
          rotation={new THREE.Euler(
            0.5,
            0.5,
            0
          )}
        >
          <boxGeometry
            width={this.props.width/2}
            height={this.props.length/2}
            depth={1}
          />
          <meshBasicMaterial
            color={0x00ff00}
          />
        </mesh>
      </scene>
    </React3>);
  }
});

export default CompRender;
