import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";

const Product = ({ product }) => {
  return (
    <Card className='my-3 py-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            color='gold'
            text={` ${product.numReviews} Reviews`}
          />
        </Card.Text>
        <Card.Text as='h3'>R{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
