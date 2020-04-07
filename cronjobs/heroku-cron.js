var cron = require('node-cron');
var https = require('https');

module.exports = () => {

    cron.schedule('0,30 * * * *', () => {
        const options = {
            hostname: 'bakchod-bot.herokuapp.com',
            path: '/',
            method: 'GET'
        }

        const req = https.request(options, res => {
            console.log(`Cron Job StatusCode: ${res.statusCode}`)
        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    });

}