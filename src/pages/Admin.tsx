
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingManagement from "@/components/admin/BookingManagement";
import AvailabilityCalendar from "@/components/admin/AvailabilityCalendar";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage bookings, users and system settings</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Bookings</CardTitle>
              <CardDescription>All bookings in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">24</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Registered Users</CardTitle>
              <CardDescription>Total user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">12</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>Bookings requiring approval</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">5</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="bookings">Manage Bookings</TabsTrigger>
            <TabsTrigger value="availability">Set Availability</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings">
            <BookingManagement />
          </TabsContent>
          <TabsContent value="availability">
            <AvailabilityCalendar />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
