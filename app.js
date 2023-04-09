const express = require('express')
const app = express()
const fs = require("fs");
const path = require("path");
const cors = require('cors')

app.use(cors())

let word = [];

try {
    const data = fs.readFileSync(path.join(__dirname, 'word.json'), 'utf-8');
    word = JSON.parse(data);
    // word 现在是一个包含 JSON 数据的数组或对象，可以在这里进行处理
} catch (err) {
    console.error(err);
}

app.get('/bsmzd/search',(req,res)=>{
    // console.log('[From]',req.ip,'[Get]',req.query.w);
    if(!(
        req.query.w
        &&req.query.fuc
    )){
        res.send({
            err:true,
        });
        return;
    }
    //处理错误结束
    let ret = {

    };
    let arr = []
    if(req.query.fuc === 'bsm'){
        for(let i =0 ; i<word.length; i++){
            if (word[i].bsm.startsWith(req.query.w)){
                arr.push({hz:word[i].hz,id:i})
            }
        }
    }else if (req.query.fuc==='hz'){
        for(let i =0 ; i<word.length; i++){
            if (word[i].hz.includes(req.query.w)||req.query.w.includes(word[i].hz)){
                arr.push({hz:word[i].hz,id:i});
            }
        }
    }else{
        res.status(404).send({});
    }

    ret.arr=arr;

    // console.log(req.ip,ret)
    res.send(ret);
});

app.get('/bsmzd/id',(req,res)=>{
    if (!req.query.id){
        res.status(404).send({});
        return;
    }
    res.send(word[req.query.id]);
    // console.log(word[req.query.id])
});

app.listen(2009, ()=> {
    console.log('App listening on port 2009!')
});

