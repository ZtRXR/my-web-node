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
        &&req.query.w.length<=51
        &&req.query.fuc.length<=10
    )){
        // console.log("err 提交数据审查")
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
                if (word[i].bsm===req.query.w){
                    arr.unshift({hz:word[i].hz,id:i})
                }else {
                    arr.push({hz:word[i].hz,id:i})
                }
            }
        }
    }else if (req.query.fuc==='hz'){
        for (let i = 0;i<req.query.w.length;i++){
            for(let j=0;j<word.length;j++){
                if (word[j].hz.includes(req.query.w[i])){
                    arr.push({hz:word[j].hz,id:j});
                }
            }
        }
    }else if(req.query.fuc==='bsmI'){
        for(let i =0 ; i<word.length; i++){
            if (word[i].bsm.includes(req.query.w)){
                if (word[i].bsm===req.query.w){
                    arr.unshift({hz:word[i].hz,id:i})
                }else {
                    arr.push({hz:word[i].hz,id:i})
                }
            }
        }
    }else{
        // console.log("err 没有处理的类型程序")
        res.status(404).send({});
        return;
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

