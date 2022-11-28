import React from 'react'
import PropTypes from 'prop-types';
export const StoreContext = React.createContext(null)

const St = ({ children }) => {
  const [Token, setToken] = React.useState('')

  const store = {
    Token: [Token, setToken],
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

St.propTypes = {
  children: PropTypes.any,
}
export default St
