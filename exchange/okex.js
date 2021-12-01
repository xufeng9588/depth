const _ = require('lodash');

async function getOkDepthUrl(pairs,sz){
    const allUrl = [];
    _.forEach(pairs, async p =>{
        const url = [`https://www.okex.com/api/v5/market/books?instId=${p}&sz=${sz}`,p]
        allUrl.push(url)
    })
    return allUrl
}

module.exports = {
    getOkDepthUrl
}