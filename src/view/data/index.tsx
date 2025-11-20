import { useEffect } from 'react';
import { AlertCircle, Loader2, Search, Download } from 'lucide-react';

import { Pagination } from '@/Components/Pagination';
import { Input } from '@/Components/Input';
import { Alert, AlertDescription, AlertTitle } from '@/Components/Alert';
import { fetchUsers, setCurrentPage, setSearchQuery } from '@/store/usersSlice';
import { useAppDispatch } from '@/store/hooks';


export default function DataTable() {
  const dispatch = useAppDispatch();
  const { filteredUsers, loading, error, searchQuery, currentPage, itemsPerPage } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const totalPages = Math.max(Math.ceil(filteredUsers.length / itemsPerPage), 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleSearch = (value: string) => dispatch(setSearchQuery(value));
  const handlePageChange = (page: number) => dispatch(setCurrentPage(page));

  const handleExport = () => {
    if (!filteredUsers.length) return;
    const headers = ['ID', 'Name', 'Email', 'Company', 'City', 'Phone'];
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(
        (u) => [u.id, u.name, u.email, u.company?.name, u.address?.city, u.phone].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Loader2 className="w-12 h-12 animate-spin text-[#0099A8]" />
      </div>
    );

  if (error)
    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}. Please try again or contact support.
          </AlertDescription>
        </Alert>
        <button
          onClick={() => dispatch(fetchUsers())}
          className="mt-4 px-4 py-2 bg-[#0099A8] text-white rounded-lg hover:bg-[#007a8c] transition-colors"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div>
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl text-[#006483] mb-2">User Data</h1>
        <p className="text-sm md:text-base text-gray-600">
          Browse and search through user records
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                value={searchQuery}
                placeholder="Search by name, email, company, or city..."
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 text-sm"
              />
            </div>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-[#0099A8] text-white rounded-lg hover:bg-[#007a8c] transition-colors text-sm flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['ID', 'Name', 'Email', 'Company', 'City', 'Phone'].map((col) => (
                  <th
                    key={col}
                    className="px-3 sm:px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wide"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-3 sm:px-6 py-8 text-center text-sm text-gray-500">
                    No users found. Try adjusting your search query.
                  </td>
                </tr>
              ) : (
                currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 sm:px-6 py-3 text-sm text-gray-900">{user.id}</td>
                    <td className="px-3 sm:px-6 py-3 text-sm text-gray-900">{user.name}</td>
                    <td className="px-3 sm:px-6 py-3 text-sm text-gray-600 truncate max-w-[150px] sm:max-w-none">
                      {user.email}
                    </td>
                    <td className="px-3 sm:px-6 py-3 text-sm text-gray-900 truncate max-w-[120px] sm:max-w-none">
                      {user.company?.name}
                    </td>
                    <td className="px-3 sm:px-6 py-3 text-sm text-gray-600">{user.address?.city}</td>
                    <td className="px-3 sm:px-6 py-3 text-sm text-gray-600 whitespace-nowrap">{user.phone}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filteredUsers.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-gray-600 text-center sm:text-left">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of{' '}
                {filteredUsers.length} results
              </p>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
