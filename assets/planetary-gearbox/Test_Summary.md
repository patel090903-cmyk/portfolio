# PlanetaryGearbox - test results summary

Model: `..\PlanetaryGearbox.iam` (assembly parameter `Input` = motor angle). Full write-up: `..\Analysis\PlanetaryGearbox_CalcReport.pdf` (copy in `Gear_Strength\`).
**Designed and calculated only: every result here is a CAD measurement, a calculation or a catalogue value. Nothing has been built or tested.**

| Test | Result | Criterion | Status | Files |
|---|---|---|---|---|
| Assembly DOF / health | 48 occurrences, 141 constraints {'Flush': 117, 'Mate': 18, 'Angle': 6}, total DOF 0, 0 unhealthy | 0 DOF, 0 unhealthy | PASS | Assembly_Checks\assembly_checks.json |
| Interference | 9 poses of Input (0, 4.5, 9, 13.5, 27, 90, 133, 247, 341 deg): 0 clashing pairs | 0 pairs | PASS | Assembly_Checks\assembly_checks.txt |
| Gear kinematics in CAD | carrier = Input/5, planets = -Input/3: max error 0.0 deg at 9 poses | matches design.py | PASS | Assembly_Checks\assembly_checks.json |
| Tooth gaps (CAD) | sun-planet 0.038 mm, planet-ring 0.037 mm minimum (2D outline check: 0.0377 / 0.0370 mm, 0 overlap over 80 poses) | > 0, = backlash allowance | PASS | Gear_Mesh\mesh2d.png |
| Moving clearances | planet to housing 2.03 mm (iteration 1: 0.00), planet to planet 3.37 mm | > 0.5 mm | PASS (iteration 2) | Assembly_Checks\assembly_checks.txt |
| Gear strength, continuous | rated 5.13 Nm output on KHK sun surface durability (1.06 Nm in); AGMA contact allows 2.40 Nm in | rate on the lower | PASS | Gear_Strength\gear_rating_criteria.png |
| Gear strength at motor holding torque | Ft 18.4 N/mesh: AGMA contact SH 2.02, bending SF 18.5 / 14.6; KHK surface SF 1.79 | SH >= 1.2, SF >= 1.5 | PASS | ..\Analysis\PlanetaryGearbox_CalcReport.pdf |
| Output torque | motor-limited 2.83 Nm; design point 1.89 Nm at 60 rpm | below the rating | PASS | Performance\output_torque_speed.png |
| Efficiency | 98.8 % tooth friction only; 94.6 % at the design point with seals; 0.67 W heat | report | - | Performance\efficiency.png |
| Planet bearings MR105ZZ | static SF 5.6 at holding torque, 3.1 at the rating; L10 72395 h at the rating | SF >= 2, L10 > 6000 h | PASS | ..\Analysis\analysis.json |
| Output bearings 6001-2RSH | 200 N overhung: L10 623171 h, static SF 5.7 | L10 > 6000 h | PASS | ..\Analysis\analysis.json |
| Planet pin / output shaft | pin 83 MPa (SF 17), 13 um; shaft fatigue SF 3.5 at the circlip groove | SF >= 2 | PASS | ..\Analysis\analysis.json |
| Ring clamp / sun on motor | clamp slip SF 84; motor radial 7.8 N vs 21 N (SF 2.7) | SF >= 2 | PASS | ..\Analysis\analysis.json |
| Backlash / tolerance stack | output 12-28 arcmin (35 worst); min backlash left 26 um sun-planet (first layout 4 um) | > 0 worst case | PASS (pilot 22 H7) | Tolerance\backlash_stack.png |
| Printed bracket | watertight, min wall 4.2 mm, support 0.2 %, bed fit True; stress SF 45 / 16 | printable, SF >= 2 | PASS | Printability\dfam_summary.csv |
| Drawings | assembly: section A-A overall [143.0, 128.0] mm checked, 17 balloons (min spacing 3.2 cm, 0 inside the parts list), 17 parts-list rows; manufacturing: 26 dims kept, 5 wrong auto-dims deleted, 21 axial ordinates checked against real faces, 0 view overlaps | every dim checked | PASS (sheets also checked by eye) | ..\Drawings\drawing_checks.json |
| Mass (Inventor) | 2.17 kg with motor, 1.78 kg gearbox, bracket 0.25 kg; gear CAD vs KHK: PG-211 36.2/37 g, PG-212 80.7/82 g, PG-213 342.4/350 g | report | - | ..\PlanetaryGearbox_BOM.csv |
| 3D printing | plate 1 [PETG]: 118.0 x 132.0 x 96.0 mm, 1 part: MountBracket (upright face down: holes vertical, base and gussets stand as walls) | fits 256 x 256 bed | PASS | ..\PlanetaryGearbox_Bambu_Plate1.3mf |
| Buildability | every bought part has a real part number; fits, thread engagements, assembly order and cost (~$450) checked; 3 items to measure | buildable | BUILDABLE (3 checks open) | Buildability\buildability_check.md |

## Design iterations driven by these checks

1. Tooth counts: 4:1 with a KHK SI1-60 ring was the first option. 5:1 (20/30/80) fits KHK's catalogue too and is what the project called for. The assembly condition allows 4 or 5 planets, but 5 planets' tips would overlap by 2.6 mm, so it has 4.
2. Carrier: a two-plate carrier with pillars between the planets was the plan, but at 5:1 there is only 3.1 mm of radius between neighbouring planet tips. The pins are cantilevered from one 1045 plate instead; they bend 13 um at the rating.
3. Rating: AGMA 2001 contact stress allows 2.40 Nm at the sun, KHK's catalogue only 0.33 Nm per mesh (1.06 Nm for 4 planets). The gearbox is rated on KHK's number: 5.13 Nm continuous output.
4. Motor pilot: the first adapter had a 22.05 recess. The backlash stack showed the sun could then shift enough to leave 4 um of sun-planet backlash worst case. Now 22 H7: 26 um.
5. Clearance (CAD, iteration 1 -> 2): with 80 mm bores the planet tips ran on the ring-seat faces of the housing and adapter (0.00 mm). Bores opened to 86 mm (2.03 mm clearance); the M5 mounting PCD moved from 88 to 100 mm to keep wall around the bigger bore. Iteration 1 results are in `Assembly_Checks\Iteration1\`.
6. Drawings: auto overall dims on the section first came out as 132.5 and 115.6 mm (wrong edges). Overall dims now come from edge end points and are kept only if they equal a real size within 0.05 mm (143.0 x 128.0). The carrier pin bores were noted H7 for a press fit, which is a sliding fit with an h6 pin; corrected to P7.

## Assumptions

KHK catalogue gear data (strength values used as published; KHK's calculation conditions are not on the product pages). Gear hardness 180 HB, Ko 1.25, load sharing 1.25 for 4 planets, tooth friction 0.06. Motor torque-speed is an R-L-back-EMF estimate with a 0.7 running factor, not the maker's curve. Motor mass 0.39 kg from reseller listings. Ring OD assumed h8. PETG printed allowable 20 MPa. Not modelled: driver, power supply, grease, wiring. No FEA: the highest stress outside the gear teeth is 83 MPa in a hardened 5 mm pin, so beam theory is enough.
