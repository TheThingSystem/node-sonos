var Sonos = require('../').Sonos
  , upnp = new Sonos('192.168.1.148', 49153, { endpoints: { transport : '/upnp/control/rendertransport1'
                                                          , rendering : '/upnp/control/rendercontrol1'
                                                          }
                                              })
  , util  = require('util')
  ;

var report = function(name, err, result) {
  if (!!err) return console.log('>>> ' + name + ': ' + err.message);

  console.log('>>> ' + name);
  if ((!!result) || (result === false)) console.log(util.inspect(result, { depth: null }));
};

        upnp.getTransportInfo(function(err, result) {
          report('getTransportInfo', err, result);
        }); 


upnp.currentTrack(function(err, result) {
  report('currentTrack', err, result);

  upnp.getVolume(function(err, result) { /* might be optional */
    report('getVolume', err, result);

    upnp.setVolume(75, function(err, result) { /* might be optional */
      report('setVolume', err, result);

      upnp.play('http://192.168.1.72:8887/zephyr.mp3', function(err, result) {
        report('play', err, result);
return;

        upnp.pause(function(err, result) { /* might be optional */
          report('pause', err, result);

          upnp.seek(20, function(err, result) {
            report('seek', err, result);

            upnp.stop(function(err, result) {
              report('stop', err, result);
            });
          });
        });
      });
    });
  });
});

/*



GET /cgi-bin/rocki.cgi?RedLed=on|blink        LEDPARAM1=1|2(green|red) LEDPARAM2=0|1|2(on|off|blink)
                      ?GreenLed=on|blink
                      ?Name=...

deviceDescription
flush
getLEDstate
getPlayMode
getZoneAttrs
getZoneInfo
next
previous
queueNext
setLEDstate
setMuted
setName
setPlayMode

*/
