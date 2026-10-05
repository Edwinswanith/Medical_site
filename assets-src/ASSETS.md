# Asset register

Raw generation masters live in `assets-src/gen/` (gitignored). Only encoded, served files are
committed under `public/media/`.

| ID | File(s) | Role | Source | AI-generated | Owner / rights | Publication approved | Notes |
|---|---|---|---|---|---|---|---|
| A1 | `public/media/film/hero-1080.mp4`, `hero-720.mp4`, `hero-poster.{webp,jpg}` | Hero film loop | Veo 3.1 (`veo-3.1-generate-preview`), prompt in `assets-src/gen/a1.json`, 5 Oct 2026 | Yes | Generated for Tech Cogniverse | Pending | No people or text. Heart illustration is decorative, captioned as illustrative. Looped forward-and-back (no crossfade ghosting); audio removed. |
| A2 | `public/media/gen/hero-vertical.*` | Formats scene, phone beat | Gemini 3 Pro Image still → Veo 3.1 image-to-video (8 s, 9:16), 5 Oct 2026 | Yes | Generated for Tech Cogniverse | Pending | Same room as A1, no people. |
| S1–S5 | `public/media/gen/svc-{websites,films,presenter,social,subtitles}.*` | Service rows (hover film card / inline on touch) | Gemini 3 Pro Image still → Veo 3.1 Fast image-to-video (4 s, 16:9), looped forward-and-back | Yes | Generated for Tech Cogniverse | Pending | **svc-presenter shows an AI-generated person**, labelled "AI-generated" on the page; not a real presenter or clinician. svc-films shows a person from behind, unidentifiable. |
| C1–C4 | `public/media/gen/concept-{cardiology,dental,dermatology,orthopaedics}.*` | Specialty concept gallery | Gemini 3 Pro Image → Veo 3.1 Fast (4 s, 9:16) | Yes | Generated for Tech Cogniverse | Pending | Labelled "Concept" and "AI-generated". Anatomy is illustrative; needs clinical review before any client use. |
| W1 | `public/media/work/sheth-home.{webp,jpg}` | Case study (Prof. Hemant Sheth) | plainsight-medical.vercel.app/work/sheth-home.jpg (Plainsight, a CogniVerse studio) | No | Client site, our build | **Yes**: case study approved by user, 5 Oct 2026 | Shows the client's photo; keep only while the case is approved. |
| T1–T12 | `public/media/templates/*.{webp,jpg}` | Specialty templates table + hero | Screenshots of plainsight-medical.vercel.app/templates/* (top bar cropped) | No | CogniVerse | **Yes**: templates approved by user | Templates contain 3D anatomy from Z-Anatomy and BodyParts3D, **CC BY-SA 4.0**; credited in the footer. |

Not approved and not used: Plainsight's patient films, the HeartLink case, Dr Harmandeep Singh's AI presenter footage, library films.

Stills shown before each video are the clip's own first frame, so the swap has no jump.
Prompts: `assets-src/gen/gen_images.py`, `assets-src/gen/gen_videos.py` (gitignored with the masters).
