/**
 * Konstantinos Englezos 
 * 30/3/2024
 */

// Constants for the structure sizes
const MESSAGE_SIZE_SIZE = 4;
const TIMESTAMP_SIZE = 8;
const AUTORUN_CYCLE_MODE_SIZE = 1;
const MACHINE_POS_SIZE = 8 * 8; // Assuming machinePos is an array of 8 doubles
const MACHINE_POSE_SIZE = 8 * 6; // Assuming machinePose is an array of 6 doubles
const MACHINE_USER_POSE_SIZE = 8 * 6; // Assuming machineUserPose is an array of 6 doubles
const TORQUE_SIZE = 8 * 8; // Assuming torque is an array of 8 doubles
const ROBOT_STATE_SIZE = 4;
const SERVO_READY_SIZE = 4;
const CAN_MOTOR_RUN_SIZE = 4;
const MOTOR_SPEED_SIZE = 4 * 8; // Assuming motor_speed is an array of 8 integers
const ROBOT_MODE_SIZE = 4;
const ANALOG_INPUT_SIZE = 8 * 3; // Assuming analogInput is an array of 3 doubles
const ANALOG_OUTPUT_SIZE = 8 * 5; // Assuming analogOutput is an array of 5 doubles
const DIGITAL_IO_INPUT_SIZE = 8;
const DIGITAL_IO_OUTPUT_SIZE = 8;
const COLLISION_SIZE = 1;
const MACHINE_FLANGE_POSE_SIZE = 8 * 6; // Assuming machineFlangePose is an array of 6 doubles
const MACHINE_USER_FLANGE_POSE_SIZE = 8 * 6; // Assuming machineUserFlangePose is an array of 6 doubles
const EMERGENCY_STOP_STATE_SIZE = 1;
const TCP_SPEED_SIZE = 8;
const JOINT_SPEED_SIZE = 8 * 8; // Assuming jointSpeed is an array of 8 doubles
const TCP_ACC_SIZE = 8;
const JOINT_ACC_SIZE = 8 * 8; // Assuming jointAcc is an array of 8 doubles
const JOINT_TEMPERATURE_SIZE = 8 * 6; // Assuming jointTemperature is an array of 6 doubles
const JOINT_TORQUE_SIZE = 8 * 6; // Assuming jointTorque is an array of 6 doubles
const EXT_JOINT_TORQUES_SIZE = 8 * 6; // Assuming extJointTorques is an array of 6 doubles
const EX_TCP_FORCE_IN_TOOL_SIZE = 8 * 6; // Assuming exTcpForceInTool is an array of 6 doubles
const DRAG_STATE_SIZE = 1;
const RESERVED_SIZE = 220;
const MATCHING_WORD_SIZE = 4;

// Function to parse the received data
function Decoder(data) {
    let offset = 0;
    const result = {};

    // Parse each field according to the data structure
    result['MessageSize'] = data.readUInt32BE(offset);
    offset += MESSAGE_SIZE_SIZE;

    result['TimeStamp'] = data.readBigUInt64BE(offset);
    offset += TIMESTAMP_SIZE;

    result['autorun_cycleMode'] = data.readUInt8(offset);
    offset += AUTORUN_CYCLE_MODE_SIZE;

    // Parse machinePos array
    result['machinePos'] = [];
    for (let i = 0; i < 8; i++) {
        result['machinePos'].push(data.readDoubleBE(offset));
        offset += 8; // Double size
    }

    // Parse machinePose array
    result['machinePose'] = [];
    for (let i = 0; i < 6; i++) {
        result['machinePose'].push(data.readDoubleBE(offset));
        offset += 8; // Double size
    }

    // Parse machineUserPose array
    result['machineUserPose'] = [];
    for (let i = 0; i < 6; i++) {
        result['machineUserPose'].push(data.readDoubleBE(offset));
        offset += 8; // Double size
    }

    // Parse torque array
    result['torque'] = [];
    for (let i = 0; i < 8; i++) {
        result['torque'].push(data.readDoubleBE(offset));
        offset += 8; // Double size
    }

    result['robotState'] = data.readInt32BE(offset);
    offset += ROBOT_STATE_SIZE;

    result['servoReady'] = data.readInt32BE(offset);
    offset += SERVO_READY_SIZE;

    result['can_motor_run'] = data.readInt32BE(offset);
    offset += CAN_MOTOR_RUN_SIZE;

    // Parse motor_speed array
    result['motor_speed'] = [];
    for (let i = 0; i < 8; i++) {
        result['motor_speed'].push(data.readInt32BE(offset));
        offset += 4; // Integer size
    }

    result['robotMode'] = data.readInt32BE(offset);
    offset += ROBOT_MODE_SIZE;

    // Parse analogInput array
    result['analogInput'] = [];
    for (let i = 0; i < 3; i++) {
        result['analogInput'].push(data.readDoubleBE(offset));
        offset += 8; // Double size
    }

    // Parse analogOutput array
    result['analogOutput'] = [];
    for (let i = 0; i < 5; i++) {
        result['analogOutput'].push(data.readDoubleBE(offset));
        offset += 8; // Double size
    }

    result['digital_ioInput'] = data.readBigUInt64BE(offset);
    offset += DIGITAL_IO_INPUT_SIZE;

    result['digital_ioOutput'] = data.readBigUInt64BE(offset);
    offset += DIGITAL_IO_OUTPUT_SIZE;

    result['collision'] = data.readUInt8(offset);
    offset += COLLISION_SIZE;

    // Parse machineFlangePose array
    result['machineFlangePose'] = [];
    for (let i = 0; i < 6; i++) {
        result['machineFlangePose'].push(data.readDoubleBE(offset));
        offset += 8; // Double size
    }

    // Parse machineUserFlangePose array
    result['machineUserFlangePose'] = [];
    for (let i = 0; i < 6; i++) {
        result['machineUserFlangePose'].push(data.readDoubleBE(offset));
        offset += 8; // Double size
    }

    result['emergencyStopState'] = data.readUInt8(offset);
    offset += EMERGENCY_STOP_STATE_SIZE;

    result['tcpSpeed'] = data.readDoubleBE(offset);
    offset += TCP_SPEED_SIZE;

    // Parse jointSpeed array
    result['jointSpeed'] = [];
    for (let i = 0; i < 8; i++) {
        result['jointSpeed'].push(data.readDoubleBE(offset));
        offset += 8; // Double size
    }

    result['tcpAcc'] = data.readDoubleBE(offset);
    offset += TCP_ACC_SIZE;

    // Parse jointAcc array
    result['jointAcc'] = [];
    for (let i = 0; i < 8; i++) {
        result['jointAcc'].push(data.readDoubleBE(offset));
        offset += 8; // Double size
    }

    // Parse jointTemperature array
    result['jointTemperature'] = [];
    for (let i = 0; i < 6; i++) {
        result['jointTemperature'].push(data.readDoubleBE(offset));
        offset += 8; // Double size
    }

    // Parse jointTorque array
    result['jointTorque'] = [];
    for (let i = 0; i < 6; i++) {
        result['jointTorque'].push(data.readDoubleBE(offset));
        offset += 8; // Double size
    }

    // Parse extJointTorques array
    result['extJointTorques'] = [];
    for (let i = 0; i < 6; i++) {
        result['extJointTorques'].push(data.readDoubleBE(offset));
        offset += 8; // Double size
    }

    // Parse exTcpForceInTool array
    result['exTcpForceInTool'] = [];
    for (let i = 0; i < 6; i++) {
        result['exTcpForceInTool'].push(data.readDoubleBE(offset));
        offset += 8; // Double size
    }

    result['dragState'] = data.readUInt8(offset);
    offset += DRAG_STATE_SIZE;

    // Skip the 'Reserved' field
    offset += RESERVED_SIZE;

    // Parse matchingWord
    result['matchingWord'] = data.readUInt32BE(offset);
    offset += MATCHING_WORD_SIZE;

    return result;
}


module.exports = {
    Decoder
};
