
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in and is an admin
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== "admin") {
      navigate("/dashboard");
      return;
    }

    setUser(parsedUser);
    
    // Load mock bookings data
    setBookings([
      { id: 1, userId: 1, userName: "John Smith", service: "Room Reservation", date: "2025-06-01", time: "14:00", status: "confirmed" },
      { id: 2, userId: 2, userName: "Sarah Johnson", service: "Bike Rental", date: "2025-06-05", time: "10:00", status: "pending" },
      { id: 3, userId: 1, userName: "John Smith", service: "Room Reservation", date: "2025-06-10", time: "16:00", status: "confirmed" },
      { id: 4, userId: 3, userName: "Mike Brown", service: "Bike Rental", date: "2025-06-12", time: "09:00", status: "cancelled" },
      { id: 5, userId: 4, userName: "Emma Wilson", service: "Room Reservation", date: "2025-06-15", time: "11:00", status: "pending" }
    ]);
    
    // Load mock users data
    setUsers([
      { id: 1, name: "John Smith", email: "john@example.com", bookings: 2 },
      { id: 2, name: "Sarah Johnson", email: "sarah@example.com", bookings: 1 },
      { id: 3, name: "Mike Brown", email: "mike@example.com", bookings: 1 },
      { id: 4, name: "Emma Wilson", email: "emma@example.com", bookings: 1 }
    ]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const analytics = [
    { name: "Monday", bookings: 4 },
    { name: "Tuesday", bookings: 7 },
    { name: "Wednesday", bookings: 5 },
    { name: "Thursday", bookings: 8 },
    { name: "Friday", bookings: 12 },
    { name: "Saturday", bookings: 15 },
    { name: "Sunday", bookings: 6 }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user.name}</span>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Bookings</CardTitle>
              <CardDescription>All time booking count</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{bookings.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Bookings awaiting confirmation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{bookings.filter(b => b.status === "pending").length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Users</CardTitle>
              <CardDescription>Registered user count</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{users.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Weekly Booking Overview</CardTitle>
            <CardDescription>Number of bookings per day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Bookings and Users */}
        <Tabs defaultValue="bookings">
          <TabsList className="mb-4">
            <TabsTrigger value="bookings">Manage Bookings</TabsTrigger>
            <TabsTrigger value="users">Manage Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>View and manage all bookings in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>{booking.userName}</TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.time}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            booking.status === "confirmed" 
                              ? "bg-green-100 text-green-800" 
                              : booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}>
                            {booking.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            {booking.status === "pending" && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                            )}
                            <Button variant="destructive" size="sm">Cancel</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>Manage registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Total Bookings</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.bookings}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View Details</Button>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
