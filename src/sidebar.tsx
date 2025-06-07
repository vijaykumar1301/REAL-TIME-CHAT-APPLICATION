import { Hash, Users, Settings, Plus } from "lucide-react";
import { ChatRoom, User } from "@/types/chat";
import { cn } from "@/lib/utils";

interface SidebarProps {
  rooms: ChatRoom[];
  users: User[];
  selectedRoom: string;
  onRoomSelect: (roomId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ rooms, users, selectedRoom, onRoomSelect, isOpen }: SidebarProps) => {
  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div
      className={cn(
        "bg-card border-r border-border flex flex-col transition-all duration-300",
        isOpen ? "w-64" : "w-0 overflow-hidden",
        "md:w-64 md:overflow-visible"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">ChatApp</h1>
        <p className="text-sm text-muted-foreground">Workspace</p>
      </div>

      {/* Channels Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Channels
            </h2>
            <button className="p-1 hover:bg-accent rounded">
              <Plus className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div className="space-y-1">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => onRoomSelect(room.id)}
                className={cn(
                  "w-full flex items-center px-2 py-1.5 rounded text-sm transition-colors",
                  selectedRoom === room.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <Hash className="w-4 h-4 mr-2" />
                <span className="flex-1 text-left">{room.name}</span>
                {room.unreadCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center">
                    {room.unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Online Users Section */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Online — {users.filter(u => u.status === "online").length}
            </h2>
          </div>
          <div className="space-y-1">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center px-2 py-1.5 rounded hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="relative mr-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card",
                      getStatusColor(user.status)
                    )}
                  />
                </div>
                <span className="text-sm text-foreground">{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Settings */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
              alt="Your avatar"
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <div>
              <p className="text-sm font-medium text-foreground">You</p>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
          <button className="p-1 hover:bg-accent rounded">
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;