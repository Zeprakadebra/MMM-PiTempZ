# MMM-PiTempZ
This MagicMirror2 modul is under construction. It is currently not working. Please come back later to check if the work is ready to rumble. Til that enjoy what you may expect when using it in the future:

MMM-PiTempZ is an origin Fork of [MMM-PiTempZ from ckoutavas](https://github.com/ckoutavas/MMM-PiTemp).

As the Fork this module works in conjunction with MagicMirror2, it tells you the temperature of your raspberry pi's CPU. It runs every 60 seconds and is color-coded based on the temperature. If the temperature is ever greater than 85 degrees then the pi shuts down. Please know that this is a work in progress.

Extending ckoutavas functionality I add fan control, especially for raspberrry Pis in housing environments with no free PWM-Pin.

This module displays the cpu temperature AND additionally the current fan speed.

![PiTemp_img](https://github.com/Zeprakadebra/MMM-PiTemp/blob/master/PiTempZ.PNG)

The PWM-Signal is created by [raspi-soft-pwm from nebrius](https://github.com/nebrius/raspi-soft-pwm) based on [pigpio from fivdi](https://github.com/fivdi/pigpio). The signal strength depends on the thresholds and minimum / maximum rotation speed defined in the config file.

# Install
1. Change the directory to MagicMirror/modules: ```$ cd MagicMirror/modules```
2. Clone this repo: ```$ git clone https://github.com/Zeprakadebra/MMM-PiTempZ```
3. List the contents of MagicMirror/modules to make sure that MMM-PiTemp was cloned: ```$ ls```
4. Change the directory to MagicMirror/config: ```$ cd ~/MagicMirror/config```
5. Modify your config.js file and add the MMM-PiTemp module: ```$ sudo nano config.js```
    
# Config Settings
The basic config should look like this

```
{
    module: "MMM-PiTempZ",
    position: "top_right",
    config: {}
},
 ```
If everything runs as expected you can customize the config param based on the table below.

<table>
<tr>
<th>Param</th>
<th>Default Value</th>
<th>Type</th>
<th>Definition</th>
</tr>

<tr>
<td>tempUnit</td>
<td>"C"</td>
<td>str</td>
<td>This param is used to assign the units for degrees. It can be "C" for celsius or "F" for fahrenheit</td>
</tr>

<tr>
<td>freq</td>
<td>60000</td>
 <td>int</td>
<td>This is how frequently you want to run the temp.py file (in ms), which gets the temperature of the cpu</td>
</tr>

<tr>
<td>high</td>
<td>80</td>
<td>int</td>
<td>This param is used to assign the color to a range: If cpu_temp is greater than high then highColor</td>
</tr>

<tr>
<td>low</td>
<td>70</td>
<td>int</td>
<td>This param is used to assign the color to a range: If cpu_temp is less than low then lowColor</td>
</tr>

<tr>
<td>fast</td>
<td>2000</td>
<td>int</td>
<td>This param is used to define the maximum rotation speed of the connected fan. This rotation will be reached when measuring the high temp, defined.</td>
</tr>

<tr>
<td>slow</td>
<td>400</td>
<td>int</td>
<td>This param is used to define the minimum rotation speed of the connected fan. This rotation will be used when measuring the low temp, defined.</td>
</tr>

<tr>
<td>highColor</td>
<td>"red"</td>
<td>str</td>
<td>This param is used to assign the color for the high param: If cpu_temp is greater than high then highColor</td>
</tr>

<tr>
<td>lowColor</td>
<td>"green"</td>
<td>str</td>
<td>This param is used to assign the color for the low param: If cpu_temp is less than low then lowColor</td>
</tr>

<tr>
<td>otherColor</td>
<td>"yellow"</td>
<td>str</td>
<td>This param is used to assign the color for the else condition: If cpu_temp is less than high AND cpu_temp is greater than low then otherColor</td>
</tr>

<tr>
<td>label</td>
<td>"CPU: "</td>
<td>str</td>
<td>This param is used to assign the label to the temperature.</td>
</tr>
</table>

# temp.py
Make sure python3 is installed on your raspberry pi and that you have the following packages installed: `os` and `gpiozero`. You can install the packages using `pip3` in the terminal: `pip3 install gpiozero`. `os` should be installed by defalut.
If you want to change the temperature at which the pi shuts down then modify the if statement in the temp.py file
```
if cpu_temp < 85: # change to whatever temp you want
    print(cpu_temp)

# if temp is greater than 85 shut down the pi
else:
    os.system("sudo shutdown -r now")
```
