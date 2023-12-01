import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Signup =  () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaconfirm, setSenhaconfirm] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senhaMatch, setSenhaMatch] = useState(true);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const navigate = useNavigate();

  const handleSign = async () => {
    // Verificar se há campos vazios
    if (
      nome.trim() === '' ||
      email.trim() === '' ||
      usuario.trim() === '' ||
      dataNascimento.trim() === '' ||
      senha.trim() === '' ||
      senhaconfirm.trim() === ''
    ) {
      setShowErrorPopup(true);
      return;
    }

    // Verificar se as senhas coincidem
    
    if (senha === senhaconfirm) {
      let usuario_temp = {
        nome: nome,
        email: email,
        nomeUsuario: usuario,
        senha: senha,
        dataNascimento: dataNascimento
      };
      console.warn(usuario_temp);

      const res = await axios.post("http://localhost:5000/usuario", usuario_temp, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
        },
      });
      
      console.log(`Nome: ${nome}, Email: ${email}, Senha: ${senha}, Senha confirmada: ${senhaconfirm}, Data de Nascimento: ${dataNascimento}`);
      // Exibir pop-up de sucesso
      setShowSuccessPopup(true);
      navigate('/login', { replace: true });
    } else {
      setSenhaMatch(false);
      // Exibir pop-up de erro
      setSenha('');
      setSenhaconfirm('');
    }
  };

  const handleCloseErrorPopup = () => {
    // Fechar pop-up de erro e limpar campos de senha
    setShowErrorPopup(false);
    setSenhaMatch(true);
  };

  const handleCloseSuccessPopup = () => {
    // Fechar pop-up de sucesso e limpar campos
    setShowSuccessPopup(false);
    setNome('');
    setEmail('');
    setUsuario('');
    setDataNascimento('');
    setSenha('');
    setSenhaconfirm('');
    setSenhaMatch(true);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center" style={{ height: '100vh' }}>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="nome"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ width: '500px' }}
          />
        </Form.Group>

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
            placeholder="Escolha um nome de usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            style={{ width: '500px' }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDateOfBirth">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            style={{ width: '150px' }}
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

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirmação de senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirme a senha"
            value={senhaconfirm}
            onChange={(e) => setSenhaconfirm(e.target.value)}
            style={{ width: '500px' }}
          />
          {!senhaMatch && <p style={{ color: 'red' }}> As senhas não coincidem.</p>}
        </Form.Group>

        <Button variant="primary" onClick={handleSign} style={{ marginTop: '10px' }}>
          Cadastrar
        </Button>
      </Form>

      {/* Pop-up de erro */}
      <Modal show={showErrorPopup} onHide={handleCloseErrorPopup}>
        <Modal.Header closeButton>
          <Modal.Title>Erro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Por favor, preencha todos os campos.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorPopup}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Pop-up de sucesso */}
      <Modal show={showSuccessPopup} onHide={handleCloseSuccessPopup}>
        <Modal.Header closeButton>
          <Modal.Title>Sucesso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Cadastro realizado com sucesso!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessPopup}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Signup;
