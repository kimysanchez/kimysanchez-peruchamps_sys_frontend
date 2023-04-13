import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';

export const Psicologo = () => {

  const navigate = useNavigate();

  const { psicologo } = useParams();
  const [filtroBuscador, setFiltroBuscador] = useState("");
  const [filtroPsicologo, setFiltroPsicologo] = useState("Todos");
  const [filtroNivelRiesgo, setFiltroNivelRiesgo] = useState("Todos");

  const [datosLoad, setDatosLoad] = useState(false);
  const [champs, setChamps] = useState([])
  const urlListarChamps = "https://peruchamps-sys-backend.onrender.com/listarChamps/" + psicologo;
  const columnas = [
    {
      name: 'DNI',
      selector: row => row.dni,
      sortable: true
    },
    {
      name: 'Nombre',
      selector: row => row.nombres,
      sortable: true
    },
    {
      name: 'Apellido',
      selector: row => row.apellidos,
      sortable: true
    },
    {
      name: 'Psicologo',
      selector: row => row.psicologo,
      sortable: true
    }
  ]
  const psicologos = [
    { value: "Darwin", label: "Darwin" },
    { value: "Sayu", label: "Sayu" }
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
    console.log(datos);
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
        }
      });
  }


  useEffect(() => {
    listarChamps();
  }, [])

  return (
    <>
      <h1 className='titulo'>Base de datos de {psicologo}</h1>
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
