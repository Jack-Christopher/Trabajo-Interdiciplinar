import React, { useState } from "react";
import { storage } from "../firebase/index";
import ProgressBar from "react-bootstrap/ProgressBar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import './css/formUpload.css';
import './css/Column.css';
function FormFile() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [folder, setFolder] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSelect = (e) => {
    let index = e.target.selectedIndex;
    console.log(e.target.options[index].text);
    setFolder(e.target.options[index].text);
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`${folder}/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`${folder}`)
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };
  console.log(file);
  return (

    <Col class="divForm" md={6}>
      <div class="form-style-10 .inner-wrap">
      <h1 className="text-center">Sube tu PDF</h1>
      <Form>
        <Form.Group>
          <Form.Label>Selecciona el año</Form.Label>
          <Form.Control as="select" onChange={handleSelect}>
            <option>Primero</option>
            <option>Segundo</option>
            <option>Tercero</option>
            <option>Cuarto</option>
            <option>Quinto</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.File type="file" onChange={handleChange} label="Suba un PDF" />
        </Form.Group>
        <Form.Group>
          <Button onClick={handleUpload}>Subir Archivo</Button>
        </Form.Group>
        <ProgressBar
          animated
          variant="success"
          now={progress}
          max="100"
          label={`${progress}%`}
        />
        <br />
        {url}
        <br />
      </Form>
      </div>
    </Col>

  );
}

export default FormFile;
