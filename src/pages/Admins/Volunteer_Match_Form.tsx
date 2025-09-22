import React, { useState } from "react";

type Volunteer = {
  id: number;
  name: string;
  skills: string[];
};

type Event = {
  id: number;
  title: string;
  requiredSkills: string[];
};

// Mock Data
const volunteers: Volunteer[] = [
  { id: 1, name: "Alice", skills: ["React", "JavaScript", "CSS"] },
  { id: 2, name: "Bob", skills: ["Python", "Data Analysis"] },
  { id: 3, name: "Charlie", skills: ["Project Management", "Excel"] },
];

const events: Event[] = [
  { id: 1, title: "Hackathon", requiredSkills: ["React"] },
  { id: 2, title: "Data Crunch", requiredSkills: ["Python", "Data Analysis"] },
  { id: 3, title: "Business Workshop", requiredSkills: ["Project Management"] },
];

const Volunteer_Match_Form = () => {
  const [formData, setFormData] = useState({ volunteer_id: "" });
  const [matchedEvents, setMatchedEvents] = useState<Event[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.value;
    setFormData({ volunteer_id: id });

    const volunteer = volunteers.find((v) => v.id === Number(id));

    if (volunteer) {
      const matches = events.filter((event) =>
        event.requiredSkills.every((skill) => volunteer.skills.includes(skill))
      );
      setMatchedEvents(matches);
    } else {
      setMatchedEvents([]);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Volunteer Matching Form</h2>

      {/* Volunteer Selection */}
      <label className="block font-medium mb-1">Select Volunteer by ID</label>
      <input
        type="number"
        name="volunteer_id"
        value={formData.volunteer_id}
        onChange={handleChange}
        placeholder="Enter Volunteer ID"
        className="w-full border rounded px-3 py-2"
      />

      {/* Display Results */}
      {formData.volunteer_id && (
        <div className="mt-4">
          <h3 className="font-semibold">Matched Events:</h3>
          {matchedEvents.length > 0 ? (
            <ul className="list-disc list-inside">
              {matchedEvents.map((event) => (
                <li key={event.id}>
                  {event.title} (requires: {event.requiredSkills.join(", ")})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No events match this volunteer’s skills.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Volunteer_Match_Form;
