import React from "react";
import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./MovieModal.css";

const MovieModal = ({ show, handleClose, movie }) => {
  if (!movie) return null;

  return (
    <Modal show={show} className="modal" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="poster">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="overview"><b>Overview : </b>{movie.overview}</div>
            <div className="release_date"><b>Release Date : </b>{movie.release_date}</div>
            <div className="vote_average"><b>Ratings : </b>{movie.vote_average}</div>
        </Modal.Body>
    </Modal>
  );
};

export default MovieModal;

{
  /* <Modal.Header closeButton>
<Modal.Title>{movie.title}</Modal.Title>
</Modal.Header>
<Modal.Body>
<img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} style={{ width: '100px' }} />
<p><strong>Release Date:</strong> {movie.release_date}</p>
<p><strong>Overview:</strong> {movie.overview}</p>
</Modal.Body>
<Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
  Close
</Button>
</Modal.Footer> */
}
