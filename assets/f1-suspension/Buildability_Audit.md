# F1Suspension - buildability audit (2026-10-28)

Question: if Jay bought the parts and had the designed parts made, would this front corner go together and work?
Scope: the left-front pushrod corner as modelled (`..\..\F1Suspension.iam`, STEP exports in `..\..\Export\STEP_parts`).
Inventor was NOT opened; everything below comes from the STEP exports, `_build\design.py`, `Analysis\analysis.json`
and catalogue/distributor data found online today. Nothing here has been built or tested.

## Verdict: NOT YET

The kinematics and most of the welded/machined structure check out, but as a buy-and-build project it fails on two
levels:

1. **Purchasing.** About half the purchased parts are F1-only (C/C disc, 18x12 F1 Mg rim, Pirelli 305/720 R18 tyre,
   F1-class damper) or have no catalogue part at all (70x110x54 hub bearing). None of these can be bought by an
   individual. The realistic substitutes (GT3-class wheel, tyre and brakes, a GT damper) change the tyre radius, the
   hub nose, the caliper mount and the damper length, so the CAD has to change to use them.
2. **Three real component failures** come up once the real catalogue ratings replace the ratings the analysis assumed
   (details below).

There is also no car to bolt it to. The 24 M8 bolts go into monocoque inserts on a reference chassis section.
Physically, the most this project can be is a static display / test-rig corner.

## Ranked issues

| # | Issue | Evidence | Fix |
|---|---|---|---|
| 1 | **Rocker pivot bearings badly undersized.** 2x 6202-2RS, C0 = 3.75 kN each (7.5 kN pair), carry 20.3 kN in C4 bump and 9.9 kN in C1 cornering | static SF **0.37** (C4) / 0.76 (C1) against an s0 >= 1 requirement | 2x **SKF GE 15 ES** (15x26x12, C0 85 kN). Keeps the d15 pin. Hub bore 35 -> 26 H7, wall 5.5 -> 10 mm. SF 8.4 |
| 2 | **Pushrod rod end: wrong part and under-rated.** The BOM names SKF SIKAC 12 M (real C0 **14 kN**) and Aurora XM-12 (a 3/4 in bore, 7/8-14 part from the wrong series). The analysis assumed 35 kN. The CAD inserts are **tapped**, so the part has to be a **male** rod end, but the BOM lists female SI/SIKAC | 21.3 kN pushrod compression: SF **0.66** (SIKAC 12 M), 1.20 (SKF SI/SA 12 E, C0 25.5 kN) | Male M12x1.25 rod ends rated >= 32 kN, e.g. Fluro steel M12x1.25 (C0 42 kN, RS 1844561 RH / 1844576 LH): SF 1.97. Also check the pitch: SKF standard E-series is listed as plain "M12", and the fine-pitch SIKAC is the /VZ019 variant |
| 3 | **Coil spring overstressed.** d12 / Dm64 / 4.9 coils, 160 N/mm; 844 MPa at full bump. The project used Su 1900 MPa; ASTM A401 Cr-Si at 12 mm gives Su **1533 MPa** (Shigley T10-4) | SF **0.91** before set removal (0.50 Su), 1.18 after (0.65 Su), against a 1.2 target | Buy a catalogue racing spring rated for its full travel (Hyperco 2.25 in ID, ~900 lb/in = 157.6 N/mm; ride freq stays 4.0 Hz). Spring ID goes 52 -> 57.2 mm, which still clears the 44 mm body |
| 4 | **Damper does not exist as specified.** Needs 60 mm stroke, 262.5 mm extended / 207.8 mm compressed eye-to-eye, 12 mm eyes, ~914 lb/in spring. The real Ohlins TTX25 MkII (verified) is 200 mm extended, 57 mm stroke, 8 mm eye bearings, springs up to 650 lb/in | TTX25 stroke SF 1.04 (54.7 of 57 mm). Length is 62 mm short. Spring too stiff for it | Use a GT/formula damper (e.g. Ohlins TTX36 216/68, specs NOT verified, get the datasheet), then re-place DC/RDP so the static length and stroke fit |
| 5 | **Unbuyable F1 parts**: C/C disc 328x32, 6-pot F1 caliper, 18x12 forged Mg centre-lock rim, Pirelli 305/720 R18, 70x110x54 hub bearing (no catalogue match found) | see buy_list.csv | GT3-class substitutes: BBS E88 18x12 centre-lock, Michelin Pilot Sport GT 18 in slick (~680-700 mm OD -> **R_TYRE 360 -> ~340, re-solve all hardpoints**), AP Racing CP9660 + iron 330-355x32 disc (radial mount -> new caliper lugs), 2x 7014 ACBB back-to-back (70x110x40 + 14 mm spacer) |
| 6 | **M12 bolt bending at the pushrod joints.** 24 mm clevis gap + 8 mm ears, 21.3 kN | sigma_b 816 MPa vs Sy 1080 MPa (12.9): SF **1.32** < 1.5. Shear SF 7.8 is fine | Close the gap (ear-to-ear 18-20 mm with thinner cone spacers, which costs misalignment range), or use a 14 mm bolt, or a stepped 4340 pin |
| 7 | **No internal corner radii modelled on the machined 7075 parts.** The upright has 83 planar faces and its only cylinders are holes (R5/R6 and up). The FEA peaks (upright 732 MPa, clevis 436 MPa, lower wishbone 412 MPa) are at those sharp corners | step_geometry.json | Specify R >= 3 mm in-plane corners (6 mm end mill) and R >= 2 mm root fillets at the clevis/lug roots, then re-run FEA. Real tool radii will lower those peaks |
| 8 | Data inconsistencies | `design.py` TUBE['tierod'] = 19.05x1.65 but the CAD and analysis use 22.2x1.65. design.py DAMPER spring_id 48 / wire 10.5 / 4.5 coils, but the CAD spring is d12 / Dm64 / 4.9 coils | Fix the stale values so the drawings, BOM and calcs agree |

## 1. Buy list (full table: `buy_list.csv`)

| Item | Real part | Verified? | Real rating vs CAD | ~USD |
|---|---|---|---|---|
| GE 12 E x8 | SKF GE 12 E | yes (RS 2176682, Rubix, Klium) | d12 D22 B10 C7, C 10.8 kN, C0 54 kN: **matches** CAD + analysis | 15-25 ea |
| Rod ends x4 | Fluro male M12x1.25 RH/LH, C0 42 kN | RS listing (Fluro type code unconfirmed) | BOM part (SIKAC 12 M) C0 14 kN, **wrong gender** | 35-60 ea |
| Rocker bearings x2 | GE 15 ES (replaces 6202-2RS) | yes (RS 2176689; 6202 RS 4420082) | 6202 C0 3.75 kN **fails** | 20-30 ea |
| M12x55 12.9 x12, M8x20 12.9 x24, M12 cl.10 locknut x13 | ISO 4762 / ISO 7042 | standard parts, SKUs not checked | match | ~75 total |
| Damper | GT/formula damper, e.g. Ohlins TTX36 216/68 | **no**, datasheet needed | TTX25 (verified) too short, too little stroke, too soft | 1500-2500 |
| Spring | Hyperco 2.25 in ID ~900 lb/in | **no**, "186A0900" is inferred from the numbering (185A1350 2.25x5 in 1350 lb/in is real) | ID 52 -> 57.2 | 80-120 |
| Hub bearing | 2x 7014 ACBB back-to-back | no catalogue 70x110x54 found | width 54 -> 40 + spacer | 150-350 |
| Disc + caliper | AP Racing CP9660 + iron disc | kit price verified (S550 kit $5.8-6.0k/axle) | mount type changes | ~3,000-3,500 per corner |
| Rim | BBS E88 18x12 centre-lock | used pair listed $1.5-1.7k; new 19 in sets ~$8.6k/4 | centre-lock interface changes | 1,500-2,200 |
| Tyre | Michelin Pilot Sport GT 18 in slick | price listing $763-887 | ~40 mm smaller OD | ~800 |
| 4130 tube | 1.000x0.065, 0.875x0.065, 1.000x0.083 in | standard aircraft sizes | match | ~150 total |
| Billet / bar | 7075-T6 plate (upright block ~300x130x410, ~44 kg); Ti-6Al-4V bar 8 in x 7.5 in (~30 kg) | - | - | ~2,500-3,500 material |

**One-corner cost, realistic substitutes:** purchased parts ~$7-9k, plus material ~$3k, plus outside machining
(5-axis upright, Ti hub, rocker, 5 clevises, nuts) ~$6-12k and TIG/normalising ~$1-2k. **Total about $17-26k for one
display corner**, before a chassis. Swapping the Ti hub for 4340 saves ~$2k.

## 2. Manufacturability (DFM: CNC / welding; no 3D-printed parts in this project)

Method: exact B-rep facts from the STEP exports (`step_geometry.py` -> `step_geometry.json`, build123d via the cadgen
runner), then the dfam ray-cast wall tool on tessellated STLs (`stl\`) for thin-wall facts. Rules: Protolabs/Hubs CNC
guidance (dfm skill `references/cnc.md`). Measured internal-corner radii come from cylindrical faces only. Concave
in-plane edges were not enumerated, so corner findings are **review**, not measured fails.

| Part / process | Measured facts | Result | Action |
|---|---|---|---|
| Upright, 7075-T6 billet | 281x121x407 mm envelope, 1,050 cm3, **7.6 % of the block** (92 % removed from ~14 L / 39 kg); min wall 5.0 mm (p05 8.0); clevis bolt axes in X and Z plus caliper lugs | review | 5-axis or 4+ setups. Add corner radii (issue 7). The 110 mm bearing bore in 7075 needs an interference fit allowing for the Al/steel expansion difference (~0.03 mm at +60 C) |
| Hub, Ti-6Al-4V turned | dia 198 x 176, 10 % fill, min wall 5.0; 6 x R15 bores; M80x1.5 and M66x1.5 single-point threads | pass (feasible) / cost | Slow and expensive in Ti. Use a 4340 alternative for a display corner |
| Rocker, 7075-T6 | 40x85x122, 26.6 % fill; two 8 mm plates with a 24 mm gap around a 46 mm hub; hub wall 5.5 mm around the 35 bore; min wall 5.49 | review | 7075 cannot be welded, so this must be one piece machined from solid. The 24 mm slot is ~60-85 mm deep (3.5:1), which needs a long-reach 20 mm cutter. The GE 15 ES fix thickens the hub wall to 10 mm |
| Wishbone clevis x5, 7075-T6 | 70x48x59, min wall **3.74 mm** (p05 8.0) next to the M8 holes | review | Check the M8 counterbore to edge distance (>= 1.5 d) |
| Rocker mount, 7075-T6 | 100x56x62, min wall **3.5 mm** (p05 8.0) | review | Same edge-distance check |
| Upper / lower wishbone, 4130 TIG | 0.065 in (1.65 mm) tube walls to 36 OD x 16 GE housings; FEA lower wishbone p99.9 266 MPa vs HAZ 360 MPa | pass with care | Thin-to-thick joints need a skilled TIG welder and a fixture. Normalising after welding distorts the part, so **line-ream the GE bores after heat treatment**. Tubes are standard 1.000/0.875 in aircraft sizes |
| Pushrod / tie rod | tube + welded threaded inserts, tapped M12x1.25 x 29 mm | pass | Engagement ~26 mm >= 18 mm (1.5 d), but the rod end then has only ~7 mm of length adjustment left |
| Hub nut M66x1.5 | 12 mm thick, 4 spanner slots, min section **2.98 mm** at a slot root | review | Deepen the nut to 15 mm or shorten the slots |
| Wheel nut M80x1.5, 7075 on a Ti hub thread | - | review | Galling risk: hard-anodise + anti-seize, or make it in Ti / steel |
| 7075 welding | none found: every 7075 part is machined | pass | - |

Not measured: hole depth/diameter ratios, tolerance stack of the GE housing bores across two welded legs, setup counts
and cycle times (no shop/fixture data).

## 3. Function (independent re-check, `f1_buildability_calcs.py` -> `f1_buildability_calcs.json`)

Loads are the project's own quasi-static cases (800 kg F1-class car, 2.0 W downforce, 4 g braking/cornering, 3 g
kerb strike). Target SF 1.5 on strength, s0 >= 1 on bearing C0.

| Check | Demand | Capacity | SF | Status |
|---|---|---|---|---|
| Spring rate d12/Dm64/4.9 | 160.0 N/mm (914 lb/in) | - | - | matches project |
| Ride: k_w = k IR^2 (IR 0.894) | 128.0 N/mm (project 133.3 incl. dIR term) | ride 4.03 Hz (4.0 Hz with a 900 lb/in Hyperco) | - | OK, ~4 Hz target |
| Spring shear at full bump | 844 MPa | 767 (0.50 Su) / 997 (0.65 Su) MPa | 0.91 / 1.18 | **FAIL** |
| Coil bind | min 95.8 mm | solid 82.8 mm | 1.16 | pass |
| Damper stroke (CAD 60 / TTX25 57 mm) | 54.7 mm | 60 / 57 | 1.10 / 1.04 | pass / **fail** (5 % margin) |
| Pushrod buckling 25.4x2.11, L 653 (Johnson, L/r 79) | 21.3 kN | 45.8 kN | 2.15 | pass |
| Lower rear leg buckling 25.4x1.65 | 14.7 kN | 41.8 kN | 2.84 | pass |
| Tie rod buckling 22.2x1.65 | 1.9 kN | 37.4 kN | 20 | pass |
| Pushrod rod end SIKAC 12 M / SI 12 E / Fluro | 21.3 kN | 14 / 25.5 / 42 kN | 0.66 / 1.20 / 1.97 | **FAIL** / fail / pass |
| GE 12 E at LF / LBJ / damper eyes | 20.9 / 16.8 / 16.6 kN | C0 54 kN | 2.58 / 3.21 / 3.26 | pass (steel/steel, needs grease; dynamic C only 10.8 kN, so wear life is short) |
| Rocker pivot 2x 6202-2RS | 20.3 kN (C4), 2.4 kN at rest | 7.5 kN | **0.37** / 3.1 | **FAIL** |
| Rocker pivot fix 2x GE 15 ES | 20.3 kN | 170 kN | 8.4 | pass |
| M12 12.9 double shear | 21.3 kN | 166 kN | 7.8 | pass |
| M12 bolt bending, 24 mm gap | 816 MPa | 1080 MPa | **1.32** | fail vs 1.5 |
| Clevis ear bearing 7075 | 111 MPa | 755 MPa | 6.8 | pass |
| Rod-end thread engagement | 18 mm needed | ~26 mm | 1.44 | pass |

Already in the project and not re-derived here: KPI 8.46 deg, caster 6.93 deg, scrub 39 mm, camber gain -0.54 deg /
25 mm, bump steer 0.26 mdeg, 0 interference over travel and steering, FEA p99.9 SF >= 1.59 on all machined/welded
parts. Not covered by anyone: fatigue (kerb and braking cycles), heave spring / ARB, tyre moments, the right-hand
corner, and the chassis-side inserts.

## Sources (accessed 2026-10-28)
- SKF GE 12 E: https://ph.rs-online.com/web/p/plain-bearings/2176682 , https://uk.rubix.com/en/radial-spherical-plain-bearing/p-G1321001154 , https://www.klium.be/en/skf-ge-12-e-joint-bearing-12-x-22-x-10-mm-78632
- SKF SIKAC 12 M/VZ019 (14 kN): https://sg.rs-online.com/web/p/rod-ends/0587726 ; SKF SI 12 E (C0 25.5 kN): https://www.simplybearings.co.uk/products/si12e-skf
- Fluro M12x1.25 rod ends (42 kN): https://ph.rs-online.com/web/p/rod-ends/1844576 , https://twen.rs-online.com/web/p/rod-ends/1844561
- Aurora -12 series = 3/4 in bore: https://ie.rs-online.com/web/p/rod-ends/1852792 , https://www.applied.com/c-aurora-bearing-co--am-12/p/100740988
- SKF 6202-2RSH (C0 3.75 kN): https://uk.rs-online.com/web/p/ball-bearings/4420082 ; GE 15 ES (C0 85 kN): https://kr.rs-online.com/web/p/plain-bearings/2176689
- Ohlins TTX25 MkII (200 mm / 57 mm / 8 mm eyes / 150-650 lb/in): https://www.ohlins.com/motorsports/track/ttx25-mkii , https://www.ohlins.eu/en/products/automotive/ttx-25-mkii-fsae-200--6682 ; TTX36 216/68: https://www.ohlins.com/automotive/motorsport/ttx36-216-68
- Hyperco 185A1350: https://www.jegs.com/i/hyperco-557-185a1350-a-series-2-25-x-5-in-spring-1350-lbs
- 70x110x54 hub bearing: no catalogue match (closest 5214 = 70x125x39.7): https://www.applied.com/c-ntn-bearing-corp--5214/p/100758480
- BBS E88: https://stanceworks.com/forums/forum/the-classifieds/wheels-tires-for-sale/other-bolt-patterns-adapters-classifieds/74950-centerlock-bbs-e88-for-sale-trade , https://www.systemmotorsports.com/collections/wheels/products/bbs-e88-18
- Michelin Pilot Sport GT slick: https://gspeed.com/products/michelin-pilot-sport-gt-slick-31-71-s9m
- AP Racing CP9660 kit: https://ffperformance.co/product/essex-ap-racing-competition-brake-kit-front-cp9660-372mm-enp-finish-s550-s650-mustang
- Spring wire Su / allowables: Shigley's Mechanical Engineering Design, Tables 10-4 and 10-6.

## Files
- `buildability_audit.md` (this file), `buy_list.csv`
- `f1_buildability_calcs.py` -> `f1_buildability_calcs.json`
- `step_geometry.py` -> `step_geometry.json`, `stl\*.stl` (tessellated exports used for wall checks)
