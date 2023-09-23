"use client"
import { useRouter } from "next/navigation"
import Link from 'next/link'
import React from 'react'
import axios from "axios"

export default function Navbar() {

    const router = useRouter();

    // @ts-ignore
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const logout = async () => {

        try {
            const { data } = await axios.get("http://localhost:7000/api/logout");
            localStorage.removeItem("currentUser");
            router.refresh();
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <div className='container mx-auto py-5'>
            <div className='flex justify-around items-center'>
                <div className='font-semibold'>
                    <Link href="/" className='text-3xl text-blue-600'>J<span className='text-2xl'>obber.</span></Link>
                </div>

                <h1 className='text-xl'>{currentUser?.email}</h1>

                <div className='flex gap-3 items-center'>
                    <Link href="/" className='text-xl cursor-pointer hover:text-blue-600 transition text-blue-500'>Home</Link>
                    {currentUser ? (
                        <button onClick={logout} className='text-xl cursor-pointer hover:text-blue-600 transition text-blue-500'>LogOut</button>
                    ) : (
                        <Link href="/signin" className='text-xl cursor-pointer hover:text-blue-600 transition text-blue-500'>Sign In</Link>
                    )}
                </div>
            </div>
        </div>
    )
}
