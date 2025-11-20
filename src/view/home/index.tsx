import { useAppSelector } from '@/store/hooks';
import { Users, Database, Activity, TrendingUp } from 'lucide-react';

function Home(): React.JSX.Element {
  const { users, loading } = useAppSelector((state) => state.users);

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'bg-[#0099A8]',
    },
    {
      title: 'Data Sources',
      value: 1,
      icon: Database,
      color: 'bg-[#006483]',
    },
    {
      title: 'Active Sessions',
      value: loading ? '...' : users.length,
      icon: Activity,
      color: 'bg-[#0099A8]',
    },
    {
      title: 'Growth Rate',
      value: '+12%',
      icon: TrendingUp,
      color: 'bg-[#006483]',
    },
  ];

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl text-[#006483] mb-2">Welcome to InfoPanel</h1>
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
              </div>
              <h3 className="text-gray-600 text-xs md:text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl md:text-3xl text-[#006483]">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-200">
        <h2 className="text-lg md:text-xl text-[#006483] mb-3 md:mb-4">About This Dashboard</h2>
        <div className="space-y-3 md:space-y-4 text-sm md:text-base text-gray-700">
          <p>
            InfoPanel is a modern dashboard application built with React and Redux, designed to
            demonstrate best practices in state management, API integration, and responsive design.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 md:mt-6">
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
                <li>• JSONPlaceholder API</li>
                <li>• Lucide Icons</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
