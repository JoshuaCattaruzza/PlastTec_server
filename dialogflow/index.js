const {dialogflow} = require('actions-on-google');

const statusIntent = dialogflow({debug: false});

statusIntent.intent('status', (conv, param, context) => {
    console.log("conv: ")
    console.log(conv);
    console.log("param: ");
    console.log(param);
    console.log("context: " + context);
    conv.ask("Hai chiesto lo status");

   });


module.exports = {
    statusIntent
}
