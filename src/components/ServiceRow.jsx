import PropTypes from 'prop-types'
import { useState } from 'react'


export default function ServiceRow({ service, user, removeService }) {
  const [isShowInfo, setIsShowInfo] = useState(false)


  const handleMouseOver = () => {
    setIsShowInfo(true)
  }

  const handleMouseOut = () => {
    setIsShowInfo(false)
  }

  return (
    <div className="relative w-[90%] flex flex-row justify-between border border-indigo-200 rounded-lg p-2 bg-indigo-200 mb-4">
      <div className="flex flex-row justify-start">
        <h3 className="font-medium text-lg">{service.name}</h3>
        <div 
          className="rounded-full bg-white ml-2 px-3 py-0.5 cursor-pointer"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <span className="font-semibold">i</span>
        </div>
      </div>
      {
        service.user_id === user.id && (
          <button className="" onClick={() => removeService(service.id)}>
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"/></svg>
          </button>
        )
      }
      
      {isShowInfo && (
        <div className="bg-white flex flex-col absolute right-0 z-10 w-1/2">
          <span className="">{service.name}</span>
          <span className="">Patente: {service.patent}</span>
          <span className="">Precio: {service.price}</span>
        </div>
      )
      }
    </div>
  )
}

ServiceRow.propTypes = {
  service: PropTypes.object,
  user: PropTypes.object,
  removeService: PropTypes.func,
}