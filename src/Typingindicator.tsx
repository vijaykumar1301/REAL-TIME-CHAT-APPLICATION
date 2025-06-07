import { cn } from "@/lib/utils";

interface TypingIndicatorProps {
  isVisible: boolean;
  userName?: string;
}

const TypingIndicator = ({ isVisible, userName = "Someone" }: TypingIndicatorProps) => {
  if (!isVisible) return null;

  return (
    <div className="flex items-start space-x-3 p-2">
      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground italic">
          {userName} is typing...
        </p>
      </div>
    </div>
  );
};

export default TypingIndicator;
