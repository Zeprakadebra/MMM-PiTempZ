# MMM-PiTempZ
MMM-PiTempZ will be an origin Fork of MMM-PiTempZ from ckoutavas.

As the Fork works in conjunction with MagicMirror2, it tells you the temperature of your raspberry pi's CPU. It runs every 60 seconds and is color-coded based on the temperature. If the temperature is ever greater than 85 degrees then the pi shuts down. Please know that this is a work in progress.

![PiTemp_img](https://github.com/Zeprakadebra/MMM-PiTemp/blob/master/PiTemp2.png)

![PiTemp_img](https://github.com/Zeprakadebra/MMM-PiTemp/blob/master/PiTemp.png)

![PiTemp_img](https://github.com/Zeprakadebra/MMM-PiTemp/blob/master/PiTemp3.png)

Extending ckoutavas functionality I am going to add fan control to this modul for hosted raspberrry Pis in housing environments with additionally displayed informations about the current fan speed.

I run my MagicMirror2 on a LABISTS Raspberry Pi4B 8GB RAM and this hardware is known to produce high temp. So I try to keep the hardware cool down by this modul addition in order to control two Noctua NF-A9 5V PWM Axial-Fan 92mm using raspi-soft-pwm from nebrius using pigpio from fivdi.

![PiTemp_img](https://github.com/Zeprakadebra/MMM-PiTemp/blob/master/PiTempZ.PNG)

# Install
1. Change the the directory to MagicMirror/modules: ```$ cd MagicMirror/modules```
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
