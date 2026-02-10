const axios = require('axios');

const GOVEE_API_BASE = 'https://developer.api.govee.com/v1';

async function getDevices(apiKey) {
  try {
    const response = await axios.get(`${GOVEE_API_BASE}/devices`, {
      headers: {
        'Govee-Token': apiKey
      }
    });
    return response.data.data.devices;
  } catch (error) {
    console.error('Error fetching devices:', error.message);
    return null;
  }
}

async function controlDevice(apiKey, deviceId, model, command) {
  try {
    const response = await axios.post(`${GOVEE_API_BASE}/devices/control`, {
      requestId: Date.now().toString(),
      payload: {
        device: deviceId,
        capability: {
          type: command.name,
          instance: 'powerSwitch'
        },
        value: {
          value: command.value
        }
      }
    }, {
      headers: {
        'Govee-Token': apiKey
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error controlling device:', error.message);
    return null;
  }
}

module.exports = { getDevices, controlDevice };
