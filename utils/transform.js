const _ = require('lodash');

async function tfArray(data, ts, pair, exchange, arrayName) {
    const instrument_ID = `${exchange}_${pair}_DEPTH-${arrayName}`
    data.splice(0, 0, ts)
    data.splice(1, 0, pair)
    data.splice(1, 0, instrument_ID)
    data.splice(1, 0, exchange)
    data.splice(3, 0, arrayName)
    return data
}

async function transform(exchange, data, pair) {
    if(exchange === 'OKEX'){
        var { asks, bids, ts } = data;
        var time = ts;
    }else if(exchange === 'BINANCE'){
        var { lastUpdateId, asks, bids } = data;
        var time = lastUpdateId;
    }else return
    _.forEach(asks, async a => {
        await tfArray(a, time, pair, exchange, 'ASKS')
    })
    _.forEach(bids, async b => {
        await tfArray(b, time, pair, exchange, 'BIDS')
    })
    const hd = { asks, bids };
    return hd
}

module.exports = {
    transform
}