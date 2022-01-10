const spawn = require("child_process").spawn;
var NodeHelper = require("node_helper");
const raspi = require('raspi');
const pwm = require('raspi-soft-pwm');

module.exports = NodeHelper.create({
  start: function() {
      this.fan_signal = 0;
      //const fan = new pwm.SoftPWM('GPIO17');
      // fan.mode = Gpio.OUTPUT;
      setInterval(() => {
        // fan.write(this.fan_signal);
      },200);
  },

  socketNotificationReceived: function(notification, payload) {
    switch(notification) {
      case "get_temp":
        this.job();
        break;
      case "set_fan":
        this.fan_signal = payload;
        break;
    }
  },
  
  job: function() {
    var process = spawn("python3", ["/home/pi/MagicMirror/modules/MMM-PiTempZ/temp.py"])
    process.stdout.on("data", (data)=>{
      console.log(data)
      this.sendSocketNotification("temperature", data.toString())
    })
  }
})
