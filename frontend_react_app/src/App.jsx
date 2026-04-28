import Header from './Header'
import BusquedaVuelo from './BusquedaVuelo' 

function App() {
    return(
      <>
      <div className="container-fluid">
        <div className="row">
          <div className="col d-flex justify-content-end">
            <Header></Header>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <center><BusquedaVuelo></BusquedaVuelo></center>
          </div>
        </div>
      </div>
        </>
    )
}

export default App
