var request = require('request');
var fs = require('fs');
function encod_img(url_img) {
    var bitmap = fs.readFileSync(url_img);
    return new Buffer(bitmap).toString('base64');
}
var img_send=encod_img("./profile_pic.png")

fs.writeFileSync('./test.txt', img_send, { encoding: 'utf8' });

request.post(
    //"http://192.168.15.3:88/mask",
    "https://avva.grupoavantia.com.br/classifier/mask",
    { 
        formData: {"box": "BoxTest", "analytic": "TestMask", "image": img_send, "camera": "CameraTest"}
    },
    function (error, response, body) {
        if (!error) {
            console.log(response.statusCode);
            console.log(body);
        }
        else{
            console.log(error);
        }
    }
);