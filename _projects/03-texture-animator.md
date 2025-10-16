---
title: "Flipbook Animation System"
subtitle: "Maya and Unity Toolset"
description: "Custom system to create 2D Flipbook-style Animations on 3D Characters."
thumbnail_static: /assets/projects/03/thumbnail1.png
thumbnail_animated: /assets/projects/03/thumbnail2.png
layout: project
permalink: /projects/flipbook-animation-system/
weight: 30 # Order for gallery
---

### What is it?

In a nutshell, my Flipbook Animation System gives animators a user-friendly interface to animate flipbook style expressions on 3D characters. The system is designed for use in Maya, and is able to be exported for use in Unity and other game engines.

{% capture indented-section %}
<div class="video-wrapper">
  <video autoplay loop muted playsinline controls>
    <source src="/assets/projects/03/flipbook-animator-with-ui.mp4" type="video/mp4">
  </video>
</div>

<div class="video-wrapper">
  <video loop muted playsinline controls>
    <source src="/assets/projects/03/flipbook-animator-newkid.mp4" type="video/mp4">
  </video>
</div>

{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>



### What's the big deal?

A game I was working on was using 3D Characters, but our Art Director wanted more cartoony illustrated facial expressions. We also needed the ability to very accurately portray mouth/lip shapes for the purposes of demonstrating visemes to teach pronounciation. A 3D rigged geometry based mouth wasn't hitting the shapes we needed, and it wasn't doing the original concept art any justice.

One solution was to keep adding more detail to the 3D facial rig, to force it to hit all the shapes we needed. But this was very clearly going to blow the budget given that some scenes required up to 20+ characters on screen at the same time.

Instead, I devised a new system which allowed our animators to use precisely drawn 2D sprites in place of a 3D mouth. This **solved 4 problems:**
1. We hit the cartoony, illustrated, frame-by-frame look that was desired.
2. We were able to very accurately portray exact mouth shapes in a clear way.
3. Performance Budget: Saved a lot of geometry. And probably 12+ bones/didn't need to use blendshapes. +The associated animation data related to this across hundreds of animations.
4. This technique ended up saving enormous amounts of production time.
5. I was told by animators that this system was a lot more enjoyable to work with compared with traditional 3D facial rigs.

This system has also since been used for a host of other non-character related assets.


{% capture indented-section %}
### The Rig:

Because of the potential of this system, we forcasted the use of this technique for a huge cast of characters. It was important that setup on future character rigs was as simple as possible.

The rigging toolset allows riggers to easily setup a character with as many individual animating parts as required. For example in a Robot character — both eyes, a mouth and a numerical display can be setup separately for individual animation.

Here's a demo showing how easy the setup process is in Maya:
<iframe width="1280" height="720" src="https://www.youtube.com/embed/PgzCOnMLKDY" title="Flipbook Animation System setup in Maya" frameborder="0" allow="accelerometer ; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>




{% capture indented-section %}
### Flipbook style mesh swapping

For my [Loopdeloop animations](../loopdeloop/), I also wanted frame-by-frame mesh swapping. So I repurposed the Flipbook Animation System to also work with geometry. Combining this with normal Translate/Rotate/Scale animations on the individual parts leads to what I think is something very appealing.

[![Mesh Swapping Screenshot](/assets/projects/03/flipbook-animator-meshswap.png)](/assets/projects/03/flipbook-animator-meshswap.png)

{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>


{% capture indented-section %}
Further examples:

<div class="video-wrapper">
  <video autoplay loop muted playsinline>
    <source src="/assets/projects/03/flipbook-animator-blob.mp4" type="video/mp4">
  </video>
</div>

<div class="video-wrapper">
  <video autoplay loop muted playsinline>
    <source src="/assets/projects/03/kid_anim_basketball_trick_s.mp4" type="video/mp4">
  </video>
</div>


{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>
