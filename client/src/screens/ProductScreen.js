import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { ListProductDetails, createProductReview } from "../actions/productActions";
import {PRODUCT_CREATE_REVIEW_RESET} from '../constants/productConstants'

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

    const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  //reviewProduct comes from the reducer(store.js)
  const reviewProduct = useSelector((state) => state.reviewProduct);
  const { loading: loadingReview, error: errorReview, success: successReview } = reviewProduct;

  useEffect(() => {
    if(successReview){
      alert('Review submited')
      setRating(0)
      setComment('')
    }
    dispatch(ListProductDetails(match.params.id));
     // dispatch(PRODUCT_CREATE_REVIEW_RESET)
  }, [dispatch, match, successReview]);

  const addToCartHandler = () => {
    //Redirects to the CartScreeen Component
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler=(e) =>{
    e.preventDefault()
    dispatch(createProductReview(match.params.id, {rating,comment}))
  }

  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={` ${product.numReviews}Reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: R {product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>R {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h2>Reviews</h2>{
              product.reviews.length === 0 && <Message>No Reviews</Message>
              
            }
            <ListGroup variant='flush'>
              {product.reviews.map(r => (<ListGroup.Item key={r._id}>
                <strong>{r.name}</strong>
                <Rating value={r.rating}/>
                <p>{r.createdAt.substring(0, 10)}</p>
                <p>{r.comment}</p>
              </ListGroup.Item>))}
              <ListGroup.Item>
                <h2>Write a customer reivew</h2>
                {loadingReview && <Loader/>}
                {errorReview && <Message variant='danger'>{errorReview}</Message>}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>

                      <option value=''>Select..</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2- Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control as='textarea' value={comment} row='3' onChange={(e) => setComment(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Submit</Button>
                  </Form>
                ):  <Message>Please <Link to='/login'>login to Write a Review</Link></Message>}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
