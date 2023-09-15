"use client"

import React from 'react'
import bg from "@/public/errorimg.png"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function NotFound() {

    const router = useRouter();

    return (
        <div className='h-screen flex-col flex justify-center items-center container mx-auto'>
            <div>
                <Image className='w-[500px]' src={bg} alt='...' />
            </div>

            <div className='flex gap-10' onClick={() => router.back()}>
                <button className='bg-blue-300 font-semibold rounded-md py-2 px-3'>Go Back
                </button>

                <button className='bg-blue-300 font-semibold rounded-md py-2 px-3' onClick={() => router.push("/")}>Go Back Home
                </button>
            </div>
        </div>
    )
}
