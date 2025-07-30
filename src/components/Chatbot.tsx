import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your JAAAGO assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const lowerMessage = userMessage.toLowerCase();

    // Simple response logic based on keywords
    if (lowerMessage.includes('report') || lowerMessage.includes('issue') || lowerMessage.includes('problem')) {
      return 'To report an issue, please go to Citizen Login → Dashboard → Report Issue. You can upload photos/videos and provide detailed descriptions. Make sure to select the correct issue category for faster resolution.';
    }
    
    if (lowerMessage.includes('status') || lowerMessage.includes('update') || lowerMessage.includes('track')) {
      return 'You can check your issue status by going to Citizen Dashboard → Check Updates. Enter your issue number and date to view current status and resolution images.';
    }
    
    if (lowerMessage.includes('login') || lowerMessage.includes('account') || lowerMessage.includes('register')) {
      return 'Choose your login type: Citizen (for reporting issues), Authority (for government officials), or Partner (for contractors/NGOs). Each has different access levels and functionalities.';
    }
    
    if (lowerMessage.includes('community') || lowerMessage.includes('wall')) {
      return 'The Community page shows a live map with issue pins, allows filtering by type/date/status, and enables commenting and upvoting on issues. It\'s a great way to stay connected with local civic activities.';
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('how') || lowerMessage.includes('what')) {
      return 'JAAAGO helps you: 1) Report civic issues with photos/videos, 2) Track issue resolution status, 3) Engage with community through comments and upvotes, 4) Stay informed about local civic activities. What specific help do you need?';
    }

    // Default response with some personality
    const responses = [
      'I understand you\'re asking about JAAAGO. Could you please be more specific about what you\'d like to know?',
      'That\'s a great question! For detailed information, you might want to explore our platform features or contact our support team.',
      'I\'m here to help! Please let me know what specific aspect of JAAAGO you\'d like to learn about.',
      'Thanks for your question! Could you provide more details so I can give you the most helpful information?'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const botResponse = await generateBotResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble right now. Please try again later or contact our support team.',
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#FFA559] hover:bg-[#FF7F3F] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-[#E0E0E0] flex flex-col z-50">
      {/* Header */}
      <div className="bg-[#FFA559] text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <span className="font-semibold">JAAAGO Assistant</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg flex items-start space-x-2 ${
                message.sender === 'user'
                  ? 'bg-[#FFA559] text-white'
                  : 'bg-[#FFF5E4] text-[#333333]'
              }`}
            >
              {message.sender === 'bot' && (
                <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
              )}
              <span className="text-sm">{message.text}</span>
              {message.sender === 'user' && (
                <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#FFF5E4] text-[#333333] p-3 rounded-lg flex items-center space-x-2">
              <Bot className="w-4 h-4" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#FFA559] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#FFA559] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#FFA559] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[#E0E0E0]">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA559] text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="px-3 py-2 bg-[#FFA559] text-white rounded-lg hover:bg-[#FF7F3F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;