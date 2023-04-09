const fs = require("fs");
const path = require("path");
let word = [];

try {
    const data = fs.readFileSync(path.join(__dirname, 'word.json'), 'utf-8');
    word = JSON.parse(data);
    // word 现在是一个包含 JSON 数据的数组或对象，可以在这里进行处理
} catch (err) {
    console.error(err);
}

