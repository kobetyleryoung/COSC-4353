import React, { useState } from "react";
import {Event_Date} from "../../components/calendar";

const Management = () => {
  const [formData, setFormData] = useState({
    event_Name: "",
    event_Description: "",
    location: "",
    required_skills: "",
    urgency: "",
    availability: [] as string[], // ISO dates as strings
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, [e.target.name]: options });
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
        <select
          name="required_skills"
          value={formData.required_skills}
          onChange={handleMultiSelectChange}
          required
          multiple
          className="w-full border rounded px-3 py-2"
        >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value='high'>High</option>
        </select>
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
