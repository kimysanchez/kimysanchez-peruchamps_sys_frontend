import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { Spinner, Button, Form, Modal } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export const Champ = () => {

  const { idChamp } = useParams();
  const urlListarIntervenciones = "https://peruchamps-sys-backend.onrender.com/listarIntervenciones/" + idChamp;
  const urlAñadirIntervencion = "https://peruchamps-sys-backend.onrender.com/insertarIntervencion/" + idChamp;
  const urlEditarIntervencion = "https://peruchamps-sys-backend.onrender.com/editarIntervencion/";
  const urlEliminarIntervencion = "https://peruchamps-sys-backend.onrender.com/eliminarIntervencion/";
  const urlEditarSeguimiento = "https://peruchamps-sys-backend.onrender.com/editarSeguimiento/";

  const [datosLoad, setDatosLoad] = useState(false);
  const [loadAñadir, setLoadAñadir] = useState(false);
  const [loadEditar, setLoadEditar] = useState(false);
  const [loadEliminar, setLoadEliminar] = useState(false);
  const [loadEditarSeg, setLoadEditarSeg] = useState(false);

  const [intervenciones, setIntervenciones] = useState([]);
  const location = useLocation();


  const [modalEditarSeg, setModalEditarSeg] = useState(false);
  const showModalEditarSeg = () => setModalEditarSeg(true);
  const closeModalEditarSeg = () => setModalEditarSeg(false);
  const [modalAñadir, setModalAñadir] = useState(false);
  const showModalAñadir = () => setModalAñadir(true);
  const closeModalAñadir = () => setModalAñadir(false);
  const [modalEditar, setModalEditar] = useState(false);
  const showModalEditar = () => setModalEditar(true);
  const closeModalEditar = () => setModalEditar(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const showModalEliminar = (interv) => { setModalEliminar(true); setIdIntervencion(interv); }
  const closeModalEliminar = () => setModalEliminar(false);


  const [idIntervencion, setIdIntervencion] = useState('');
  const [fechaSelec, setFechaSelec] = useState('');
  const [motivo1Selec, setMotivo1Selec] = useState('');
  const [motivo2Selec, setMotivo2Selec] = useState('');
  const [informacionSelec, setInformacionSelec] = useState('');
  const [acuerdoSelec, setAcuerdoSelec] = useState('');
  const [psicologoSelec, setPsicologoSelec] = useState('');
  const [nrAcademicoSelec, setNRAcademicoSelec] = useState('');
  const [nrGeneralSelec, setNRGeneralSelec] = useState('');
  const [nrExtraSelec, setNRExtraSelec] = useState('');
  const [protocoloSelec, setProtocoloSelec] = useState('');
  const [descripcionSelec, setDescripcionSelec] = useState('');

  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const [motivo1, setMotivo1] = useState('');
  const [motivo2, setMotivo2] = useState('');
  const [informacion, setInformacion] = useState('');
  const [acuerdo, setAcuerdo] = useState('');
  const [psicologo, setPsicologo] = useState(location.state.psicologo);
  const [nrAcademico, setNRAcademico] = useState(location.state.riesgoAcademico);
  const [nrGeneral, setNRGeneral] = useState(location.state.riesgoEmocional);
  const [nrExtra, setNRExtra] = useState(location.state.nivelRiesgo);
  const [protocolo, setProtocolo] = useState(location.state.protocolo);
  const [descripcion, setDescripcion] = useState(location.state.descripcionCaso);

  const nivelesRiesgo = [
    { value: "BAJO", label: "BAJO" },
    { value: "MEDIO", label: "MEDIO" },
    { value: "ALTO", label: "ALTO" }
  ];
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
  const motivos1 = [
    { value: "Otros", label: "Otros" },
    { value: "Derivación NRA", label: "Derivación NRA" },
    { value: "Comunicación con IS", label: "Comunicación con IS" },
    { value: "Carta de compromiso por caso", label: "Carta de compromiso por caso" },
    { value: "Seguimiento", label: "Seguimiento" },
    { value: "NR Académico ", label: "NR Académico " },
    { value: "Reunión con familia", label: "Reunión con familia" }
  ];
  const motivos2 = [
    { value: "Otro", label: "Otro" },
    { value: "Depresión", label: "Depresión" },
    { value: "Conductas incongruentes", label: "Conductas incongruentes" },
    { value: "Duelo", label: "Duelo" },
    { value: "Violencia sexual, fisica o psicologica", label: "Violencia sexual, fisica o psicologica" },
    { value: "Efectividad interpersonal", label: "Efectividad interpersonal" },
    { value: "Familia problematica", label: "Familia problematica" },
    { value: "Acoso/bullying", label: "Acoso/bullying" },
    { value: "Desmotivación académica", label: "Desmotivación académica" },
    { value: "Convivencia familiar", label: "Convivencia familiar" },
    { value: "Indicadores clínicos", label: "Indicadores clínicos" },
    { value: "Enfermedad física", label: "Enfermedad física" },
    { value: "Desregulación emocional", label: "Desregulación emocional" },
    { value: "Neurodesarrollo (TEA-TDAH)", label: "Neurodesarrollo (TEA-TDAH)" }
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

  const editarSeguimiento = async (e) => {
    setLoadEditarSeg(true);
    e.preventDefault();
    console.log(nrAcademicoSelec, nrGeneralSelec, nrExtraSelec, protocoloSelec, descripcionSelec);
    const response = await fetch(urlEditarSeguimiento + idChamp, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        riesgoAcademico: nrAcademicoSelec,
        riesgoEmocional: nrGeneralSelec,
        nivelRiesgo: nrExtraSelec,
        protocolo: protocoloSelec,
        descripcionCaso: descripcionSelec,
      })

    })
    const datos = await response.json();
    console.log(datos);
    closeModalEditarSeg();
    setLoadEditarSeg(false);
    setNRAcademico(nrAcademicoSelec);
    setNRGeneral(nrGeneralSelec);
    setNRExtra(nrExtraSelec);
    setProtocolo(protocoloSelec);
    setDescripcion(descripcionSelec);
  }

  function mostrarSeguimiento() {
    setNRAcademicoSelec(nrAcademico);
    setNRGeneralSelec(nrGeneral);
    setNRExtraSelec(nrExtra);
    setProtocoloSelec(protocolo);
    setDescripcionSelec(descripcion);
    showModalEditarSeg();
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
    setFecha(new Date().toISOString().slice(0, 10));
    setMotivo1('');
    setMotivo2('');
    setInformacion('');
    setAcuerdo('');
    setPsicologo(location.state.psicologo);
  }

  useEffect(() => {
    listarIntervenciones();
  }, [idChamp])


  return (
    <>
      <h3 className='titulo'>{location.state.nombre} {location.state.apellido}</h3>
      <div className='cuerpo'>
        <div className="row">
          <div className="col-4">
            <Card>
              <Card.Body>
                <Card.Title>Datos del Champ</Card.Title>
                <br></br>
                <Card.Text>DNI: {location.state.dni}</Card.Text>
                <Card.Text>Grado: {location.state.grado}</Card.Text>
                <Card.Text>Region: {location.state.region}</Card.Text>
                <Card.Text>Sede: {location.state.sede}</Card.Text>
                <Card.Text>Estado: {location.state.estado}</Card.Text>
                <Card.Text>Cantera: {location.state.cantera}</Card.Text>
                {location.state.donante ? (<Card.Text>Donante: {location.state.donante}</Card.Text>) : (<></>)}
              </Card.Body>
            </Card>
          </div>
          <div className="col-4">
            <Card>
              <Card.Body>
                <Card.Title>Datos del Representante</Card.Title>
                <br></br>
                <Card.Text>Datos Mamá: {location.state.dniMama} - {location.state.nombreMama}</Card.Text>
                <Card.Text>Datos Papá: {location.state.dniPapa} - {location.state.nombrePapa}</Card.Text>
                <Card.Text>Correo 1: {location.state.correo1}</Card.Text>
                <Card.Text>Correo 2: {location.state.correo2}</Card.Text>
                <Card.Text>Celular 1: {location.state.celular1}</Card.Text>
                <Card.Text>Celular 2: {location.state.celular2}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-4">
            <Card>
              <Card.Body>
                <div className='intervenciones  mb-3'>
                  <Card.Title>Datos Seguimiento</Card.Title>
                  <Button variant="secondary" onClick={() => mostrarSeguimiento()}>
                    Editar
                  </Button>
                </div>
                <Card.Text>Psicologo: {location.state.psicologo}</Card.Text>
                <Card.Text>NR Académico: {nrAcademico}</Card.Text>
                <Card.Text>NR General: {nrGeneral}</Card.Text>
                <Card.Text>NR Extra: {nrExtra}</Card.Text>
                <Card.Text>Protocolo: {protocolo}</Card.Text>
                <Card.Text>Descripcion caso: {descripcion}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="intervenciones  mt-4">
          <h4 className='mt-4'>Intervenciones</h4>
          <div>
            <Button className='botonInterv botonCC' variant="primary" target="_blank" href={location.state.linkCC}>
              Ver Carta Compromiso
            </Button>
            <Button className='botonInterv' variant="primary" onClick={showModalAñadir}>
              Añadir intervencion
            </Button>
          </div>
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
                <Form.Select onChange={(e) => setMotivo1(e.target.value)}>
                  {motivos1.map((motivo, key) =>
                    <option key={key}>{motivo.label}</option>
                  )}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Motivo 2:</Form.Label>
                <Form.Select onChange={(e) => setMotivo2(e.target.value)}>
                  {motivos2.map((motivo, key) =>
                    <option key={key}>{motivo.label}</option>
                  )}
                </Form.Select></Form.Group>
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
                    <option key={key}>{psicologo.label} </option>
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
              ) : (<></>)}
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
                <Form.Select onChange={(e) => setMotivo1Selec(e.target.value)} defaultValue={motivo1Selec}>
                  {motivos1.map((motivo, key) =>
                    <option key={key}>{motivo.label}</option>
                  )}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Motivo 2:</Form.Label>
                <Form.Select onChange={(e) => setMotivo2Selec(e.target.value)} defaultValue={motivo2Selec}>
                  {motivos2.map((motivo, key) =>
                    <option key={key}>{motivo.label}</option>
                  )}
                </Form.Select>
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
              ) : (<></>)}
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
              ) : (<></>)}
              Eliminar
            </Button>
          </Modal.Footer>
        </Modal>


        <Modal show={modalEditarSeg} onHide={closeModalEditarSeg} centered>
          <Modal.Header closeButton>
            <Modal.Title>Editar Datos Seguimiento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>NR Académico:</Form.Label>
                <Form.Select onChange={e => setNRAcademicoSelec(e.target.value)} value={nrAcademicoSelec}>
                  <option></option>
                  {nivelesRiesgo.map((psicologo, key) =>
                    <option key={key}>{psicologo.label}</option>
                  )}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>NR General:</Form.Label>
                <Form.Select onChange={e => setNRGeneralSelec(e.target.value)} value={nrGeneralSelec}>
                  <option></option>
                  {nivelesRiesgo.map((psicologo, key) =>
                    <option key={key}>{psicologo.label}</option>
                  )}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>NR Extra:</Form.Label>
                <Form.Select onChange={e => setNRExtraSelec(e.target.value)} value={nrExtraSelec}>
                  <option></option>
                  {nivelesRiesgo.map((psicologo, key) =>
                    <option key={key}>{psicologo.label}</option>
                  )}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Protocolo:</Form.Label>
                <Form.Control type="text" onChange={e => setProtocoloSelec(e.target.value)} value={protocoloSelec} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción caso:</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={e => setDescripcionSelec(e.target.value)} value={descripcionSelec} />
              </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModalEditarSeg}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={editarSeguimiento}>
              {loadEditarSeg ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (<></>)}
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}
