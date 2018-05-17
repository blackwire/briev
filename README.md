# briev
A developer toolkit that is designed to take all those little tasks that require googling something and smash them into an application along with some additional goodies like extending clipboard usefulness and automating repetative tasks.

### Description:
---
A basic set of tools that get used in my trade day in and day out. Color picker/converter, character entity lookup, clipboard utilities (multi-clipboard using CtrlorCmd+1/CtrlorCmd+2 to switch), clipboard history, clipboard to file conversion and file to clipboard conversion, a basic automation tool, and a task scheduler (that requires the app to be open at the moment).

### Using Automation:
---
#### Mouse Behaviors:
* **Move to:** mouse.move(x-coordinate, y-coordinate, speed[fast/slow])
* **Click:** mouse.click(button[left/right/middle], click-count[double/single])
* **Drag to:** mouse.drag(x-coordinate, y-coordinate)
* **Scroll:** mouse.scroll(horizontal-amount, vertical-amount)

#### Keyboard Behaviors:
* **Hold key:** keyboard.holdKey(key)
* **Release key:** keyboard.releaseKey(key)
* **Tap key:** keyboard.tapKey(key)
* **Type:** keyboard.type(string)

#### Sleep Behaviors:
* **Second:** sleep.second(seconds-to-sleep)
* **Minutes:** sleep.minute(minutes-to-sleep)
