import React, {useState, useEffect} from 'react'


const sampleNotifications = [
  { id: 1, message: "You have been assigned to the Food Drive event.", type: "assignment" },
  { id: 2, message: "Volunteer meeting rescheduled to 5 PM.", type: "update" },
  { id: 3, message: "Reminder: Charity Run starts tomorrow.", type: "reminder" },
];

const Notifications = () => {
    const [notifications, setNotifications] = useState<any[]>([]);

    // Simulate fetching notifications
    useEffect(() => {
        // In real use case, fetch from API
        setNotifications(sampleNotifications);
    }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Volunteer Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications at the moment.</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-4 rounded shadow ${
                  notification.type === "assignment"
                    ? "bg-blue-100 text-blue-800"
                    : notification.type === "update"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {notification.message}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <p className="text-gray-700">List of upcoming events will go here.</p>
      </section>
    </div>
  );
};


export default Notifications
