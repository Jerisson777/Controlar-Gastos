import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { useState, useEffect } from 'react'
import { generarID } from './helpers';
import Modal from './Components/Modal';
import ListadoGastos from './Components/ListadoGastos';
import Header from './Components/Header'
import Filtros from './Components/Filtros';

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isvalidPresupuesto, setIsvalidPresupuesto] = useState(false);
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarM] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ?JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [gastoEditar, setGastoEditar] = useState({})

  useEffect(() => {
    if(filtro){
      //filtrar gastos por categoria
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])


  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)
      
      setTimeout(() =>{
        setAnimarM(true)

      }, 500)
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    const presupuestoLs = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLs > 0){
      setIsvalidPresupuesto(true)
    }
  }, [])

  const handleNewGasto = () =>{
      setModal(true)
      setGastoEditar({})
      setTimeout(() =>{
        setAnimarM(true)

      }, 500)
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      //Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else{
        //Nuevo Gasto
      gasto.id = generarID();
      setGastos([...gastos, gasto])
      gasto.fecha = Date.now()
    }
    setAnimarM(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const eliminarGasto = id => {
    const gastoEliminar = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastoEliminar)
  }

  return (
   <div className = {modal ? 'fijar' : ''}>
     <Header
      setGastos={setGastos}
      gastos = {gastos}
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      setIsvalidPresupuesto = {setIsvalidPresupuesto}
      isvalidPresupuesto = {isvalidPresupuesto}
     />

     {isvalidPresupuesto && (
       <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos = {gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
            <div className = "nuevo-gasto">
              <img
                src = {IconoNuevoGasto}
                alt = "Icono nuevo Gasto"
                onClick = {handleNewGasto}
              />
            </div>
            </>
     )}
     {modal && <Modal
        setModal={setModal}
        animarModal = {animarModal}
        setAnimarM={setAnimarM}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
     />}
    
   </div>
  )
}

export default App
