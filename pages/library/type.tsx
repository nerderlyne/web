import type { NextPage } from 'next'
import Layout from '~/layout'
import React, { useState } from 'react'

const Collections = ({ title, selectedTypes, setSelectedTypes, typeOptions }: any) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleTypeSelection = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const renderTypeOptions = () => {
    return typeOptions.map((type, index) => (
      <div key={index} className="px-3 py-2">
        <label>
          <input
            type="checkbox"
            value={type}
            checked={selectedTypes.includes(type)}
            onChange={(e) => handleTypeSelection(type)}
            className="form-checkbox text-gray-700 bg-white-400 rounded-full mx-2"
          />
          {type}
        </label>
      </div>
    ))
  }

  const renderSelectedTypes = () => {
    return selectedTypes.map((type, index) => (
      <div key={index} className="px-1 py-1 rounded-full border-white bg-white text-black mx-1 mr-1">
        {type}
        <button onClick={() => handleTypeSelection(type)}>
          <svg
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    ))
  }

  return (
    <div>
      <div className="flex items-center border-b border-grey-500 w-80 py-2 cursor-pointer" onClick={toggleDropdown}>
        {selectedTypes.length ? renderSelectedTypes() : <span className="text-gray-700">{title}</span>}
        <svg
          className="ml-1 w-4 h-4"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      {isDropdownOpen && (
        <div className="bg-black text-gray-700 border-white rounded-md shadow-lg py-2 border border-grey-400 h-64 w-64 overflow-auto">
          {renderTypeOptions()}
        </div>
      )}
    </div>
  )
}

export default Collections
