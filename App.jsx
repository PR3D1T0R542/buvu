
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'

import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import SuitDesigner from './pages/SuitDesigner'
import SavedDesigns from './pages/SavedDesigns'
import CustomerProfile from './pages/CustomerProfile'

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <aside className="sidebar">
          <h2 className="logo">✂ Tailor 3D</h2>

          <p className="side-label">WORKSPACE</p>

          <nav>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              ⌂ Dashboard
            </NavLink>

            <NavLink to="/customers" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              ♙ Customers
            </NavLink>

            <NavLink to="/designer" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              ✂ Suit Designer
            </NavLink>

            <NavLink to="/saved-designs" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              ▣ Saved Designs
            </NavLink>
          </nav>

          <div className="sidebar-bottom">
            <p>Version 1.0</p>
          </div>
        </aside>

        <main className="main">
          <header className="topbar">
            <span>Workspace / Tailor 3D</span>
            <span className="profile">Tailor Account</span>
          </header>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<CustomerProfile />} />
            <Route path="/designer" element={<SuitDesigner />} />
            <Route path="/saved-designs" element={<SavedDesigns />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  )
}

export default App
