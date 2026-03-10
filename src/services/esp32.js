export const ESP_IP = '192.168.4.1';

export const setManualDosis = async (val) => {
  const response = await fetch(`http://${ESP_IP}/api/setmanual?val=${val}`);
  return response;
};

export const resetStatistikAlat = async () => {
  const response = await fetch(`http://${ESP_IP}/api/resetstats`);
  return response;
};