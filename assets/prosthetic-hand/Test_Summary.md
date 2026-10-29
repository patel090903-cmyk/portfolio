# ProstheticHand - test results summary

Model: `..\ProstheticHand.iam` (assembly parameters `Grip` 0-1, `ThumbRot` 0-90 deg, `ThumbGrip` 0-1). Full write-up: `..\Analysis\ProstheticHand_CalcReport.pdf` (copy in `Grasp\`). Calculations: `..\Analysis\hand_analysis.py` -> `..\Analysis\analysis.json`.
**Designed and calculated only: every result here is a CAD measurement, a calculation or a catalogue value. Nothing has been built or tested.**

| Test | Result | Criterion | Status | Files |
|---|---|---|---|---|
| Assembly DOF / health | 92 occurrences (34 files), 273 constraints (191 flush, 66 mate, 16 angle), total DOF 0, 0 unhealthy | 0 DOF | PASS | Assembly_Checks\assembly_checks.json |
| Interference | 108 poses (Grip 9 steps x ThumbRot 0/30/60/90 x ThumbGrip 0/0.5/1): 0 structural clashes. 34 poses where a closing finger meets the opposed thumb: that is contact (the real finger stops there), not a design clash | 0 structural | PASS | Assembly_Checks\assembly_checks.txt |
| Static clashes (iteration 1) | 10 pairs, 192 mm3: thread-forming screws modelled at the pilot size, nut thread, a cover screw over the servo tab, little-finger PQ12 lug in the palm wall. All fixed | 0 | PASS (iteration 2) | Assembly_Checks\assembly_checks.txt |
| Controller envelope | largest finger Grip before thumb contact: 1.0 with the thumb lateral (0 deg) or open; 0.375-0.625 with the thumb rotated 30-90 deg and partly flexed; 0 at 90 deg open (the opposed thumb sits under the index) | for firmware | - | Assembly_Checks\assembly_checks.json |
| Kinematics in CAD | every phalanx, PQ12 rod and thumb pose vs design.py over all 108 poses: max error 0.0003 mm | matches | PASS | Assembly_Checks\assembly_checks.json |
| Tendon routing | wrap grooves give constant moment arms 6.5 / 4.4 / 3.2 mm; full close needs 19.9 mm of the 20 mm PQ12 stroke (little finger 17.6 mm); thumb 20.2 mm = 155 deg of the servo's ~160 deg | <= stroke | PASS | Grasp\closing_sequence.png |
| Closing sequence | MCP, then PIP, then DIP (flexor / elastic ratios 1.30 > 0.88 > 0.64) | proximal first | PASS | Grasp\closing_sequence.png |
| Power grip | 11.8 N toward the palm on a 50 mm cylinder (resultant 20.7 N), 25.7 N on 30 mm; 15.1 N at PQ12 stall; 13.1 N held with the motors off (35 N back-drive) | 40 N target | **NOT MET** | Grasp\power_grasp.png |
| Moment-arm iteration | first arms 5.4 / 4.8 / 4.0: finger curls around a 50 mm cylinder touching only with the tip, ~0 N toward the palm. Now 6.5 / 4.4 / 3.2: P1 + P3 contact on every finger | stable wrap | PASS (iteration 2) | ..\Analysis\analysis.json |
| Tip pinch | thumb parked on its flexion stops, index closes onto the pad (DIP on its stop, pad mu 0.5): index can push 17.3-19.5 N, rotation servo holds 8.5 N -> 8.5 N | report | limited by thumb rotation servo | ..\Analysis\analysis.json |
| Lateral pinch | thumb (rot 25 deg) onto the index P3 radial face: thumb can push 68 N, rotation servo holds 7.3 N -> 7.3 N | report | limited by thumb rotation servo | ..\Analysis\analysis.json |
| PQ12 gear ratio | 30:1 3.5 N / 0.8 s; 63:1 8.5 N / 1.6 s; 100:1 11.8 N / 2.3 s (50 mm grip / full close) | grip first | 100:1 chosen | Actuation\actuator_trade_and_sf.png |
| Thumb servos | flexion: 44 N spool tension at stall, 22 N continuous; rotation: 0.333 Nm stall, the weak link for pinch | - | OPEN (2:1 stage) | ..\Analysis\analysis.json |
| Elastic return | 2.1 N open / 3.0 N closed; MCP return torque 10.6 Nmm vs finger weight 8.6 Nmm (SF 1.22); costs 5.7 % of tendon torque | SF > 1 | PASS (thin, modulus assumed) | ..\Analysis\analysis.json |
| Pins 3 mm A2 | MCP pin 112 MPa at stall (SF 3.1); bushings 6.4 MPa of 80; cheek bearing 6.4 MPa: SF PETG 4.7, PLA 5.5, PA12 4.4 | SF >= 2 | PASS | Actuation\actuator_trade_and_sf.png |
| Printed structure | clevis cheeks 0.8 MPa (SF 30), PQ12 lug clevis SF 18, wrist bolt 1/2-20 SF 15.6 for 50 N at 110 mm | SF >= 2 | PASS | ..\Analysis\analysis.json |
| Tendon | 50 N stall on PowerPro 80 lb (356 N), knot 50 %: SF 3.6 | SF >= 3 | PASS | ..\Analysis\analysis.json |
| Electrical | 5.8 A if everything stalls vs 5 A regulator (firmware staggers starts); 50 J per grasp; ~127 grasps per 16 h day on 2S 800 mAh | - | OPEN (battery size) | ..\Analysis\analysis.json |
| Mass (Inventor) | hand 345 g; 460 g with the forearm bay, electronics and battery | ~450 g | hand PASS, total 2 % over | ..\ProstheticHand_BOM.csv |
| 3D printing | plate 1 PETG: 18 parts in 230.5 x 213 mm, 50 mm tall; plate 2 PLA: 2 parts in 132 x 70 mm, 80 mm tall; overhang below 45 deg 0-21 % of surface (phalanges ~16-21 %, small supports under the tongues) | fits 256 x 256 | PASS | Printability\printability.csv |
| Drawings | GA: overall 283 / 121 / 70 / 196.5 checked, 34 balloons, 34 parts-list rows; printed-part sheets: 33 dims kept, 8 wrong auto-dims deleted (e.g. a 50.5 "overall" on the 58.5 mm P1) | every dim checked | PASS | ..\Drawings\drawing_checks.json |
| Buildability | every bought part has a part number; $384 of $624 from confirmed listings; 6 open items | buildable | BUILDABLE (6 open) | Buildability\buildability_check.md |

## Design iterations driven by these checks

1. Tendon routing (calc): straight channels through the joint tongues gave a moment arm that shrinks and then reverses with flexion. Every tongue now has a wrap groove (virtual pulley) around the pin, so the moment arm is constant and the Inventor joint expressions are exact.
2. Moment arms (calc, iteration 1 -> 2): the equilibrium solver showed 5.4 / 4.8 / 4.0 mm puts so much torque on the DIP that the finger curls past the object with only the tip touching (~0 N toward the palm on 50 mm). Changed to 6.5 / 4.4 / 3.2 mm and cut the DIP range to 50 deg to stay inside the 20 mm stroke: 11.8 N on 50 mm, P1 + P3 contact.
3. Thumb layout: a PQ12 for the thumb did not fit (its 45 + 20 mm length runs into the thumb base). The flexion servo rides inside the rotating yoke with a 7.5 mm spool, so thumb rotation never changes the tendon length.
4. Static interference (CAD, iteration 1 -> 2): 10 clashing pairs (192 mm3), all modelling or placement issues; fixed, 0 structural clashes in 108 poses.
5. Mass: the first layout weighed 490 g total. A lighter wrist boss, a shorter 2 mm-wall bay and a 3/4 in bolt brought it to 460 g (hand 345 g).

## Assumptions

Printed parts at effective density (3 walls, 30 % gyroid). Tendon friction mu 0.10 (0 and 0.15 also run). Power-grasp contacts frictionless; pinch pads mu 0.5 (silicone covers). Latex cord modulus 1.5 MPa assumed. PQ12 values from the Actuonix datasheet Rev D, HS-82MG from Hitec / reseller listings (160 deg travel assumed). Pins A2, Sy 350 MPa. Beam / bearing formulas, no FEA (all stresses under 112 MPa in steel and 7 MPa in plastic).
