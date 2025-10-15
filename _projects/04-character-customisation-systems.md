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





## What is it?

The ***Character Customisation System*** is a suite of tools designed to manage highly extensible avatar characters with hundreds of customisation options. The toolset addressed major production bottlenecks, enabled artists and designers to work more independently and made a lot of features feasible that would otherwise have been out of reach due to time constraints and/or technical limitations.

I was responsible for all design/development of Maya toolsets in this system, and some of the Unity tools.

![blurry screenshot of tools](/assets/projects/04/tools-screenshot.png)



<br>
## Background

From the start of production, our team had identified that a highly customisable avatar character was the highest priority for the product. The target audience was young children, and our research showed that a large outfit catalogue and customisation options would:
* Foster self-expression, creativity and experimentation.
* Motivate them to progress through the game as they chased the next outfit piece.
* Create a sense of community when they see their classmates' customised avatars in-game.

In addition to the above, a highly extensible character was necessary as we forcasted huge amounts of storytelling requiring a host of various types of characters/outfits.

{% include captioned_image.html src="/assets/projects/04/ingame-customisation.png" alt="Ingame Customisation" caption="In-game Character Customisation screen" %}



<br>
## Technical Requirements

The main avatar character had the following needs:
* 1 generic character rig that could be used for boy and girl variants.
* Customisable skin color, eye color, hair color.
* Customisable hair styles. Some are exclusive to the boy or girl variant, some are useable by both.
* Potentially hundreds of outfit options across several categories (hats, accessories, shirts, jackets, shorts, pants, skirts, shoes, socks, ...)
* Low runtime cost: The game could possibly render up to 20 characters concurrently, on circa 2015 mid-range mobile devices.





<br>
# Problems
{: .heading-accent }
------------

Given such a huge system, it was only natural that problems came up during production. Here are some notable ones:

* ***"No one wants to make more outfits because it's so annoying"*** : The process of adding new outfit variations was slow, error prone, and required multiple people across art/design/programming. The task was so daunting that we just didn't create anymore outfits.

* **Outfit Definitions**: Pre-defining a character's outfit for specific uses in-game was done by a programmer. It was difficult for the creative team to experiment.

* **Slow outfit customisation outside of the engine**: Customising the character's outfit in Maya for use outside of the engine took so many clicks, it became untenable when we had to make hundreds of renders.





<br>
# Solutions
{: .heading-accent }
------------

{% capture indented-section %}

### Streamlined Outfit Authoring

**This was the process of creating a new outfit variation:**

![Outfit Creation Process Legend](/assets/projects/04/outfit-creation-legend.png)

[![Outfit Creation Process (Before)](/assets/projects/04/outfit-creation-process-before.png)](/assets/projects/04/outfit-creation-process-before.png)

This process was error prone as the system was naming convention sensitive. Incorrect import parameters or entries would also cause glitches. Various members of the teams were constantly distracted due to the number of steps required.

To address this, I built a toolset in Maya that:
* Automated naming conventions, icon generation, technical checks, asset integration in Unity and database entry updates. 
* Had previewing functionality.
* Had batch processing capability.

**Process after introduction of the toolset:**

[![Outfit Creation Process (After)](/assets/projects/04/outfit-creation-process-after.png)](/assets/projects/04/outfit-creation-process-after.png)

**Result:**
* Artists could now focus on creating outfit variations without worrying about technical checks and conventions.
* Workflow dramatically sped up. A bulk of the work before the introduction of the toolset included rendering icons, renaming, copying files, cross-checking with tech guide, verifying in-engine, interrupting various members of the team for advice.
* No longer needed developer involvement after the introduction of the toolset.
* QA workload was reduced as checks were automated.
* Reduced anxiety throughout the team whenever we needed to make updates to the outfit catalogue.

{% include captioned_image.html src="/assets/projects/04/outfit-exporter.png" alt="Outfit Exporter Toolset" caption="Screenshot of the Outfit Authoring Management Tool" %}

{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>


 

<br>

{% capture indented-section %}
### Artist driven NPC customisation

Various NPC's in the game world needed custom outfit/customisation combinations. Eg: Jane, the cowgirl from the farm story arc was a fair-skinned girl with brown eyes, red hair, and wore a specific outfit. This was all pre-defined somewhere in the codebase and inaccessible to artists to change so they were often set-and-forget.

{% include captioned_image.html src="/assets/projects/04/cowgirl.png" alt="Jane, the Cowgirl" caption="Jane, the cowgirl" %}


If there was a shift in visual needs, the process to change the look of the NPC was very involved — We would need to imagine the outfit that was desired, find the equivalent code value, edit the definition for that character, recompile and check at runtime. And for good reason, it was often discouraged for artists to make code changes.

This was fine when we only had a few NPCs but became unmaintainable very quickly as the cast grew. Artists also essentially had no space to experiment or update NPCs if visual needs shifted.

To address this, I devised a simple system whereby artists could customise outfits on the main character as they were authoring the art/animation content in Maya. These customised characters could then be **exported as .JSON assets** and assigned in Unity without developer intervention. This freed up programmers from distraction, and allowed artists the freedom to update NPCs as they saw fit without ***"being scared of code changes"***.

[![Mesh Swapping Screenshot](/assets/projects/04/outfit-saver-tools.png)](/assets/projects/04/outfit-saver-tools.png)

{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>





<br>

{% capture indented-section %}
### Full Customisation within Maya

Every so often, we would need to do some character renders for promotional purposes etc. As the character customiser was a runtime feature, it required a lot of steps to customise the outfits within Maya. A project came up where we needed to do hundreds of character renders.

The solution was to fully recreate the customisation system within Maya so that artists/animators could freely customise their characters while authoring content.

In addition, the outfits would be fully keyframable. That way, each frame could have any number of referenced characters wearing any outfit. This dramatically sped up the workflow when dealing with hundreds of poses.

<div class="video-wrapper">
  <video loop muted playsinline controls>
    <source src="/assets/projects/04/outfit-keyframing-demo.mp4" type="video/mp4">
  </video>
</div>

{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>




