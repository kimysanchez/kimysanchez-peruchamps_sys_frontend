import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { Spinner, Button, Form, Modal } from 'react-bootstrap';


export const Champ = () => {

  const { idChamp } = useParams();
  const urlListarIntervenciones = "https://peruchamps-sys-backend.onrender.com/listarIntervenciones/" + idChamp;
  const urlAñadirIntervencion = "https://peruchamps-sys-backend.onrender.com/insertarIntervencion/" + idChamp;
  const urlEditarIntervencion = "https://peruchamps-sys-backend.onrender.com/editarIntervencion/";
  const urlEliminarIntervencion = "https://peruchamps-sys-backend.onrender.com/eliminarIntervencion/";

  const [datosLoad, setDatosLoad] = useState(false);
  const [loadAñadir, setLoadAñadir] = useState(false);
  const [loadEditar, setLoadEditar] = useState(false);
  const [loadEliminar, setLoadEliminar] = useState(false);

  const [intervenciones, setIntervenciones] = useState([]);
  const location = useLocation();

  const [modalAñadir, setModalAñadir] = useState(false);
  const closeModalAñadir = () => setModalAñadir(false);
  const showModalAñadir = () => setModalAñadir(true);
  const [modalEditar, setModalEditar] = useState(false);
  const closeModalEditar = () => setModalEditar(false);
  const showModalEditar = () => setModalEditar(true);
  const [modalEliminar, setModalEliminar] = useState(false);
  const closeModalEliminar = () => setModalEliminar(false);
  const showModalEliminar = (interv) => { setModalEliminar(true); setIdIntervencion(interv); }

  const [fechaSelec, setFechaSelec] = useState('');
  const [motivo1Selec, setMotivo1Selec] = useState('');
  const [motivo2Selec, setMotivo2Selec] = useState('');
  const [informacionSelec, setInformacionSelec] = useState('');
  const [acuerdoSelec, setAcuerdoSelec] = useState('');
  const [psicologoSelec, setPsicologoSelec] = useState('');
  const [idIntervencion, setIdIntervencion] = useState('');

  const [fecha, setFecha] = useState('');
  const [motivo1, setMotivo1] = useState('');
  const [motivo2, setMotivo2] = useState('');
  const [informacion, setInformacion] = useState('');
  const [acuerdo, setAcuerdo] = useState('');
  const [psicologo, setPsicologo] = useState('');


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


  const listarIntervenciones = async () => {
    const response = await fetch(urlListarIntervenciones, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors'
    });
    const datos = await response.json();
    setIntervenciones(datos.intervenciones);
    setDatosLoad(true);
  }



  const eliminarIntervencion = async (e) => {
    setLoadEliminar(true);
    e.preventDefault();

    const response = await fetch(urlEliminarIntervencion + idIntervencion, {
      method: 'DELETE',
    })
    const datos = await response.json();
    console.log(datos);
    listarIntervenciones();
    closeModalEliminar();
    setLoadEliminar(false);
  }

  const editarIntervencion = async (e) => {
    setLoadEditar(true);
    e.preventDefault();
    console.log(psicologoSelec)
    const response = await fetch(urlEditarIntervencion + idIntervencion, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        fecha: fechaSelec,
        motivo1: motivo1Selec,
        motivo2: motivo2Selec,
        informacion: informacionSelec,
        acuerdo: acuerdoSelec,
        psicologo: psicologoSelec
      })

    })
    const datos = await response.json();
    console.log(datos);
    closeModalEditar();
    setLoadEditar(false);
    listarIntervenciones();
  }

  function mostrarIntervencion(interv) {
    console.log(interv);
    let timeStamp = Date.parse(interv.fecha.toString())
    let d = new Date(timeStamp);
    let date = [
      d.getFullYear(),
      ('0' + (d.getMonth() + 1)).slice(-2),
      ('0' + (d.getDate() + 1)).slice(-2)
    ].join('-');

    setFechaSelec(date);
    setMotivo1Selec(interv.motivo1);
    setMotivo2Selec(interv.motivo2);
    setInformacionSelec(interv.informacion);
    setAcuerdoSelec(interv.acuerdo);
    setPsicologoSelec(interv.psicologo);
    setIdIntervencion(interv.idIntervencion);
    showModalEditar();
  }

  const añadirIntervencion = async (e) => {
    setLoadAñadir(true);
    e.preventDefault();
    console.log(fecha, motivo1, motivo2, informacion, acuerdo, psicologo);

    const response = await fetch(urlAñadirIntervencion, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        fecha: fecha,
        motivo1: motivo1,
        motivo2: motivo2,
        informacion: informacion,
        acuerdo: acuerdo,
        psicologo: psicologo
      })

    })
    const datos = await response.json();
    console.log(datos);
    closeModalAñadir();
    setLoadAñadir(false);
    listarIntervenciones();
    setFecha('');
    setMotivo1('');
    setMotivo2('');
    setInformacion('');
    setAcuerdo('');
    setPsicologo('');
  }

  useEffect(() => {
    listarIntervenciones();
  }, [idChamp])


  return (
    <>
      <h3 className='titulo'>{location.state.nombre} {location.state.apellido}</h3>
      <div className='cuerpo'>
        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="card-body">DNI: {location.state.dni}</div>
              <div className="card-body">Grado: {location.state.grado}</div>
              <div className="card-body">Sede: {location.state.sede}</div>
              <div className="card-body">Estado: {location.state.estado}</div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-body">Correo 1: {location.state.correo1}</div>
              <div className="card-body">Correo 2: {location.state.correo2}</div>
              <div className="card-body">Celular 1: {location.state.celular1}</div>
              <div className="card-body">Celular 2: {location.state.celular2}</div>
            </div>
          </div>
        </div>
        <div className="intervenciones  mt-4">
          <h4 className='mt-4'>Intervenciones</h4>
          <Button className='botonInterv' variant="primary" onClick={showModalAñadir}>
            Añadir intervencion
          </Button>
        </div>

        {
          datosLoad ? (intervenciones.length === 0 ? (
            <p>Este champ no tiene intervenciones</p>
          ) : (

            <table className="table tabla">
              <thead>
                <tr>
                  <td>Fecha</td>
                  <td>Motivo 1</td>
                  <td>Motivo 2</td>
                  <td>Acuerdo</td>
                  <td className='table_center'>Editar</td>
                  <td className='table_center'>Eliminar</td>
                </tr>
              </thead>
              <tbody>
                {intervenciones.map((interv, key) =>
                  <tr key={key}>
                    <td>{interv.fecha}</td>
                    <td>{interv.motivo1}</td>
                    <td>{interv.motivo2}</td>
                    <td>{interv.acuerdo}</td>
                    <td className='table_center'>
                      <Button variant="secondary" onClick={() => mostrarIntervencion(interv)}>
                        Editar
                      </Button>
                    </td>
                    <td className='table_center'>
                      <Button variant="danger" onClick={() => showModalEliminar(interv.idIntervencion)}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )) : (
            <div className='text-center' >
              <Spinner animation="border" />
            </div>
          )
        }




        <Modal show={modalAñadir} onHide={closeModalAñadir} centered>
          <Modal.Header closeButton>
            <Modal.Title>Añadir Intervención</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={añadirIntervencion} >
              <Form.Group className="mb-3">
                <Form.Label>Fecha:</Form.Label>
                <Form.Control type="date" onChange={e => setFecha(e.target.value)} value={fecha} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Motivo 1:</Form.Label>
                <Form.Control type="text" onChange={e => setMotivo1(e.target.value)} value={motivo1} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Motivo 2:</Form.Label>
                <Form.Control type="text" onChange={e => setMotivo2(e.target.value)} value={motivo2} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Información:</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={e => setInformacion(e.target.value)} value={informacion} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Acuerdos:</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={e => setAcuerdo(e.target.value)} value={acuerdo} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Psicologo:</Form.Label>
                <Form.Select onChange={e => setPsicologo(e.target.value)} value={psicologo}>
                  <option>Todos</option>
                  {psicologos.map((psicologo, key) =>
                    <option key={key}>{psicologo.label}</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModalAñadir}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={añadirIntervencion}>
              {loadAñadir ? (
                <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              ): (<></>)}
              Añadir
            </Button>
          </Modal.Footer>
        </Modal>


        <Modal show={modalEditar} onHide={closeModalEditar} centered>
          <Modal.Header closeButton>
            <Modal.Title>Editar Intervención</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Fecha:</Form.Label>
                <Form.Control type="date" onChange={e => setFechaSelec(e.target.value)} value={fechaSelec} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Motivo 1:</Form.Label>
                <Form.Control type="text" onChange={e => setMotivo1Selec(e.target.value)} value={motivo1Selec} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Motivo 2:</Form.Label>
                <Form.Control type="text" onChange={e => setMotivo2Selec(e.target.value)} value={motivo2Selec} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Información:</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={e => setInformacionSelec(e.target.value)} value={informacionSelec} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Acuerdos:</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={e => setAcuerdoSelec(e.target.value)} value={acuerdoSelec} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Psicologo:</Form.Label>
                <Form.Select onChange={e => setPsicologoSelec(e.target.value)} value={psicologoSelec}>
                  <option>Todos</option>
                  {psicologos.map((psicologo, key) =>
                    <option key={key}>{psicologo.label}</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModalEditar}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={editarIntervencion}>
            {loadEditar ? (
                <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              ): (<></>)}
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>


        <Modal show={modalEliminar} onHide={closeModalEliminar} centered>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar Intervención</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro que deseas ELIMINAR la intervención?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModalEliminar}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={eliminarIntervencion}>
            {loadEliminar ? (
                <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              ): (<></>)}
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}
