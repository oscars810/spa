import { useState } from 'react';
import PropTypes from 'prop-types'

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

export default function SearchBar({ services, setFiltered }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const filteredData = services.filter((service) => {
        if (inputValue === '') {
            return service;
        }
        else {
            return removeAccents(service.name.toLowerCase()).includes(removeAccents(inputValue.toLowerCase()))
        }
      })
      setFiltered(filteredData)
    }
  }

  return (
  <div className="min-w-0 flex-1 max-w-xl">
    <div className="flex relative items-center py-4 mx-auto max-w-3xl">
      <div className="w-full">
        <input
          id="create"
          name="create"
          className="block w-full rounded-md border-0 bg-white py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          placeholder="Buscar Servicios"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          />
      </div>
    </div>
  </div>
  )
}

SearchBar.propTypes = {
  setFiltered: PropTypes.func,
  services: PropTypes.array
}
