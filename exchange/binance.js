const _ = require('lodash');

async function getBinanceDepthUrl(pairs,sz){
    const allUrl = [];
    _.forEach(pairs, async p =>{
        const pair = p.replace('-','')
        const url = [`https://api.binance.com/api/v3/depth?symbol=${pair}&limit=${sz}`,p]
        allUrl.push(url)
    })
    return allUrl
}

module.exports = {
    getBinanceDepthUrl
}