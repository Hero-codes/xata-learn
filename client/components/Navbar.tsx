import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <div className='container mx-auto py-5'>
            <div className='flex justify-around'>
                <div className='font-semibold'>
                    <Link href="/" className='text-3xl text-blue-600'>J<span className='text-2xl'>obber.</span></Link>
                </div>

                <div className='flex gap-3 items-center'>
                    <Link href="/" className='text-xl cursor-pointer hover:text-blue-600 transition text-blue-500'>Home</Link>
                    <Link href="/signin" className='text-xl cursor-pointer hover:text-blue-600 transition text-blue-500'>Sign In</Link>
                </div>
            </div>
        </div>
    )
}
