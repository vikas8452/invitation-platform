"use client";

import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Link as LinkIcon, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function DashboardPage() {
  const { user } = useUser();

  const stats = [
    {
      title: "Total Orders",
      value: "0",
      icon: ShoppingBag,
      description: "All time purchases",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Active Invitations",
      value: "0",
      icon: LinkIcon,
      description: "Currently live",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Total Views",
      value: "0",
      icon: Eye,
      description: "Across all invitations",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "RSVPs",
      value: "0",
      icon: TrendingUp,
      description: "Total responses",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your invitations, orders, and more.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/templates">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Create New Invitation
                </Button>
              </Link>
              <Link href="/dashboard/invitations">
                <Button variant="outline" className="w-full">
                  View My Invitations
                </Button>
              </Link>
              <Link href="/dashboard/orders">
                <Button variant="outline" className="w-full">
                  Order History
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p>No recent activity</p>
                <p className="text-sm mt-2">Your recent orders and invitations will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

