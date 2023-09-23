'use client'
import { useRouter } from "next/navigation"
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios';

export default function SignIn() {

    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:7000/api/signin", { email, password });
            localStorage.setItem("currentUser", JSON.stringify(data));
            router.push("/");
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <div className='mx-auto container'>
            <div>
                <h1 className='text-3xl text-blue-500 text-center underline font-semibold'>Sign In</h1>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
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

                <div className='flex items-center gap-5'>
                    <button type="submit" className='text-left bg-blue-200 hover:bg-blue-300 hover:scale-110 transition font-semibold rounded-md px-4 py-2 w-fit'>Sign In</button>
                    <Link className='underline text-purple-800 text-lg' href="/signup">Sign Up Instead</Link>
                </div>
            </form>
        </div>
    )
}
