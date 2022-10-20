import axios from "../utils/axios";

// const [room, setRoom] = useState(null);

export const createRoom = (roomData = {}) =>
  new Promise((resolve, reject) => {
    axios
      .post("api/room/createroom", roomData)
      .then(({ result }) => {
        console.log(result);
        // setRoom(roomData)
        resolve(true);
      })
      .catch((error) => {
        console.error(error);
        reject(error?.response?.data?.message || error.message);
      });
  });

export const getRoom = (roomName) =>
  new Promise((resolve, reject) => {
    axios
      .get("api/room/getroom", roomName)
      .then(({ result }) => {
        console.log(result);
        resolve(true);
      })
      .catch((error) => {
        console.error(error);
        reject(error?.response?.data?.message || error.message);
      });
  });

export const deleteRoom = (roomName = {}) =>
  new Promise((resolve, reject) => {
    axios
      .post("api/room/deleteRoom", roomName)
      .then(({ result }) => {
        // setRoom(roomData);
        resolve(true);
      })
      .catch((error) => {
        console.error(error);
        reject(error?.response?.data?.message || error.message);
      });
  });
