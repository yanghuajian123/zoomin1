import { Message } from "element-ui";
// import axios from "axios";
import service from "./http.js";
function useDefaultErrorMessage(isUseDefaultErrorMessage) {
  if (isUseDefaultErrorMessage == true) {
    Message({
      message: "wrong",
      type: "error",
      showClose: true,
      duration: 1500
    });
  }
}
// let instance = Axios();

// 封装get方法
export function get(url, params) {
  params = params || {};
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err));
  });
}

// 封装post方法
export function post(url, data, isUseDefaultErrorMessage = true) {
  data = data || {};
  return new Promise((resolve, reject) => {
    service
      .post(url, data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log(isUseDefaultErrorMessage);
        useDefaultErrorMessage(isUseDefaultErrorMessage);
        reject(err);
      });
  });
}
