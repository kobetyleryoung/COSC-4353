import React, { useState } from "react";
import {Event_Date} from "../../components/calendar";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { combineDateAndTime, createEvent, type EventCreate } from "../../components/api/EventManagement";

const Management = () => {
    const [formData, setFormData] = useState({
    title: "",
    description: "",
    location_name: "",
    location_address: "",
    location_city: "",
    location_state: "",
    location_postal_code: "",
    required_skills: [] as string[],
    urgency: "medium",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    capacity: "",
    availability: [] as string[],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    setError(null)
    setSuccess(false)

    try{

      if(!formData.start_date || !formData.start_time){
        throw new Error("Start Date and Time are required!")
      }
      const startAt= combineDateAndTime(formData.start_date, formData.start_time)
      let endsAt:string | undefined;

      if(formData.end_date && formData.end_time){
        endsAt=combineDateAndTime(formData.end_date, formData.end_time)
      }

      const location = {
        name: formData.location_name || "TBD",
        address: formData.location_address || undefined,
        city: formData.location_city || undefined,
        state: formData.location_state || undefined,
        postal_code: formData.location_postal_code || undefined,
      };

      const eventData: EventCreate ={
        title: formData.title,
        description: formData.description,
        location,
        required_skills: formData.required_skills,
        starts_at: startAt,
        ends_at: endsAt,
        capacity:formData.capacity ? parseInt(formData.capacity): undefined,
      };

      const result = await createEvent(eventData)
      console.log("Event created successfully!", result)
      setSuccess(true)
    }
    catch (err: any){
    if (err.response) {
      const errorData = await err.response.json?.() || err.response.data || err.response;
      console.error("Error Creating Events:", errorData);
      setError(JSON.stringify(errorData, null, 2));
  } else {
      console.error("Error Creating Events:", err);
      setError(err.message || "failed to save event");
  }
}
    finally{
      setLoading(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Event Management Form</h2>

      {/* Error Alert */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-md animate-slideIn">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-bold text-red-800">Error Creating Event</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="ml-3 flex-shrink-0 text-red-500 hover:text-red-700"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg shadow-md animate-slideIn">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-bold text-green-800">Success!</p>
              <p className="text-sm text-green-700 mt-1">Event created successfully! 🎉</p>
            </div>
            <button
              onClick={() => setSuccess(false)}
              className="ml-3 flex-shrink-0 text-green-500 hover:text-green-700"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Event Name */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Event Name *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
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
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Event Description"
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Location Name *</label>
        <input
          type="text"
          name="location_name"
          value={formData.location_name}
          onChange={handleChange}
          placeholder="e.g., Community Center"
          maxLength={200}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Location Address */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Address</label>
        <input
          type="text"
          name="location_address"
          value={formData.location_address}
          onChange={handleChange}
          placeholder="123 Main St"
          maxLength={500}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* City, State, Postal Code */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block font-medium mb-1">City</label>
          <input
            type="text"
            name="location_city"
            value={formData.location_city}
            onChange={handleChange}
            placeholder="City"
            maxLength={100}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">State</label>
          <input
            type="text"
            name="location_state"
            value={formData.location_state}
            onChange={handleChange}
            placeholder="TX"
            maxLength={50}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Postal Code</label>
          <input
            type="text"
            name="location_postal_code"
            value={formData.location_postal_code}
            onChange={handleChange}
            placeholder="77001"
            maxLength={20}
            className="w-full border rounded px-3 py-2"
          />
        </div>
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


      {/* Start Date and Time */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium mb-1">Start Date *</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Start Time *</label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* End Date and Time */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium mb-1">End Date</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">End Time</label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Capacity */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Capacity (optional)</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="Maximum number of volunteers"
          min="1"
          className="w-full border rounded px-3 py-2"
        />
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
