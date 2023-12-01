import React from 'react';
import CustomCard from '../utils/Card.jsx';
import { Col, Row, Container } from 'react-bootstrap';
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Review from './Reviews.jsx';

function Anime() {
  return (
    <div className="Anime">
      <h1>Anime</h1>
      <Container>
        <Col>
          <Row className="justify-content-center align-items-center">
            <CustomCard
              title="Dragon Ball Z"
              rating={10}
              description="Vegetaaa, Olha beeem!!!"
              image="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSiQ_nNwzyOmCFF6JlFb64L7l463BnhXDXl0hqxaUiaPMOz1JSj"
            />
            <CustomCard
              title="Hunter X Hunter"
              rating={9.99}
              description="ranta versus ranta"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFAFNjGrbVnNCXA1odhEsKGtsqo_iDQzhL-pmHBcbZfd8ZoPMB"
            />
            <CustomCard
              title="Boku no Hero Academia"
              rating={8.73}
              description="Boku no ..."
              image="https://sm.ign.com/ign_br/tv/m/my-hero-ac/my-hero-academia_f9ae.jpg"
            />
          </Row>
          <Row className="justify-content-center align-items-center">
            <CustomCard
              title="One Punch-Man"
              rating={10}
              description="Um soco homem"
              image="https://img.elo7.com.br/product/main/1EE247E/big-poster-do-anime-one-punch-man-tamanho-90x-0-cm-lo009-decoracao-geek.jpg"
            />
            <CustomCard
              title="Kimetsu no Yaiba"
              rating={7.56}
              description="Matar onis"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrelu_SJKR8hMTzriyPbGdIadil31iUzpL_EShTih7U7Ia9oOd"
            />
            <CustomCard
              title="Fullmetal Alchemist: Brotherhood"
              rating={10}
              description="Alquimia braba"
              image="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQuQ6B1UK9qvJQzzzHtuQCjQwBTLVShRDA3VcwADKkSvh4o1uKw"
            />
          </Row>
        </Col>
      </Container>
      <Routes>
        <Route path="/:title" element={<Review></Review>}></Route>
      </Routes>
    </div>
  );
}

export default Anime;
