import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/auth0";
import {
  getUserHistory,
  getUserStats,
  type HistoryEntryResponse,
  type UserStatsResponse,
} from "../../components/api/VolunteerHistory";

const VolunteerHistory = () => {
  const { user, isAuthenticated, isLoading } = useAuth(); // Get authenticated user
  const [historyEntries, setHistoryEntries] = useState<HistoryEntryResponse[]>([]);
  const [stats, setStats] = useState<UserStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user?.userId) {
      fetchHistoryData();
    }
  }, [isAuthenticated, user?.userId]);

  const fetchHistoryData = async () => {
    if (!user?.userId) return;

    setLoading(true);
    setError(null);

    try {
      const [historyData, statsData] = await Promise.all([
        getUserHistory(user.userId),
        getUserStats(user.userId),
      ]);

      setHistoryEntries(historyData.entries);
      setStats(statsData);
    } catch (err: any) {
      console.error("Error fetching history:", err);
      setError(err.message || "Failed to load volunteer history");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-700 mb-4">Please log in to view your volunteer history.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading volunteer history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">{error}</p>
          <button
            onClick={fetchHistoryData}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header with user info */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Volunteer History</h1>
          <p className="text-sm text-gray-600 mt-1">Welcome, {user?.name}!</p>
        </div>
        <button
          onClick={() => window.location.href = "/volunteer-history/add"}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Entry
        </button>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <p className="text-sm text-gray-600">Total Hours</p>
            <p className="text-2xl font-bold text-blue-600">{stats.total_hours.toFixed(1)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <p className="text-sm text-gray-600">Total Events</p>
            <p className="text-2xl font-bold text-green-600">{stats.total_events}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <p className="text-sm text-gray-600">Unique Roles</p>
            <p className="text-2xl font-bold text-purple-600">{stats.unique_roles}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <p className="text-sm text-gray-600">Avg Hours/Event</p>
            <p className="text-2xl font-bold text-orange-600">
              {stats.average_hours_per_event.toFixed(1)}
            </p>
          </div>
        </div>
      )}

      {/* Table and rest of component */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {historyEntries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No volunteer history yet.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historyEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(entry.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {entry.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {entry.hours} hrs
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {entry.notes || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VolunteerHistory;