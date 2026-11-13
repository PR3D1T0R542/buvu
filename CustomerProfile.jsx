
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function CustomerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()

  const customers = JSON.parse(
    localStorage.getItem('tailor3d-customers') || '[]'
  )

  const customer = customers.find(
    (item) => String(item.id) === id
  )

  const [measurements, setMeasurements] = useState(() => {
    return customer?.measurements || {
      chest: '',
      waist: '',
      shoulder: '',
      sleeveLength: '',
      neck: '',
      jacketLength: '',
      trouserWaist: '',
      trouserLength: ''
    }
  })

  const measurementCount = Object.values(measurements).filter(
    (value) => value !== '' && value !== null && value !== undefined
  ).length

  const [isEditing, setIsEditing] = useState(
    measurementCount === 0
  )

  function saveMeasurements() {
    const savedCustomers = JSON.parse(
      localStorage.getItem('tailor3d-customers') || '[]'
    )

    const updatedCustomers = savedCustomers.map((item) =>
      String(item.id) === id
        ? { ...item, measurements }
        : item
    )

    localStorage.setItem(
      'tailor3d-customers',
      JSON.stringify(updatedCustomers)
    )

    alert('Measurements saved successfully!')
  }

  if (!customer) {
    return (
      <div className="page-content">
        <h1>Customer not found</h1>
        <button
          className="primary-btn"
          onClick={() => navigate('/customers')}
        >
          Back to Customers
        </button>
      </div>
    )
  }

  return (
    <div className="page-content">
      <button
        className="primary-btn"
        onClick={() => navigate('/customers')}
      >
        ← Back to Customers
      </button>

      <p className="eyebrow">CUSTOMER PROFILE</p>
      <h1>{customer.name}</h1>
      <p>{customer.phone}</p>

      <div className="stats">
        <div className="stat-card">
          <span>Body Measurements</span>
          <h2>{measurementCount}/8</h2>
          <small>Measurements recorded</small>
        </div>

        <div className="stat-card">
          <span>Saved Designs</span>
          <h2>0</h2>
          <small>Designs created for this customer</small>
        </div>
      </div>

      <section className="recent">
        <h2>Customer Measurements</h2>

        {isEditing ? (
          <>
            <div className="measurement-form">
              {[
                ['chest', 'Chest'],
                ['waist', 'Waist'],
                ['shoulder', 'Shoulder'],
                ['sleeveLength', 'Sleeve Length'],
                ['neck', 'Neck'],
                ['jacketLength', 'Jacket Length'],
                ['trouserWaist', 'Trouser Waist'],
                ['trouserLength', 'Trouser Length']
              ].map(([key, label]) => (
                <div className="measurement-field" key={key}>
                  <label>{label} (inches)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.25"
                    placeholder="Enter measurement"
                    value={measurements[key]}
                    onChange={(e) =>
                      setMeasurements({
                        ...measurements,
                        [key]: e.target.value
                      })
                    }
                  />
                </div>
              ))}
            </div>

            <button
              className="primary-btn"
              onClick={() => {
                saveMeasurements()
                setIsEditing(false)
              }}
            >
              Save Measurements
            </button>
          </>
        ) : (
          <>
            <div className="measurement-form">
              {[
                ['chest', 'Chest'],
                ['waist', 'Waist'],
                ['shoulder', 'Shoulder'],
                ['sleeveLength', 'Sleeve Length'],
                ['neck', 'Neck'],
                ['jacketLength', 'Jacket Length'],
                ['trouserWaist', 'Trouser Waist'],
                ['trouserLength', 'Trouser Length']
              ].map(([key, label]) => (
                <div className="measurement-field" key={key}>
                  <label>{label}</label>
                  <h3>
                    {measurements[key]} inches
                  </h3>
                </div>
              ))}
            </div>

            <button
              className="primary-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Measurements
            </button>
          </>
        )}
      </section>

      <section className="recent">
        <h2>Suit Designs</h2>

        <div className="empty-state">
          <h3>No designs yet</h3>
          <p>Saved designs for this customer will appear here.</p>
        </div>
      </section>
    </div>
  )
}

export default CustomerProfile
