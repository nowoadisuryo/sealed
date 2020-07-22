let strIn = "key1=value1;key2=value2\nkeyA=valueA";
console.log("Input is String :");
console.log(strIn);
console.log("---------");

function load(strIn) {
  let regex = /(.+[^\n])/g;
  let a = strIn.match(regex);
  let b = [];

  for (let i = 0; i < a.length; i++) {
    b[i] = new Object();
    a[i].replace(/([^=;]+)=([^;]*)/g, function (m, key, value) {
      b[i][key] = value;
    });
  }

  return b;
}

let text = load(strIn);
console.log("Result From load(a) Function :");
console.log(text);

function store(arrIn) {
  let str = "";
  for (let el of arrIn) {
    if (typeof el === "object") {
      for (let key in el) {
        if (el.hasOwnProperty(key)) {
          str += `${key}=${el[key]};`;
        }
      }
      str = str.replace(/.$/, "");
      str += "\n";
    }
  }
  return str;
}
console.log("---------");
console.log("Result From store(a) Function :");
console.log(store(text));
