import axios from "axios";

const { REACT_APP_BASE_URL_PATH, REACT_APP_BASE_URL_STATE } = process.env;
console.log("REACT_APP_BASE_URL_PATH", REACT_APP_BASE_URL_PATH);
console.log("REACT_APP_BASE_URL_STATE", REACT_APP_BASE_URL_STATE);
const Request = axios.create({
  baseURL: REACT_APP_BASE_URL_STATE
    ? REACT_APP_BASE_URL_STATE
    : "" + REACT_APP_BASE_URL_PATH,
});

export default Request;
