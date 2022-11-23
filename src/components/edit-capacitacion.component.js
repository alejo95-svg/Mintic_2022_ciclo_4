import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default class EditCapacitacion extends Component {
  constructor(props) {
    super(props);

    this.onChangeCapacitacionIdUsuario = this.onChangeCapacitacionIdUsuario.bind(this); 
    this.onChangeCapacitacionNombreUsuario = this.onChangeCapacitacionNombreUsuario.bind(this); 
    this.onChangeCapacitacionApellidosUsuario = this.onChangeCapacitacionApellidosUsuario.bind(this); 
    this.onChangeCapacitacionCapacitacion = this.onChangeCapacitacionCapacitacion.bind(this);
    this.onChangeCapacitacionDuracion = this.onChangeCapacitacionDuracion.bind(this);
    this.onChangeCapacitacionFecha = this.onChangeCapacitacionFecha.bind(this);
    this.onSubmit = this.onSubmit.bind(this); 

    // State
    this.state = { 
      idUsuario: "", 
      nombresUsuario: "", 
      apellidosUsuario: "", 
      capacitacion: "",
      duracionCapacitacion: "",
      fechaCapacitacion: "",
    }; 
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:4000/capacitacion/edit-capacitacion/" +
          this.props.match.params.id
      )
      .then((res) => {
        this.setState({
          idUsuario: res.data.idUsuario,
          nombresUsuario: res.data.nombresUsuario,
          apellidosUsuario: res.data.apellidosUsuario,
          capacitacion: res.data.capacitacion,
          duracionCapacitacion: res.data.duracionCapacitacion,
          fechaCapacitacion: res.data.fechaCapacitacion,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeCapacitacionIdUsuario(e) { 
    this.setState({ idUsuario: e.target.value }); 
  } 
  
  onChangeCapacitacionNombreUsuario(e) { 
    this.setState({ nombresUsuario: e.target.value }); 
  } 
  
  onChangeCapacitacionApellidosUsuario(e) { 
    this.setState({ apellidosUsuario: e.target.value }); 
  } 

  onChangeCapacitacionCapacitacion(e) { 
    this.setState({ capacitacion: e.target.value }); 
  } 

  onChangeCapacitacionDuracion(e) { 
    this.setState({ duracionCapacitacion: e.target.value }); 
  } 

  onChangeCapacitacionFecha(e) { 
    this.setState({ fechaCapacitacion: e.target.value }); 
  } 

  onSubmit(e) {
    e.preventDefault();
    const capacitacionObject = {
      idUsuario: this.state.idUsuario, 
      nombresUsuario: this.state.nombresUsuario, 
      apellidosUsuario: this.state.apellidosUsuario, 
      capacitacion: this.state.capacitacion,
      duracionCapacitacion: this.state.duracionCapacitacion,
      fechaCapacitacion: this.state.fechaCapacitacion,
    };

    axios
      .put(
        "http://localhost:4000/capacitacion/update-capacitacion/" +
          this.props.match.params.id,
          capacitacionObject
      )
      .then((res) => {
        console.log(res.data);
        console.log("Capacitacion successfully updated");
        alert("Registro actualizado con exito!!!!");
      })
      .catch((error) => {
        console.log(error);
      });

    // Redirect to Student List
    this.props.history.push("/capacitacion-list");
  }

  render() {
    return (
      <Card>
        <Card.Header>EDITAR REGISTRO</Card.Header>
        <Card.Body>
          <Card.Text>
              <div>
                <Form onSubmit={this.onSubmit}>
                  <Form.Group controlId="idUsuario"> 
                    <Form.Label>Id Usuario</Form.Label> 
                    <Form.Control 
                      type="text"
                      value={this.state.idUsuario}
                      onChange={this.onChangeCapacitacionIdUsuario}
                    /> 
                  </Form.Group>

                  <Form.Group controlId="nombresUsuario"> 
                    <Form.Label>Nombres </Form.Label> 
                    <Form.Control 
                      type="text" 
                      value={this.state.nombresUsuario} 
                      onChange={this.onChangeCapacitacionNombreUsuario}
                    /> 
                  </Form.Group>

                  <Form.Group controlId="apellidosUsuario"> 
                    <Form.Label>Apellidos</Form.Label> 
                    <Form.Control 
                      type="text"
                      value={this.state.apellidosUsuario} 
                      onChange={this.onChangeCapacitacionApellidosUsuario}
                    /> 
                  </Form.Group>

                  <Form.Group controlId="capacitacion"> 
                    <Form.Label>Capacitacion</Form.Label> 
                    <Form.Control 
                      type="text"
                      value={this.state.capacitacion} 
                      onChange={this.onChangeCapacitacionCapacitacion}
                    /> 
                  </Form.Group>

                  <Form.Group controlId="duracionCapacitacion"> 
                    <Form.Label>Duracion</Form.Label> 
                    <Form.Control 
                      type="text"
                      value={this.state.duracionCapacitacion} 
                      onChange={this.onChangeCapacitacionDuracion}
                    /> 
                  </Form.Group>

                  <Form.Group controlId="fechaCapacitacion"> 
                    <Form.Label>Fecha</Form.Label> 
                    <Form.Control 
                      type="text"
                      value={this.state.fechaCapacitacion} 
                      onChange={this.onChangeCapacitacionFecha}
                    /> 
                  </Form.Group>

                  <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
                    Actualizar Registro
                  </Button>

                </Form>
              </div>
            </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
