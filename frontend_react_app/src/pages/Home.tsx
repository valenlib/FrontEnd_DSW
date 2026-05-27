import "../styles/Home.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Slider from "../components/Slider"
import { Link, Route, Router } from "react-router-dom"
import BusquedaVuelo from "../components/BusquedaVuelo"
const Home: React.FC = () => {
  return (
    <>
        <Header />
      <div className="home-container">
        <h1>Bienvenido a la página de inicio</h1>
        <p>Esta es la página principal de nuestra aplicación.</p>
      </div>
      <div className="home-container">
        <BusquedaVuelo />
      </div>
      <div className="slider-container">
        <Slider />
      </div>    
        
      <div className="home-container">
        <h2>Explora nuestras ofertas</h2>
        <p>Descubre las mejores ofertas de vuelos y destinos.</p>
        <Link className="explore-button" to="/vuelos">
          Explorar Ofertas
        </Link>
      </div>
        <Footer />
    </>
  )
}

export default Home