import React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-md rounded-xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
          About Our Volunteer Management System
        </h1>
        <p className="text-xl text-white/90 drop-shadow-sm">
          Connecting passionate volunteers with meaningful opportunities
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            🌟 Our Mission
          </h2>
          <p className="text-white/90 leading-relaxed">
            We believe in the power of community service and volunteer work. Our platform 
            streamlines the process of connecting dedicated volunteers with organizations 
            that need their skills and passion.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            🎯 Our Vision
          </h2>
          <p className="text-white/90 leading-relaxed">
            To create a world where every person can easily find and participate in 
            volunteer opportunities that match their skills, interests, and availability, 
            making a positive impact in their communities.
          </p>
        </div>
      </div>

      <div className="bg-white/15 backdrop-blur-sm rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          🚀 Platform Features
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-3">👤</div>
            <h3 className="text-lg font-medium text-white mb-2">Profile Management</h3>
            <p className="text-white/80 text-sm">
              Create and manage your volunteer profile with skills and availability
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="text-lg font-medium text-white mb-2">Event Matching</h3>
            <p className="text-white/80 text-sm">
              Smart matching system connects you with relevant volunteer opportunities
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-medium text-white mb-2">History Tracking</h3>
            <p className="text-white/80 text-sm">
              Keep track of your volunteer hours and impact over time
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          📈 How It Works
        </h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-500/80 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Create Your Profile</h3>
              <p className="text-white/80">Set up your volunteer profile with your skills, interests, and availability.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-blue-500/80 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Browse Events</h3>
              <p className="text-white/80">Discover volunteer opportunities that match your skills and schedule.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="bg-blue-500/80 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">Make an Impact</h3>
              <p className="text-white/80">Participate in events and track your volunteer contribution to the community.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">
          🤝 Join Our Community
        </h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Whether you're a passionate individual looking to make a difference or an organization 
          seeking dedicated volunteers, our platform brings people together for positive change.
        </p>
        <div className="flex justify-center space-x-4">
          <div className="bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-white font-medium">🌱 Community Impact</span>
          </div>
          <div className="bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-white font-medium">🔗 Easy Connections</span>
          </div>
          <div className="bg-purple-500/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-white font-medium">📱 User Friendly</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;