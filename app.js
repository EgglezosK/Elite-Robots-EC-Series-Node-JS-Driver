const { EC_MONITOR_COMMUNICATION, EC_MONITOR_DATA } = require('./core/communication/MonitorInterface');
const { EC_CONTROL_COMMUNICATION , sendCMD, RobotControlClient } = require('./core/communication/ControlInterface');

// Call EC_MONITOR_COMMUNICATION to start monitoring
EC_MONITOR_COMMUNICATION();
// Call EC_CONTROL_COMMUNICATION to establish control communication
EC_CONTROL_COMMUNICATION();

console.log(`Starting EC Series Driver...`);
/** 
 * Send a movement command by joint space 
 */

async function test_movement_by_joints(){ 
    await sendCMD(RobotControlClient, "syncMotorStatus", {});
    await sendCMD(RobotControlClient, "set_servo_status", {status: 1});
    await sendCMD(RobotControlClient, "setCurrentCoord", {coord_mode: 0}); // Joint
    await sendCMD(RobotControlClient, "clearPathPoint", {});
    let result = await sendCMD(RobotControlClient,"moveByJoint",{targetPos:[136,-95,165,-70,0,-70],speed:5, acc: 5, dec: 10});
    console.log(result);
}

// test_movement_by_joints();

/**
 * Test movement with TCP space
 */
async function test_movement_by_tcp(){
    await sendCMD(RobotControlClient, "syncMotorStatus", {});
    await sendCMD(RobotControlClient, "setCurrentCoord", {coord_mode: 1}); // Base
    await sendCMD(RobotControlClient, "set_servo_status", {status: 1});
    let result = await sendCMD(RobotControlClient,"moveByLineCoord",{"targetUserPose": [-560,443,650,0,0,0],"user_coord":[0,0,0,0,0,0], "speed_type" :0, "speed" :50, "unit_type":1});
    console.log(result);
}


// test_movement_by_tcp();