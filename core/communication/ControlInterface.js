/**
 * Konstantinos Englezos 
 * 31/3/2024
 */
const net = require('net');
const RobotControlClient = new net.Socket();
// Function to send a commands to the robot
function sendCMD(sock, cmd, params = null, id = 1) {
    return new Promise((resolve, reject) => {
        const request = {
            jsonrpc: '2.0',
            method: cmd,
            params: params,
            id: id
        };
        const sendStr = JSON.stringify(request) + '\n';

        sock.write(sendStr);

        sock.once('data', function (data) {
            const responseString = data.toString('utf-8');
            const responseData = JSON.parse(responseString);
            resolve(responseData);
        });

        sock.once('error', function (err) {
            reject(err);
        });
    });
}

function EC_CONTROL_COMMUNICATION() {
    const Robot_IP = '192.168.1.200';
    const ControlInterfacePort = 8055;
    // Connect to the socket Monitor Interface
    RobotControlClient.connect(ControlInterfacePort, Robot_IP, function () {
        console.log('Connected to Control Interface');
        
    });

    RobotControlClient.on('data', function (data) {
        console.log('Receive data from the Robot Controller:');
        const Buffered_Data = Buffer.from(data);
        const responseString = Buffered_Data.toString('utf-8');
        // Print the result
        console.log(JSON.parse(responseString));
    });

    RobotControlClient.on('close', function () {
        console.log('Robot Control Interface Closed');
    });

    RobotControlClient.on('error', function (err) {
        console.error('Robot Control Interface Error: ', err);
    });

}


module.exports = { EC_CONTROL_COMMUNICATION, sendCMD, RobotControlClient };