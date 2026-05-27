import "../styles/Home.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
const Home: React.FC = () => {
  return (
    <>
        <Header />
      <div className="home-container">
        <h1>Bienvenido a la página de inicio</h1>
        <p>Esta es la página principal de nuestra aplicación.</p>
      </div>
      <div className="SliderBar">
          <div className="SliderBarItem">Item 1</div>
          <div className="SliderBarItem">Item 2</div>
          <div className="SliderBarItem">Item 3</div>
          <div className="SliderBarItem">Item 4</div>
      </div>
        <Footer />
    </>
  )
}

export default Home