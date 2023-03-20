import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({presupuesto, setPresupuesto, isvalidPresupuesto, setIsvalidPresupuesto, gastos, setGastos}) => {
    return (
        <header>
            <h1>planificador de Gastos</h1>

            {isvalidPresupuesto ? (
                <ControlPresupuesto
                    gastos = {gastos}
                    setGastos={setGastos}
                    presupuesto = {presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsvalidPresupuesto={setIsvalidPresupuesto}
                />
            ):(    
                <NuevoPresupuesto
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsvalidPresupuesto = {setIsvalidPresupuesto}
                />
            )}
        </header>
    )
}

export default Header
