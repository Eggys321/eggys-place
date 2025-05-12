import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const AdminDashBoard = () => {
  return (
   <>
   <main className='wrapper flex gap-4
    '>
   {/* section-1 */}

   <section className='bg-yellow-200 w-[20%]'>
    {/* <h1>AdminDashBoard</h1> */}
    <nav className='flex flex-col gap-3'>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="all-orders">orders</Link>
        <Link to="customer">Customers</Link>
    </nav>
   </section>
   {/* section-2 */}
   <section className='bg-red-50 w-[80%] p-10'>
    <Outlet/>
   </section>
   </main>
   </>
  )
}

export default AdminDashBoard