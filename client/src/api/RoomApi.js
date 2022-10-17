import { useState, useEffect } from "react";
import axios from "../utils/axios";

// const [room, setRoom] = useState(null);


export const createRoom = (formData = {}) =>
  new Promise((resolve, reject) => {
    axios
      .post("/room/createRoom", formData)
      .then(({ data: { data: roomData } }) => {
        // setRoom(roomData);
        resolve(true);
      })
      .catch((error) => {
        console.error(error);
        reject(error?.response?.data?.message || error.message);
      });
  });

export const getRoom = (formData = {}) =>
  new Promise((resolve, reject) => {
    axios
      .get("/room/getRoom", formData)
      .then(({ data: { data: roomData } }) => {
        // setRoom(roomData);
        resolve(true);
      })
      .catch((error) => {
        console.error(error);
        reject(error?.response?.data?.message || error.message);
      });
  });

export const deleteRoom = (formData = {}) =>
  new Promise((resolve, reject) => {
    axios
      .get("/room/deleteRoom", formData)
      .then(({ data: { data: roomData } }) => {
        // setRoom(roomData);
        resolve(true);
      })
      .catch((error) => {
        console.error(error);
        reject(error?.response?.data?.message || error.message);
      });
  });
