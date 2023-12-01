import React, { useState, useEffect } from "react";
import CustomCard from "../utils/Card.jsx";
import { Col, Row, Container, Form, Button } from "react-bootstrap";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../utils/Review.css";
import axios from "axios";

function Review() {
  const location = useLocation();
  const { state } = location;
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const [animeComments, setAnimeComments] = useState({
    "Dragon Ball Z": [
      { user: "Goku123", text: "Ótimo anime!" },
      { user: "Vegeta99", text: "Adorei essa cena!" },
      { user: "Krillin22", text: "Meu personagem favorito é o Goku!" },
    ],
    "Hunter X Hunter": [
      { user: "GonFreecss", text: "Esse arco é incrível!" },
      { user: "KilluaZoldyck", text: "Killua é demais!" },
      { user: "LeorioParadinight", text: "Quero mais temporadas!" },
    ],
    "Boku no Hero Academia": [
      { user: "DekuFan", text: "Plus Ultra!" },
      { user: "AllMightForever", text: "Deku é inspirador!" },
      { user: "BakugoBestBoy", text: "All Might é o melhor!" },
    ],
    "One Punch-Man": [
      { user: "SaitamaOnePunch", text: "Saitama é hilário!" },
      { user: "GenosCyborg", text: "Genos é incrível!" },
      { user: "SpeedOfSoundSonic", text: "Quero ver mais lutas!" },
    ],
    "Kimetsu no Yaiba": [
      { user: "TanjiroKamado", text: "Inosuke é o meu favorito!" },
      { user: "NezukoDemon", text: "Que animação incrível!" },
      { user: "ZenitsuThunder", text: "História envolvente!" },
    ],
    "Fullmetal Alchemist: Brotherhood": [
      { user: "EdwardElric", text: "Alquimia é fascinante!" },
      { user: "AlphonseElric", text: "Edward Elric é incrível!" },
      { user: "RoyMustang", text: "Quero mais animes assim!" },
    ],
    "Vagabond": [
      { user: "MusashiSword", text: "Arte incrível!" },
      { user: "KojiroGanryu", text: "Miyamoto Musashi é lendário!" },
      { user: "OtsuFan", text: "História cativante!" },
    ],
    "Rosen Garten Saga": [
      { user: "HeroProtagonist", text: "Personagens intrigantes!" },
      { user: "MysteriousAntagonist", text: "Enredo envolvente!" },
      { user: "FantasyWorldLover", text: "Arte maravilhosa!" },
    ],
    "Jujutsu Kaisen": [
      { user: "ItadoriYuji", text: "Batalhas emocionantes!" },
      { user: "GojoSatoru", text: "Sukuna é assustador!" },
      { user: "MegumiFushiguro", text: "Mal posso esperar pelo próximo capítulo!" },
    ],
  });
  
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleAddComment = () => {
    if (comment.trim() !== "" && username.trim() !== "") {
      setAnimeComments({
        ...animeComments,
        [state.title]: [...(animeComments[state.title] || []), { user: username, text: comment }],
      });
      setComment("");
      setUsername("");
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/login/1").then((response) => {
        console.log(response);
        if (response.data.isLogin == true) {
            console.log(response.data);
            setUsername(response.data.nomeUsuario);
        }
    });
  }, []);

  return (
    <div className="Detalhes">
      <h1>Detalhes da Obra</h1>
      {state && (
        <div>
          <div className="ReviewCard">
            <img
              className="imgReview"
              src={state.image}
              alt={state.title}
              style={{ maxWidth: "100%" }}
            />
            <h2>{state.title}</h2>
            <p className="box2">Rating: {state.rating}</p>
            <p className="box1">Description: {state.description}</p>
          </div>
          <br/>
          {/* Formulário de Comentários */}
          <Form className="comment-form d-flex flex-column">
            <div className="mb-3 d-flex align-items-center">
                <Form.Label style={{marginRight:"8px"}}>Nome de Usuário:  </Form.Label>
                <Form.Control
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Nome de usuário"
                style={{ width: "200px" }} 
                />
            </div>
            <Form.Group controlId="formComment" className="mb-3">
                <Form.Label>Adicionar Comentário:</Form.Label>
                <Form.Control
                as="textarea"
                rows={2}
                value={comment}
                onChange={handleCommentChange}
                className="custom-textarea"
                />
                <Button
                variant="primary"
                onClick={handleAddComment}
                style={{ marginTop: "10px" }}
                >
                Adicionar Comentário
                </Button>
            </Form.Group>

           {/* Espaço de Comentários */}
            <div className="comment-section text-right">
            <h3>Comentários</h3>
            <ul className="comment-list">
            {animeComments[state.title] && 
                animeComments[state.title].slice(0).reverse().map((comment, index) => (
                    <li key={index}>
                        <strong>{comment.user}:</strong> {comment.text}
                    </li>
                ))}
            </ul>
            </div>
            </Form>
        </div>
      )}
    </div>
  );
}

export default Review;