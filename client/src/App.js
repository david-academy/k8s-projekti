import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import './App.css'
import LoginForm from './LoginForm'

const footerStyle = {
  backgroundColor: "grey",
  fontSize: "10px",
  color: "white",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "15px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "40px",
  width: "100%"
};

const phantomStyle = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%"
};

function Footer({ children }) {
  return (
      <div>
          <div style={phantomStyle} />
          <div style={footerStyle}>{children}</div>
      </div>
  );
}

function App ()  {
    return (
        <>
        <div className="App">
          <LoginForm />
          <Footer>
            <span>Small Azure Kubernetes demo made for fun by David</span>
          </Footer>
        </div>  
        </>
    )
}

export default App