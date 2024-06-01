import { Link } from "react-router-dom";

function Home() {
    return (
        <main className="bg-gray-700 text-white">
            <div className="flex flex-col gap-2 justify-center items-center mt-20">
                <h1 className="text-6xl font-extrabold">Organize your work</h1>
                <h2 className="text-6xl font-bold">and life, finally.</h2>
                <div className="flex flex-col text-center text-xl mt-5">
                    <p>
                        Streamline your{" "}
                        <strong className="text-blue-500">productivity</strong>{" "}
                        with our sleek todo app, turning chaos into{" "}
                        <strong className="text-blue-500">clarity</strong> one
                        task at a time.
                    </p>
                    <p>
                        Take control of your schedule with our{" "}
                        <strong className="text-blue-500">user-friendly</strong>{" "}
                        todo app, empowering you to{" "}
                        <strong className="text-blue-500">conquer</strong> your
                        day with ease.
                    </p>
                </div>
            </div>
            <div className="flex justify-center items-center mt-10">
                <Link
                    className="bg-blue-500 py-3 px-4 rounded-md font-medium"
                    to="/signup"
                >
                    Get Started
                </Link>
            </div>
        </main>
    );
}

export default Home;
