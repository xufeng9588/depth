const _ = require('lodash');
const async = require('async')
const config = require('../config/config');
const { transform } = require('./transform');
const { request } = require('../../utils/request/request')
const { getOkDepthUrl } = require('../exchange/okex');
const { getBinanceDepthUrl } = require('../exchange/binance');
const { DBLink } = require('../../utils/database/link_influx')

async function getDepthData(exchange) {
    const { coins } = config;
    const ok_url = await getOkDepthUrl(coins, 50);
    const binance_url = await getBinanceDepthUrl(coins, 10);
    if (exchange === 'OKEX') {
        await results(exchange, ok_url)
    } else if (exchange === 'BINANCE') {
        await results(exchange, binance_url)
    }
}

async function results(exchange, url) {
    return async.mapLimit(url, 1, async (d) => {
        const data = await request(d[0])
        if (exchange === 'OKEX') {
            const hd = data.data[0];
            var handleData = await transform(exchange, hd, d[1])
        } else if (exchange === 'BINANCE') {
            var handleData = await transform(exchange, data, d[1])
        } else return
        console.log(handleData)
    }, (err, res) => {
        if (err) throw err
    })
}

getDepthData('BINANCE')

module.exports = {
    getDepthData
}