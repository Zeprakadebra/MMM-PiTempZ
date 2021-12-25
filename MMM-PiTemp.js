Module.register("MMM-PiTemp", {
	defaults: {
		tempUnit: "C",
    	freq: 60000,
    	high: 80,
    	low: 70,
		slow: 400,
		fast: 2000,
    	highColor: "red",
    	lowColor: "green",
    	otherColor: "yellow",
		label: "CPU:"
	},
	
	start: function() {
   		this.sendSocketNotification("get_temp");
  	},

  	getDom: function() {
   		 var e = document.createElement("div")
   		 e.id = "pi_temp"
		return e
	},

 	 notificationReceived: function(notification, payload, sender) {
	 	switch(notification) {
      			case "DOM_OBJECTS_CREATED":
        		var timer = setInterval(()=>{
					this.sendSocketNotification("get_temp")
        		}, this.config.freq)
        		break
    		}
	},

  	socketNotificationReceived: function(notification, payload) {
		switch (notification) {
			case "temperature":
				var e = document.getElementById("pi_temp");
				if (parseFloat(payload) <= this.config.low) {
					e.style.color = this.config.lowColor;
				} else if (parseFloat(payload) >= this.config.high) {
					e.style.color = this.config.highColor;
				} else {
					e.style.color = this.config.otherColor;
				}

				var temp = payload;

				var low = this.config.low;
				var high = this.config.high;
				var range = high - low;
				var slow = this.config.slow;
				var fast = this.config.fast;
				var capa = fast - slow;

				var speed = 0;
				var signal = 0;

				if (temp >= low && temp <= high) {
					speed = slow + (temp - low) * capa / range;
				}

				if (temp > high) {
					speed = fast;
					signal = 1;
				}

				if (this.config.tempUnit === "C") {
					e.innerHTML = this.config.label + " " + temp.toString() + "°C, fan: " + signal.toFixed(1).toString() + " = " + speed.toFixed().toString() + " rpm";
				} else {
					e.innerHTML = this.config.label + " " + (temp * (9 / 5) + 32).toFixed(1).toString() + "°F, fan: " + signal.toFixed(1).toString() + " = " + speed.toFixed().toString() + " rpm";
				}

				console.log(this.name + ' sending set_fan notification');
				this.sendSocketNotification("set_fan", signal);
				break;
		}
  	},
})
