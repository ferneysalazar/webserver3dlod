const mineDataService = require('../services/mine_data_service');

const getNodesInfoView = (req, res) => {

    res.json(mineDataService.getNodesInfo());
}


const createOriginalPositions = (req, res) => {

    let level = 0;
    return res.json(mineDataService.generateOriginalPositions());
}


const generateLowResView = (req, res) => {

    let level = req.query.lv;

    if ("0123456".includes(level)) {

        level = parseInt(level);

        return res.json(mineDataService.generateLowRes(level));
    } else {

        return res.json({ error: true, errorMsg: "No level specified. " });
    }
}

const getLevelData = (req, res) => {

    let level = req.query.lv;


    if ("0123456".includes(level)) {

        level = parseInt(level);

        const largeData = mineDataService.getLevelData(level); // Replace this with your data source

        console.log("Buffer.length" );
        console.log(largeData.length);

        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Transfer-Encoding': 'chunked'
        });
    
        // Simulate streaming by sending data in chunks
        // chunk size is the number of flot32 elements (4 bytes per element) that fit in 12KB

        const chunkSize = (12 * 1024);
        let offset = 0;

        let i = 0;
        while (true) {

            if (offset >= largeData.length) {
                res.end();
                break;
            }

            let _bufferChunk = new Uint8Array(largeData.slice(offset, offset + chunkSize).buffer); // Replace this with your data source

console.log("chunkSize offset, offset + chunkSize");
console.log(++i, offset, offset , chunkSize);
            chunk = largeData;
            offset += chunkSize;
            res.write(_bufferChunk);
        }

    } else {
        return res.json({ error: true, errorMsg: "No level specified. " });
    }
}

module.exports = {
    getNodesInfoView, createOriginalPositions, generateLowResView, getLevelData
};