import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

import SearchBar from "./SearchBar";
import PropTypes from 'prop-types'
import ServiceRow from "./ServiceRow"
import ModalCreateService from "./ModalCreateService"

export default function Services({ session }) {
  const [isLoading, setIsLoading] = useState(true)
  const [services, setServices] = useState([])
  const [filtered, setFiltered] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = session

  const createService = async (name, patent, price) => {
    if(!name || !patent || !price) return
    const { error } = await supabase
      .from('services')
      .insert([
        { name, user_id: user.id, patent, price },
      ])
    if (error) {
      console.log({error})
    } else {
      setIsOpen(false)
    }
  }

  const removeService = async (id) => {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)
    if (error) {
      console.log({error})
    } else {
      setServices((prevServices) => prevServices.filter((service) => service.id !== id))
      setFiltered((prevServices) => prevServices.filter((service) => service.id !== id))
    }
  }

  useEffect( () => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('id, name, patent, price, inserted_at, user_id')

      if (error) {
        console.log({ error })
      }
      setIsLoading(false)
      setServices(data)
      setFiltered(data)
    }

    fetchServices()
  
    return () => {}
  }, [])

  return (
    <div>
      <div className="flex flex-col flex-center p-10 w-1/2 items-center justify-center mx-auto border border-indigo-200 rounded-lg">
        <h3 className="font-medium text-lg">Servicios Carvuk</h3>
        <SearchBar services={services} setFiltered={setFiltered} />
        {
          isLoading ? (
            <div></div>
          ) : (
            filtered.map((service, index) => (
              <ServiceRow service={service} user={user} removeService={removeService} key={index}/>
            ))
          )
        }
        <button 
          className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-medium font-medium hover:bg-indigo-700"
          onClick={() => setIsOpen(true)}  
        >
          Añadir Servicio
        </button>
      </div>
      <ModalCreateService
        isShowModal={modalIsOpen}
        setIsShowModal={setIsOpen}
        createService={createService}
      >
        Hola!
      </ModalCreateService>
    </div>
  )
}

Services.propTypes = {
  session: PropTypes.object
}