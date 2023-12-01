import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Anime from '../pages/Anime';
import Manga from '../pages/Manga';
import Novel from '../pages/Novel';
import Login from '../pages/Login';
import Signup from '../pages/SignUp';
import Review from '../pages/Reviews';
import axios from "axios";

function Menu() {
  const [isLogin, setIsLogin] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/login/1");
        if (response.data.isLogin === true) {
          setIsLogin(true);
          setNomeUsuario(response.data.nomeUsuario);
        } else {
          setIsLogin(false);
          setNomeUsuario("");
        }
      } catch (error) {
        console.log("Erro ao verificar o estado de login", error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogoutClick = async () => {
    try{
      let usuario_temp = {
        nome: "",
        email: "",
        nomeUsuario: "",
        senha: "",
        dataNascimento: "",
        isLogin: false,
        id: 1
      };
      console.warn(usuario_temp);

     const responsePut = await axios.put(`http://localhost:5000/login/${usuario_temp.id}`, usuario_temp);
      console.log(responsePut.data);
    } catch (error){
      console.log(error);
    }

    window.location.reload();
  }
  
  return (
    <>
      <Navbar style={{ backgroundColor: "#34d5eb" }}>
        <Container>
          <Navbar.Brand href="/anime">
            <img src="/Logo.png" width="100%" height="150" alt=""></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/anime" className='Menu'>ANIME</Nav.Link>
              <Nav.Link href="/manga" className='Menu'>MANGA</Nav.Link>
              {/*<Nav.Link href="/novel" className='Menu'>NOVEL</Nav.Link>*/}
            </Nav>
            <Nav className="justify-content-end" activeKey="/home">
              {isLogin ? (
                <Nav.Item style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ color: "white", fontSize: "20px", margin: "10px", marginRight: "30px" }}>Bem-vindo, {nomeUsuario}!</p>
                  <Button variant="primary" onClick={handleLogoutClick}>
                    Logout
                  </Button>
                </Nav.Item>
              ) : (
                <>
                  <Nav.Item>
                    <Button 
                      href="/login" 
                      style={{ 
                        backgroundColor: "#333", 
                        padding: "7px 40px 7px 40px", 
                        fontSize: '20px', 
                        border: 'none' 
                      }}
                    >
                      Login
                    </Button>
                  </Nav.Item>
                  <Nav.Item>
                    <Button 
                      href="/signup" 
                      style={{ 
                        backgroundColor: "#4f74c8", 
                        padding: "7px 40px 7px 40px", 
                        marginLeft: '10px', 
                        fontSize: '20px', 
                        border: 'none' 
                      }}
                    >
                      Sign up
                    </Button>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/menu" element={<Navigate to="/anime" />} />
        <Route path="/anime/*" element={<Anime></Anime>} />
        <Route path="/manga/*" element={<Manga></Manga>} />
        {/*<Route path="/novel/*" element={<Novel></Novel>} />*/}
        <Route path="/login/*" element={<Login></Login>} />
        <Route path="/signup/*" element={<Signup></Signup>} />
        <Route path="/review/:title" element={<Review />} />
      </Routes>
    </>
  );
}
export default Menu;