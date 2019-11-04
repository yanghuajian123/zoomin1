import axios from "axios";
import { Message } from "element-ui";
import router from "../router/router";

// let defaultErrorMessage = {
//   message: "出错了",
//   type: "error",
//   showClose: true,
//   duration: 1500
// }
let service = axios.create({
  timeout: 250000,
  baseURL: "http://120.79.146.91:8000"
});

// axios.defaults.baseURL = "http://120.79.146.91:8000";
// axios.defaults.timeout = 250000;
service.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token");
    if (config.url != "/users/") {
      config.headers = {
        Authorization: "JWT" + token
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    if (response.data.errCode == 2) {
      router.push({
        path: "/login",
        query: { redirect: router.currentRoute.fullPath } //从哪个页面跳转
      });
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

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

/**
 * 封装get方法

 */

// export function get(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     service
//       .get(url, {
//         params: params
//       })
//       .then(res => {
//         resolve(res.data);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// }
export async function get(url, params) {
  try {
    let res = await service.get(url, { params: params });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

/**
 * 封装post请求
 */

// export function post(url, data = {}, isUseDefaultErrorMessage = true) {
//   return new Promise((resolve, reject) => {
//     service.post(url, data).then(
//       res => {
//         resolve(res.data);
//       },
//       err => {
//         console.log(isUseDefaultErrorMessage);
//         useDefaultErrorMessage(isUseDefaultErrorMessage);
//         reject(err);
//       }
//     );
//   });
// }
export async function post(url, data = {}, isUseDefaultErrorMessage = true) {
  try {
    let res = await service.post(url, data);
    return res.data;
  } catch (err) {
    console.log(isUseDefaultErrorMessage);
    useDefaultErrorMessage(isUseDefaultErrorMessage);
  }
}
/**
 * 封装patch请求
 */

// export function patch(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.patch(url, data).then(
//       res => {
//         resolve(res.data);
//       },
//       err => {
//         reject(err);
//       }
//     );
//   });
// }

export async function patch(url, data = {}) {
  try {
    let res = service.patch(url, data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

/**
 * 封装put请求

 */

// export function put(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     service.put(url, data).then(
//       res => {
//         resolve(res.data);
//       },
//       err => {
//         reject(err);
//       }
//     );
//   });
// }

export async function put(url, data = {}) {
  try {
    let res = service.put(url, data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

/**
 * 封装delete请求

 */

// export function toDelete(url, data = {}, isUseDefaultErrorMessage = true) {
//   return new Promise((resolve, reject) => {
//     service.delete(url, data).then(
//       res => {
//         resolve(res.data);
//       },
//       err => {
//         if (useDefaultErrorMessage == true) {
//           useDefaultErrorMessage(isUseDefaultErrorMessage);
//         }
//         reject(err);
//       }
//     );
//   });
// }

export async function toDelete(
  url,
  data = {},
  isUseDefaultErrorMessage = true
) {
  try {
    let res = service.delete(url, data);
    return res.data;
  } catch (err) {
    if (useDefaultErrorMessage == true) {
      useDefaultErrorMessage(isUseDefaultErrorMessage);
    }
  }
}

export default function() {
  return service;
}
