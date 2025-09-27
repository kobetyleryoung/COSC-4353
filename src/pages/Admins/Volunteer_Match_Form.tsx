import React, { useMemo, useState } from "react";

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

// Mock Data (replace with API in production)
const volunteers: Volunteer[] = [
  { id: 1, name: "Alice",   skills: ["React", "JavaScript", "CSS"] },
  { id: 2, name: "Bob",     skills: ["Python", "Data Analysis"] },
  { id: 3, name: "Charlie", skills: ["Project Management", "Excel"] },
];

const events: Event[] = [
  { id: 1, title: "Hackathon",          requiredSkills: ["React"] },
  { id: 2, title: "Data Crunch",        requiredSkills: ["Python", "Data Analysis"] },
  { id: 3, title: "Business Workshop",  requiredSkills: ["Project Management"] },
];

const Volunteer_Match_Form: React.FC = () => {
  const [volunteerId, setVolunteerId] = useState<number | "">("");

  // Find the selected volunteer
  const volunteer = useMemo(
    () => (typeof volunteerId === "number" ? volunteers.find(v => v.id === volunteerId) ?? null : null),
    [volunteerId]
  );

  // Compute matching events whenever volunteer changes
  const matchedEvents = useMemo(() => {
    if (!volunteer) return [];
    return events.filter(ev =>
      ev.requiredSkills.every(skill => volunteer.skills.includes(skill))
    );
  }, [volunteer]);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Volunteer Matching Form</h2>

      {/* Select Volunteer */}
      <label className="block font-medium mb-1">Select Volunteer</label>
      <select
        className="w-full border rounded px-3 py-2"
        value={volunteerId === "" ? "" : volunteerId}
        onChange={(e) => {
          const val = e.target.value;
          setVolunteerId(val === "" ? "" : Number(val));
        }}
      >
        <option value="">Choose a volunteer…</option>
        {volunteers.map(v => (
          <option key={v.id} value={v.id}>
            {v.id} — {v.name}
          </option>
        ))}
      </select>

      {/* Auto-filled Volunteer Name */}
      <div className="mt-4">
        <label className="block font-medium mb-1">Volunteer Name</label>
        <input
          className="w-full border rounded px-3 py-2 bg-gray-50"
          type="text"
          value={volunteer?.name ?? ""}
          readOnly
          placeholder="(auto-filled)"
        />
      </div>

      {/* Auto-filled Matched Event(s) */}
      <div className="mt-4">
        <label className="block font-medium mb-1">Matched Event(s)</label>
        <input
          className="w-full border rounded px-3 py-2 bg-gray-50"
          type="text"
          value={matchedEvents.map(e => e.title).join(", ")}
          readOnly
          placeholder="(auto-filled)"
        />
        {/* Optional: also list details */}
        {volunteerId !== "" && (
          <div className="mt-2">
            {matchedEvents.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-700">
                {matchedEvents.map(e => (
                  <li key={e.id}>
                    {e.title} — requires: {e.requiredSkills.join(", ")}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No events match this volunteer’s skills.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Volunteer_Match_Form;
