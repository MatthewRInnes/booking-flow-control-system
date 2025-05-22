
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BookingForm from "@/components/BookingForm";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
    
    // Load mock bookings data
    setBookings([
      {
        id: 1,
        service: "Room Reservation",
        date: "2025-06-01",
        time: "14:00",
        status: "confirmed"
      },
      {
        id: 2,
        service: "Bike Rental",
        date: "2025-06-05",
        time: "10:00",
        status: "pending"
      }
    ]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Booking Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user.name}</span>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Bookings</CardTitle>
                <CardDescription>
                  View and manage your bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-center py-4 text-gray-500">
                    You don't have any bookings yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div 
                        key={booking.id} 
                        className="p-4 rounded-lg border flex justify-between items-center"
                      >
                        <div>
                          <h3 className="font-medium">{booking.service}</h3>
                          <p className="text-sm text-gray-500">
                            {booking.date} at {booking.time}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === "confirmed" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="destructive" size="sm">Cancel</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Create New Booking</CardTitle>
                <CardDescription>
                  Book a new appointment or reservation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookingForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
