import React from "react";
import moment from "moment/moment";

const RecentActivity = ({ users, categories, sales }) => {
  const allActivities = [
    ...(users || []).map((u) => ({
      id: `user-${u.id || u.email}`,
      type: "user",
      name: u.fullname,
      email: u.email,
      badge: u.role,
      time: u.createdAt,
    })),
    ...(categories || []).map((c) => ({
      id: `cat-${c.id}`,
      type: "category",
      name: c.name,
      email: "New category added",
      badge: null,
      time: c.createdAt,
    })),
    ...(sales || []).map((s) => ({
      id: `sale-${s.id}`,
      type: "sale",
      name: `Sale #${s.id}`,
      email: `Customer: ${s.customerName || "N/A"} | Amount: $${s.totalAmount}`,
      badge: s.paymentType,
      items: s.saleItems || [],
      time: s.createdAt,
    })),
  ];

  if (allActivities.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <p className="text-gray-500 text-sm py-4">No recent activity...</p>
      </div>
    );
  }

  const sortedActivities = allActivities.sort((a, b) => new Date(b.time) - new Date(a.time));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Activity
      </h2>
      <div className="divide-y divide-gray-100">
        {sortedActivities.map((activity) => {
          let color;
          switch (activity.type) {
            case "user":
              color = "bg-blue-100 text-blue-600";
              break;
            case "category":
              color = "bg-purple-100 text-purple-600";
              break;
            case "sale":
              color = "bg-green-100 text-green-600";
              break;
            default:
              color = "bg-gray-100 text-gray-600";
          }

          return (
            <div
              key={activity.id}
              className="flex flex-col py-3 border-b last:border-0"
            >
              <div className="flex items-center justify-between relative">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mr-3 ${color}`}
                  >
                    {activity.name ? activity.name.charAt(0).toUpperCase() : "?"}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {activity.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.email}
                    </p>
                  </div>
                </div>
                {activity.badge && (
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <p
                      className={`text-sm px-3 py-1 rounded-2xl text-center capitalize ${
                        activity.type === "sale"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {activity.badge}
                    </p>
                  </div>
                )}
                <div className="text-xs text-gray-400 whitespace-nowrap">
                  {moment(activity.time).fromNow()}
                </div>
              </div>
              {activity.type === "sale" && activity.items.length > 0 && (
                <div className="ml-12 mt-2">
                  <p className="text-xs text-gray-500 mb-1">Items Sold:</p>
                  <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                    {activity.items.map((item, idx) => (
                      <li key={idx}>
                        {item.product?.name} (x{item.quantity}) = ${item.product?.price * item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;