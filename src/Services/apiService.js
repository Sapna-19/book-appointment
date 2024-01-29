// src/services/apiService.js
const API_ENDPOINT = 'https://app.appointo.me/scripttag/mock_timeslots';

export const fetchTimeslots = async (startDate, endDate) => {
  const url = `${API_ENDPOINT}?start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching timeslots: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data,"data")
    return data;
  } catch (error) {
    console.error('Error fetching timeslots:', error.message);
    throw error;
  }
};
