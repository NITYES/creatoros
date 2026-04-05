import { Trash2, MapPin, ShieldCheck, User } from 'lucide-react';

interface UserCardProps {
  user: any;
  onDelete: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const UserCard = ({ user, onDelete, isSelected, onSelect }: UserCardProps) => {
  return (
    <div className={`group relative p-5 rounded-2xl border transition-all duration-200 ${isSelected
      ? 'bg-indigo-50 border-indigo-200 shadow-md'
      : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'
      }`}>
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          {/* Checkbox for selection */}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(user.id)}
            className="mt-1.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900">{user.name}</h3>
              {user.type === 'paid' && <ShieldCheck size={14} className="text-amber-500" />}
            </div>
            <p className="text-sm text-slate-500">@{user.username}</p>

            <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {user.location}
              </span>
              <span className="flex items-center gap-1 capitalize">
                <User size={12} /> {user.userType}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onDelete(user.id)}
          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          title="Delete User"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default UserCard;