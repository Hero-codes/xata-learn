import { getXataClient } from "@/src/xata"
import axios from "axios";

export default async function Home() {

  const xata = getXataClient();
  const jobs = await xata.db.Jobs.getAll();

  const addJob = async (id: string) => {
    try {
      const { data } = await axios.post(`http://localhost:7000/api/add/${id}`);
      console.log(data);
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <div className="container mx-auto px-3">
      <div className="flex flex-col gap-8">
        {
          jobs.map(job => (
            <>
              <div className="flex flex-col md:flex-row justify-around w-full items-center gap-7 py-7 px-4 rounded-lg">
                <div className="w-1/2 md:w-1/4">
                  <img src={String(job.avatarImg?.url)} className="w-full object-cover" alt="..." />
                </div>

                <div className="flex flex-col gap-5">
                  <h1 className="font-bold text-2xl underline uppercase">{job.company}</h1>
                  <p className="text-lg">{job.description}</p>
                  <button className="text-left bg-blue-200 hover:bg-blue-300 hover:scale-110 transition font-semibold rounded-md px-4 py-2 w-fit">Apply Now</button>
                  {/* <button onClick={() => addJob(String(job.id))} className="text-left bg-blue-200 hover:bg-blue-300 hover:scale-110 transition font-semibold rounded-md px-4 py-2 w-fit">Apply Now</button> */}
                </div>
              </div>
            </>
          ))
        }

      </div>
    </div>
  )
}
