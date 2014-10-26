var nexmo = require("nexmo");

var gateway = nexmo({
    key: "5662e05d",
    secret: "78ae6ab4"
});

exports.send = function (options, callback) {
    options.from = options.to.indexOf('1') ? 'Pong!' : '13234877664';
    gateway.sms(options).send(callback);
};