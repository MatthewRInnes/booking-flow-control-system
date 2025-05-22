
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AvailabilityCalendar = () => {
  const today = new Date();
  const [availableDates, setAvailableDates] = useState<Date[]>([
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8),
  ]);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    // Check if the date is already in availableDates
    const dateExists = availableDates.some(
      availableDate => 
        availableDate.getFullYear() === date.getFullYear() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getDate() === date.getDate()
    );

    // If it exists, remove it; otherwise, add it
    if (dateExists) {
      setAvailableDates(availableDates.filter(
        availableDate => 
          !(availableDate.getFullYear() === date.getFullYear() &&
          availableDate.getMonth() === date.getMonth() &&
          availableDate.getDate() === date.getDate())
      ));
    } else {
      setAvailableDates([...availableDates, date]);
    }
  };

  const isDateAvailable = (date: Date): boolean => {
    return availableDates.some(
      availableDate => 
        availableDate.getFullYear() === date.getFullYear() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getDate() === date.getDate()
    );
  };

  const saveAvailability = () => {
    // Here you would normally save this to your backend
    console.log("Available dates to be saved:", availableDates);
    toast.success("Availability updated successfully");
  };

  // Custom day renderer to show available dates
  const renderDay = (day: Date, selected: boolean) => {
    const isAvailable = isDateAvailable(day);
    
    return (
      <div
        className={`h-9 w-9 p-0 font-normal flex items-center justify-center rounded-md ${
          isAvailable
            ? "bg-green-100 text-green-900 hover:bg-green-200"
            : "hover:bg-gray-100"
        }`}
      >
        {day.getDate()}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Set Available Dates</CardTitle>
          <CardDescription>Click on dates to mark them as available or unavailable</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              onSelect={handleDateSelect}
              disabled={(date) => date < today}
              modifiers={{
                available: availableDates
              }}
              modifiersClassNames={{
                available: "bg-green-100 text-green-900 hover:bg-green-200"
              }}
              fromDate={today}
              className="p-3"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={saveAvailability}>Save Availability</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
          <CardDescription>How to use the availability calendar</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Click on a date to mark it as available (green) or unavailable (white)</li>
            <li>Customers will only be able to book on available dates</li>
            <li>Past dates cannot be selected</li>
            <li>Don't forget to click "Save Availability" after making changes</li>
          </ul>
          <div className="mt-6 p-3 bg-blue-50 rounded-md text-blue-800">
            <p className="font-medium">Pro Tip</p>
            <p className="text-sm mt-1">You can set specific time slots for each available date by going to the "Advanced Settings" section in your account settings.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvailabilityCalendar;
