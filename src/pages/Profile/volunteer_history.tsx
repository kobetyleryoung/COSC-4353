import React from "react";

type Volunteer = {
  id: number;
  name: string;
};

type Event = {
  id: number;
  title: string;
  location: string;
  requiredSkills: string[];
  urgency: string;
  availability: string[];
};

type Participation = {
  volunteerId: number;
  eventId: number;
  status: "Registered" | "Attended" | "Cancelled";
};

// Mock Data
const volunteers: Volunteer[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const events: Event[] = [
  {
    id: 101,
    title: "Hackathon",
    location: "Hall A",
    requiredSkills: ["React", "JavaScript"],
    urgency: "High",
    availability: ["2025-09-25", "2025-09-26"],
  },
  {
    id: 102,
    title: "Data Workshop",
    location: "Lab 1",
    requiredSkills: ["Python", "Data Analysis"],
    urgency: "Medium",
    availability: ["2025-10-01"],
  },
];

const participation: Participation[] = [
  { volunteerId: 1, eventId: 101, status: "Attended" },
  { volunteerId: 1, eventId: 102, status: "Registered" },
  { volunteerId: 2, eventId: 101, status: "Cancelled" },
];

const VolunteerHistory = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Volunteer History</h2>

      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Volunteer</th>
            <th className="border px-3 py-2 text-left">Event</th>
            <th className="border px-3 py-2 text-left">Location</th>
            <th className="border px-3 py-2 text-left">Required Skills</th>
            <th className="border px-3 py-2 text-left">Urgency</th>
            <th className="border px-3 py-2 text-left">Availability</th>
            <th className="border px-3 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {participation.map((p, idx) => {
            const volunteer = volunteers.find(v => v.id === p.volunteerId);
            const event = events.find(e => e.id === p.eventId);

            if (!volunteer || !event) return null;

            return (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{volunteer.name}</td>
                <td className="border px-3 py-2">{event.title}</td>
                <td className="border px-3 py-2">{event.location}</td>
                <td className="border px-3 py-2">{event.requiredSkills.join(", ")}</td>
                <td className="border px-3 py-2">{event.urgency}</td>
                <td className="border px-3 py-2">{event.availability.join(", ")}</td>
                <td
                  className={`border px-3 py-2 font-semibold ${
                    p.status === "Attended"
                      ? "text-green-600"
                      : p.status === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {p.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerHistory;
