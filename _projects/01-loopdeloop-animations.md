---
title: "Loopdeloop"
subtitle: "Realtime Animations"
description: "Perfectly looping animations made in Maya/Unity, utilising a huge range of tech and art skills. The animations were made for 3 consecutive loopdeloop challenges with the themes: Boat, Ball and March."
thumbnail_static: /assets/projects/01/thumbnail3.png
thumbnail_animated: /assets/projects/01/thumbnail4.png
layout: project
permalink: /projects/loopdeloop/
weight: 10 # Order for gallery
---

Throughout January 2024 - March 2024, I created 3 animations, for consecutive [Loopdeloop][loopdeloop-insta] animation challenges. I set out with the purpose of creating something short and focused, utilising an amalgamation of all my skills, under tight deadlines. I used a mix of Maya and Unity. The final render is a simple recording of the Unity Scene since the animations run in realtime.

The videos below are all rendered in HDRP, but I have since ported the scenes to URP and they run realtime on mobile too. If you ever see me in person, make sure to ask me to show you :)




{% capture indented-section %}
# *Are we there yet?*
Theme: "Boat". (Created in 10 days)
<iframe title="vimeo-player" src="https://player.vimeo.com/video/909074313?h=8ac712f0d7&loop=1" width="1280" height="720" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>
{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>





{% capture indented-section %}
# *Highball*
Theme: "Ball". (Created in 8 days)
<iframe title="vimeo-player" src="https://player.vimeo.com/video/918307020?h=c3df223ba4&loop=1" width="1280" height="720" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>
{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>





{% capture indented-section %}
# *Radetzky*
Theme: "March". (Created in 7 Days)
<iframe title="vimeo-player" src="https://player.vimeo.com/video/928752483?h=6353728b31&loop=1" width="1280" height="720" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>
{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>




<div class="md-spacer-50"></div>
# Behind the Scenes Breakdown
{: .heading-accent }
------------



{% capture indented-section %}
Below, I showcase a few techniques I used to create the above animations.
<iframe title="vimeo-player" src="https://player.vimeo.com/video/969872693?h=e70e2229de" width="1280" height="720" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>
{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>





#### 1. Flipbook Animation System using Sprites and Geometry
Detailed breakdown of this technique separately detailed [**HERE**][texture-animator].

In short, this technique is broken into 2 parts that work together — the **sprites** and **geometry**. The rig is set up in Maya using my custom toolset, and animators can then add/update new sprites/meshes to the character as they are animating.

The animation data for this system is encoded to special bones in the rig, so no special export procedures are needed.

In Unity, the bone animation data is read and the system runs no problems at editor-time/realtime.


<div class="md-spacer-50"></div>
#### 2. Vertex animated fish/seaweed
Fish and seaweed geometry are animated with a vertex shader created in Shader Graph. The ocean is then populated with fish using particle systems.
[![Vertex Shader Graph](/assets/projects/01/vertex-shader.png)](/assets/projects/01/vertex-shader.png)


<div class="md-spacer-50"></div>
#### 3. Shader-based traffic light system
After seeing traffic/pedestrian lights in Japan, I thought it would be an interesting exercise to encode the whole sequence into a texture and run it using a shader.

The concept is fairly simple:
* The UV's of the light parts of the relevant traffic light models are scaled to nothing. These parts will be assigned 1 special material, driven by our custom shader.
* Each individual light that needs to be animated separately should be given a unique Y value in the UV Map.
* A special texture is created to encode the traffic light sequence. The one used in my animation looks like this:

[![Traffic Signal Sequence Texture](/assets/projects/01/traffic-signals-sequence.png)](/assets/projects/01/traffic-signals-sequence.png)

This is how the encoding works (stretched for clarity):



This is the shader that controls the rende








[![Traffic Light Setup](/assets/projects/01/traffic-light-screenshot.png)](/assets/projects/01/traffic-light-screenshot.png)


[![Traffic Light Setup](/assets/projects/01/traffic-light-shadergraph.png)](/assets/projects/01/traffic-light-shadergraph.png)



[loopdeloop-insta]: https://www.instagram.com/loopdeloop_animation
[texture-animator]: ../flipbook-animation-system/





