import axios from 'axios';

export class DistanceHelper {
    static async getDistance(origin: string, destination: string) {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
            // For development, if API key is missing, return a dummy distance
            console.warn('GOOGLE_MAPS_API_KEY is not set. Returning dummy distance.');
            return {
                distance: '5 miles',
                value_in_miles: 5,
                value_in_meters: 8046.72,
            };
        }

        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
                params: {
                    origins: origin,
                    destinations: destination,
                    key: apiKey,
                },
            });

            const data = response.data;

            if (data.status === 'OK' && data.rows[0]?.elements[0]?.distance) {
                const meters = data.rows[0].elements[0].distance.value;
                const miles = meters / 1609.344;

                return {
                    distance: `${miles.toFixed(2)} miles`,
                    value_in_miles: parseFloat(miles.toFixed(2)),
                    value_in_meters: meters,
                };
            }

            return {
                error: 'Unable to calculate distance. Check addresses or API quota.',
            };
        } catch (error: any) {
            return {
                error: `Failed to connect to Google API. ${error.message}`,
            };
        }
    }
}
