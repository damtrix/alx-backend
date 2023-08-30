import { createClient } from 'redis';

const disconnectClient = () => {
  const client = createClient();

  client
    .on('connect', function () {
      console.log('Redis client connected to the server');
    })
    .on('error', function (err) {
      console.log(`Redis client not connected to the server: ${err}`);
    });
};

disconnectClient();
