import axios from "axios";
export const rootApiUrl = "http://51.222.44.39:9002/api" // "http://localhost:9002/api" // 
// export const rootSocketUrl = "http://194.163.152.135:9002" // "http://localhost:9002" // 
// export const imgUrl = "http://194.163.152.135:9002/public/" //  "http://localhost:9002/public/" // 
export const iaUrl = "http://51.222.44.39:5002" // "http://localhost:8888" // 

const useHttps = () => {
  const http = axios.create({
    baseURL: rootApiUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fileHttp = axios.create({
    baseURL: rootApiUrl,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const iaHttp = axios.create({
    baseURL: iaUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    http,
    fileHttp,
    iaHttp
  };
};

export default useHttps;
