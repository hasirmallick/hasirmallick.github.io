function messageToClient(client, data) {
  return new Promise(function(resolve, reject) {
    const channel = new MessageChannel();

    channel.port1.onmessage = function(event){
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    client.postMessage(JSON.stringify(data), [channel.port2]);
  });
}

self.addEventListener('push', function (event) {
  if (event && event.data) {
    self.pushData = event.data.json();
    if (self.pushData) {
      event.waitUntil(self.registration.showNotification(self.pushData.title, {
        body: self.pushData.body,
        icon: self.pushData.data ? self.pushData.data.icon : null
      }).then(function() {
        clients.matchAll({type: 'window'}).then(function (clientList) {
          if (clientList.length > 0) {
            messageToClient(clientList[0], {
              message: self.pushData.body  suppose it is: "Hello World !"
            });
          }
        });
      }));
    }
  }
});