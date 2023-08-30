import { createClient, print } from 'redis';
import { promisify } from 'util';

const client = createClient();

const disconnectClient = () => {
  client
    .on('connect', function () {
      console.log('Redis client connected to the server');
    })
    .on('error', function (err) {
      console.log(`Redis client not connected to the server: ${err}`);
    });
};

const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, print);
};

const get = promisify(client.get).bind(client);

const displaySchoolValue = async (schoolName) => {
  const result = await get(schoolName).catch((error) => {
    if (error) {
      console.log(error);
      throw error;
    }
  });
  console.log(result);
};

disconnectClient();
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
