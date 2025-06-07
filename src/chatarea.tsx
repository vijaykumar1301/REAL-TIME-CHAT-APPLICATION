import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { Message, ChatRoom, User } from "@/types/chat";

const ChatApp = () => {
  const [selectedRoom, setSelectedRoom] = useState<string>("general");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Mock data for demonstration
  const [messages] = useState<Message[]>([
    {
      id: "1",
      content: "Hey everyone! How's the project going?",
      sender: {
        id: "1",
        name: "Alice Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        status: "online"
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      roomId: "general"
    },
    {
      id: "2",
      content: "Pretty good! Just finished the authentication module. Working on the chat UI now 🎨",
      sender: {
        id: "2",
        name: "You",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        status: "online"
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      roomId: "general",
      isOwn: true
    },
    {
      id: "3",
      content: "Awesome! The design looks really clean. I love the color scheme you chose.",
      sender: {
        id: "3",
        name: "Bob Wilson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        status: "online"
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      roomId: "general"
    },
    {
      id: "4",
      content: "Thanks! Should we schedule a demo for tomorrow?",
      sender: {
        id: "1",
        name: "Alice Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        status: "online"
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      roomId: "general"
    },
    {
      id: "5",
      content: "Absolutely! Let's do it at 2 PM. I'll send out calendar invites.",
      sender: {
        id: "2",
        name: "You",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        status: "online"
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      roomId: "general",
      isOwn: true
    }
  ]);

  const rooms: ChatRoom[] = [
    { id: "general", name: "General", type: "channel", unreadCount: 3 },
    { id: "development", name: "Development", type: "channel", unreadCount: 0 },
    { id: "design", name: "Design", type: "channel", unreadCount: 1 },
    { id: "random", name: "Random", type: "channel", unreadCount: 0 }
  ];

  const users: User[] = [
    {
      id: "1",
      name: "Alice Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      status: "online"
    },
    {
      id: "3",
      name: "Bob Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      status: "online"
    },
    {
      id: "4",
      name: "Carol Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      status: "away"
    },
    {
      id: "5",
      name: "David Miller",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      status: "offline"
    }
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        rooms={rooms}
        users={users}
        selectedRoom={selectedRoom}
        onRoomSelect={setSelectedRoom}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <ChatWindow
        messages={messages.filter(m => m.roomId === selectedRoom)}
        currentRoom={rooms.find(r => r.id === selectedRoom)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
};

export default ChatApp;