import {useEffect, useState} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto, gastos, setPresupuesto,setGastos,setIsvalidPresupuesto}) => {
    
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)


    useEffect(() =>{
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;

        //Calcular porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
        
        setDisponible(totalDisponible)
        setGastado(totalGastado)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500);

    },[gastos])

    const fromatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style:'currency',
            currency:'USD'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm("¿Deseas Reiniciar Completamente la APP?");
        if(resultado){
            setPresupuesto(0)
            setGastos([])
            setIsvalidPresupuesto(false)
        }
    }

    return (
        <div className = "contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar
                    styles = {buildStyles({
                        pathColor: porcentaje > 50 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 50 ? '#DC2626' : '#3B82F6'
                    })}
                    value={porcentaje}
                    text = {`${porcentaje}% Gastado`}
                />
            </div>
            <div className = "contenido-presupuesto">
                <button 
                    className = "reset-app"
                    type = "button"
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> {fromatearCantidad(presupuesto)}
                </p>
                <p className ={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {fromatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span> {fromatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto
