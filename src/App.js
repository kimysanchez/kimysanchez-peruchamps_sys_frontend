import React from 'react';
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom';
import { Champ } from './paginas/Champ';
import { General } from './paginas/General';
import { Psicologo } from './paginas/Psicologo';
import {   Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './/champs.png';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar className='contenedor_nav' collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/">
            <img
              alt="logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            SyS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">General</Nav.Link>
              <NavDropdown title="Psicologos" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/psicologo/Darwin">Darwin</NavDropdown.Item>
                <NavDropdown.Item href="/psicologo/Macarena">Macarena</NavDropdown.Item>
                <NavDropdown.Item href="/psicologo/Sofia">Sofia</NavDropdown.Item>
                <NavDropdown.Item href="/psicologo/Vale C">Vale C</NavDropdown.Item>
                <NavDropdown.Item href="/psicologo/Valentina">Valentina</NavDropdown.Item>
                <NavDropdown.Item href="/psicologo/Valeria R">Valeria R</NavDropdown.Item>
                <NavDropdown.Item href="/psicologo/Valeria Velit">Valeria Velit</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="/">Ayuda</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>


        <Routes>
          <Route className="contenedor" path="/" element={<General/>}/>
          <Route className="contenedor"  path="/general" element={<General/>}/>
          <Route className="contenedor"  path="/psicologo/:psicologo" element={<Psicologo/>}/>
          <Route className="contenedor"  path="/champ/:idChamp" element={<Champ/>}/>
        </Routes>
    </Router>
  );
}

export default App;
