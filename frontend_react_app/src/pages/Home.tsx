import "../styles/Home.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Slider from "../components/Slider"
const Home: React.FC = () => {
  return (
    <>
        <Header />
      <div className="home-container">
        <h1>Bienvenido a la página de inicio</h1>
        <p>Esta es la página principal de nuestra aplicación.</p>
      </div>
      <Slider />
        <Footer />
    </>
  )
}

export default Home