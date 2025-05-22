
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero section */}
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-3xl py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Book Your Services With Ease
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our booking system makes it simple to reserve rooms, rent bikes, 
                or schedule activities. Get started today!
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg">
                  <Link to="/register">Get started</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/login">Sign in</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary">Book Faster</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to manage your bookings
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our platform provides a seamless booking experience for both users and administrators.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {[
                  {
                    title: "Easy Reservations",
                    description: "Quickly book services with just a few clicks. Select dates, times, and service types easily."
                  },
                  {
                    title: "Manage Your Bookings",
                    description: "View, modify, or cancel your bookings through an intuitive dashboard interface."
                  },
                  {
                    title: "Instant Confirmations",
                    description: "Receive immediate confirmation once your booking is approved."
                  },
                  {
                    title: "Secure Authentication",
                    description: "Your account information and booking details are kept secure."
                  }
                ].map((feature, index) => (
                  <div key={index} className="relative pl-16">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold leading-7 text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-base leading-7 text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h2 className="text-2xl font-bold">BookingApp</h2>
              <p className="mt-2 text-gray-400">Making reservations simple.</p>
            </div>
            <div className="mt-8 md:mt-0">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <div className="mt-4 space-y-2">
                <Link to="/" className="block text-gray-400 hover:text-white">Home</Link>
                <Link to="/login" className="block text-gray-400 hover:text-white">Login</Link>
                <Link to="/register" className="block text-gray-400 hover:text-white">Register</Link>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} BookingApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
