---
name: visual-design-master
description: Universal visual-quality gate for any Remotion or visual creative. Run before format-specific skills. Improves art direction, hierarchy, composition, typography, color, motion, and final visual QA regardless of topic.
---

# Visual Design Master

This is the universal design layer. It runs **before** topic- or format-specific rules.

It does not decide whether a video is a chat, quiz, ad, explainer, comedy, or app promo. It decides whether the result looks intentionally designed.

## Core contract

Before implementation, define:

1. **Design thesis** — one sentence describing the intended visual character.
2. **Primary focal object** — what the eye should notice first.
3. **Visual hierarchy** — primary / secondary / tertiary information.
4. **Composition system** — grid, margins, density, alignment and negative space.
5. **Type system** — display, supporting text, numbers/labels, line breaks.
6. **Palette system** — neutrals + at most one dominant accent unless the concept requires otherwise.
7. **Motion grammar** — hold / action / travel / settle; motion must explain attention, causality or state.
8. **Reference target** — what “good enough” means for this series.

Do not start by decorating weak structure.

## Universal rules

- One dominant focal point per beat.
- If two elements compete, choose a winner.
- Structure must work in grayscale before color effects.
- Use fewer, larger meaningful objects instead of many generic cards.
- Avoid default AI aesthetics: random gradients, glass panels, glow, decorative blobs, excessive rounded cards, centered-everything layouts.
- Do not repeat the same composition for every beat.
- Typography is part of the composition, not an overlay added at the end.
- Motion guides attention; it does not compensate for a weak idea.
- Silence and stillness are valid motion-design tools.
- Every decorative element must earn its place.

## Workflow

### Stage A — Art direction
Read [ART_DIRECTION.md](references/ART_DIRECTION.md). Pick a coherent visual world before choosing components.

### Stage B — Composition
Read [COMPOSITION.md](references/COMPOSITION.md). Sketch the visual hierarchy and eye path for every important beat.

### Stage C — Typography and color
Read [TYPOGRAPHY_JA.md](references/TYPOGRAPHY_JA.md) for Japanese/mixed-language work and [COLOR.md](references/COLOR.md).

### Stage D — Motion
Read [MOTION.md](references/MOTION.md). Define the rhythm before coding animation details.

### Stage E — Build
Only now apply the format-specific skill (text, chat, quiz, app promo, ad, etc.). Format rules may change *what* is shown; they may not bypass the visual-quality rules above.

### Stage F — Visual QA
Read [QUALITY_GATE.md](references/QUALITY_GATE.md). Render representative stills/contact sheet and inspect the full video. Revise before delivery when the gate fails.

## Required output from planning

For any substantial visual task, produce a short internal brief:

```md
Design thesis:
Focal object:
Hierarchy:
Grid / margins:
Type system:
Palette:
Motion grammar:
Reference target:
Avoid:
```

## Hard rejection patterns

Reject and redesign when any of these appear without a strong concept reason:

- disconnected cards floating in empty space;
- every scene = centered title + subtitle;
- text blocks that merely replace narration;
- arbitrary font-size changes;
- five or more unrelated colors;
- shadows/glow used to manufacture hierarchy;
- continuous motion with no hold;
- slow zooms that communicate nothing;
- more UI chrome than meaningful content;
- identical scene composition repeated three times;
- unreadable Japanese line breaks;
- final frame that does not settle cleanly.

## Delivery standard

A technically correct render is not enough. Deliver only when:

- the focal point is identifiable within about one glance;
- the contact sheet looks like one coherent visual system;
- typography and spacing feel deliberate;
- motion has visible rhythm and purpose;
- the ending has a designed hold;
- no scene feels like filler.

See [SOURCES.md](references/SOURCES.md) for the public design skills that informed this synthesis.
