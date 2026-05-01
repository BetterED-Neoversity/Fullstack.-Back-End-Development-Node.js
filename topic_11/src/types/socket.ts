export interface ClientToServerEvents {
  "chat message": (data: { roomName: string; text: string }) => void;
  "user typing": (roomName: string) => void;
  "join room": (roomName: string) => void;
  "leave room": (roomName: string) => void;
}

export interface ServerToClientEvents {
  "chat message": (data: {
    author: string;
    text: string;
    timestamp: number;
  }) => void;
  "user typing": (username: string) => void;
  "user joined": (data: { message: string }) => void;
  "room history": (
    messages: { author: string; text: string; timestamp: number }[],
  ) => void;
}

export interface SocketData {
  userId: string;
  username: string;
}
