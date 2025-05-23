
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingManagement from "@/components/admin/BookingManagement";
import AvailabilityCalendar from "@/components/admin/AvailabilityCalendar";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage bookings, users and system settings</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="rounded-2xl shadow-lg border-2 hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-2xl">
              <CardTitle className="text-lg">Total Bookings</CardTitle>
              <CardDescription className="text-blue-100">All bookings in the system</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-4xl font-bold text-blue-600">24</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl shadow-lg border-2 hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-2xl">
              <CardTitle className="text-lg">Registered Users</CardTitle>
              <CardDescription className="text-green-100">Total user accounts</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-4xl font-bold text-green-600">12</p>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl shadow-lg border-2 hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-2xl">
              <CardTitle className="text-lg">Pending Approvals</CardTitle>
              <CardDescription className="text-orange-100">Bookings requiring approval</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-4xl font-bold text-orange-600">5</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="mb-6 bg-white rounded-full p-1 shadow-lg border-2">
            <TabsTrigger value="bookings" className="rounded-full px-6 py-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Manage Bookings
            </TabsTrigger>
            <TabsTrigger value="availability" className="rounded-full px-6 py-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Set Availability
            </TabsTrigger>
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
