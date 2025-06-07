import { useState } from "react";
import { Menu, Send, Smile, Paperclip } from "lucide-react";
import { Message, ChatRoom } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { cn } from "@/lib/utils";

interface ChatWindowProps {
  messages: Message[];
  currentRoom?: ChatRoom;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const ChatWindow = ({ messages, currentRoom, onToggleSidebar, isSidebarOpen }: ChatWindowProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
      // In a real app, this would send the message via WebSocket
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    // Simulate typing indicator
    if (!isTyping) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 3000);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className={cn(
              "p-2 hover:bg-accent rounded mr-2 transition-colors",
              "md:hidden"
            )}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center">
            <span className="text-lg font-semibold text-foreground">
              # {currentRoom?.name || "general"}
            </span>
            <div className="ml-3 text-sm text-muted-foreground">
              {messages.length} messages
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const showAvatar = index === 0 || messages[index - 1].sender.id !== message.sender.id;
          const showTimestamp = index === 0 || 
            new Date(message.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() > 5 * 60 * 1000;
          
          return (
            <MessageBubble
              key={message.id}
              message={message}
              showAvatar={showAvatar}
              showTimestamp={showTimestamp}
            />
          );
        })}
        
        {/* Typing Indicator */}
        <TypingIndicator isVisible={isTyping} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 hover:bg-accent rounded transition-colors"
          >
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              placeholder={`Message #${currentRoom?.name || "general"}`}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <button
            type="button"
            className="p-2 hover:bg-accent rounded transition-colors"
          >
            <Smile className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={cn(
              "p-2 rounded transition-colors",
              newMessage.trim()
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;