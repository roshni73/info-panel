import { useEffect } from 'react';
import { AlertCircle, Loader2, Search, Download } from 'lucide-react';

import { Pagination } from '@/Components/Pagination';
import { Input } from '@/Components/Input';
import { Alert, AlertDescription, AlertTitle } from '@/Components/Alert';
import { fetchUsers, setCurrentPage, setSearchQuery } from '@/store/usersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

function Data(): React.JSX.Element {
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
      ...filteredUsers.map((u) =>
        [u.id, u.name, u.email, u.company?.name, u.address?.city, u.phone].join(',')
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
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-[#0099A8]" />
      </div>
    );

  if (error)
    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}. Please try again or contact support.</AlertDescription>
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
    <div className="w-full">
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#006483] mb-1 sm:mb-2">
          User Data
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-gray-600">
          Browse and search through user records
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4 sm:mb-6">
        <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 w-full min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                value={searchQuery}
                placeholder="Search by name, email, company, or city..."
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 text-sm w-full"
              />
            </div>
            <button
              onClick={handleExport}
              disabled={filteredUsers.length === 0}
              className="px-3 sm:px-4 py-2 bg-[#0099A8] text-white rounded-lg hover:bg-[#007a8c] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm flex items-center justify-center gap-2 whitespace-nowrap flex-shrink-0 w-full sm:w-auto"
            >
              <Download className="w-4 h-4" />
              <span className="hidden xs:inline">Export CSV</span>
              <span className="xs:hidden">Export</span>
            </button>
          </div>
        </div>
        <div className="block sm:hidden">
          {currentUsers.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-500">
              No users found. Try adjusting your search query.
            </div>
          ) : (
            <div className="space-y-2 p-3">
              {currentUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 space-y-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{user.email}</p>
                    </div>
                    <span className="text-xs bg-[#0099A8] text-white px-2 py-1 rounded-full ml-2 flex-shrink-0">
                      ID: {user.id}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Company:</span>
                      <p className="text-gray-900 truncate">{user.company?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">City:</span>
                      <p className="text-gray-900 truncate">{user.address?.city || 'N/A'}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Phone:</span>
                      <p className="text-gray-900">{user.phone || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['ID', 'Name', 'Email', 'Company', 'City', 'Phone'].map((col) => (
                  <th
                    key={col}
                    className="px-3 sm:px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wide"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 sm:px-4 lg:px-6 py-8 text-center text-sm text-gray-500"
                  >
                    No users found. Try adjusting your search query.
                  </td>
                </tr>
              ) : (
                currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-3 sm:px-4 lg:px-6 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {user.id}
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 text-sm text-gray-900">
                      <span className="truncate">{user.name}</span>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 text-sm text-gray-600">
                      <div className="truncate max-w-[120px] lg:max-w-[180px] xl:max-w-none">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 text-sm text-gray-900">
                      <div className="truncate max-w-[100px] lg:max-w-[150px] xl:max-w-none">
                        {user.company?.name || 'N/A'}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 text-sm text-gray-600">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {user.address?.city || 'N/A'}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 lg:px-6 py-3 text-sm text-gray-600 whitespace-nowrap">
                      {user.phone || 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filteredUsers.length > 0 && (
          <div className="p-3 sm:p-4 lg:p-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                Showing <span className="font-semibold">{startIndex + 1}</span> to{' '}
                <span className="font-semibold">{Math.min(endIndex, filteredUsers.length)}</span> of{' '}
                <span className="font-semibold">{filteredUsers.length}</span> results
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
      {filteredUsers.length === 0 && searchQuery && (
        <div className="text-center py-8 sm:py-12">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            No users match your search criteria. Try adjusting your search terms.
          </p>
        </div>
      )}
    </div>
  );
}

export default Data;
