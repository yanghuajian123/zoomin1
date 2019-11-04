//图标匹配
let UIUtils = {
  showTypesUi(type) {
    if (type == "object") {
      return "#icon-wenzi";
    }
    if (type == "float64" || type == "int64") {
      return "#icon-shuzi";
    }
    if (type == "datetime64[ns]") {
      return "#icon-riqi";
    }
  }
};

export const TYPECONVERTER = {
  symbols: ["#", "T", "d"],
  types: ["float64", "object", "datetime64[ns]"],
  converterSymbolToType(symbol) {
    let type = "";
    if (symbol == "T") {
      type = "object";
    } else if (symbol == "d") {
      type = "datetime64[ns]";
    } else {
      type = "float64";
    }
    return type;
  },
  converterTypeToSymbol: function(type) {
    let symbol = "";
    if (type == "object") {
      symbol = "T";
    } else if (type == "datetime64[ns]") {
      symbol = "d";
    } else {
      symbol = "#";
    }
    return symbol;
  },
  convertSmybolForText: function(smybol) {
    const numberTypeText = "数值类型";
    const textTypeText = "文本类型";
    const dateTypeText = "时间类型";
    if (smybol == "#") {
      return numberTypeText;
    } else if (smybol == "T") {
      return textTypeText;
    } else {
      return dateTypeText;
    }
  },
  convertTypeForText: function(type) {
    let symbol = this.converterTypeToSymbol(type);
    return this.convertSmybolForText(symbol);
  }
};

export const JsonParse = {
  looseJsonParse: function looseJsonParse(obj) {
    return Function('"use strict";return (' + obj + ")")();
  }
};

export const converterJsonBlank = function(objArray) {
  objArray.forEach(element => {
    for (let key in element) {
      element[key] = element[key].trim();
    }
  });
};
export default UIUtils;
