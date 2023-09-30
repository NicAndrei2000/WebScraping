import axios from "axios";

export function login(username, password) {
  return axios.post(
    "URL_BACKEND",
    {
      username: username,
      password: password,
    },
    { "Content-Type": "application/json" }
  );
}