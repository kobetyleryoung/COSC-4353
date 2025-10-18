import { useEffect, useMemo, useState } from "react";
import useBackendUserId from "../../hooks/useBackendUserId";
import { apiGet, apiPost } from "../../hooks/api";

type NotificationDTO = {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  channel: "EMAIL" | "SMS" | "PUSH" | "IN_APP";
  status: "QUEUED" | "SENT" | "FAILED";
  queued_at?: string;
  sent_at?: string | null;
  error?: string | null;
};
type ListResponse = { notifications: NotificationDTO[]; total: number; unread_count: number };

type BackendEvent = {
  id: string;
  title: string;
  description?: string;
  location?: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
  };
  starts_at?: string;   // ISO
  ends_at?: string;     // ISO
  status?: string;
};

type EventsListResponse = { events: BackendEvent[]; total: number };

const ADMIN_ENABLED = String(import.meta.env.VITE_ENABLE_NOTIF_ADMIN) === "true";

export default function NotificationsPage() {
  const authUuid = useBackendUserId();
  const userId = useMemo(() => authUuid || localStorage.getItem("demo_user") || "", [authUuid]);

  // list + unread
  const [items, setItems] = useState<NotificationDTO[]>([]);
  const [unread, setUnread] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // admin form (prefilled from backend)
  const [events, setEvents] = useState<BackendEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDateISO, setEventDateISO] = useState("");
  const [hoursBefore, setHoursBefore] = useState<number>(24);
  const [updateDetails, setUpdateDetails] = useState("Time moved to 5 PM.");
  const [busy, setBusy] = useState(false);
  const [formErr, setFormErr] = useState("");

  // bootstrap a demo user id if not logged in
  useEffect(() => {
    if (!authUuid && !userId) {
      const demo = crypto.randomUUID();
      localStorage.setItem("demo_user", demo);
      window.location.reload();
    }
  }, [authUuid, userId]);

  async function load() {
    try {
      setLoading(true);
      const res = await apiGet<ListResponse>(`/api/v1/notifications/user/${userId}`);
      setItems(res.notifications ?? []);
      setErr("");
      const unreadRes = await apiGet<{ user_id: string; unread_count: number }>(
        `/api/v1/notifications/user/${userId}/unread-count`
      );
      setUnread(unreadRes?.unread_count ?? 0);
    } catch (e: any) {
      setErr(e.message ?? "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }

  async function prefillFromEvents() {
  if (!ADMIN_ENABLED) return;

  // accepts either {events: []} or [] from the API
  const getList = async (url: string): Promise<BackendEvent[]> => {
    const res = await apiGet<BackendEvent[] | EventsListResponse>(url);
    return Array.isArray(res) ? res : res?.events ?? [];
  };

  try {
    // try published → upcoming → all
    let list = await getList("/api/v1/events/published");
    if (!list.length) list = await getList("/api/v1/events/upcoming");
    if (!list.length) {
      const all = await apiGet<EventsListResponse>("/api/v1/events");
      list = all?.events ?? [];
    }

    setEvents(list);

    if (list.length) {
      const ev = list[0];
      setSelectedEventId(ev.id);
      setEventTitle(ev.title || "Untitled Event");

      const loc =
        ev.location?.name ||
        [ev.location?.city, ev.location?.state].filter(Boolean).join(", ") ||
        "TBD";
      setEventLocation(loc);

      setEventDateISO(ev.starts_at || new Date().toISOString());
      return;
    }
  } catch (e) {
    console.warn("Failed to load events for dropdown:", e);
  }

  // fallback defaults
  setSelectedEventId("");
  setEventTitle("Charity Run");
  setEventLocation("Memorial Park");
  setEventDateISO(new Date(Date.now() + 86_400_000).toISOString());
}


  useEffect(() => {
    if (!userId) return;
    void load();
    void prefillFromEvents();
  }, [userId]);

  // demo seeder
  async function seedInApp() {
    await apiPost(`/api/v1/notifications/send`, {
      recipient_id: userId,
      subject: "Welcome to Volunteer Management",
      body: "This is an in-app notification from the backend.",
      notification_type: "event_reminder",
      channel: "IN_APP",
      priority: "normal",
    });
    await load();
  }

  // admin send actions
  async function sendAssignment() {
    if (!ADMIN_ENABLED) return;
    setBusy(true); setFormErr("");
    try {
      await apiPost(`/api/v1/notifications/event-assignment`, {
        recipient_id: userId,
        event_title: eventTitle,
        event_date: eventDateISO,
        event_location: eventLocation,
      });
      await load();
    } catch (e: any) {
      setFormErr(e?.message ?? "Failed to send assignment");
    } finally { setBusy(false); }
  }
  async function sendUpdate() {
    if (!ADMIN_ENABLED) return;
    setBusy(true); setFormErr("");
    try {
      await apiPost(`/api/v1/notifications/event-update`, {
        recipient_id: userId,
        event_title: eventTitle,
        update_details: updateDetails,
      });
      await load();
    } catch (e: any) {
      setFormErr(e?.message ?? "Failed to send update");
    } finally { setBusy(false); }
  }
  async function sendReminder() {
    if (!ADMIN_ENABLED) return;
    setBusy(true); setFormErr("");
    try {
      await apiPost(`/api/v1/notifications/event-reminder`, {
        recipient_id: userId,
        event_title: eventTitle,
        event_date: eventDateISO,
        event_location: eventLocation,
        hours_before: hoursBefore,
      });
      await load();
    } catch (e: any) {
      setFormErr(e?.message ?? "Failed to send reminder");
    } finally { setBusy(false); }
  }

  function formatEventOption(ev: BackendEvent) {
    const when = ev.starts_at ? new Date(ev.starts_at).toLocaleDateString() : "TBD";
    const where =
      ev.location?.name ||
      [ev.location?.city, ev.location?.state].filter(Boolean).join(", ") ||
      "TBD";
    return `${ev.title} — ${where} — ${when}`;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6">Volunteer Dashboard</h1>
        <button
          onClick={seedInApp}
          className="px-3 py-2 rounded bg-indigo-600 text-white hover:opacity-90"
        >
          + Demo Notification
        </button>
      </div>

      {/* ADMIN send panel (toggle with VITE_ENABLE_NOTIF_ADMIN=true) */}
      {ADMIN_ENABLED && (
        <section className="mb-8 rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Notifications Admin</h2>
            <span className="text-sm text-gray-500">Prefilled from back end events</span>
          </div>

          {formErr && <p className="text-sm text-red-600 mb-3">{formErr}</p>}

          <div className="grid gap-3 md:grid-cols-4">
            {/* Dropdown fed from backend */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Choose Event</label>
              <select
                value={selectedEventId}
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedEventId(id);
                  const ev = events.find((x) => x.id === id);
                  if (!ev) return;
                  setEventTitle(ev.title || "Untitled Event");
                  const loc =
                    ev.location?.name ||
                    [ev.location?.city, ev.location?.state].filter(Boolean).join(", ") ||
                    "TBD";
                  setEventLocation(loc);
                  setEventDateISO(ev.starts_at || new Date().toISOString());
                }}
                className="w-full rounded border px-3 py-2"
              >
                {events.length === 0 && <option value="">Loading events…</option>}
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {formatEventOption(ev)}
                  </option>
                ))}
              </select>
            </div>

            {/* Editable fields (pre-filled from selection) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                className="w-full rounded border px-3 py-2"
                placeholder="Location"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Date (ISO)</label>
              <input
                value={eventDateISO}
                onChange={(e) => setEventDateISO(e.target.value)}
                className="w-full rounded border px-3 py-2"
                placeholder="2025-10-19T00:35:59.084Z"
              />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-4 mt-3">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Update Details</label>
              <input
                value={updateDetails}
                onChange={(e) => setUpdateDetails(e.target.value)}
                className="w-full rounded border px-3 py-2"
                placeholder="Time moved to 5 PM."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reminder Hours Before</label>
              <input
                type="number"
                value={hoursBefore}
                onChange={(e) => setHoursBefore(parseInt(e.target.value || "0", 10))}
                className="w-full rounded border px-3 py-2"
                min={1}
              />
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              disabled={busy}
              onClick={sendAssignment}
              className="px-3 py-2 rounded bg-indigo-600 text-white hover:opacity-90 disabled:opacity-50"
            >
              Send Assignment
            </button>
            <button
              disabled={busy}
              onClick={sendUpdate}
              className="px-3 py-2 rounded bg-sky-600 text-white hover:opacity-90 disabled:opacity-50"
            >
              Send Update
            </button>
            <button
              disabled={busy}
              onClick={sendReminder}
              className="px-3 py-2 rounded bg-emerald-600 text-white hover:opacity-90 disabled:opacity-50"
            >
              Send Reminder
            </button>
          </div>
        </section>
      )}

      {/* LIST */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-semibold">Notifications</h2>
          <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-700">
            Unread: {unread}
          </span>
        </div>

        {loading && <div>Loading…</div>}
        {err && <div className="text-red-600">{err}</div>}

        {!loading && items.length === 0 ? (
          <p className="text-gray-500">No notifications at the moment.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((n) => {
              const bg =
                n.channel === "EMAIL" ? "bg-blue-100 text-blue-800" :
                n.channel === "SMS"   ? "bg-yellow-100 text-yellow-800" :
                n.channel === "PUSH"  ? "bg-purple-100 text-purple-800" :
                                        "bg-green-100 text-green-800"; // IN_APP
              const ts = n.sent_at ?? n.queued_at;
              return (
                <li key={n.id} className={`p-4 rounded shadow ${bg}`}>
                  <div className="font-semibold">{n.subject}</div>
                  <div className="whitespace-pre-wrap">{n.body}</div>
                  <div className="text-xs text-gray-700 mt-1">
                    {n.status} · {ts ? new Date(ts).toLocaleString() : "pending"}
                    {n.error ? ` · error: ${n.error}` : ""}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <p className="text-gray-700">List of upcoming events will go here.</p>
      </section>
    </div>
  );
}
