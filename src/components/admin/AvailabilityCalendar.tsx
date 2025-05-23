
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
    
    const dateExists = availableDates.some(
      availableDate => 
        availableDate.getFullYear() === date.getFullYear() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getDate() === date.getDate()
    );

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
    console.log("Available dates to be saved:", availableDates);
    toast.success("Availability updated successfully");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="rounded-2xl shadow-lg border-2">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl">
          <CardTitle className="text-xl text-blue-800">Set Available Dates</CardTitle>
          <CardDescription className="text-blue-600">Click on dates to mark them as available or unavailable</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              onSelect={handleDateSelect}
              disabled={(date) => date < today}
              modifiers={{
                available: availableDates
              }}
              modifiersClassNames={{
                available: "bg-green-100 text-green-900 hover:bg-green-200 rounded-full"
              }}
              fromDate={today}
              className="p-3 rounded-xl border-2"
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={saveAvailability} size="lg" className="rounded-full px-8">
              Save Availability
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-lg border-2">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-2xl">
          <CardTitle className="text-xl text-green-800">Instructions</CardTitle>
          <CardDescription className="text-green-600">How to use the availability calendar</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="list-disc pl-5 space-y-3 text-gray-700">
            <li>Click on a date to mark it as available (green) or unavailable (white)</li>
            <li>Customers will only be able to book on available dates</li>
            <li>Past dates cannot be selected</li>
            <li>Don't forget to click "Save Availability" after making changes</li>
          </ul>
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-400">
            <p className="font-semibold text-blue-800">💡 Pro Tip</p>
            <p className="text-sm mt-1 text-blue-700">You can set specific time slots for each available date by going to the "Advanced Settings" section in your account settings.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AvailabilityCalendar;
