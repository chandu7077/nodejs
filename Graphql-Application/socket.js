let io;
import {Server} from "socket.io";
export default {
    init:httpServer => {
        io = new Server(httpServer, {
            cors: {
              origin: "*",
            }
          });
        return io;
    },
    getIO: () => {
        if(!io) {
            throw new Error("Socket Not Initialized");
        }
        return io;
    }
};