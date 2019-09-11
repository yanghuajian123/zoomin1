// var XLSX = require("xlsx");
var XLSX = require("xlsx");
let wb; //读取完成的数据
let rABS = false; //是否将文件读取为二进制字符串
//将二维数组转换为一位数组对象
export const converterTwoDimArrayToObjectArray = function(array) {
  let key = array[0];
  let data = [];
  for (let i = 1; i < array.length; i++) {
    let object = {};
    for (let j = 0; j < key.length; j++) {
      if (array[i][j] == undefined) {
        array[i][j] = "";
      }
      let k = key[j].trim();
      if (k == "") {
        k = "Empty" + j;
      }
      object[k] = array[i][j];
    }
    data.push(object);
  }
  return data;
};
export const converterFileToJson = async function(obj) {
  let jsonPromise = await importFile(obj);
  return jsonPromise;
};
export const importFile = function(obj) {
  return new Promise(resolve => {
    if (!obj.files) {
      return;
    }
    var f = obj.files[0];
    // let _this = this;
    let tableJsons;
    var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      if (rABS) {
        wb = XLSX.read(btoa(fixdata(data)), {
          type: "base64"
        });
      } else {
        wb = XLSX.read(data, {
          type: "binary"
        });
      }
      tableJsons = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
        blankrows: false,
        defval: ""
      });
      converterJsonBlank(tableJsons);
      resolve(tableJsons);
    };
    if (rABS) {
      reader.readAsArrayBuffer(f);
    } else {
      reader.readAsBinaryString(f);
    }
  });
};
const fixdata = function(data) {
  var o = "",
    l = 0,
    w = 10240;
  for (; l < data.byteLength / w; ++l) {
    o += String.fromCharCode.apply(
      null,
      new Uint8Array(data.slice(l * w, l * w + w))
    );
  }
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
};
const converterJsonBlank = function(objArray) {
  objArray.forEach(element => {
    for (let key in element) {
      element[key] = element[key].trim();
    }
  });
};
