import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card } from "../../../shared/components/ui";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { getAdminMessages } from "../api/adminMessageApi.js";

function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getAdminMessages()
      .then(setMessages)
      .catch((error) => toast.error(error.response?.data?.message || "Failed to load messages"));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-black text-slate-900">Messages</h1>
          <p className="mt-2 text-slate-600">Contact form messages from users.</p>
        </div>

        <div className="grid gap-4">
          {messages.length === 0 ? (
            <Card className="p-6 text-center text-slate-500">No messages found.</Card>
          ) : (
            messages.map((message) => (
              <Card key={message._id} className="p-5">
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
                  <div>
                    <p className="font-black text-slate-900">{message.email}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{message.message}</p>
                  </div>
                  <p className="shrink-0 text-xs font-semibold text-slate-500">
                    {message.createdAt ? new Date(message.createdAt).toLocaleString() : ""}
                  </p>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminMessagesPage;
