
function Dashboard() {
  return (
    <>
      <section className="welcome">
        <p className="eyebrow">YOUR DIGITAL TAILORING STUDIO</p>
        <h1>Welcome to Tailor 3D.</h1>
        <p>Design, customize and preview suits before the stitching begins.</p>
        <button className="primary-btn">+ Create New Design</button>
      </section>

      <section className="stats">
        <div className="stat-card">
          <span>Total Customers</span>
          <h2>0</h2>
          <small>Registered customers</small>
        </div>

        <div className="stat-card">
          <span>Saved Designs</span>
          <h2>0</h2>
          <small>Your design collection</small>
        </div>

        <div className="stat-card">
          <span>New Designs</span>
          <h2>+</h2>
          <small>Start creating today</small>
        </div>
      </section>

      <section className="recent">
        <h2>Recent Designs</h2>
        <div className="empty-state">
          <div className="scissors">✂</div>
          <h3>No designs yet</h3>
          <p>Your saved suit designs will appear here.</p>
        </div>
      </section>
    </>
  )
}

export default Dashboard
