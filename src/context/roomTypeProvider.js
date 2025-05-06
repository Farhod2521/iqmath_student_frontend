import React, { createContext, useContext, useState } from "react";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [roomLK, setRoomLK] = useState(null);

  return (
    <RoomContext.Provider value={{ roomLK, setRoomLK }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => useContext(RoomContext);
