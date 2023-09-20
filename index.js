var express = require('express');
var app = express();
const cors = require('cors');

const mineData = require('./src/views/mine_data_view');

app.use(cors({
   origin: '*'
}));

app.get('/initdata', async (req, res) => {
   
   const nodesInfo = mineData.createOriginalPositions(req, res);
});

app.get('/datainfo', async (req, res) => {
   
   const nodesInfo = mineData.getNodesInfoView(req, res);
});


app.get('/generatelowlevel', async (req, res) => {
   
   const nodesInfo = mineData.generateLowResView(req, res);
});

app.get('/getdata', async (req, res) => {
   
   const nodesInfo = mineData.getLevelData(req, res);
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
   console.log("/initdata");
   console.log("/datainfo");
   console.log("/generatelowlevel?lv=1|2|3");
   console.log("/getdata?lv=0|1|2|3");
})

