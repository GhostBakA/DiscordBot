module.exports = () => {

    //Cron Job to keep Heroku App Alive
    var cron = require('node-cron');
    var https = require('https');

    console.log('inside heroku-cron')
    
    cron.schedule('0,30 * * * *', () => {
        const options = {
            hostname: 'bakchod-bot.herokuapp.com',
            path: '/',
            method: 'GET'
        }
    
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
    
            res.on('data', d => {
                console.log('Success')
            })
        })
    
        req.on('error', error => {
            console.error(error)
        })
    
        req.end()
    });

}