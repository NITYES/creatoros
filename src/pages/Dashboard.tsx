import  { useState, useMemo, useEffect } from 'react';
import { useGetUsersQuery, useDeleteUserMutation } from '../store/userApiService';
import UserCard from '../components/dashboard/UserCard';
import { Search,  Loader2, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [debounceSearch, setDebounceTerm] = useState("")
  // 1. Fetch Data
  const { data: users = [], isLoading } = useGetUsersQuery({ page: 1, limit: 100 });
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceTerm(searchTerm)
    }, 500);

    return clearTimeout(timer)
  }, [searchTerm])

  // 2. Search Logic (Memoized for performance)
  const filteredUsers = useMemo(() => {
    return users.filter((u: any) =>
      u.name.toLowerCase().includes(debounceSearch.toLowerCase()) ||
      u.username.toLowerCase().includes(debounceSearch.toLowerCase())
    );
  }, [users, debounceSearch]);

  // 3. Selection Handlers
  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      await deleteUser(id);
      setSelectedIds(prev => prev.filter(i => i !== id));
    }
  };

  if (isLoading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900">User Directory</h1>
          <p className="text-slate-500 mt-1">Manage creators and brands on creatorOS.</p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or handle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Floating Selection Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 z-50 animate-in fade-in slide-in-from-bottom-4">
          <span className="text-sm font-medium">
            <span className="text-indigo-400 font-bold">{selectedIds.length}</span> users selected
          </span>
          <button
            onClick={() => setSelectedIds([])}
            className="text-xs hover:text-indigo-300 transition-colors uppercase tracking-widest font-bold"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Results Grid */}
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUsers.map((user: any) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={handleDelete}
              isSelected={selectedIds.includes(user.id)}
              onSelect={toggleSelect}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
          <h3 className="text-lg font-bold text-slate-600">No users found</h3>
          <p className="text-slate-400">Try adjusting your search filters.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;