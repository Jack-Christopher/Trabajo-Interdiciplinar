import React,{useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import 'firebase/auth';
import {useFirebaseApp,useUser} from "reactfire";
import { Link } from "react-router-dom";

function FormTeacher() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const firebase = useFirebaseApp();
  const user = useUser();

  const { register, errors, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {
    console.log(data);
    await setEmail(data.email);
    await setPassword(data.password);
    await firebase.auth().createUserWithEmailAndPassword(data.email,data.password);

    e.target.reset();
  };

  return (
      <Container className="wrapper">
      {!user &&
      <Form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <Form.Label className="title">Registro</Form.Label>
        <Form.Group className="input-div">
          <Form.Group className="email">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              className="email"
              type="email"
              name="email"
              placeholder="email@unsa.edu.pe"
              ref={register({
                required: {
                  value: true,
                  pattern: /^[a-z]+@[a-z]+(?:\.[a-z]+)*$/,
                  message: "Ingrese su email por favor",
                },
              })}
            />
            {errors.email?.message}
          </Form.Group>
        </Form.Group>

        <Form.Group className="input-div">
          <Form.Group className="password">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              className="password"
              type="password"
              name="password"
              placeholder="password"
              ref={register({
                required: {
                  value: true,
                  message: "Ingrese su contraseña por favor",
                },
              })}

            />
            {errors.password?.message}
          </Form.Group>
        </Form.Group>
        <Form.Group>
          <Button type="submit">Registrar</Button>
        </Form.Group>
        {/* <Form.Group>
          <ButtonGoogle />
        </Form.Group> */}
      </Form>}
      {user &&
        <div>
          <label>Gracias por registrarse</label>
          <label>Ir al área de docentes</label>
          <Link to="/">
                <Button variant="outline-success">Registrarse</Button>
          </Link>
        </div>
      }
    </Container> 
  );
}
export default FormTeacher;
