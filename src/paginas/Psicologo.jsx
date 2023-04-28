import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';

export const Psicologo = () => {

  const navigate = useNavigate();

  const { psicologo } = useParams();
  const [filtroBuscador, setFiltroBuscador] = useState("");
  const [filtroNRGeneral, setFiltroNRGeneral] = useState("Todos");
  const [filtroNRExtra, setFiltroNRExtra] = useState("Todos");
  const [filtroCantera, setFiltroCantera] = useState("Todas");
  const [filtroSede, setFiltroSede] = useState("Todas");


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
      name: 'Nombre Completo',
      selector: row => row.nombres + ' ' + row.apellidos,
      sortable: true
    },
    {
      name: 'Grado',
      selector: row => row.grado,
      sortable: true
    },
    {
      name: 'Sede',
      selector: row => row.sede,
      sortable: true
    },
    {
      name: 'Estado',
      selector: row => row.estado,
      sortable: true
    },
    {
      name: 'Cantera',
      selector: row => row.cantera,
      sortable: true
    },
    {
      name: 'NR General',
      selector: row => row.riesgoEmocional,
      sortable: true
    },
    {
      name: 'NR Extra',
      selector: row => row.nivelRiesgo,
      sortable: true
    },
  ];
  const nivelesRiesgo = [
    { value: "BAJO", label: "BAJO" },
    { value: "MEDIO", label: "MEDIO" },
    { value: "ALTO", label: "ALTO" }
  ];
  const canteras = [
    { value: "Académica", label: "Académica" },
    { value: "Artística", label: "Artística" },
    { value: "Deportiva", label: "Deportiva" },
    { value: "Empresa", label: "Empresa" }
  ];
  const sedes = [
    { value: "Arequipa 1 - Bustamante y Rivero", label: "Arequipa 1 - Bustamante y Rivero" },
    { value: "Arequipa 2 - Cerro Colorado", label: "Arequipa 2 - Cerro Colorado" },
    { value: "Arequipa 3 - Sachaca", label: "Arequipa 3 - Sachaca" },
    { value: "Arequipa 4 - Miraflores", label: "Arequipa 4 - Miraflores" },
    { value: "Ate 2 - Vitarte", label: "Ate 2 - Vitarte" },
    { value: "Ate 4 - Santa María", label: "Ate 4 - Santa María" },
    { value: "Ate 5 - Mayorazgo", label: "Ate 5 - Mayorazgo" },
    { value: "Ate Puruchuco", label: "Ate Puruchuco" },
    { value: "Ate Santa Clara", label: "Ate Santa Clara" },
    { value: "Bertello", label: "Bertello" },
    { value: "Callao 1 - Saenz Peña", label: "Callao 1 - Saenz Peña" },
    { value: "Callao 2 - Lemos", label: "Callao 2 - Lemos" },
    { value: "Callao 3 - Santa Rosa", label: "Callao 3 - Santa Rosa" },
    { value: "Carabayllo 2 - San Antonio", label: "Carabayllo 2 - San Antonio" },
    { value: "Carabayllo Enace", label: "Carabayllo Enace" },
    { value: "Cercado 1 - Sanchez Pinillos", label: "Cercado 1 - Sanchez Pinillos" },
    { value: "Chaclacayo", label: "Chaclacayo" },
    { value: "Chiclayo", label: "Chiclayo" },
    { value: "Chimbote", label: "Chimbote" },
    { value: "Chincha", label: "Chincha" },
    { value: "Chorrillos Faisanes", label: "Chorrillos Faisanes" },
    { value: "Chorrillos Horizontes", label: "Chorrillos Horizontes" },
    { value: "Chorrillos La Campiña", label: "Chorrillos La Campiña" },
    { value: "Chorrillos Universo 2", label: "Chorrillos Universo 2" },
    { value: "Chorrillos Villa", label: "Chorrillos Villa" },
    { value: "Comas 1 - Condorcanqui", label: "Comas 1 - Condorcanqui" },
    { value: "Comas 2 - El Retablo", label: "Comas 2 - El Retablo" },
    { value: "Cusco 1 - Larapa", label: "Cusco 1 - Larapa" },
    { value: "Cusco 2 - Huancaro", label: "Cusco 2 - Huancaro" },
    { value: "Huacho", label: "Huacho" },
    { value: "Huancayo", label: "Huancayo" },
    { value: "Huanuco - Amarilis", label: "Huanuco - Amarilis" },
    { value: "Ica", label: "Ica" },
    { value: "Juliaca", label: "Juliaca" },
    { value: "Los Olivos 2 - Santa Ana", label: "Los Olivos 2 - Santa Ana" },
    { value: "Los Olivos Villa Sol", label: "Los Olivos Villa Sol" },
    { value: "Moquegua 1 - Fundo El Gramadal", label: "Moquegua 1 - Fundo El Gramadal" },
    { value: "Piura 1 - Los Ejidos", label: "Piura 1 - Los Ejidos" },
    { value: "Piura 2 - Progreso", label: "Piura 2 - Progreso" },
    { value: "Pucallpa 1 - Centenario", label: "Pucallpa 1 - Centenario" },
    { value: "Rímac Santo Toribio", label: "Rímac Santo Toribio" },
    { value: "Rímac Sporting Cristal", label: "Rímac Sporting Cristal" },
    { value: "San Juan de Miraflores", label: "San Juan de Miraflores" },
    { value: "San Miguel 1", label: "San Miguel 1" },
    { value: "San Miguel 2", label: "San Miguel 2" },
    { value: "San Miguel La Paz 1", label: "San Miguel La Paz 1" },
    { value: "San Miguel La Paz 2", label: "San Miguel La Paz 2" },
    { value: "SJL 2 - El Parque", label: "SJL 2 - El Parque" },
    { value: "SJL 4 - El Sol", label: "SJL 4 - El Sol" },
    { value: "SJL Arabiscos", label: "SJL Arabiscos" },
    { value: "SJL Campoy", label: "SJL Campoy" },
    { value: "SMP Canta Callao", label: "SMP Canta Callao" },
    { value: "SMP Perú", label: "SMP Perú" },
    { value: "Surco 1 - Ambrosio", label: "Surco 1 - Ambrosio" },
    { value: "Tacna", label: "Tacna" },
    { value: "Tacna 2 - Pocollay", label: "Tacna 2 - Pocollay" },
    { value: "Tarapoto 1 - Fonavi", label: "Tarapoto 1 - Fonavi" },
    { value: "Trujillo 1 - El Golf", label: "Trujillo 1 - El Golf" },
    { value: "Trujillo 2 - Santa", label: "Trujillo 2 - Santa" },
    { value: "Trujillo 3 - San Isidro", label: "Trujillo 3 - San Isidro" },
    { value: "Villa El Salvador - Laderas de Villa", label: "Villa El Salvador - Laderas de Villa" },
    { value: "Villa el Salvador 2 - Vallejo", label: "Villa el Salvador 2 - Vallejo" }
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
    if (filtro === "riesgoEmocional")
      setFiltroNRGeneral(e.target.value);
    else if (filtro === "nivelRiesgo")
      setFiltroNRExtra(e.target.value);
    else if (filtro === "cantera")
      setFiltroCantera(e.target.value);
      else if (filtro === "sede")
      setFiltroSede(e.target.value);
  }

  function filtrar(rows) {
    if (filtroNRGeneral !== "Todos") {
      rows = rows.filter(row =>
        row["riesgoEmocional"] === filtroNRGeneral)
    }

    if (filtroNRExtra !== "Todos") {
      rows = rows.filter(row =>
        row["nivelRiesgo"] === filtroNRExtra)
    }

    if (filtroCantera !== "Todas") {
      rows = rows.filter(row =>
        row["cantera"] === filtroCantera)
    }

    if (filtroSede !== "Todas") {
      rows = rows.filter(row =>
        row["sede"] === filtroSede)
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
          cantera: e.cantera,
          riesgoEmocional: e.riesgoEmocional,
          riesgoAcademico: e.riesgoAcademico,
          nivelRiesgo: e.nivelRiesgo,
          psicologo: e.psicologo,
          donante: e.donante,
          correo1: e.correo1,
          correo2: e.correo2,
          celular1: e.celular1,
          celular2: e.celular2,
          dniMama: e.dniMama,
          dniPapa: e.dniPapa,
          nombreMama: e.nombreMama,
          nombrePapa: e.nombrePapa,
          descripcionCaso: e.descripcionCaso,
          protocolo: e.protocolo,
          region: e.region,
          linkCC: e.linkCC
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
              <Form.Label>Sede:</Form.Label>
              <Form.Select onChange={(e) => filtrarDropDown(e, "sede")}>
                <option>Todas</option>
                {sedes.map((sede, key) =>
                  <option key={key}>{sede.label}</option>
                )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Cantera:</Form.Label>
              <Form.Select onChange={(e) => filtrarDropDown(e, "cantera")}>
                <option>Todas</option>
                {canteras.map((cantera, key) =>
                  <option key={key}>{cantera.label}</option>
                )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>NR General:</Form.Label>
              <Form.Select onChange={(e) => filtrarDropDown(e, "riesgoEmocional")}>
                <option>Todos</option>
                {nivelesRiesgo.map((nivel, key) =>
                  <option key={key}>{nivel.label}</option>
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


/*
<Col>
  <Form.Group className="mb-3">
    <Form.Label>NR Extra:</Form.Label>
    <Form.Select onChange={(e) => filtrarDropDown(e, "nivelRiesgo")}>
      <option>Todos</option>
      {nivelesRiesgo.map((nivel, key) =>
        <option key={key}>{nivel.label}</option>
      )}
    </Form.Select>
  </Form.Group>
</Col> 
*/