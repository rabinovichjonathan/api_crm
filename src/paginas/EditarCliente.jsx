import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../componentes/Formulario'

function EditarCliente() {
  const {id} = useParams()
  const [cliente, setCliente] = useState({}) 
  const [cargando, setCargando] = useState(true)

  useEffect(()=>{
    const obtenerClienteApi = async () => {
      try{
          const url = `${import.meta.env.VITE_API_URL}/${id}`
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
    
    <>
     <h1 className='font-black text-4xl text-blue-900'> Editar cliente</h1>
      <p className="mt-3">{cliente?.nombre && "Edita los campos que necesites sobre el cliente"} {cliente.nombre}</p>
      {
       cliente?.nombre ? (
        <Formulario 
          cliente = {cliente}
          cargando = {cargando}
        />
       ): <p>No hay resultados que correspondan a un cliente con ese id</p>
      
      }
      
   </>
    
  )
}

export default EditarCliente