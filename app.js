var fs = require('fs');
const express = require('express')
const app = express()
const port = 21314

app.all('*', function(req, res, next) {
    //设为指定的域
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Methods", "GET");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("X-Powered-By", ' 3.2.1');
    next();
  });
app.use(express.static('public'));

app.set('view engine', 'pug')
app.get('/', async (req, res) => {
    const { name } = req.query
    if(!name) {
        res.json({ success: false, filesPath: [] })
        return
    }
    let paths = '/Users/zwang/Desktop/webpack-demo/nodejs/public/'+ name;
    function readCallback(res, err, files) {
        if (!files || !files.length) {
            res.json({ success: false, filesPath: [] })
            return console.log(' \033[31m No files to show!\033[39m\n');
        }
        const filesPath = [];
        files.forEach((file,index) => {
            const filename = files[index]
            if(/(\.gif|\.jpeg|\.png|\.jpg|\.svg)$/i.test(filename)) {
                filesPath.push('/' + filename)
            } 
        })
        res.json({ success: true, filesPath: filesPath })
    }
    fs.readdir(paths, readCallback.bind(this,res));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})