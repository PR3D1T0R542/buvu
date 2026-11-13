
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function Customers() {
    const navigate = useNavigate()
  const [customers, setCustomers] = useState(() => {
  const savedCustomers = localStorage.getItem('tailor3d-customers')
  return savedCustomers ? JSON.parse(savedCustomers) : []
})
useEffect(() => {
  localStorage.setItem('tailor3d-customers', JSON.stringify(customers))
}, [customers])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [search, setSearch] = useState('')
  const [activeLetter, setActiveLetter] = useState('')

  function addCustomer(e) {
    e.preventDefault()

    const newCustomer = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim()
    }

    setCustomers([...customers, newCustomer])
    setName('')
    setPhone('')
  }

  const filteredCustomers = customers
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone.includes(search)

      const matchesLetter =
        !activeLetter ||
        customer.name.toUpperCase().startsWith(activeLetter)

      return matchesSearch && matchesLetter
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="page-content">
      <p className="eyebrow">CUSTOMER MANAGEMENT</p>

      <h1>Customers</h1>
      <p>Manage your customers and their details.</p>

      <form className="customer-form" onSubmit={addCustomer}>
        <h2>Add New Customer</h2>

        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button className="primary-btn" type="submit">
          + Add Customer
        </button>
      </form>

      <section className="customer-list">
        <div className="customer-heading">
          <h2>Customer Directory</h2>
          <span>{customers.length} customers</span>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Search by name or phone number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="alphabet-grid">
          {alphabet.map((letter) => (
            <button
              key={letter}
              type="button"
              className={
                activeLetter === letter
                  ? 'letter-btn selected'
                  : 'letter-btn'
              }
              onClick={() =>
                setActiveLetter(
                  activeLetter === letter ? '' : letter
                )
              }
            >
              {letter}
            </button>
          ))}
        </div>

        <button
          className="clear-filter"
          onClick={() => {
            setActiveLetter('')
            setSearch('')
          }}
        >
          Show all customers
        </button>

        <div className="customer-results">
          {filteredCustomers.length === 0 ? (
            <div className="empty-state">
              <h3>No customers found</h3>
              <p>Try another letter or search term.</p>
            </div>
          ) : (
            filteredCustomers.map((customer) => (
<div
  className="customer-card"
  key={customer.id}
  onClick={() => navigate(`/customers/${customer.id}`)}
>
  
                <div>
                  <h3>{customer.name}</h3>
                  <p>{customer.phone}</p>
                </div>

                <span className="customer-arrow">→</span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default Customers
