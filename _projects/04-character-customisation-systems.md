---
title: "Character Customisation Systems"
subtitle: "Maya and Unity Toolset"
description: "Systems for on-the-fly outfit/character swapping. Full character customisation"
thumbnail_static: /assets/projects/04/thumbnail1.png
thumbnail_animated: /assets/projects/04/thumbnail2.png
layout: project
permalink: /projects/character-customisation/
weight: 40 # Order for gallery
---

### What is it?

A main character I was managing had the following needs:
* 1 generic character rig that could be used for boys and girls.
* Customisable skin color, eye color, hair color.
* Customisable hair styles. Some are exclusive to the boy or girl variant, some are applicable to both.
* Potentially hundreds of outfit options across several categories (hats, accessories, shirts, jackets, shorts, pants, skirts, shoes, socks, ...)

The systems around this would see daily use by various people, so the following was also necessary:
* Ease of use and expansion of outfits/customisation options by artists/animators without tech input.
* Management by designers who do not have access to our authoring tools or the engine (using Google Sheets and other proprietary tools).
* Management of assets for use in-engine and non-realtime purposes (print, marketing, trailers, etc).


# The Tools
{: .heading-accent }
------------

{% capture indented-section %}
### Artist defined outfits
A project I was working on required countless pre-defined variations of the main character. Hard-coding outfit values into these uses cases very quickly became unmaintainable, especially as visual needs were constantly shifting. So I devised a simple system whereby the artists could customise the outfits on the main character as they were authoring the art/animation content in Maya. These customised characters could then be exported as .json and assigned in Unity without developer intervention.

[![Mesh Swapping Screenshot](/assets/projects/04/outfit-saver-tools.png)](/assets/projects/04/outfit-saver-tools.png)

As new outfit options were constantly being created, this toolset was also able to:
* Export new/updated outfit options directly into the Unity Project, along with automatically generated icons.
* Update a Google Sheet designers were using as the database for outfit related data.

{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>



{% capture indented-section %}
### Outfit Keyframing
To support a project requiring hundreds of character renders, I devised a toolset to allow artists to easily swap between different characters/outfits. This could then be keyframed.

Scenes would have several characters on-screen at once, and each frame would be a new render. Artists were able to freely step through the frames and change the rig to any character they wanted. This dramatically sped up workflow when dealing with hundreds of poses.

<div class="video-wrapper">
  <video loop muted playsinline controls>
    <source src="/assets/projects/04/outfit-keyframing-demo.mp4" type="video/mp4">
  </video>
</div>
{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>




Outfit Changer


Charcater switcher


JSON Outfits

The Rig

The Shader









{% capture indented-section %}


{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>