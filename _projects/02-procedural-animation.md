---
title: "Clockwork Spider"
subtitle: "Procedural Animation"
description: "Procedurally animated clockwork spider"
thumbnail_static: /assets/projects/02/thumbnail1.png
thumbnail_animated: /assets/projects/02/thumbnail2.png
layout: project
permalink: /projects/procedural-animation/
weight: 20 # Order for gallery
---

{% capture indented-section %}
<iframe title="vimeo-player" src="https://player.vimeo.com/video/1126167755?h=8b5c504e9d&loop=1" width="1280" height="720" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"   allowfullscreen></iframe>
{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>

{% capture indented-section %}
I originally modelled this clockwork spider over 3 days for a short challenge. I gathered references of various clock and watch parts, and pieced them together to create the model. The final product was 3 renders (using V-Ray + compositing in After Effects)

[![Clockwork Spider Renders](/assets/projects/02/clockworks-spider-renders.png)](/assets/projects/02/clockworks-spider-renders.png)

{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>


{% capture indented-section %}
Wireframes:
[![Clockwork Spider Renders](/assets/projects/02/clockwork-spider-wireframe1.png)](/assets/projects/02/clockwork-spider-wireframe1.png)

[![Clockwork Spider Renders](/assets/projects/02/clockwork-spider-wireframe2.png)](/assets/projects/02/clockwork-spider-wireframe2.png)

{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>





{% capture indented-section %}
# Procedural Animation
{: .heading-accent }
------------
Much later, I rigged the model for the purposes of procedurally animating it in Unity for a showcase in Tokyo. 

The spider uses no animated frames for its movement. Instead, all movement is driven by code — Procedural Animation — and the full logic all lives in 1 script, which I'll provide here in its entirety:
```csharp

using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class SpiderController : MonoBehaviour
{
    public float SpiderDesiredDistanceMin;
    public float SpiderDesiredDistanceMax;

    [Header("Body")]
    [SerializeField] bool _followMouse = true;
    [SerializeField] Transform _bodyControl;
    [SerializeField] float _rotateToTargetSpeed = 1f;
    [SerializeField] Vector3 vec;

    [Header("Legs")]
    [SerializeField] float _legStepOvershootFraction = 1f;
    [SerializeField] float _legStepHeight = 1f;
    [SerializeField] List<LegController> _legControllers;

    [Header("Hands")]
    [SerializeField] Transform _hand1;
    [SerializeField] Transform _hand2;
    [SerializeField] Transform _hand3;
    [SerializeField] float _hand2mult;
    [SerializeField] float _hand2offset;
    [SerializeField] float _hand3mult;
    [SerializeField] float _hand3offset;

    public Vector3 MousePosition => GameManager.Instance.MousePosition;

    NavMeshAgent _nav;
    LayerMask _groundLayerMask;

    [Serializable]
    class LegController
    {
        public string Name;
        public Transform LegControl;
        public Transform RestTransform;
        public float MaxDeviationFromRest;
        public float StepDuration;
        public LegController OppositeLeg;

        [HideInInspector][NonSerialized] public bool IsMoving;
        [HideInInspector][NonSerialized] public bool JustFinishedMoving;

        [HideInInspector] public Vector3 RestPosition;
        public Quaternion RestRotation => RestTransform.rotation;
        public Vector3 Position
        {
            get => LegControl.position;
            set => LegControl.position = value;
        }
        public Quaternion Rotation
        {
            get => LegControl.rotation;
            set => LegControl.rotation = value;
        }
    }

    void Start()
    {
        _nav = GetComponent<NavMeshAgent>();
        _nav.updateRotation = false;
        _groundLayerMask = LayerMask.GetMask("Ground");

        _legControllers[0].OppositeLeg = _legControllers[4];
        _legControllers[4].OppositeLeg = _legControllers[0];
        _legControllers[0].JustFinishedMoving = true;

        _legControllers[1].OppositeLeg = _legControllers[6];
        _legControllers[6].OppositeLeg = _legControllers[1];
        _legControllers[1].JustFinishedMoving = true;

        _legControllers[2].OppositeLeg = _legControllers[5];
        _legControllers[5].OppositeLeg = _legControllers[2];
        _legControllers[2].JustFinishedMoving = true;

        _legControllers[3].OppositeLeg = _legControllers[7];
        _legControllers[7].OppositeLeg = _legControllers[3];
        _legControllers[3].JustFinishedMoving = true;
    }

    void Update()
    {
        Move();
        Rotate();
        UpdateHands();
        UpdateAllLegs();
    }

    void Move()
    {
        if (!_followMouse) return;
        if (Time.frameCount % 15 != 0) return; // run every 15 frames

        float distanceFromMouse = Vector3.Distance(transform.position, MousePosition);
        Vector3 directionToSpider = (transform.position - MousePosition).normalized;
        if (distanceFromMouse > SpiderDesiredDistanceMax)
        {
            Vector3 targetPosition = MousePosition + directionToSpider * SpiderDesiredDistanceMin;
            _nav.SetDestination(targetPosition);
        }
        else if (distanceFromMouse < SpiderDesiredDistanceMin)
        {
            Vector3 targetPosition = MousePosition + directionToSpider * SpiderDesiredDistanceMax;
            _nav.SetDestination(targetPosition);
        }
    }

    void Rotate()
    {
        if (!_followMouse) return;
        Quaternion targetRotation = Quaternion.LookRotation((MousePosition - transform.position).normalized);
        Quaternion targetRotationYonly = Quaternion.Euler(0, targetRotation.eulerAngles.y, 0);
        transform.rotation = Quaternion.RotateTowards(transform.rotation, targetRotationYonly, _rotateToTargetSpeed * Time.deltaTime);

        if (Physics.Raycast(_bodyControl.transform.position + _bodyControl.transform.up * 5f, -_bodyControl.transform.up * 10f, out RaycastHit hit, Mathf.Infinity, _groundLayerMask))
        {
            Vector3 projectedForward = transform.forward - hit.normal * Vector3.Dot(transform.forward, hit.normal);
            _bodyControl.rotation = Quaternion.LookRotation(projectedForward.normalized, hit.normal);
        }
    }

    void UpdateAllLegs()
    {
        foreach (LegController leg in _legControllers)
        {
            UpdateLeg(leg);
        }
    }

    void UpdateLeg(LegController leg)
    {
        // Plant rest positions on the floor
        if (Physics.Raycast(leg.RestTransform.position + Vector3.up * 10f, -Vector3.up, out RaycastHit rayHit, Mathf.Infinity, _groundLayerMask))
        {
            leg.RestPosition = rayHit.point;
        }

        if (leg.IsMoving) return;
        if (leg.JustFinishedMoving)
        {
            leg.JustFinishedMoving = false;
            return;
        }
        if (leg.OppositeLeg.IsMoving) return;

        float distanceFromRestPos = Vector3.Distance(leg.Position, leg.RestPosition);
        if (distanceFromRestPos > leg.MaxDeviationFromRest)
        {
            StartCoroutine(MoveLeg(leg));
        }
    }

    IEnumerator MoveLeg(LegController leg)
    {
        leg.IsMoving = true;
        Quaternion startRotation = leg.Rotation;
        Vector3 startPosition = leg.Position;
        Quaternion endRotation = leg.RestRotation;
        Vector3 endPosition = leg.RestPosition;

        float actorSpeedFactor = Mathf.Clamp(_nav.velocity.magnitude, Mathf.Epsilon, _nav.velocity.magnitude) / _nav.speed;

        Vector3 direction = endPosition - startPosition;
        float overshootDistance = Mathf.Clamp(leg.MaxDeviationFromRest * _legStepOvershootFraction * actorSpeedFactor, leg.MaxDeviationFromRest * _legStepOvershootFraction / 10f, leg.MaxDeviationFromRest * _legStepOvershootFraction);
        Vector3 overshootVector = direction * overshootDistance;
        endPosition += overshootVector;

        // try to ground the feet
        if (Physics.Raycast(endPosition + transform.up * 10f, -transform.up, out RaycastHit rayHit, Mathf.Infinity, _groundLayerMask))
        {
            endPosition = rayHit.point;
        }

        Vector3 center = (startPosition + endPosition) / 2f;
        center += Vector3.up * Vector3.Distance(startPosition, endPosition) * _legStepHeight;
        float stepDurationNormalized = Mathf.Clamp(leg.StepDuration / actorSpeedFactor, leg.StepDuration, leg.StepDuration * 2f);
        float timer = 0f;
        do
        {
            timer += Time.deltaTime;
            float normalizedTime = timer / stepDurationNormalized;
            normalizedTime = Easing.Cubic.InOut(normalizedTime);

            // quadratic bezier
            leg.Position = Vector3.Lerp(
                Vector3.Lerp(startPosition, center, normalizedTime),
                Vector3.Lerp(center, endPosition, normalizedTime),
                normalizedTime
                );
            leg.Rotation = Quaternion.Slerp(startRotation, endRotation, normalizedTime);

            yield return null;
        }
        while (timer < stepDurationNormalized);
        leg.IsMoving = false;
        leg.JustFinishedMoving = true;
    }

    void UpdateHands()
    {
        _hand1.localRotation.ToAngleAxis(out float angle2, out Vector3 axis2);
        angle2 *= _hand2mult;
        _hand2.localRotation = Quaternion.AngleAxis(angle2, axis2) * Quaternion.AngleAxis(_hand2offset, transform.up);

        _hand1.localRotation.ToAngleAxis(out float angle3, out Vector3 axis3);
        angle3 *= _hand3mult;
        _hand3.localRotation = Quaternion.AngleAxis(angle3, axis3) * Quaternion.AngleAxis(_hand3offset, transform.up);
    }
}
```

The concept is fairly simple when broken down:
* The body is assigned a built-in Damped Transform Constraint, to smooth out movements.
* The body is told to move towards a target position.
* Every leg is set up with a built-in IK Constraint.
* Each foot has a goal area it needs to keep close to. When the leg extends too far from this goal (due to the body moving away), the leg will take a step to the position.
* Arachnids tend to move their legs in pairs. So I implemented a similar logic here. Legs **diagonally opposite** each other will try to take steps at the same time. Legs **directly opposite** each other will avoid taking steps until the opposite leg has finished its step.

With the described logic above, it will seem like the legs are always 'catching up' to the body, because that's essentially what is happening — the body moves first, and the legs try to follow. To mitigate this, the logic overshoots the legs' stepping positions.

With everything put together and some additional damping + easing, the result is fairly convincing despite the logic being quite simple.

For the demo, the user moves a laser pointer around the screen, and 3 clockwork spiders will try to follow the laser pointer.

{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>

This has also been ported to run on mobile, so if you ever see me in person, make sure to ask me to see it :)

<div class="video-wrapper">
  <video autoplay loop muted playsinline>
    <source src="/assets/projects/02/clockwork-spider-mobile-demo.mp4" type="video/mp4">
  </video>
</div>







{% capture indented-section %}
# Clockwork Scorpion
{: .heading-accent }
------------
I'm now working on a *"sequel"* to the spider. A Scorpion. This model is many times more complicated, with a lot of moving parts. The scorpion will eventually use the procedural animation system as well. Here are some sneak previews:

[![Clockwork Scorpion Render1](/assets/projects/02/clockwork-scorpion-render1.png)](/assets/projects/02/clockwork-scorpion-render1.png)
[![Clockwork Scorpion Render2](/assets/projects/02/clockwork-scorpion-render2.png)](/assets/projects/02/clockwork-scorpion-render2.png)
[![Clockwork Scorpion Render3](/assets/projects/02/clockwork-scorpion-render3.png)](/assets/projects/02/clockwork-scorpion-render3.png)

{% endcapture %}
<div class="indented-section">{{ indented-section | markdownify }}</div>

