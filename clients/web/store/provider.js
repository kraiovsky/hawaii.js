import React, { createContext, useContext, useReducer } from 'react'

const StateContext = createContext()

const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

const useGlobalState = () => useContext(StateContext)

export { StateProvider, useGlobalState }
