import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const ChatBox = ({ chat, messages, onSendMessage }) => {
  const messagesEndRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="h-[80vh] flex flex-col w-full border-l bg-white border border-[#E9E9E9] rounded-[12px]">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div>
          <h3 className="font-semibold text-gray-900">{chat.name}</h3>
          <p className="text-sm text-green-500">Online</p>
        </div>
      </div>
      <div className="h-[60vh] flex-1 overflow-y-auto custom-scroll p-4 space-y-6 bg-[#F9F9F9]">
        <div className="text-center text-xs text-gray-400 mb-4">Сегодня</div>

        {messages.map((msg) =>
          msg.fromMe ? (
            <div key={msg.id} className="flex justify-end">
              <div className="flex items-end gap-3 max-w-[75%]">
                <div className="bg-white p-3 rounded-xl shadow text-sm text-gray-800">
                  {msg.text}
                </div>
                <Image
                  src={chat.avatar}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full bg-black"
                />
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex items-start gap-3 max-w-[75%]">
              <Image
                src={chat.avatar}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full bg-black"
              />
              <div className="bg-white p-3 rounded-xl shadow text-sm text-gray-800">
                {msg.text}
              </div>
            </div>
          )
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4 flex items-center gap-3 bg-white">
        <input
          type="text"
          placeholder="Введите сообщение"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 p-3 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition"
        ></button>
      </div>
    </div>
  );
};

export default ChatBox;
