import { useState } from "react";
import Dashboard from "@/components/dashboard";
import Image from "next/image";
import ChatBox from "./ChatBox";

const Index = () => {
  const chats = [
    {
      id: 1,
      name: "Savlat Sultanov",
      message: "Hey, check my design update last night...",
      time: "Сегодня",
      avatar: "/images/avatar-profile.png",
    },
    {
      id: 2,
      name: "Alex Johnson",
      message: "Let's schedule our meeting...",
      time: "Вчера",
      avatar: "/images/avatar-profile.png",
    },
  ];

  const [activeTab, setActiveTab] = useState("all");
  const [selectedChat, setSelectedChat] = useState(null);

  const [userMessages, setUserMessages] = useState({
    1: [{ id: 1, text: "Salom Savlat!", fromMe: false, time: "22:00" }],
    2: [{ id: 1, text: "Salom Alex!", fromMe: false, time: "22:05" }],
  });

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (userId, messageText) => {
    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: messageText,
      fromMe: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setUserMessages((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), newMessage],
    }));
  };

  const MessageItem = ({ chat, onClick, isActive }) => (
    <div
      className={`flex items-start space-x-3 py-4 px-2 cursor-pointer rounded-lg transition duration-200 ease-in-out
        ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}`}
      onClick={onClick}
    >
      <Image
        src={chat.avatar}
        alt="avatar"
        width={40}
        height={40}
        className="rounded-full object-cover bg-black"
      />
      <div className="truncate flex-1">
        <h4 className="font-semibold">{chat.name}</h4>
        <p className="text-sm text-gray-500 truncate">{chat.message}</p>
      </div>
      <div className="ml-auto text-xs text-gray-400 whitespace-nowrap">
        {chat.time}
      </div>
    </div>
  );

  return (
    <Dashboard headerTitle={"Чат"}>
      <div className="flex">
        <div className="border border-[#E9E9E9] rounded-[12px] py-[16px] px-[24px] w-[350px]">
          <h2>Сообщение</h2>
          <div className="flex bg-[#f4f4f4] rounded-xl p-1 w-fit mt-[12px]">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition w-[150px]
                ${
                  activeTab === "all"
                    ? "bg-white shadow text-black"
                    : "text-gray-500"
                }`}
            >
              Все
            </button>
            <button
              onClick={() => setActiveTab("unread")}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition w-[150px]
                ${
                  activeTab === "unread"
                    ? "bg-white shadow text-black"
                    : "text-gray-500"
                }`}
            >
              Непрочитанные
            </button>
          </div>

          <div className="h-[60vh] overflow-y-auto pr-2 mt-[16px] space-y-4 custom-scroll">
            {activeTab === "all" && (
              <div>
                {chats.map((chat) => (
                  <MessageItem
                    key={chat.id}
                    chat={chat}
                    onClick={() => handleChatClick(chat)}
                    isActive={selectedChat?.id === chat.id}
                  />
                ))}
              </div>
            )}

            {activeTab === "unread" && (
              <div>
                {chats.slice(0, 1).map((chat) => (
                  <MessageItem
                    key={chat.id}
                    chat={chat}
                    onClick={() => handleChatClick(chat)}
                    isActive={selectedChat?.id === chat.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="w-full mx-[24px]">
          {selectedChat ? (
            <ChatBox
              chat={selectedChat}
              messages={userMessages[selectedChat.id] || []}
              onSendMessage={(msgText) =>
                handleSendMessage(selectedChat.id, msgText)
              }
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Выберите чат слева
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default Index;
