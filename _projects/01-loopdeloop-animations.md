---
title: "Loopdeloop"
subtitle: "Real-time Animations"
description: "Perfectly looping animations made in Maya/Unity, utilising a huge range of tech and art skills.<br><br>See the breakdown of some techniques I used."
thumbnail_static: /assets/projects/01/thumbnail3.png
thumbnail_animated: /assets/projects/01/thumbnail4.png
layout: project
permalink: /projects/loopdeloop/
weight: 10 # Order for gallery
tags: [animation, rigging, tools]
---

Throughout January 2024 - March 2024, I created 3 animations, for consecutive [Loopdeloop][loopdeloop-insta] animation challenges. I set out with the purpose of creating something short and focused, utilising an amalgamation of all my skills under tight deadlines. I used a mix of Maya and Unity. The final render is a simple recording of the Unity Scene since the animations run in real-time.

The videos below are all rendered in HDRP, but I have since ported the scenes to URP and they run real-time on mobile too. If you ever see me in person, make sure to ask me to show you :)




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
Theme: "March". (Created in 7 days)
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

In Unity, the bone animation data is read and the system runs with no problems at editor-time/real-time.


<div class="md-spacer-50"></div>
#### 2. Vertex animated fish/seaweed
Fish and seaweed geometry are animated with a vertex shader created in Shader Graph. The ocean is then populated with fish using particle systems.
[![Vertex Shader Graph](/assets/projects/01/vertex-shader.png)](/assets/projects/01/vertex-shader.png)


<div class="md-spacer-50"></div>
#### 3. Shader-based traffic light system
After seeing traffic/pedestrian lights in Japan, I thought it would be an interesting exercise to encode the whole sequence into a texture and run it using a shader.

The concept is fairly simple:
{% capture indented-section %}
* The UVs of the illuminated parts of the relevant traffic light models are scaled to nothing.
* All illuminated parts are assigned one material. This will use our special shader.
* The UVs of each individual light that needs to be animated separately should be given a unique Y value in the UV Map. These will match up with horizontal rows in the texture.
* A special texture is created to encode the traffic light sequence. The one used in my animation looks like this:

[![Traffic Signal Sequence Texture](/assets/projects/01/traffic-signals-sequence.png)](/assets/projects/01/traffic-signals-sequence.png)

This is how the encoding works (stretched for clarity):
[![Traffic Signal Sequence Texture Explanation](/assets/projects/01/traffic-signals-sequence-explained.png)](/assets/projects/01/traffic-signals-sequence-explained.png)

* Each horizontal row of pixels (Light 1, Light 2, Light 3, ...) is a unique light in the sequence.
* As the shader transforms the UVs along the X-axis of the texture map, the corresponding parts of the geometry will update according to their respective UVs position in the texture.
* The shader itself is very simple. It was put together quickly using Shader Graph. All it does is transform the UVs along the X-axis, with the ``_Progress`` value normalized based on the ``_SecondsToRepeat``, which should be set to how long it takes for the traffic lights to complete one cycle. The graph:

[![Traffic Light Setup](/assets/projects/01/traffic-light-shadergraph.png)](/assets/projects/01/traffic-light-shadergraph.png)
{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>





<div class="md-spacer-50"></div>
#### 4. Volume Preserving Ball Rig

Rigging a ball? Seems like a rigging-101 class exercise, right? Well there were some challenges I had to solve:
* No use of deformers. Rig had to be fully bone-based.
* Had to support hitting some very cartoony non-spherical poses.

The rig is made of 3 bones. All can be freely scaled. The rest of the magic is just in very precise skinning.
<div class="video-wrapper">
  <video autoplay loop muted playsinline>
    <source src="/assets/projects/01/ball-rig.mp4" type="video/mp4">
  </video>
</div>

{% capture indented-section %}
Here are some of the poses I could hit with this rig:
<div class="video-wrapper">
  <video autoplay loop muted playsinline>
    <source src="/assets/projects/01/ball-poses.mp4" type="video/mp4">
  </video>
</div>
{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>






[loopdeloop-insta]: https://www.instagram.com/loopdeloop_animation
[texture-animator]: ../flipbook-animation-system/













