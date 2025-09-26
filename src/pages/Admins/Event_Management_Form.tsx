import React, { useState } from "react";
import {Event_Date} from "../../components/calendar";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const Management = () => {
  const [formData, setFormData] = useState({
    event_Name: "",
    event_Description: "",
    location: "",
    required_skills: [] as string[], // Array for multiple skills
    urgency: "",
    availability: [] as string[], // ISO dates as strings
  });

  // Example state for password visibility (you can use this pattern anywhere)
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (skill: string) => {
    const currentSkills = formData.required_skills;
    if (currentSkills.includes(skill)) {
      // Remove skill if already selected
      setFormData({
        ...formData,
        required_skills: currentSkills.filter(s => s !== skill)
      });
    } else {
      // Add skill if not selected
      setFormData({
        ...formData,
        required_skills: [...currentSkills, skill]
      });
    }
  };
  {/** */}
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simple comma-separated multiple dates
    const dates = e.target.value.split(",").map(d => d.trim());
    setFormData({ ...formData, availability: dates });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Form Data:", formData);
    alert("Profile saved! (frontend only)");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Event Management Form</h2>

      {/* Event Name */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Event Name *</label>
        <input
          type="text"
          name="event_Name"
          value={formData.event_Name}
          onChange={handleChange}
          placeholder="Event Name"
          maxLength={100}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Event Description */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Address 1 *</label>
        <input
          type="text"
          name="event_Description"
          value={formData.event_Description}
          onChange={handleChange}
          placeholder="Event Description"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          maxLength={100}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Required Skills */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Required Skills *</label>
        <div className="border rounded px-3 py-2 bg-white">
          <div className="grid grid-cols-2 gap-3">
            {[
              'Communication',
              'Organization', 
              'Adaptability',
              'Customer Support',
              'Problem Solving',
              'Teamwork',
              'Time Management'
            ].map((skill) => (
              <label key={skill} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                <input
                  type="checkbox"
                  checked={formData.required_skills.includes(skill.toLowerCase())}
                  onChange={() => handleSkillChange(skill.toLowerCase())}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{skill}</span>
              </label>
            ))}
          </div>
          {formData.required_skills.length > 0 && (
            <div className="mt-2 pt-2 border-t">
              <p className="text-xs text-gray-500">
                Selected: {formData.required_skills.join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Urgent Scale */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Urgency *</label>
        <select
          name="urgency"
          value={formData.urgency}
          onChange={handleDropdownChange}
          required
          className="w-full border rounded px-3 py-2 h-28"  
        >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value='high'>High</option>
        </select>
      </div>

      {/* Availability (multiple dates, comma-separated) */}

          <Event_Date
            value={formData.availability}
            onChange={(dates: any) => setFormData({ ...formData, availability: dates })}
          />

      {/* MUI Icon Demonstration - Password Field Example */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Admin Password (Demo)</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter admin password"
            className="w-full border rounded px-3 py-2 pr-10"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <VisibilityOffOutlinedIcon sx={{ fontSize: 20 }} />
            ) : (
              <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />
            )}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Click the eye icon to toggle password visibility (MUI Icon Demo)
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Management;
