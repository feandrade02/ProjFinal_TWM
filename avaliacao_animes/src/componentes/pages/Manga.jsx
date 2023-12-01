import React from 'react';
import CustomCard from '../utils/Card.jsx';
import { Col, Row, Container } from 'react-bootstrap';
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Review from "./Reviews.jsx";


function Manga(){
  return(
    <div className="Manga">
      <h1>Manga</h1>
      <Container>
        <Row className="justify-content-center align-items-center">
          <CustomCard
            title="Vagabond"
            rating={5.5}
            description="Briga de Espada"
            image="https://m.media-amazon.com/images/I/51PoahQOW+L._AC_UF1000,1000_QL80_.jpg">
          </CustomCard>

          <CustomCard
            title="Rosen Garten Saga"
            rating={10}
            description="Nao Leia, E serio"
            image="https://cdn.kobo.com/book-images/1dd4a72d-9d83-45d6-aa20-724b65ec6f64/1200/1200/False/rosen-garten-saga.jpg">
          </CustomCard>

          <CustomCard
            title="Jujutsu Kaisen"
            rating={7.5}
            description="Monstros sobrenaturais"
            image="https://i0.wp.com/animebox.net/wp-content/uploads/2022/11/jujutsu-kaisen-manga-volume-21.webp?resize=640%2C1007&ssl=1">
          </CustomCard>
        </Row>
      </Container>
      <Routes>
        <Route path="/:title" element={<Review></Review>}></Route>
      </Routes>
    </div>
  )
}

export default Manga;