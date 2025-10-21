---
title: "Adjustable Characters"
subtitle: "Runtime Animation Rigging"
description: "See how I was able to create a system allowing character proportions to change at runtime."
thumbnail_static: /assets/projects/05/thumbnail1.png
thumbnail_animated: /assets/projects/05/thumbnail1.png
layout: project
permalink: /projects/runtime-animation-rigging/
weight: 50 # Order for gallery
tags: [rigging]
---

*Stay Tuned! A more detailed breakdown of this project is coming soon!*

As our target audience of about 3-6yo children were growing up, we wanted to "age" some of the characters in the game world so that the style of the game would remain relatable with our players.

We all know that aging a character isn't just about scaling it up 150%.

{% include captioned_image.html src="/assets/projects/05/proportions-chart.png" caption="Image credit: 'Nursing Daddy Blog'" %}

So I used some animation runtime rigging techniques to allow us to change the proportions of the character to more realistically portray slightly older characters.

{% include captioned_image.html src="/assets/projects/05/modifier-component.png" alt="screenshot of proportion modifier component" %}

<br>
I identified these parameters as needing adjustment:
* **Shoulder Width:** Older boys are slightly wider than girls.
* **Head Height:** Neck elongates when growing up.
* **Spine Length:** Becomes proportiontely elongated.
* **Leg Width:** Becomes proportionately thinner.
* **Leg Length:** Becomes proportionately longer.
* **Feet Size:** Becomes slightly smaller proportionately.
* **Head Size:** Remains the same in absolute terms.

Combining all these adjusted parameters, along with traditional scaling, gives the following (exaggerated) result:

<div class="video-wrapper">
  <video autoplay loop muted playsinline>
    <source src="/assets/projects/05/aging-demo.mp4" type="video/mp4">
  </video>
</div>

