import "../styles/Home.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from "../components/Footer"
import Carousel from "../components/Carousel"
import { Link } from "react-router-dom"
import BusquedaVuelo from "../components/BusquedaVuelo"

const lorem = "Lorem ipsum dolor sit amet consectetur adipiscing elit mauris montes sociis ligula magna praesent iaculis, id nibh rhoncus neque vulputate tortor vehicula primis potenti class quam mattis consequat. Dapibus phasellus potenti egestas sem posuere volutpat pharetra aliquam condimentum ultrices mi tempor vitae mus, placerat suscipit nulla erat eleifend eget magnis libero sociis porttitor sociosqu donec. Dapibus penatibus facilisi ad sociosqu duis aenean dis nam sem metus, pellentesque vehicula nascetur aptent pulvinar litora augue blandit consequat, vulputate phasellus at elementum leo primis nostra magnis euismod."



const Home: React.FC = () => {
  return (
    <>
      <div className="container" >
        <div className="row ">
          <div className="col align-self-center">
            <div className="busqueda-container">
            <BusquedaVuelo />
            </div>
          </div>
          <div className="col align-self-center"> 
            <div className="carousel-container">
              <Carousel />
            </div>
          </div>
        </div>    
        <div className="row" >
          <div className="col" id="cartas">
            <h1>Carta 1</h1>
            <p> {lorem}</p>
          </div>
          <div className="col" id="cartas">
            <h1>Carta 2</h1>
            <p> {lorem}</p>
          </div>
          <div className="col" id="cartas">
            <h1>Carta 3</h1>
            <p> {lorem}</p>
          </div>
        </div>
        <div className="row" >
          <div className="col">
            <div className="home-container">
              <h2>Explora nuestras ofertas</h2>
              <p>Descubre las mejores ofertas de vuelos y destinos.</p>
              <Link className="explore-button" to="/vuelos">
                Explorar Ofertas
              </Link>
            </div>
          </div>
          <div className="col-xl-">
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home