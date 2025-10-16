import React, { useState } from "react";
import Availability from "../../components/calendar";
import { createUserProfile, type ProfileCreate, type AvailabilityWindow} from "../../components/api/userProfile";

const skillsList = ["communication","organization","adaptability","customer", 'problem solving','teamwork','time management'];
const statesList = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" }
];

const User_Profile_Management = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    skills: [] as string[],
    preferences: "",
    availability: [] as string[], 
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
  const convertDatesToAvailabilityWindows = (dates: string[]): AvailabilityWindow[] => {
    return dates.map(dateStr => {
      const date = new Date(dateStr);
      const weekday = (date.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0
      
      return {
        weekday: weekday,
        start: "09:00", // Default start time
        end: "17:00"    // Default end time
      };
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    setError(null)
    setSuccess(false)
    
    try{
      const availabilityWindows = convertDatesToAvailabilityWindows(formData.availability)
      
      const tags: string[] = [];

      if (formData.address1) tags.push(`address:${formData.address1}`);
      if (formData.address2) tags.push(`address2:${formData.address2}`);
      if (formData.city) tags.push(`city:${formData.city}`);
      if (formData.state) tags.push(`state:${formData.state}`);
      if (formData.zipCode) tags.push(`zip:${formData.zipCode}`);
      if (formData.preferences) tags.push(`pref:${formData.preferences}`);      

      const profileData: ProfileCreate = {
        display_name: formData.fullName,
        phone: formData.phone,
        skills: formData.skills,
        tags: tags,
        availability: availabilityWindows,
      };
      
      const result = await createUserProfile(profileData);
      console.log("Profile created successfully:", result);
      setSuccess(true);
      
    } catch (err) {
      console.error("Error creating profile:", err);
      setError(err instanceof Error ? err.message : 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User Profile Management</h2>

      {/* Error Message*/}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Profile saved successfully!
        </div>
      )}

      {/* Full Name */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          maxLength={50}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Address 1 */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Address 1 *</label>
        <input
          type="text"
          name="address1"
          value={formData.address1}
          onChange={handleChange}
          placeholder="Address 1"
          maxLength={100}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Address 2 */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Address 2</label>
        <input
          type="text"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
          placeholder="Address 2"
          maxLength={100}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* City */}
      <div className="mb-4">
        <label className="block font-medium mb-1">City *</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          maxLength={100}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* State */}
      <div className="mb-4">
        <label className="block font-medium mb-1">State *</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleDropdownChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select State</option>
          {statesList.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Zip Code */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Zip Code *</label>
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="Zip Code"
          pattern="\d{5}(-\d{4})?"
          maxLength={9}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Skills (multi-select) */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Skills *</label>
        <select
          name="skills"
          multiple
          value={formData.skills}
          onChange={handleMultiSelectChange}
          required
          className="w-full border rounded px-3 py-2 h-28"
        >
          {skillsList.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
      </div>

      {/* Preferences */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Preferences</label>
        <textarea
          name="preferences"
          value={formData.preferences}
          onChange={handleChange}
          placeholder="Preferences"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Availability */}
          <Availability
            value={formData.availability}
            onChange={(dates) => setFormData({ ...formData, availability: dates })}
          />


      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'saving': 'Save Profile'}
        </button>
      </div>
    </form>
  );
};

export default User_Profile_Management;
