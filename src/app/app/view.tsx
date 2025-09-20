"use client";

import {
  Activity,
  BarChart3,
  Bell,
  Calendar,
  DollarSign,
  FileText,
  Home,
  LogOut,
  Mail,
  Settings,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { logout } from "@/lib/auth/jwt";
import type { I_UserPublic } from "@/types/user";

interface DashboardViewProps {
  user: I_UserPublic;
}

export default function DashboardView({ user }: DashboardViewProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1% from last month",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+180.1% from last month",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Sales",
      value: "12,234",
      change: "+19% from last month",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
    {
      title: "Active Sessions",
      value: "573",
      change: "+201 since last hour",
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New user registered",
      time: "2 minutes ago",
      type: "user",
    },
    {
      id: 2,
      action: "Payment received",
      time: "5 minutes ago",
      type: "payment",
    },
    {
      id: 3,
      action: "System backup completed",
      time: "1 hour ago",
      type: "system",
    },
    { id: 4, action: "New order placed", time: "2 hours ago", type: "order" },
    {
      id: 5,
      action: "User profile updated",
      time: "3 hours ago",
      type: "user",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Home className="w-8 h-8 text-blue-600" />
              <h1 className="font-semibold text-gray-900 dark:text-white text-xl">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="w-6 h-6 text-gray-500" />
                  <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                    {user.name}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <LogOut className="mr-2 w-4 h-4" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="font-bold text-gray-900 dark:text-white text-2xl">
            Welcome back, {user.name}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your application today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="shadow-lg border-0">
                <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2">
                  <CardTitle className="font-medium text-gray-600 dark:text-gray-400 text-sm">
                    {stat.title}
                  </CardTitle>
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center ${stat.bgColor}`}
                  >
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="font-bold text-gray-900 dark:text-white text-2xl">
                    {stat.value}
                  </div>
                  <p className="flex items-center mt-1 text-gray-600 dark:text-gray-400 text-xs">
                    <TrendingUp className="mr-1 w-3 h-3 text-green-500" />
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Dashboard Grid */}
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest actions and events in your system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                  >
                    <div className="bg-blue-500 rounded-full w-2 h-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {activity.action}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="justify-start w-full" variant="ghost">
                <Mail className="mr-2 w-4 h-4" />
                Send Message
              </Button>
              <Button className="justify-start w-full" variant="ghost">
                <FileText className="mr-2 w-4 h-4" />
                Create Report
              </Button>
              <Button className="justify-start w-full" variant="ghost">
                <Calendar className="mr-2 w-4 h-4" />
                Schedule Meeting
              </Button>
              <Button className="justify-start w-full" variant="ghost">
                <Users className="mr-2 w-4 h-4" />
                Manage Users
              </Button>
              <Button className="justify-start w-full" variant="ghost">
                <Settings className="mr-2 w-4 h-4" />
                System Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 mt-8">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-800 rounded-lg h-64">
                <div className="text-center">
                  <BarChart3 className="mx-auto mb-4 w-16 h-16 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Chart placeholder
                  </p>
                  <p className="text-gray-400 text-xs">
                    Revenue chart would go here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>User acquisition over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-800 rounded-lg h-64">
                <div className="text-center">
                  <TrendingUp className="mx-auto mb-4 w-16 h-16 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Chart placeholder
                  </p>
                  <p className="text-gray-400 text-xs">
                    User growth chart would go here
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* JWT Info Section */}
        <Card className="bg-blue-50 dark:bg-blue-900/20 shadow-lg mt-8 border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700 dark:text-blue-300">
              <User className="mr-2 w-5 h-5" />
              Authentication Status
            </CardTitle>
            <CardDescription>Your current session information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
              <div>
                <p className="font-medium text-gray-600 dark:text-gray-400 text-sm">
                  User ID
                </p>
                <p className="font-mono text-gray-900 dark:text-white text-sm">
                  {user.id}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-600 dark:text-gray-400 text-sm">
                  Email
                </p>
                <p className="text-gray-900 dark:text-white text-sm">
                  {user.email}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-600 dark:text-gray-400 text-sm">
                  Auth Method
                </p>
                <p className="text-gray-900 dark:text-white text-sm">
                  Hybrid JWT
                </p>
              </div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 mt-4 p-3 rounded-lg">
              <p className="text-green-800 dark:text-green-300 text-sm">
                ✅ Session is valid and secure with hybrid stateful/stateless
                JWT authentication
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
