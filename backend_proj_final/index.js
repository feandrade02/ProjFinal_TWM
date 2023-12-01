const express = require("express");
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());

id_cliente_global = 1;

let usuario = [
    {
        "nome" : "Wesley",
        "email" : "wesleycipriano98@gmail.com",
        "nomeUsuario" : "NoneYett",
        "dataNascimento" : "10/10/1980",
        "senha": "1234",
        "id": 1
    }
]

let login = [
    {
        "nome" : "",
        "email" : "",
        "nomeUsuario" : "",
        "dataNascimento" : "",
        "senha": "",
        "isLogin" : "false",
        "id": 1
    }
]

app.get('/usuario', (req, res) => {
    const { email, nome, senha } = req.query;
    if (usuario.some(u => u.nomeUsuario === nome && u.senha === senha && u.email === email)) {
      const usuarioEncontrado = usuario.find(u => u.nomeUsuario === nome && u.senha === senha && u.email === email);
      res.json(usuarioEncontrado);
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
  });

  app.get('/login/:id', (req, res) => {
    id = parseInt(req.params.id);
    if (login.some(u => u.id === id)) {
      const loginEncontrado = login.find(u => u.id === id);
      res.json(loginEncontrado);
    } else {
      res.status(404).json({ mensagem: 'Login não encontrado' });
    }
  });
  

app.post("/usuario", (req, res) => {
    cliente = req.body;
    id_cliente_global++;
    cliente.id = id_cliente_global;
    console.log(cliente);
    usuario.push(cliente);
    res.json(usuario);
})

app.put('/login/:id', (req, res) => {
    const usuarioID = parseInt(req.params.id);
    const usuarioAtualizado = req.body;
  
    const index = login.findIndex(u => u.id === usuarioID);
  
    if (index !== -1) {
      login[index] = { ...login[index], ...usuarioAtualizado };
      console.log(login[index]);
      res.json(login[index]);
    } else {
      res.status(404).json({ mensagem: 'Login não encontrado' });
    }
  });

app.listen(5000, ()=> console.log("SERVER IS RUNNING!!!"));