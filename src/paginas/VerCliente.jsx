import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../componentes/Spinner'


function VerCliente() {
  const {id} = useParams()
  const [cliente, setCliente] = useState({}) 
  const [cargando, setCargando] = useState(true)
  
  useEffect(()=>{
      const obtenerClienteApi = async () => {
        try{
            const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            setCliente(resultado)
        
        }catch(error){
            console.log(error)
        }
        setTimeout(()=>{
            setCargando(!cargando)
        },1000)
       
      }
      obtenerClienteApi()
  }, [])

  return (
    cargando ? <Spinner /> : 
        Object.keys(cliente).length === 0 ? "no hay resultados" : (
            <div>
            <h1 className='font-black text-4xl text-blue-900'>Cliente: {cliente.nombre}</h1>
            <p className="mt-3">Información del cliente</p>
            <p className='text-2xl text-gray-500'>
                <span className='text-gray-800 uppercase font-bold'>Cliente:
                </span>
                {cliente.nombre}
            </p>
            <p className='text-2xl text-gray-500'>
                <span className='text-gray-800 uppercase font-bold'>E-mail:
                </span>
                {cliente.email}
            </p>
            <p className='text-2xl text-gray-500'>
                <span className='text-gray-800 uppercase font-bold'>Teléfono:
                </span>
                {cliente.telefono}
            </p>
            <p className='text-2xl text-gray-500'>
                <span className='text-gray-800 uppercase font-bold'>Empresa:
                </span>
                {cliente.empresa}
            </p>
        {cliente.notas &&(
            <p className='text-2xl text-gray-500'>
                <span className='text-gray-800 uppercase font-bold'>Notas:
                </span>
                {cliente.notas}
                </p>
            )
            
        }  
        </div>
        )
  ) 
    
  
}

export default VerCliente