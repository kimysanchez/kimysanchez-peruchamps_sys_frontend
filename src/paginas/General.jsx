import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { useNavigate } from "react-router-dom";

export const General = () => {

  const navigate = useNavigate();

  const [filtroBuscador, setFiltroBuscador] = useState("");
  const [filtroPsicologo, setFiltroPsicologo] = useState("Todos");
  const [filtroNivelRiesgo, setFiltroNivelRiesgo] = useState("Todos");

  const [datosLoad, setDatosLoad] = useState(false);
  const [champs, setChamps] = useState([])
  const urlListarChamps = "https://peruchamps-sys-backend.onrender.com/listarChamps";
  const columnas = [
    {
      name: 'DNI',
      selector: row => row.dni,
      sortable: true
    },
    {
      name: 'Nombre Completo',
      selector: row => row.nombres + ' ' + row.apellidos,
      sortable: true
    },
    {
      name: 'Nivel de riesgo',
      selector: row => row.nivelRiesgo,
      sortable: true
    },
    {
      name: 'Grado',
      selector: row => row.grado,
      sortable: true
    },
    {
      name: 'Psicologo',
      selector: row => row.psicologo,
      sortable: true
    },
    {
      name: 'Sede',
      selector: row => row.sede,
      sortable: true
    },
  ]
  const psicologos = [
    { value: "Darwin", label: "Darwin" },
    { value: "Sayu", label: "Sayu" },
    { value: "Macarena", label: "Macarena" },
    { value: "Sofia", label: "Sofia" },
    { value: "Vale C", label: "Vale C" },
    { value: "Valentina", label: "Valentina" },
    { value: "Valeria R", label: "Valeria R" },
    { value: "Valeria Velit", label: "Valeria Velit" }
  ];
  const nivelesRiesgo = [
    { value: "BAJO", label: "BAJO" },
    { value: "MEDIO", label: "MEDIO" },
    { value: "ALTO", label: "ALTO" }
  ];


  const listarChamps = async () => {
    const response = await fetch(urlListarChamps, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors'
    });
    const datos = await response.json();
    setChamps(datos.champs);
    setDatosLoad(true);
  }

  function filtrarBuscador(e) {
    setFiltroBuscador(e.target.value);
  }

  function filtrarDropDown(e, filtro) {
    if (filtro === "psicologo")
      setFiltroPsicologo(e.target.value);
    else if (filtro === "nivelRiesgo")
      setFiltroNivelRiesgo(e.target.value);
  }

  function filtrar(rows) {
    if (filtroPsicologo !== "Todos") {
      rows = rows.filter(row =>
        row["psicologo"] === filtroPsicologo)
    }

    if (filtroNivelRiesgo !== "Todos") {
      rows = rows.filter(row =>
        row["nivelRiesgo"] === filtroNivelRiesgo)
    }

    const keys = ["dni", "nombres", "apellidos"]
    return rows.filter(row => {
      return keys.some((key) => row[key].toLowerCase().includes(filtroBuscador.toLowerCase()))
    })
  }

  const champSeleccionado = (e) => {
    console.log(e)
    navigate('/champ/' + e.idChamp,
      {
        state: {
          nombre: e.nombres,
          apellido: e.apellidos,
          dni: e.dni,
          grado: e.grado,
          sede: e.sede,
          estado: e.estado,
          correo1: e.correo1,
          correo2: e.correo2,
          celular1: e.celular1,
          celular2: e.celular2
        }
      });
  }

  useEffect(() => {
    listarChamps();
  }, [])



  return (
    <>
      <h1 className='titulo'>Base de datos General</h1>
      <div className='cuerpo'>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{'Buscar:'}</Form.Label>
              <Form.Control type="text" placeholder="Buscar por DNI o Nombre" onChange={filtrarBuscador} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Psicologo:</Form.Label>
              <Form.Select onChange={(e) => filtrarDropDown(e, "psicologo")}>
                <option>Todos</option>
                {psicologos.map((psicologo, key) =>
                  <option key={key}>{psicologo.label}</option>
                )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nivel Riesgo:</Form.Label>
              <Form.Select onChange={(e) => filtrarDropDown(e, "nivelRiesgo")}>
                <option>Todos</option>
                {nivelesRiesgo.map((grado, key) =>
                  <option key={key}>{grado.label}</option>
                )}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        {
          datosLoad ? (
            <DataTable
              className='tabla'
              columns={columnas}
              data={filtrar(champs)}
              fixedHeader
              pagination
              onRowClicked={champSeleccionado}
              noDataComponent="No hay registros"
            />
          ) :
            (<div className='text-center' >
              <Spinner animation="border" />
            </div>)
        }
      </div>
    </>
  )
}
