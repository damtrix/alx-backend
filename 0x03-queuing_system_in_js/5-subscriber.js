import { createClient } from 'redis';

const client = createClient();

//connect to redis server
client.on('connect', function () {
  console.log('Redis client connected to the server');
});

client.on('error', function (error) {
  console.log(`Redis client not connected to the server: ${error.message}`);
});

//subscribe to holberton school channel
client.subscribe('holberton school channel');

//listen for messages on channel and print message when received
client.on('message', function (channel, message) {
  console.log(`${message}`);
  if (message === 'KILL_SERVER') {
    //unsubscribe from channel and cancel server connection
    client.unsubscribe('holberton school channel');
    client.end(true);
  }
});
