import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <>
        <div className='navbar-des'>
            <ul>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/aboutus'>About us</Link></li>
                <li><Link href='/products'>Products</Link></li>
                <li><Link href='/contact'>Contact</Link></li>
            </ul>
        </div>
    </>
  )
}
