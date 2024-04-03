const net = require('net');
const EC_TRANSLATOR = require('./functions/translator');

let EC_MONITOR_DATA = null; // Define EC_MONITOR_DATA at the module level

function EC_MONITOR_COMMUNICATION() {

    const MonitorInterfacePort = 8056;
    const Robot_IP = '192.168.1.200';
    const RobotMonitorClient = new net.Socket();
    const LogFiles = false;
    let accumulatedData = Buffer.alloc(0);
    var lost_packages = 0;
    // Connect to the socket Monitor Interface
    RobotMonitorClient.connect(MonitorInterfacePort, Robot_IP, function () {
        console.log('Connected to Monitor Interface');
    });

    // Receiving data from the Robotic arm
    RobotMonitorClient.on('data', function (data) {

        // Check is packets are corrupted
        if (data.length !== 1024) {
            //lost_packages += 1;
            return;
        }

        // Turn the data from binary to JSON
        EC_MONITOR_DATA = EC_TRANSLATOR.Decoder(data);
        // Print them
        console.log(EC_MONITOR_DATA);
    });

    RobotMonitorClient.on('close', function () {
        EC_MONITOR_DATA = "Dead";
        console.log('Robot Monitor Interface Closed');
    });

    RobotMonitorClient.on('error', function (err) {
        console.error('Robot Monitor Interface Error: ', err);
    });

}

module.exports = { EC_MONITOR_COMMUNICATION , EC_MONITOR_DATA };