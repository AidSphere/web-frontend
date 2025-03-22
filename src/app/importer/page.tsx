/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Pill,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  Bell,
  Check,
  X,
  DollarSign,
  Clock,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import ThemeToggle from '@/components/ThemeTogle';

// Sample statistics data
const statsData = [
  {
    title: "Total Requests",
    value: "243",
    change: "+12.5%",
    trend: "up",
    icon: FileText,
  },
  {
    title: "Quotations Sent",
    value: "198",
    change: "+8.2%",
    trend: "up",
    icon: ClipboardList,
  },
  {
    title: "Quotations Accepted",
    value: "156",
    change: "+5.7%",
    trend: "up",
    icon: Check,
  },
  {
    title: "Quotations Rejected",
    value: "42",
    change: "+2.3%",
    trend: "down",
    icon: X,
  },
];

// Sample medicines data
const medicinesData = [
  { name: "Antibiotics", count: 124, stock: 85 },
  { name: "Pain Relievers", count: 98, stock: 72 },
  { name: "Cardiovascular", count: 86, stock: 65 },
  { name: "Diabetes", count: 76, stock: 90 },
  { name: "Respiratory", count: 65, stock: 58 },
];

// Chart colors based on your theme
const chartColors = {
  primary: "hsl(333, 95%, 60%)",
  secondary: "hsl(210, 100%, 60%)",
  accent1: "hsl(150, 60%, 50%)",
  accent2: "hsl(45, 90%, 60%)"
};

// Sample requests pie chart data
const requestStatusData = [
  { name: "Completed", value: 156, color: chartColors.accent1 },
  { name: "Pending", value: 42, color: chartColors.accent2 },
  { name: "Cancelled", value: 25, color: "#ef4444" },
  { name: "Processing", value: 20, color: chartColors.secondary },
];

// Sample monthly data
const monthlyData = [
  { name: 'Jan', requests: 30, quotations: 25, accepted: 20 },
  { name: 'Feb', requests: 35, quotations: 32, accepted: 25 },
  { name: 'Mar', requests: 40, quotations: 35, accepted: 30 },
  { name: 'Apr', requests: 45, quotations: 40, accepted: 32 },
  { name: 'May', requests: 50, quotations: 45, accepted: 38 },
  { name: 'Jun', requests: 55, quotations: 48, accepted: 40 },
];

// Sample recent bill requests
const recentBillRequests = [
  {
    id: "BR-7842",
    patient: "John Smith",
    items: 12,
    total: "$856.40",
    date: "2025-03-19",
    status: "Pending",
    avatar: "JS"
  },
  {
    id: "BR-7841",
    patient: "Emma Johnson",
    items: 8,
    total: "$542.75",
    date: "2025-03-18",
    status: "Quoted",
    avatar: "EJ"
  },
  {
    id: "BR-7840",
    patient: "Michael Davis",
    items: 15,
    total: "$1,245.30",
    date: "2025-03-18",
    status: "Accepted",
    avatar: "MD"
  },
  {
    id: "BR-7839",
    patient: "Sarah Wilson",
    items: 5,
    total: "$328.50",
    date: "2025-03-17",
    status: "Rejected",
    avatar: "SW"
  },
  {
    id: "BR-7838",
    patient: "Robert Brown",
    items: 10,
    total: "$756.25",
    date: "2025-03-17",
    status: "Completed",
    avatar: "RB"
  }
];

// Sample messages/notifications
const notificationsData = [
  {
    id: 1,
    type: "accept",
    message: "Quotation #QT-4521 has been accepted by John Smith",
    time: "10 minutes ago",
    avatar: "JS"
  },
  {
    id: 2,
    type: "payment",
    message: "Payment received for Bill #BR-7835 from Emma Johnson",
    time: "45 minutes ago",
    avatar: "EJ"
  },
  {
    id: 3,
    type: "reject",
    message: "Quotation #QT-4519 has been rejected by Michael Davis",
    time: "2 hours ago",
    avatar: "MD"
  },
  {
    id: 4,
    type: "new",
    message: "New bill request #BR-7842 from Sarah Wilson",
    time: "4 hours ago",
    avatar: "SW"
  },
  {
    id: 5,
    type: "reminder",
    message: "Quotation #QT-4518 is pending response for 2 days",
    time: "1 day ago",
    avatar: "RB"
  }
];

export default function Dashboard() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'accept':
        return <Check className="size-4 text-green-500" />;
      case 'payment':
        return <DollarSign className="size-4 text-secondary" />;
      case 'reject':
        return <X className="size-4 text-red-500" />;
      case 'new':
        return <FileText className="size-4 text-primary" />;
      case 'reminder':
        return <Clock className="size-4 text-amber-500" />;
      default:
        return <Bell className="size-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500';
      case 'Quoted':
        return 'bg-secondary';
      case 'Accepted':
        return 'bg-green-500';
      case 'Rejected':
        return 'bg-red-500';
      case 'Completed':
        return 'bg-primary';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your drug import management dashboard
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <div key={index} 
            className="rounded-lg border shadow-sm overflow-hidden bg-white dark:bg-gray-800 transition-all hover:shadow-md"
            style={{ borderRadius: 'var(--radius)' }}
          >
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <h3 className="text-sm font-medium">{stat.title}</h3>
              <div className={`rounded-full p-2 ${index % 2 === 0 ? 'bg-primary' : 'bg-secondary'} text-white`}>
                <stat.icon className="size-4" />
              </div>
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-sm">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="size-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="size-4 text-rose-500" />
                )}
                <span className={stat.trend === "up" ? "text-emerald-500" : "text-rose-500"}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

       {/* Medicine Inventory and Recent Bills */}
       <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {/* Medicine Inventory */}
        <div 
          className="rounded-lg border shadow-sm bg-white dark:bg-gray-800 transition-all hover:shadow-md"
          style={{ borderRadius: 'var(--radius)' }}
        >
          <div className="flex flex-row items-center justify-between space-y-0 p-6">
            <div>
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Medicine Inventory</h3>
              <p className="text-muted-foreground">Top medicine categories by inventory level</p>
            </div>
            <Pill className="size-5 text-primary" />
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              {medicinesData.map((medicine, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{medicine.name}</span>
                    <span className="text-sm text-muted-foreground">{medicine.count} items</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                      <div 
                        className="h-full transition-all" 
                        style={{ 
                          width: `${medicine.stock}%`,
                          backgroundColor: `hsl(${medicine.stock > 70 ? '150, 60%, 50%' : medicine.stock > 50 ? '210, 100%, 60%' : '333, 95%, 60%'})` 
                        }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{medicine.stock}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center p-6 pt-0">
            <button className="ml-auto inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary text-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary">
              View All
              <ChevronRight className="ml-1 size-4" />
            </button>
          </div>
        </div>
        
        {/* Latest Bill Requests */}
        <div 
          className="rounded-lg border shadow-sm bg-white dark:bg-gray-800 transition-all hover:shadow-md"
          style={{ borderRadius: 'var(--radius)' }}
        >
          <div className="flex flex-row items-center justify-between space-y-0 p-6">
            <div>
              <h3 className="text-2xl font-semibold leading-none tracking-tight">Recent Bill Requests</h3>
              <p className="text-muted-foreground">Latest patient bill requests</p>
            </div>
            <FileText className="size-5 text-primary" />
          </div>
          <div className="p-6 pt-0">
            <div className="w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <tbody className="[&_tr:last-child]:border-0">
                  {recentBillRequests.map((request) => (
                    <tr key={request.id} className="border-b transition-colors hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-2">
                          <div className="inline-flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <div className="text-sm font-medium">{request.avatar}</div>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">{request.patient}</span>
                            <span className="text-xs text-muted-foreground">{request.date}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 align-middle text-right">{request.items} items</td>
                      <td className="p-4 align-middle text-right font-medium">{request.total}</td>
                      <td className="p-4 align-middle text-right">
                        <div className={`inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(request.status)} text-white`}>
                          {request.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center p-6 pt-0">
            <button className="ml-auto inline-flex items-center justify-center whitespace-nowrap rounded-md bg-secondary text-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary">
              View All Requests
              <ChevronRight className="ml-1 size-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Monthly Activity Chart */}
        <div 
          className="rounded-lg border shadow-sm bg-white dark:bg-gray-800 lg:col-span-4 transition-all hover:shadow-md"
          style={{ borderRadius: 'var(--radius)' }}
        >
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Monthly Activity</h3>
            <p className="text-muted-foreground">
              Comparison of requests, quotations, and acceptance rates
            </p>
          </div>
          <div className="p-6 pt-0 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="requests" fill={chartColors.secondary} name="Requests" />
                <Bar dataKey="quotations" fill={chartColors.primary} name="Quotations" />
                <Bar dataKey="accepted" fill={chartColors.accent1} name="Accepted" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Request Status Pie Chart */}
        <div 
          className="rounded-lg border shadow-sm bg-white dark:bg-gray-800 lg:col-span-3 transition-all hover:shadow-md"
          style={{ borderRadius: 'var(--radius)' }}
        >
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">Request Status</h3>
            <p className="text-muted-foreground">
              Overview of current request statuses
            </p>
          </div>
          <div className="p-6 pt-0 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={requestStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {requestStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
     
      
      {/* Notifications & Messages */}
      {/* <div 
        className="rounded-lg border shadow-sm bg-white dark:bg-gray-800 transition-all hover:shadow-md"
        style={{ borderRadius: 'var(--radius)' }}
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Recent Notifications</h3>
          <p className="text-muted-foreground">Latest updates on quotations and payments</p>
        </div>
        <div className="p-6 pt-0">
          <div className="space-y-4">
            {notificationsData.map((notification) => (
              <div key={notification.id} className="flex items-start gap-4 rounded-lg border p-4 transition-all hover:bg-gray-50 dark:hover:bg-gray-900/50">
                <div className="rounded-full p-2 bg-primary/10">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex size-6 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                      <div className="text-xs font-medium">{notification.avatar}</div>
                    </div>
                    <p className="font-medium">{notification.message}</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{notification.time}</p>
                </div>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium size-8 p-0 hover:bg-primary/10 text-primary">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center p-6 pt-0">
          <button className="ml-auto inline-flex items-center justify-center whitespace-nowrap rounded-md border border-primary/20 text-primary hover:bg-primary hover:text-white px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary">
            View All Notifications
            <ChevronRight className="ml-1 size-4" />
          </button>
        </div>
      </div> */}
      
      {/* Add this style tag to properly use CSS variables in Tailwind */}
      <style jsx global>{`
        .bg-primary {
          background-color: hsl(var(--primary));
        }
        .bg-primary\/10 {
          background-color: hsla(var(--primary), 0.1);
        }
        .bg-primary\/90 {
          background-color: hsla(var(--primary), 0.9);
        }
        .text-primary {
          color: hsl(var(--primary));
        }
        .border-primary {
          border-color: hsl(var(--primary));
        }
        .border-primary\/20 {
          border-color: hsla(var(--primary), 0.2);
        }
        .ring-primary {
          --tw-ring-color: hsl(var(--primary));
        }
        .hover\\:bg-primary:hover {
          background-color: hsl(var(--primary));
        }
        .hover\\:bg-primary\\/10:hover {
          background-color: hsla(var(--primary), 0.1);
        }
        .hover\\:bg-primary\\/90:hover {
          background-color: hsla(var(--primary), 0.9);
        }
        
        .bg-secondary {
          background-color: hsl(var(--secondary));
        }
        .bg-secondary\\/10 {
          background-color: hsla(var(--secondary), 0.1);
        }
        .bg-secondary\\/90 {
          background-color: hsla(var(--secondary), 0.9);
        }
        .text-secondary {
          color: hsl(var(--secondary));
        }
        .border-secondary {
          border-color: hsl(var(--secondary));
        }
        .ring-secondary {
          --tw-ring-color: hsl(var(--secondary));
        }
        .hover\\:bg-secondary:hover {
          background-color: hsl(var(--secondary));
        }
        .hover\\:bg-secondary\\/90:hover {
          background-color: hsla(var(--secondary), 0.9);
        }
        
        .text-muted-foreground {
          color: hsl(var(--sidebar-foreground) / 0.7);
        }
      `}</style>
    </div>
  );
}