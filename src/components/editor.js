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
    backgroundColor: "#6200B3",
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
  logo: {
    height: 500,
    width: 500,
  },
  paper: {
    padding: 10,
    margin: '20px 0 20px 0',
    boxShadow: '0 0 10px 3px rgba(0,0,0,0.1)',
  },
  expButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: "slategray"
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
      console.log('loading component');

      request
      .get(`https://math-saw-db.herokuapp.com/project/${this.state.projectCode}`)
      .then((res) => {
        console.log('what');
        if(res.text){
          project = JSON.parse(res.text);
          console.log(project);
          components = project.components

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
      />
    ];
    const editActions = [
        <RaisedButton
          label="Save Component"
          onClick={this.handleEdit}
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
        <NavBar style={this.state.style} save={this.saveProject}/>
        <Container className="container" id="mainContainer">
          <div>
            <Dialog
              title="Project Information"
              actions={initialActions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleModal}
            >
            <Row>
              <Col sm={12} md={6}>
                <TextField
                floatingLabelText="Project Name"
                value={this.state.projectName}
                onChange={this.projectName}
                />
              </Col>
              <Col sm={12} md={6}>
                <TextField
                floatingLabelText="Cut Width"
                value={this.state.cutWidth}
                onChange={this.changeCutWidth}
                />
              </Col>
            </Row>
            <p>Avaiable types of stock</p>
            <Row>
              <Col sm={3}>
                <Checkbox
                  label="2x4 8'"
                />
              </Col>
              <Col sm={3}>
                <Checkbox
                  label="2x4 10'"
                />
              </Col>
              <Col sm={3}>
                <Checkbox
                  label="2x6 8'"
                />
              </Col>
              <Col sm={3}>
                <Checkbox
                  label="2x6 10'"
                />
              </Col>
            </Row>
            </Dialog>
            <Dialog
              title={this.state.editing.name}
              actions={editActions}
              modal={false}
              open={this.state.editing.open}
              onRequestClose={this.handleEdit}
            >
            <Row>
              <Col sm={12}>
                <TextField
                floatingLabelText="Name"
                value={this.state.editing.name}
                onChange={this.changeName}
                />
              </Col>
              <Col sm={12} md={6}>
                <TextField
                floatingLabelText="Length"
                value={this.state.editing.length}
                onChange={this.changeLength}
                />
              </Col>
              <Col sm={12} md={6}>
                <TextField
                floatingLabelText="Width"
                value={this.state.editing.width}
                onChange={this.changeWidth}
                />
              </Col>
            </Row>
            </Dialog>
            <Dialog
              actions={<RaisedButton label="close" onClick={this.saveProject}/>}
              modal={false}
              open={this.state.saving}
              onRequestClose={this.saveProject}
            >
            <div className="center">
              <h3>{this.state.projectCode}</h3>
            </div>
            </Dialog>
          </div>
          <div className="center">
            <h1>{this.state.projectName}</h1>
          </div>
          <Paper style={style.paper}>
            <Row id="inputfields" className="center">
              <Col sm={12}>
                <input
                placeholder="Name"
                type="text"
                onChange={this.componentName}
                value={this.state.name}
                />
                <input
                placeholder="Length"
                type="text"
                onChange={this.setLength}
                value={this.state.length}
                />
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
                />
              </Col>
            </Row>
          </Paper>

          {render}

        </Container>
        <RaisedButton label={expLabel} style={style.expButton} onClick={this.renderCuts} />
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
        }, function () {
          console.log(this.state.projectCode);
        });
      })
    }

    var {length, width, name} = this.state;
    var id = this.state.components.length;

    this.state.components.push(new Component(parseInt(length), parseInt(width), 0, 0, name, id))
    this.state.components[this.state.components.length - 1].id = this.state.components.length - 1

    this.setState({
      length: '',
      width: '',
      name: '',
    });
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
    this.setState({
      open: !this.state.open
    })
  },

  changeCutWidth(event) {
    let newWidth = parseInt(event.target.value);
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
