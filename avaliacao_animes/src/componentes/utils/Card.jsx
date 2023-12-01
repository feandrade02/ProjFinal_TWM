import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaStar } from 'react-icons/fa';
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import './CustomCard.css';

function CustomCard({ image, title, rating, description }) {

  const navigate = useNavigate();

  const handleReviewsClick = () => {
    navigate(`/review/${title}`, { state: { title, rating, description, image } });
  };
  
  return (
    <Card className="CustomCard h-100">
      <Card.Img variant="top" src={image} className="CustomCardImg" />
      <Card.Body className="CustomCardBody">
        <Card.Title className="CustomCardTitle">{title}</Card.Title>
        <Card.Text className="CustomCardText">
          <FaStar style={{ color: 'gold' }} /> {rating}
        </Card.Text>
        <Card.Text className="CustomCardText">{description}</Card.Text>
        <Button variant="primary" onClick={handleReviewsClick}>
          Reviews
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CustomCard;


/*
  function CustomCard({ image, title, rating, description }) {
    return (
      <Card className="CustomCard h-100" style={{ width: '18rem', border: '3px solid #333', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.7)', backgroundColor: '#f8f9fa' }}>
        <Card.Img variant="top" src={image} style={{ width: '100%' }}/>
        <Card.Body className="d-flex flex-column">
          <Card.Title style={{ marginBottom: '0.5rem' }}>{title}</Card.Title>
          <Card.Text style={{ flex: '1', overflow: 'hidden' }}>
            <FaStar style={{ color: 'gold' }} /> {rating}
          </Card.Text>
          <Card.Text style={{ flex: '1', overflow: 'hidden' }}>{description}</Card.Text>
          <Link to={`/${title}`}>
            <Button variant="primary">Reviews</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }

  export default CustomCard;
*/