import React, { useState, useEffect } from 'react';
import { Search, Calendar, Users, Filter, Download, ChevronDown, ChevronUp } from 'lucide-react';

// ----------------- Interfaces -----------------
interface AvailabilityWindow {
  weekday: string;
  start: string;
  end: string;
}

interface ProfileResponse {
  user_id: string;
  display_name: string;
  phone: string;
  skills: string[];
  tags: string[];
  availability: AvailabilityWindow[];
  updated_at: string;
}

interface ProfileStats {
  total_hours: number;
  total_events: number;
  unique_roles: string[];
  average_hours_per_event: number;
  most_common_role: string;
}

interface HistoryEntry {
  id: string;
  user_id: string;
  event_id: string;
  role: string;
  hours: number;
  date: string;
  notes?: string;
}

interface HistoryListResponse {
  entries: HistoryEntry[];
  total: number;
}

interface LocationSchema {
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
}

interface EventResponse {
  id: string;
  title: string;
  description: string;
  location: LocationSchema | null;
  required_skills: string[];
  starts_at: string;
  ends_at: string;
  capacity: number;
  status: string;
}

interface EventListResponse {
  events: EventResponse[];
  total: number;
}

interface VolunteerWithStats {
  profile: ProfileResponse;
  stats: ProfileStats;
  history: HistoryEntry[];
}

interface EventWithVolunteers {
  event: EventResponse;
  volunteers: HistoryEntry[];
}

// ----------------- Main Component -----------------
const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'volunteers' | 'events'>('volunteers');
  const [volunteersData, setVolunteersData] = useState<VolunteerWithStats[]>([]);
  const [eventsData, setEventsData] = useState<EventWithVolunteers[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedVolunteer, setExpandedVolunteer] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = 'http://localhost:8000/api/v1'; 

  // ----------------- Fetch Volunteers -----------------
  useEffect(() => {
    const fetchVolunteers = async () => {
      setLoading(true);
      setError(null);
      try {
        const profilesRes = await fetch(`${API_BASE_URL}/profiles`);
        const profiles: ProfileResponse[] = await profilesRes.json();

        const volunteersWithStats: VolunteerWithStats[] = await Promise.all(
          profiles.map(async (profile) => {
            try {
              
              const statsRes = await fetch(`${API_BASE_URL}/profiles/${profile.user_id}/stats`);
              const stats: ProfileStats = statsRes.ok ? await statsRes.json() : {
                total_hours: 0,
                total_events: 0,
                unique_roles: [],
                average_hours_per_event: 0,
                most_common_role: 'N/A',
              };

              const historyRes = await fetch(`${API_BASE_URL}/volunteer-history/user/${profile.user_id}`);
              const historyData: HistoryListResponse = historyRes.ok ? await historyRes.json() : { entries: [], total: 0 };

              return { profile, stats, history: historyData.entries };
            } catch {
              return {
                profile,
                stats: {
                  total_hours: 0,
                  total_events: 0,
                  unique_roles: [],
                  average_hours_per_event: 0,
                  most_common_role: 'N/A',
                },
                history: [],
              };
            }
          })
        );

        setVolunteersData(volunteersWithStats);
      } catch (err) {
        console.error(err);
        setError('Failed to load volunteers data');
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'volunteers') fetchVolunteers();
  }, [activeTab]);

  // ----------------- Fetch Events -----------------
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const eventsRes = await fetch(`${API_BASE_URL}/events`);
        const eventsList: EventListResponse = await eventsRes.json();

        const eventsWithVolunteers: EventWithVolunteers[] = await Promise.all(
          eventsList.events.map(async (event) => {
            try {
              const historyRes = await fetch(`${API_BASE_URL}/volunteer-history/event/${event.id}`);
              const historyData: HistoryListResponse = historyRes.ok ? await historyRes.json() : { entries: [], total: 0 };
              return { event, volunteers: historyData.entries };
            } catch {
              return { event, volunteers: [] };
            }
          })
        );

        setEventsData(eventsWithVolunteers);
      } catch (err) {
        console.error(err);
        setError('Failed to load events data');
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'events') fetchEvents();
  }, [activeTab]);

  // ----------------- Filtering -----------------
  const filteredVolunteers = volunteersData.filter(v =>
    v.profile.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.profile.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.profile.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredEvents = eventsData.filter(e => {
    const matchesSearch =
      e.event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.event.location?.city || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || e.event.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'published': return 'bg-green-500/20 text-green-100';
      case 'upcoming': return 'bg-blue-500/20 text-blue-100';
      case 'pending': return 'bg-yellow-500/20 text-yellow-100';
      case 'cancelled': return 'bg-red-500/20 text-red-100';
      default: return 'bg-gray-500/20 text-gray-100';
    }
  };

  // ----------------- Export CSV -----------------
  const exportToCSV = () => {
    if (activeTab === 'volunteers') {
      let csv = 'Name,Phone,Total Hours,Events,Skills\n';
      filteredVolunteers.forEach(v => {
        csv += `"${v.profile.display_name}","${v.profile.phone}",${v.stats.total_hours},${v.stats.total_events},"${v.profile.skills.join(', ')}"\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'volunteer_report.csv';
      a.click();
    } else {
      let csv = 'Event,Date,Location,Status,Volunteers,Total Hours\n';
      filteredEvents.forEach(e => {
        const totalHours = e.volunteers.reduce((sum, v) => sum + v.hours, 0);
        const loc = e.event.location ? `${e.event.location.city}, ${e.event.location.state}` : 'N/A';
        csv += `"${e.event.title}","${new Date(e.event.starts_at).toLocaleDateString()}","${loc}","${e.event.status}",${e.volunteers.length},${totalHours}\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'event_report.csv';
      a.click();
    }
  };

  // ----------------- Loading/Error -----------------
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">Loading...</div>
  );
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <p>{error}</p>
      <button onClick={() => window.location.reload()} className="mt-4 bg-white/20 px-4 py-2 rounded-lg">Retry</button>
    </div>
  );

  // ----------------- Render -----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header + Export */}
        <div className="flex justify-between items-center bg-white/20 backdrop-blur-md rounded-xl p-6 mb-6 shadow-xl">
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">📊 Volunteer Reports</h1>
            <p className="text-white/90 drop-shadow-sm">Comprehensive volunteer & event insights</p>
          </div>
          <button
            onClick={exportToCSV}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Download size={20} /> Export CSV
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('volunteers')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'volunteers' ? 'bg-white/30 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
          >
            <Users className="inline mr-2" size={20} /> Volunteers ({volunteersData.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'events' ? 'bg-white/30 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
          >
            <Calendar className="inline mr-2" size={20} /> Events ({eventsData.length})
          </button>
        </div>

        {/* Search + Filter */}
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 mb-6 flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60"
            />
          </div>
          {activeTab === 'events' && (
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          )}
        </div>

        {/* Content */}
        {activeTab === 'volunteers' ? (
          <div className="space-y-4">
            {filteredVolunteers.length === 0 ? <p className="text-white text-center">No volunteers found</p> :
              filteredVolunteers.map(vol => (
                <div key={vol.profile.user_id} className="bg-white/20 backdrop-blur-md rounded-xl p-4 shadow-xl">
                  <div className="flex justify-between cursor-pointer" onClick={() => setExpandedVolunteer(expandedVolunteer === vol.profile.user_id ? null : vol.profile.user_id)}>
                    <h3 className="text-xl text-white font-bold">{vol.profile.display_name}</h3>
                    {expandedVolunteer === vol.profile.user_id ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
                  </div>
                  {expandedVolunteer === vol.profile.user_id && (
                    <div className="mt-2 text-white/90">
                      <p>📞 {vol.profile.phone}</p>
                      <p>🏆 Skills: {vol.profile.skills.join(', ')}</p>
                      <p>👤 Most Common Role: {vol.stats.most_common_role}</p>
                      <p>📊 Avg Hours/Event: {vol.stats.average_hours_per_event.toFixed(1)}</p>
                      <h4 className="mt-2 font-semibold">Participation History ({vol.history.length})</h4>
                      {vol.history.map(h => (
                        <div key={h.id} className="p-2 border-t border-white/20">
                          <p>Event: {h.event_id}</p>
                          <p>Date: {new Date(h.date).toLocaleDateString()} | Hours: {h.hours} | Role: {h.role}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.length === 0 ? <p className="text-white text-center">No events found</p> :
              filteredEvents.map(e => (
                <div key={e.event.id} className="bg-white/20 backdrop-blur-md rounded-xl p-4 shadow-xl">
                  <div className="flex justify-between cursor-pointer" onClick={() => setExpandedEvent(expandedEvent === e.event.id ? null : e.event.id)}>
                    <h3 className="text-xl text-white font-bold">{e.event.title}</h3>
                    {expandedEvent === e.event.id ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
                  </div>
                  {expandedEvent === e.event.id && (
                    <div className="mt-2 text-white/90">
                      <p>Status: <span className={`${getStatusColor(e.event.status)} px-2 py-1 rounded`}>{e.event.status}</span></p>
                      <p>Date: {new Date(e.event.starts_at).toLocaleDateString()} - {new Date(e.event.ends_at).toLocaleDateString()}</p>
                      <p>Location: {e.event.location ? `${e.event.location.city}, ${e.event.location.state}` : 'N/A'}</p>
                      <p>Required Skills: {e.event.required_skills.join(', ')}</p>
                      <p>Capacity: {e.event.capacity}</p>
                      <h4 className="mt-2 font-semibold">Volunteer Assignments ({e.volunteers.length})</h4>
                      {e.volunteers.map(v => (
                        <div key={v.id} className="p-2 border-t border-white/20">
                          <p>User ID: {v.user_id}</p>
                          <p>Role: {v.role} | Date: {new Date(v.date).toLocaleDateString()} | Hours: {v.hours}</p>
                          {v.notes && <p>Notes: {v.notes}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
