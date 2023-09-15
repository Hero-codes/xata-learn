'use client'
import Link from 'next/link'
import React, { useState } from 'react'

export default function SignUp() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <div className='mx-auto container'>
            <div>
                <h1 className='text-3xl text-blue-500 text-center underline font-semibold'>Sign Up</h1>
            </div>

            <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="email">Email:</label>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='border px-4 py-3 rounded-sm border-blue-300 focus:outline-sky-400'
                        type="email" />
                </div>

                <div className='flex flex-col gap-3'>
                    <label htmlFor="password">Password:</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='border px-4 py-3 rounded-sm border-blue-300 focus:outline-sky-400' type="password" />
                </div>

                <div className='flex gap-5 items-center'>
                    <button className='text-left bg-blue-200 hover:bg-blue-300 hover:scale-110 transition font-semibold rounded-md px-4 py-2 w-fit'>Sign Up</button>
                    <Link className='underline text-purple-800 text-lg' href="/signin">Sign In Instead</Link>
                </div>
            </div>
        </div>
    )
}
