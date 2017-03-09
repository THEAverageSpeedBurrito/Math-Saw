import React from 'react';
var {Component, Stock} = require('./js/constructors');
var randomstring = require('randomstring');
import request from 'superagent';
import { Container, Row, Col} from 'react-grid-system';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Checkbox from 'material-ui/Checkbox';

//Components
import NavBar from './navbar';
import Export from './export';
import Comp from './component'

var style = {
  navstyle: {
    backgroundColor: "dodgerblue",
    color: "#114B5F",
    position: 'fixed',
    top: '0',
    boxShadow: '0 2px 10px 1px rgba(0,0,0,0.4)',
    opactiy: '0.8',
    button: {
      margin: '5px 10px 5px 10px',
    },
  },
  titlestyle: {
    color: 'white',
    fontFamily: 'Jaldi',
    fontSize: 40,
    textShadow: 'none'
  },
  logo: {
    height: 500,
    width: 500,
  },
  paper: {
    padding: 10,
    backgroundColor: '#ffffff',
    margin: '20px 0 20px 0',
    boxShadow: '0 0 10px 3px rgba(0,0,0,0.1)',
    borderRight: '3px solid dodgerblue',
    borderLeft: '3px solid dodgerblue',
  },
  expButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
  buttonBlueOverlay: {
    backgroundColor: "white",
    borderBottom: '3px solid #3DE292',
  },
  dialoge: {
    body: {
      borderLeft: '3px solid dodgerblue',
      borderRight: '3px solid dodgerblue',
      backgroundColor: '#51514F',
    },
    actions: {
      borderLeft: '3px solid dodgerblue',
      borderRight: '3px solid dodgerblue',
      backgroundColor: '#353531',
    }

  },
  projectName: {
    width: 400,
    backgroundColor: '#353531',
    fontSize: 35,
    color: "#ffffff",
    border: '1px solid #2C2C29',
    textAlign: 'center',
    padding: 25
  },
  label: {
    margin: 10
  }
}

var editing, index;

var Editor = React.createClass({

  getInitialState: function () {
    var projectCode = sessionStorage.getItem('projectCode');

    return ({
      projectCode: projectCode || null,
      stock: [],
      components: [],
      length: '',
      width: '',
      name: '',
      export: false,
      style: style,
      open: false,
      cutWidth: .125,
      projectName: '',
      editing: {
        open: false,
        name: '',
        length: '',
        width: ''
      },
      saving: false,
    })
  },

  componentDidMount () {
    var project;
    var components = [];

    if(this.state.projectCode){
      sessionStorage.removeItem('projectCode');

      request
      .get(`https://math-saw-db.herokuapp.com/project/${this.state.projectCode}`)
      .then((res) => {
        console.log('what');
        if(res.text){
          project = JSON.parse(res.text);
          components = project.components

          components.forEach((comp) => {
            comp.area = comp.length * comp.width
          })

          this.setState({
            open: false,
            projectName: project.name,
            components: components
          })
        }
      });
    }else{
      this.setState({
        open: true
      })
    }
  },

  render: function() {

    const initialActions = [
      <RaisedButton
        label="Create Project"
        onClick={this.handleModal}
        overlayStyle={style.buttonBlueOverlay}
      />
    ];
    const editActions = [
        <RaisedButton
          label="Save Component"
          onClick={this.handleEdit}
          overlayStyle={style.buttonBlueOverlay}
        />
    ];

    var which;

    var render;
    if(this.state.export){
      render =  (<Export
          components={this.state.components}
          stock={this.state.stock}
          cutWidth={this.state.cutWidth}
        />)
    }else{
      render = (
        <div>
          <Row>
            {
              this.state.components.map((component) => {
                return (
                  <Comp component={component} delete={this.handleDeletion} edit={this.handleEdit} key={component.name}/>
                )
              })
            }
          </Row>
        </div>
      )
    }

    var expLabel;
    if(!this.state.export){
      expLabel = "Finish Design"
    }else{
      expLabel = "Keep Editing"
    }

    return (
      <main>
        <NavBar style={this.state.style} save={this.saveProject} />
        <div className="newComponent">
          <div className="formContainer">
            <Row id="inputfields" className="center">
              <Col sm={12} md={4}>
                <input
                placeholder="description"
                type="text"
                onChange={this.componentName}
                value={this.state.name}
                />
              </Col>
              <Col sm={12} md={4}>
                <input
                placeholder="Length"
                type="text"
                onChange={this.setLength}
                value={this.state.length}
                />
              </Col>
              <Col sm={12} md={4}>
                <input
                placeholder="Width"
                type="text"
                onChange={this.setWidth}
                value={this.state.width}
                />
              </Col>
              <Col sm={12}>
                <RaisedButton
                label="Add Component"
                onClick={this.addComponent}
                overlayStyle={style.buttonBlueOverlay}
                fullWidth={true}
                />
              </Col>
            </Row>
          </div>
        </div>
        <Container className="container" id="mainContainer">
          <div>
            <Dialog
              actions={initialActions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleModal}
              bodyStyle={this.state.style.dialoge.body}
              actionsContainerStyle={this.state.style.dialoge.actions}
            >
            <Row>
              <Col sm={12}>
                <h3>Project information</h3>
              </Col>
              <Col sm={12} md={6}>
                <input
                type="text"
                className="modal-input"
                placeholder="Project Name"
                value={this.state.projectName}
                onChange={this.projectName}
                />
              </Col>
              <Col sm={12} md={6}>
                <input
                type="text"
                className="modal-input"
                placeholder="Blade Width"
                value={this.state.cutWidth}
                onChange={this.changeCutWidth}
                />
              </Col>
            </Row>
            </Dialog>
            <Dialog
              actions={editActions}
              modal={false}
              open={this.state.editing.open}
              onRequestClose={this.handleEdit}
              bodyStyle={this.state.style.dialoge.body}
              actionsContainerStyle={this.state.style.dialoge.actions}
            >
            <Row>
              <Col sm={12}>
                <label for="editName" style={style.label}>Project</label>
                <input
                type="text"
                id="editName"
                value={this.state.editing.name}
                onChange={this.changeName}
                />
              </Col>
              <Col sm={12} md={6}>
                <label for="editLength" style={style.label}>Length</label>
                <input
                type="text"
                id="editLength"
                value={this.state.editing.length}
                onChange={this.changeLength}
                />
              </Col>
              <Col sm={12} md={6}>
                <label for="editWidth" style={style.label}>Width</label>
                <input
                type="text"
                id="editWidth"
                value={this.state.editing.width}
                onChange={this.changeWidth}
                />
              </Col>
            </Row>
            </Dialog>
            <Dialog
              actions={<RaisedButton label="close" onClick={this.saveProject} overlayStyle={style.buttonBlueOverlay}/>}
              modal={false}
              open={this.state.saving}
              onRequestClose={this.saveProject}
              bodyStyle={this.state.style.dialoge.body}
              actionsContainerStyle={this.state.style.dialoge.actions}
            >
            <div className="center">
              <div>
              <h3>{this.state.projectCode}</h3>
              </div>
            </div>
            </Dialog>
          </div>
          <div className="center">
            <input type='text' value={this.state.projectName} onChange={this.projectName} style={this.state.style.projectName}/>
          </div>

          {render}

        </Container>
        <RaisedButton label={expLabel} style={style.expButton} overlayStyle={style.buttonBlueOverlay} onClick={this.renderCuts} />
      </main>
    )
  },

  setLength: function (event) {
    let newVal = event.target.value;
    this.setState({length: newVal});
  },

  setWidth: function (event) {
    let newVal = event.target.value;
    this.setState({width: newVal});
  },

  addComponent: function (event) {
    event.preventDefault()

    if(this.state.projectCode){
      request
      .delete(`https://math-saw-db.herokuapp.com/project/${this.state.projectCode}`)
      .then(() => {
        this.setState({
          projectCode: null
        });
      })
    }

    var {length, width, name} = this.state;
    var id = this.state.components.length;

    if(!isNaN(length) && !isNaN(width)){
      this.state.components.push(new Component(parseInt(length), parseInt(width), 0, 0, name, id))
      this.state.components[this.state.components.length - 1].id = this.state.components.length - 1

      this.setState({
        length: '',
        width: '',
        name: '',
      });
    }else{
      alert('invalid input')
    }

  },

  //take array of object classes
  //returns array of canvas objects to br rendered
  renderCuts: function () {
    var stock = this.state.stock;
    var components = this.state.components;
    var cutWidth = this.state.cutWidth

    this.setState({
      export: !this.state.export
    })
  },

  handleModal() {
    if(this.state.projectName && !isNaN(this.state.cutWidth)){
      this.setState({
        open: !this.state.open
      })
    }
  },

  changeCutWidth(event) {
    let newWidth = event.target.value;
    this.setState({
      cutWidth: newWidth
    });
  },

  projectName(event) {
    let newName = event.target.value;
    this.setState({
      projectName: newName
    })
  },

  componentName(event) {
    let newName = event.target.value;
    this.setState({
      name: newName
    })
  },

  handleDeletion(id) {
    var newComponentsList = this.state.components.filter((comp) => {
      return (comp.id !== id)
    });

    if(this.state.projectCode){
      request
      .delete(`https://math-saw-db.herokuapp.com/project/${this.state.projectCode}`)
      .then(() => {
        this.setState({
          projectCode: null
        });
      })
    }

    this.setState({
      components: newComponentsList
    })
  },

  handleEdit(id) {

    if(this.state.editing.open){
      var tempComps = this.state.components;
      editing.name = this.state.editing.name;
      editing.length = this.state.editing.length;
      editing.width = this.state.editing.width;
      editing.area = editing.width * editing.length;

      tempComps[index] = editing;

      this.setState({
        components: tempComps,
        editing: {
          open: false,
          name: '',
          length: '',
          width: '',
        }
      })
    }else{
      editing = this.state.components.filter((comp) => {
        return comp.id === id;
      })[0];

      index = this.state.components.indexOf(editing);

      this.setState({
        editing: {
          open: true,
          name: editing.name,
          length: editing.length,
          width: editing.width
        }
      });
    }
  },

  changeName(event) {
    this.setState({
      editing: {
        open: true,
        name: event.target.value,
        length: this.state.editing.length,
        width: this.state.editing.width,
      }
    })
  },
  changeLength(event) {
    this.setState({
      editing: {
        open: true,
        name: this.state.editing.name,
        length: event.target.value,
        width: this.state.editing.width,
      }
    })
  },
  changeWidth(event) {
    this.setState({
      editing: {
        open: true,
        name: this.state.editing.name,
        length: this.state.editing.length,
        width: event.target.value,
      }
    })
  },

  saveProject() {
    this.setState({
      saving: !this.state.saving,
    });

    if(!this.state.saving){
      if(!this.state.projectCode){
        this.setState({
          projectCode: randomstring.generate({
            length: 20,
            capitalization: 'uppercase'
          })
        },function () {
          request
          .post("https://math-saw-db.herokuapp.com/project")
          .send({
            name: this.state.projectName,
            code: this.state.projectCode
          })
          .then((res) => {
            this.state.components.forEach((comp) => {
              console.log('posting component');
              request
              .post(`https://math-saw-db.herokuapp.com/component`)
              .send({
                project: res.body[0].id,
                name: comp.name,
                length: comp.length,
                width: comp.width
              }).
              then((res) => {
                console.log(res);
              })
            })
          });
        })
      }
    }
  }
})

export default Editor;
