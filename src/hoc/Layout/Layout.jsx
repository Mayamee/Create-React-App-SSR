import './Layout.css'
import logo from './logo.svg'
const Layout = ({ children }) => {
  return (
    <div id="page-wrapper">
      <div className="Layout">
        <header className="Layout-header">
          <img src={logo} className="Layout-logo" alt="logo" />
          <p>Welcome to Create React App with React Router v6 and SSR</p>
          {children}
          <a
            className="Layout-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </div>
  )
}

export default Layout
