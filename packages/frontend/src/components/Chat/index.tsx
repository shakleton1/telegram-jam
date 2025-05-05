import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../../store/types';
import { socket } from '../../services/socket';

interface Message {
    id: string;
    userId: string;
    text: string;
    timestamp: number;
    type: 'text' | 'system';
}

const Chat: React.FC = () => {
    const { t } = useTranslation();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const user = useSelector((state: RootState) => state.auth.user);
    const currentRoom = useSelector((state: RootState) => state.room.currentRoom);

    useEffect(() => {
        if (!currentRoom) return;

        socket.on('chat:message', (message: Message) => {
            setMessages(prev => [...prev, message]);
        });

        socket.on('chat:system', (message: Message) => {
            setMessages(prev => [...prev, { ...message, type: 'system' }]);
        });

        return () => {
            socket.off('chat:message');
            socket.off('chat:system');
        };
    }, [currentRoom]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user || !currentRoom) return;

        socket.emit('chat:message', {
            roomId: currentRoom.id,
            text: newMessage,
        });

        setNewMessage('');
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`flex ${message.type === 'system'
                                    ? 'justify-center'
                                    : message.userId === user?.id
                                        ? 'justify-end'
                                        : 'justify-start'
                                }`}
                        >
                            {message.type === 'system' ? (
                                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                                    {message.text}
                                </div>
                            ) : (
                                <div
                                    className={`max-w-[70%] ${message.userId === user?.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                        } rounded-lg px-4 py-2`}
                                >
                                    {message.userId !== user?.id && (
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                            {currentRoom?.activeUsers.find(u => u.id === message.userId)?.firstName}
                                        </div>
                                    )}
                                    <div className="text-sm break-words">{message.text}</div>
                                    <div className="text-xs text-right mt-1 opacity-75">
                                        {new Date(message.timestamp).toLocaleTimeString()}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                </AnimatePresence>
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={t('typeMessage')}
                        className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <SendIcon className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
};

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
    </svg>
);

export default Chat; 