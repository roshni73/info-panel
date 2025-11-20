import { useAppSelector } from '@/store/hooks';
import {
  Users,
  Database,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  type PieLabelRenderProps,
} from 'recharts';

function Home(): React.JSX.Element {
  const { users, loading } = useAppSelector((state) => state.users);

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'bg-[#0099A8]',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Data Sources',
      value: 1,
      icon: Database,
      color: 'bg-[#006483]',
      trend: '+5%',
      trendUp: true,
    },
    {
      title: 'Active Sessions',
      value: loading ? '...' : users.length,
      icon: Activity,
      color: 'bg-[#0099A8]',
      trend: '+8%',
      trendUp: true,
    },
    {
      title: 'Growth Rate',
      value: '+12%',
      icon: TrendingUp,
      color: 'bg-[#006483]',
      trend: '+2.5%',
      trendUp: true,
    },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 4 },
    { month: 'Feb', users: 6 },
    { month: 'Mar', users: 5 },
    { month: 'Apr', users: 8 },
    { month: 'May', users: 7 },
    { month: 'Jun', users: 10 },
  ];

  const activityData = [
    { name: 'Login', value: 45 },
    { name: 'Data View', value: 30 },
    { name: 'Search', value: 15 },
    { name: 'Export', value: 10 },
  ];

  const performanceData = [
    { metric: 'API Response', value: 95 },
    { metric: 'User Satisfaction', value: 88 },
    { metric: 'Data Accuracy', value: 92 },
    { metric: 'Uptime', value: 99 },
  ];

  const COLORS = ['#0099A8', '#006483', '#4FC3F7', '#0277BD'];

  const recentActivities = [
    { id: 1, action: 'New user registration', user: 'John Doe', time: '2 minutes ago' },
    { id: 2, action: 'Data export completed', user: 'Jane Smith', time: '15 minutes ago' },
    { id: 3, action: 'System backup successful', user: 'System', time: '1 hour ago' },
    { id: 4, action: 'New data source added', user: 'Admin', time: '3 hours ago' },
  ];

  const renderSimpleLabel = (props: PieLabelRenderProps) => {
    const { percent } = props;
    if (!percent) return null;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#006483] mb-1 sm:mb-2">
          Welcome to InfoPannel
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Your comprehensive dashboard for managing and analyzing user data
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className={`${stat.color} p-2 md:p-3 rounded-lg`}>
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}
                >
                  {stat.trendUp ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  <span>{stat.trend}</span>
                </div>
              </div>
              <h3 className="text-gray-600 text-xs md:text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl md:text-3xl text-[#006483]">{stat.value}</p>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg md:text-xl text-[#006483] mb-4">User Growth Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={userGrowthData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0099A8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0099A8" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
              <YAxis stroke="#666" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#0099A8"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg md:text-xl text-[#006483] mb-4">Activity Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={activityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderSimpleLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {activityData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}%`, 'Percentage']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200 mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl text-[#006483] mb-4">Performance Metrics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="metric" stroke="#666" style={{ fontSize: '12px' }} />
            <YAxis stroke="#666" style={{ fontSize: '12px' }} />
            <Tooltip
              formatter={(value: number) => [`${value}%`, 'Value']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="value" fill="#0099A8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg md:text-xl text-[#006483] mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="bg-[#0099A8]/10 p-2 rounded-lg flex-shrink-0">
                  <Clock className="w-4 h-4 text-[#0099A8]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="text-[#006483]">{activity.user}</span> • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200">
          <h2 className="text-lg md:text-xl text-[#006483] mb-3 md:mb-4">About This Dashboard</h2>
          <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
            <p>
              InfoPanel is a modern dashboard application built with React and Redux, designed to
              demonstrate best practices in state management, API integration, and responsive
              design.
            </p>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="border-l-4 border-[#0099A8] pl-3 md:pl-4">
                <h3 className="text-[#006483] mb-2">Features</h3>
                <ul className="space-y-1 text-xs md:text-sm">
                  <li>• Redux state management</li>
                  <li>• Real-time data filtering</li>
                  <li>• Pagination support</li>
                  <li>• Error handling</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
              <div className="border-l-4 border-[#006483] pl-3 md:pl-4">
                <h3 className="text-[#006483] mb-2">Tech Stack</h3>
                <ul className="space-y-1 text-xs md:text-sm">
                  <li>• React with TypeScript</li>
                  <li>• Redux Toolkit</li>
                  <li>• TailwindCSS</li>
                  <li>• Recharts</li>
                  <li>• React Router</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
