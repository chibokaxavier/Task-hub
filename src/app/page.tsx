import Image from "next/image";

export default function Home() {
  return (
    <>
      <title>Task-Hub</title>
      <main className="flex justify-center mt-10 min-h-screen text-white">
        <div className="bg-black h-fit w-fit  flex-col justify-center p-[60px]">
          <div>
            <p className="text-center pb-4 text-2xl">Task Manager</p>
            <div className="flex space-x-3">
              <input
                type="text"
                className="outline-none border-0 text-black px-2"
                placeholder="e.g Wash dishes"
              />{" "}
              <button
                type="submit"
                className="rounded-sm bg-blue-500 p-2 text-black font-bold"
              >
                {" "}
                Submit
              </button>
            </div>
          </div>
        </div>
        <div>Body</div>
      </main>
    </>
  );
}
