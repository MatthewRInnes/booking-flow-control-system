
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Booking {
  id: string;
  customerName: string;
  email: string;
  date: Date;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
}

const BookingManagement = () => {
  // Mock data for bookings
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "b1",
      customerName: "John Doe",
      email: "john@example.com",
      date: new Date(2025, 5, 24),
      time: "10:00 AM",
      status: "confirmed"
    },
    {
      id: "b2",
      customerName: "Jane Smith",
      email: "jane@example.com",
      date: new Date(2025, 5, 25),
      time: "2:00 PM",
      status: "pending"
    },
    {
      id: "b3",
      customerName: "Bob Johnson",
      email: "bob@example.com",
      date: new Date(2025, 5, 26),
      time: "11:30 AM",
      status: "cancelled"
    }
  ]);
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [editDate, setEditDate] = useState<Date | undefined>(undefined);
  const [editTime, setEditTime] = useState("");
  const [editStatus, setEditStatus] = useState<"confirmed" | "pending" | "cancelled">("confirmed");

  const handleEditBooking = (booking: Booking) => {
    setCurrentBooking(booking);
    setEditDate(booking.date);
    setEditTime(booking.time);
    setEditStatus(booking.status);
    setIsEditDialogOpen(true);
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      setBookings(bookings.filter(booking => booking.id !== id));
      toast.success("Booking deleted successfully");
    }
  };

  const saveBookingChanges = () => {
    if (currentBooking && editDate) {
      const updatedBookings = bookings.map(booking => 
        booking.id === currentBooking.id 
          ? { 
              ...booking, 
              date: editDate, 
              time: editTime, 
              status: editStatus 
            }
          : booking
      );
      setBookings(updatedBookings);
      setIsEditDialogOpen(false);
      toast.success("Booking updated successfully");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-md shadow">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">All Bookings</h2>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.customerName}</TableCell>
                <TableCell>{booking.email}</TableCell>
                <TableCell>{format(booking.date, "MMM d, yyyy")}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditBooking(booking)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteBooking(booking.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="customer">
                Customer
              </Label>
              <div className="col-span-3 font-medium">
                {currentBooking?.customerName}
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="date">
                Date
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !editDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {editDate ? format(editDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={editDate}
                      onSelect={setEditDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="time">
                Time
              </Label>
              <Input
                id="time"
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="status">
                Status
              </Label>
              <select
                id="status"
                className="col-span-3 p-2 border rounded"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as "confirmed" | "pending" | "cancelled")}
              >
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit" onClick={saveBookingChanges}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingManagement;
