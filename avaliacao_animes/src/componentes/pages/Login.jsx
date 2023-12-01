import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState('');
  const [showError, setShowError] = useState(false);

  // Obter o objeto de histórico
  const navigate = useNavigate();

  const handleLogin = async () => {
      // Validar se os campos estão preenchidos
      if (email.trim() == '' || usuario.trim() == '' || senha.trim() == '') {
        // Exibir mensagem de erro
        setShowError(true);
      } else {
        try {
          const response = await axios.get(`http://localhost:5000/usuario/?email=${email}&nome=${usuario}&senha=${senha}`);
          const usuarioEncontrado = response.data;
          console.log(usuarioEncontrado);

          try{
            let usuario_temp = {
              nome: usuarioEncontrado.nome,
              email: usuarioEncontrado.email,
              nomeUsuario: usuarioEncontrado.nomeUsuario,
              senha: usuarioEncontrado.senha,
              dataNascimento: usuarioEncontrado.dataNascimento,
              isLogin: true,
              id: 1
            };
            console.warn(usuario_temp);
            
           const responsePut = await axios.put(`http://localhost:5000/login/${usuario_temp.id}`, usuario_temp);
            console.log(responsePut.data);
            navigate('/anime', { replace: true });
            window.location.reload();
          } catch (error){
            console.log(error);
          }
          
        } catch (error) {
          console.error('Usuário não encontrado', error);
          setShowError(true);
          console.log(`Email: ${email}, Usuario: ${usuario}, Senha: ${senha}`);
        }
      }
  };


  return (
    <div className="container mt-5 d-flex justify-content-center" style={{ height: '100vh' }}>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Endereço de Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite o email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '500px' }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicUsuario">
          <Form.Label>Usuário</Form.Label>
          <Form.Control
            type="user"
            placeholder="Digite seu nome de usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={{ width: '500px' }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{ width: '500px' }}
          />
        </Form.Group>
        {showError && (
          <Alert variant="danger" style={{ marginTop: '10px', width: '500px' }}>
            Informações incorretas.
          </Alert>
        )}

        <Button variant="primary" onClick={handleLogin} style={{ marginTop: '10px' }}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;