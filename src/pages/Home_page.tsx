import React from "react";
import {Link} from "react-router-dom"


const Home_page: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-5xl font-heading mb-6 text-brand">
        Welcome to COSC 4353
      </h1>
      <p className="text-lg text-gray-700 max-w-xl mb-6">
        This is your home page. From here, you can explore your profile,
        events, volunteer matching, and more using the navigation bar.
      </p>
    <Link to='/login'> 
        <button className="px-6 py-3 rounded-xl bg-accent text-white font-medium hover:bg-yellow-600 transition">
        Get Started
        </button>
    </Link>

    </div>
  );
};

export default Home_page;
