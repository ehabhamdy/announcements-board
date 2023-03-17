import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;
console.log(REACT_APP_BASE_URL);

if (process.env.NODE_ENV !== "production") {
  console.log("Development");
} else {
  console.log("Production");
}

const Request = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

export default Request;
