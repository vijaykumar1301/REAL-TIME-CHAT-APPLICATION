import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
  showAvatar: boolean;
  showTimestamp: boolean;
}

const MessageBubble = ({ message, showAvatar, showTimestamp }: MessageBubbleProps) => {
  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  };

  const formatDate = (timestamp: Date) => {
    const today = new Date();
    const messageDate = new Date(timestamp);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    
    return messageDate.toLocaleDateString();
  };

  return (
    <div className="group">
      {showTimestamp && (
        <div className="flex items-center justify-center my-4">
          <div className="bg-accent px-3 py-1 rounded-full">
            <span className="text-xs text-muted-foreground font-medium">
              {formatDate(message.timestamp)}
            </span>
          </div>
        </div>
      )}
      
      <div
        className={cn(
          "flex items-start space-x-3 hover:bg-accent/30 p-2 rounded transition-colors",
          message.isOwn && "flex-row-reverse space-x-reverse"
        )}
      >
        {/* Avatar */}
        <div className="flex-shrink-0">
          {showAvatar ? (
            <img
              src={message.sender.avatar}
              alt={message.sender.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10" /> // Spacer when avatar is hidden
          )}
        </div>

        {/* Message Content */}
        <div className={cn("flex-1 min-w-0", message.isOwn && "text-right")}>
          {showAvatar && (
            <div className="flex items-baseline space-x-2 mb-1">
              <span className="font-semibold text-foreground text-sm">
                {message.sender.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatTime(message.timestamp)}
              </span>
            </div>
          )}
          
          <div
            className={cn(
              "inline-block max-w-[70%] px-3 py-2 rounded-lg",
              message.isOwn
                ? "bg-primary text-primary-foreground ml-auto"
                : "bg-accent text-accent-foreground",
              !showAvatar && "mt-1"
            )}
          >
            <p className="text-sm leading-relaxed break-words">{message.content}</p>
          </div>
          
          {!showAvatar && (
            <div className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {formatTime(message.timestamp)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
