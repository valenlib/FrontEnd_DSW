import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/Carousel.css';

const Carousel1: React.FC = () => {
    return (
    <>
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img className="d-block w-100" src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80&auto=format&fit=crop" alt="First slide" />
                <div className="carousel-caption d-none d-md-block carousel-custom">
                    <div id="text">
                        <h5 > EZE → CDG </h5>
                        <p>Buenos Aires → París, Francia</p>
                        <h6>La ciudad luz te espera</h6>
                        <h5  id="dinero">700 USD</h5>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <img className="d-block w-100" src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80&auto=format&fit=crop" alt="Second slide"/>
                <div className="carousel-caption d-none d-md-block carousel-custom">
                    <div id="text">
                        <h5 > EZE → DXB </h5>
                        <p>Buenos Aires → Dubái, EAU</p>
                        <h6>El lujo del desierto moderno</h6>
                        <h5 id="dinero">890 USD</h5>
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <img className="d-block w-100" src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80&auto=format&fit=crop" alt="Third slide"/>
                <div className="carousel-caption d-none d-md-block carousel-custom">
                    <div id="text">
                        <h5 > EZE → NRT </h5>
                        <p>Buenos Aires → Tokio, Japón</p>
                        <h6>Tradición y futuro en una sola ciudad</h6>
                        <h5 id="dinero">1120 USD</h5>
                    </div>
                </div>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
    </>
    );
};

export default Carousel1;