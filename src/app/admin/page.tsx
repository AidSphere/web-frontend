'use client';
import type React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  Tabs,
  Tab,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Progress,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import {
  Users,
  UserPlus,
  Activity,
  TrendingUp,
  Calendar,
  BarChart3,
  PieChart,
  FileText,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  Heart,
  Pill,
  Bell,
  Filter,
} from 'lucide-react';

// Define types for our data
type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: number;
  changeLabel: string;
  chipColor?: 'primary' | 'success' | 'danger' | 'warning';
};

type ChartData = {
  labels: string[];
  datasets: {
    name: string;
    data: number[];
  }[];
};

type RecentRequest = {
  id: string;
  patientName: string;
  requestType: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
};

const AdminHome: React.FC = () => {
  // Mock data for statistics
  const stats = {
    patientsRegistered: 1248,
    donorsRegistered: 567,
    drugImportersRegistered: 89,
    requestsThisWeek: 124,
    totalRequests: 3567,
    pendingRequests: 42,
  };

  // Mock data for charts
  const userRegistrationData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        name: 'Patients',
        data: [150, 230, 380, 220, 420, 390],
      },
      {
        name: 'Donors',
        data: [85, 120, 180, 95, 145, 210],
      },
      {
        name: 'Drug Importers',
        data: [12, 18, 24, 15, 22, 30],
      },
    ],
  };

  const requestsData: ChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        name: 'Requests',
        data: [18, 25, 32, 28, 36, 12, 8],
      },
    ],
  };

  // Mock data for recent requests
  const recentRequests: RecentRequest[] = [
    {
      id: 'REQ-001',
      patientName: 'John Smith',
      requestType: 'Medication',
      date: '2023-06-15',
      status: 'approved',
      priority: 'high',
    },
    {
      id: 'REQ-002',
      patientName: 'Sarah Johnson',
      requestType: 'Consultation',
      date: '2023-06-14',
      status: 'pending',
      priority: 'medium',
    },
    {
      id: 'REQ-003',
      patientName: 'Michael Brown',
      requestType: 'Medication',
      date: '2023-06-14',
      status: 'pending',
      priority: 'high',
    },
    {
      id: 'REQ-004',
      patientName: 'Emily Davis',
      requestType: 'Treatment',
      date: '2023-06-13',
      status: 'rejected',
      priority: 'low',
    },
    {
      id: 'REQ-005',
      patientName: 'Robert Wilson',
      requestType: 'Medication',
      date: '2023-06-12',
      status: 'approved',
      priority: 'medium',
    },
  ];

  // Function to render stat cards
  const StatCard = ({
    title,
    value,
    icon,
    change,
    changeLabel,
    chipColor = 'primary',
  }: StatCardProps) => (
    <Card className='w-full'>
      <CardBody className='p-4'>
        <div className='flex items-start justify-between'>
          <div>
            <p className='mb-1 text-sm text-gray-500'>{title}</p>
            <h3 className='mb-2 text-2xl font-bold'>{value}</h3>
            <div className='flex items-center'>
              {change > 0 ? (
                <ChevronUp className='h-4 w-4 text-emerald-500' />
              ) : (
                <ChevronDown className='h-4 w-4 text-red-500' />
              )}
              <span
                className={`text-xs ${change > 0 ? 'text-emerald-500' : 'text-red-500'}`}
              >
                {Math.abs(change)}% {changeLabel}
              </span>
            </div>
          </div>
          <div className={`rounded-lg p-3 bg-${chipColor}-100`}>{icon}</div>
        </div>
      </CardBody>
    </Card>
  );

  // Function to render bar chart
  const renderBarChart = (data: ChartData) => {
    // In a real application, you would use a charting library like Chart.js or Recharts
    // This is a simplified visual representation
    const maxValue = Math.max(
      ...data.datasets.flatMap((dataset) => dataset.data)
    );

    return (
      <div className='mt-4'>
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex gap-4'>
            {data.datasets.map((dataset, index) => (
              <div key={index} className='flex items-center gap-2'>
                <div
                  className={`h-3 w-3 rounded-full bg-${index === 0 ? 'primary' : index === 1 ? 'success' : 'warning'}-500`}
                ></div>
                <span className='text-sm'>{dataset.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='space-y-4'>
          {data.labels.map((label, labelIndex) => (
            <div key={labelIndex} className='space-y-2'>
              <div className='flex items-center'>
                <span className='w-8 text-xs'>{label}</span>
                <div className='ml-2 flex-1'>
                  <div className='flex h-8 gap-1'>
                    {data.datasets.map((dataset, datasetIndex) => {
                      const width = (dataset.data[labelIndex] / maxValue) * 100;
                      return (
                        <div
                          key={datasetIndex}
                          className={`h-full rounded bg-${datasetIndex === 0 ? 'primary' : datasetIndex === 1 ? 'success' : 'warning'}-500`}
                          style={{ width: `${width}%` }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Function to render line chart
  const renderLineChart = (data: ChartData) => {
    // In a real application, you would use a charting library
    // This is a simplified visual representation
    const maxValue = Math.max(...data.datasets[0].data);

    return (
      <div className='mt-4 flex h-64 flex-col justify-between'>
        <div className='relative flex-1'>
          <div className='absolute inset-0'>
            {[0, 1, 2, 3].map((line) => (
              <div
                key={line}
                className='absolute w-full border-t border-gray-200'
                style={{ bottom: `${(line / 3) * 100}%` }}
              ></div>
            ))}

            <svg
              className='absolute inset-0 h-full w-full'
              preserveAspectRatio='none'
            >
              <polyline
                points={data.datasets[0].data
                  .map((value, index) => {
                    const x = (index / (data.labels.length - 1)) * 100;
                    const y = 100 - (value / maxValue) * 100;
                    return `${x},${y}`;
                  })
                  .join(' ')}
                fill='none'
                stroke='var(--hero-primary)'
                strokeWidth='2'
                className='drop-shadow-md'
              />
            </svg>

            {data.datasets[0].data.map((value, index) => {
              const x = (index / (data.labels.length - 1)) * 100;
              const y = 100 - (value / maxValue) * 100;
              return (
                <div
                  key={index}
                  className='absolute h-2 w-2 rounded-full bg-primary shadow-md'
                  style={{
                    left: `calc(${x}% - 4px)`,
                    top: `calc(${y}% - 4px)`,
                  }}
                ></div>
              );
            })}
          </div>
        </div>

        <div className='mt-2 flex justify-between'>
          {data.labels.map((label, index) => (
            <div key={index} className='text-xs text-gray-500'>
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='mx-auto max-w-[1400px] p-6'>
      <div className='mb-6 flex flex-col items-center justify-between md:flex-row'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800'>Admin Dashboard</h1>
          <p className='text-gray-500'>
            Welcome back, Admin! Here's what's happening today.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Patients Registered'
          value={stats.patientsRegistered}
          icon={<Users className='h-6 w-6 text-primary-500' />}
          change={12.5}
          changeLabel='from last month'
          chipColor='primary'
        />

        <StatCard
          title='Donors Registered'
          value={stats.donorsRegistered}
          icon={<Heart className='h-6 w-6 text-success-500' />}
          change={8.2}
          changeLabel='from last month'
          chipColor='success'
        />

        <StatCard
          title='Drug Importers'
          value={stats.drugImportersRegistered}
          icon={<Pill className='h-6 w-6 text-warning-500' />}
          change={5.1}
          changeLabel='from last month'
          chipColor='warning'
        />

        <StatCard
          title='Requests This Week'
          value={stats.requestsThisWeek}
          icon={<Activity className='h-6 w-6 text-danger-500' />}
          change={-3.4}
          changeLabel='from last week'
          chipColor='danger'
        />
      </div>

      {/* Charts Section */}
      <div className='mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <Card>
          <CardHeader className='flex items-center justify-between px-6 py-4'>
            <h3 className='text-lg font-semibold'>User Registrations</h3>
          </CardHeader>
          <Divider />
          <CardBody className='px-6 py-4'>
            <div className='mb-4 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <BarChart3 size={20} className='text-gray-500' />
                <span className='font-medium'>Monthly Registration Trends</span>
              </div>
            </div>
            {renderBarChart(userRegistrationData)}
          </CardBody>
          <Divider />
          <CardFooter className='px-6 py-4'>
            <div className='flex w-full items-center justify-between'>
              <div className='flex items-center gap-2'>
                <TrendingUp size={16} className='text-emerald-500' />
                <span className='text-sm text-emerald-500'>
                  Growing at 15% on average
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className='flex items-center justify-between px-6 py-4'>
            <h3 className='text-lg font-semibold'>Weekly Requests</h3>
          </CardHeader>
          <Divider />
          <CardBody className='px-6 py-4'>
            <div className='mb-4 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Activity size={20} className='text-gray-500' />
                <span className='font-medium'>Patient Request Activity</span>
              </div>
              <Tabs aria-label='Time period' size='sm'>
                <Tab key='week' title='Week' />
                <Tab key='month' title='Month' />
                <Tab key='year' title='Year' />
              </Tabs>
            </div>
            {renderLineChart(requestsData)}
          </CardBody>
        </Card>
      </div>

      {/* Recent Requests Table */}
      <Card className='mb-6'>
        <CardHeader className='flex items-center justify-between px-6 py-4'>
          <h3 className='text-lg font-semibold'>Recent Patient Requests</h3>
          <Button color='primary' size='sm'>
            View All
          </Button>
        </CardHeader>
        <Divider />
        <CardBody className='px-0 py-0'>
          <Table aria-label='Recent patient requests'>
            <TableHeader>
              <TableColumn>REQUEST ID</TableColumn>
              <TableColumn>PATIENT</TableColumn>
              <TableColumn>TYPE</TableColumn>
              <TableColumn>DATE</TableColumn>
              <TableColumn>PRIORITY</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {recentRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.patientName}</TableCell>
                  <TableCell>{request.requestType}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>
                    <Chip
                      color={
                        request.priority === 'high'
                          ? 'danger'
                          : request.priority === 'medium'
                            ? 'warning'
                            : 'success'
                      }
                      size='sm'
                      variant='flat'
                    >
                      {request.priority}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={
                        request.status === 'approved'
                          ? 'success'
                          : request.status === 'pending'
                            ? 'warning'
                            : 'danger'
                      }
                      size='sm'
                    >
                      {request.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <Button size='sm' variant='flat'>
                        View
                      </Button>
                      <Button size='sm' variant='bordered'>
                        Process
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
        <Divider />
        <CardFooter className='flex justify-between px-6 py-4'>
          <p className='text-sm text-gray-500'>Showing 5 of 42 requests</p>
          <div className='flex gap-2'>
            <Button size='sm' variant='flat'>
              Previous
            </Button>
            <Button size='sm' variant='flat'>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminHome;
