import { createClient, print } from 'redis';

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

const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (error, result) => {
    if (error) {
      console.log(error);
      throw error;
    }
    console.log(result);
  });
};

disconnectClient();
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
