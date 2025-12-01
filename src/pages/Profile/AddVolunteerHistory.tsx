import React, { useState } from "react";
import { useAuth } from "../../hooks/auth0";
import { createHistoryEntry } from "../../components/api/VolunteerHistory";

const AddVolunteerHistory: React.FC = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    event_id: "",
    role: "",
    hours: "",
    date: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await createHistoryEntry({
        user_id: user?.userId,
        event_id: form.event_id,
        role: form.role,
        hours: Number(form.hours),
        date: form.date,
        notes: form.notes || undefined
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to add entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Volunteer History Entry</h2>
      {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">Entry added successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Event ID *</label>
          <input type="text" name="event_id" value={form.event_id} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Role *</label>
          <input type="text" name="role" value={form.role} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Hours *</label>
          <input type="number" name="hours" value={form.hours} onChange={handleChange} required min="0.1" step="0.1" className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Date *</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700" disabled={loading}>
            {loading ? "Adding..." : "Add Entry"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVolunteerHistory;
