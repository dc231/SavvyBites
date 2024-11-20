import React from 'react';
import mess5 from "../assests/images/mess5.jpg"
import Navbar from '../components/common/Navbar';

function Home() {
  return (
    <>
    <Navbar/>
    <div className="bg-blue-500 p-4">
      {/* <Navbar/> */}
      <header className=" p-4 text-white">
        <h1 className="text-2xl mx-auto grid place-items-center">Mess Website</h1>
      </header>

      {/* Hero Section */}
      <section className="justify-between items-center p-8 bg-gray-100">
        <img src={mess5} alt="Project Photo" className="w-[80%] mx-auto rounded-lg" />
        <div className="w-full p-4">
          <h2 className="text-3xl font-bold mb-4">Welcome to Our Project</h2>
          <p className="text-gray-700">
            Discover a culinary experience like no other. Our mess is committed to providing
            delicious meals and exceptional service to our valued customers.
          </p>
        </div>
      </section>

      {/* Other homepage content */}
    </div>
    </>
  );
}

export default Home;
