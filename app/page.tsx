import sample from "@/public/errorimg.png"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-3">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row w-full items-center gap-7 py-7 px-4 rounded-lg">
          <div className="w-1/2 md:w-1/4">
            <Image src={sample} alt="..." />
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-2xl underline uppercase">Job Name</h1>
            <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, quidem culpa? Nostrum dolorem distinctio repudiandae dolore sint optio consequuntur incidunt.</p>
            <Link href={``} className="text-left bg-blue-200 hover:bg-blue-300 hover:scale-110 transition font-semibold rounded-md px-4 py-2 w-fit">Apply Now</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
