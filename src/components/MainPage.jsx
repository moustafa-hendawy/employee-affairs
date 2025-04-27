
import React from 'react'
import { Link } from 'react-router-dom'

function MainPage() {
  return (
   <>
    <h1 className="d-flex align-items-center justify-content-center">الصفحة الرئيسية</h1>
    <div className="d-flex align-items-center justify-content-center">
    <Link to='/employee' type="button" className="btn btn-primary">To Empolyee Page</Link>
    <Link to='/faculty' type="button" className="btn btn-secondary">To Faculty Page</Link>
    </div>
   </>
  )
}

export default MainPage
