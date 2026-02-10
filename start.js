const { getDevices, controlDevice } = require('./govee');

// SignalRGB expects these exports
let eventEmitter;

async function onProfileLoad(context) {
  console.log('Govee plugin loaded');
  eventEmitter = context.emit;
}

async function onProfileUnload(context) {
  console.log('Govee plugin unloaded');
}

async function onDeviceRefresh(context) {
  const apiKey = context.config.api_key;
  const deviceId = context.config.device_id;
  const model = context.config.device_model;

  if (!apiKey || !deviceId || !model) {
    console.error('Missing configuration: API Key, Device ID, or Device Model');
    return;
  }

  try {
    // Fetch devices
    const devices = await getDevices(apiKey);
    if (devices) {
      console.log('Connected to Govee devices:', devices.length);
      
      // Control device
      const result = await controlDevice(apiKey, deviceId, model, { 
        name: 'turn', 
        value: 'on' 
      });
      
      if (result) {
        console.log('Device controlled successfully');
      }
    }
  } catch (error) {
    console.error('Error in device refresh:', error.message);
  }
}

async function onSetLighting(context, launchingContext, colors) {
  const apiKey = context.config.api_key;
  const deviceId = context.config.device_id;

  if (!apiKey || !deviceId) {
    return;
  }

  // Convert colors to RGB and send to Govee
  if (colors.length > 0) {
    const color = colors[0];
    const hexColor = `${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
    
    console.log(`Setting color to: #${hexColor}`);
    
    // You can add color control logic here
  }
}

module.exports = {
  onProfileLoad,
  onProfileUnload,
  onDeviceRefresh,
  onSetLighting
};
