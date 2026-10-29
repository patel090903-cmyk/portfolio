# WindTurbine - test results summary

Model: `..\WindTurbine.iam` (assembly parameters `Yaw`, `Spin`, `Furl`). Full write-up: `..\Analysis\WindTurbine_CalcReport.pdf` (copy in `Aero\`).
**Designed and calculated only: every result here is a CAD measurement, a calculation or a catalogue value. Nothing has been built or tested.**

| Test | Result | Criterion | Status | Files |
|---|---|---|---|---|
| Working model (Inventor) | 67 occurrences, 198 constraints, 0 DOF, 0 unhealthy; Yaw / Spin / Furl drive the nacelle, rotor and tail; 0 clashing pairs at 8 poses (incl. full furl, yaw -150 / 90); probes match the drivers within 0.00013 deg | 0 DOF, 0 clashes | PASS | Working_Model_Check.md, Working_Model_Check\ |
| Drivers verified | each revolute checked at 3 test angles against design.py before it was kept (Yaw 37 / 133 / 251, Spin 27 / 95 / 211, Furl 20 / 55 / 80 deg) | matches | PASS | ..\_build\build_assembly.log |
| Clearances (CAD) | blade - mast 108.8 mm minimum over a rotor turn; tail vane - blades 280 mm at full furl; tail - mast 57 mm at full furl; hub - generator plate 2.0 mm (spigot); blade root - generator plate 14 mm | > 0, > tip deflection | PASS | ..\Analysis\cad_props.json |
| Blade design check (BEM) | at 8 m/s, TSR 5: alpha 3.2-5.7 deg, Cl 0.90-0.99 along the span (design 3.5 deg / 1.0), axial induction 0.26-0.36 | near design | PASS | Aero\cp_ct_blade.png |
| Rotor Cp | Cp max 0.419 at TSR 4.25 (8 m/s), 0.434 at 11 m/s, 0.39 at 5 m/s (low Re); NeuralFoil polars on the blended SG6040 / SG6043 sections | report | - | Aero\cp_ct_blade.png, Aero\polars.png |
| Generator matching | battery-clamped ATO 400 W curve holds the rotor at TSR 4.6-5.0 from 6 to 11 m/s; 294 W at 11 m/s (704 rpm), 251 W into the battery | 100-300 W at 11 m/s (brief) | PASS | Aero\power_curve_matching.png |
| Max power vs generator rating | 448 W at 25 m/s with furling vs 445 W catalogue maximum (0.7 % over, level curve) | <= 445 W | AT LIMIT | Aero\power_curve_matching.png |
| Cut-in | charging from 3.6 m/s (free-running rotor reaches 400 rpm) | report | - | Furling\furl_startup.png |
| Start-up from standstill | rotor static torque reaches the 0.35 Nm catalogue starting torque at 8.5 m/s (0.15 Nm running drag at 5.6 m/s) | start < 4 m/s | OPEN (measure the generator breakaway torque) | Furling\furl_startup.png |
| Furling | starts at 8.5 m/s (40 N thrust), 41 / 54 / 62 deg at 15 / 20 / 25 m/s; tail mass and CG from Inventor | output capped | PASS (quasi-static) | Furling\furl_startup.png |
| Runaway (unloaded) | 1573 rpm max with furling; used as design overspeed | report | - | ..\Analysis\analysis.json |
| Dump load / brake | TS-45 diversion + 1.2 ohm: 24 A / 691 W vs 15.6 A max turbine current (x1.54); shorted generator holds 10 / 19 / 38 rpm at 10 / 12 / 15 m/s (model) | > 1.25 / stops | PASS | ..\Analysis\analysis.json |
| Annual energy | 289 / 398 / 643 kWh into the battery at 4.5 / 5 / 6 m/s Rayleigh mean | report | - | ..\Analysis\analysis.json |
| Loads (IEC 61400-2 class IV) | case D 92 N rotor thrust; case H (42 m/s parked) 69 N per blade, 268 N at the hub; max operating thrust 87 N | report | - | ..\Analysis\analysis.json |
| Blade root (printed ASA) | 7.7 MPa (15.2 Nm case H + 2232 N centrifugal at runaway) vs 15 MPa across layers: SF 1.94 | SF >= 1.5 | PASS (test coupons first) | Structural\blade_tower.png |
| Blade joints (carbon rods) | 282 / 287 MPa vs 1400 MPa: SF 5.0 / 4.9; bond shear 0.75 / 0.84 MPa; rod walls >= 1.12 mm | SF >= 2 | PASS | Structural\blade_tower.png |
| Blade deflection | 10 mm operating, 23 mm parked case H vs 109 mm to the mast | < clearance | PASS | Structural\blade_tower.png |
| Mast (2in Sch 40, guyed at 4.6 m) | case H 57 MPa at the guy point: SF 4.2 on yield; thread root at the coupling SF 7.1; Euler buckling SF 10 | SF >= 1.5 | PASS | Structural\blade_tower.png |
| Guys / anchors | worst guy 1436 N: SF 13 on 3/16 in cable, 7.7 on a 2500 lb screw anchor (assumed rating) | SF >= 3 | PASS (check soil) | ..\Analysis\analysis.json |
| Tower-top frequency | about 7 Hz (rough) inside the 1P band 6.7-14 Hz | avoid 1P | OPEN (balance, tap test; guy at 5.2 m gives ~14 Hz) | ..\Analysis\analysis.json |
| Yaw bearings / spindle | 6007-2RS s0 20; spindle 7 MPa (SF 44) | s0 >= 2 | PASS | ..\Analysis\analysis.json |
| Generator bearings (assumed 6203) | L10 > 5000 years on a 5 m/s site; parked s0 34 | report | PASS (type assumed) | ..\Analysis\analysis.json |
| Hub on shaft | M16x1.5 at 60 Nm: 59 Nm friction torque vs 6.5 Nm rotor peak: SF 9 | SF >= 2 | PASS | ..\Analysis\analysis.json |
| Drawings | GA: tower height 6865, vane 460, mast 60.3, yaw tube 76, hub 240, spinner 190 checked against the model, 28-row parts list, 26 balloons; manufacturing: 5 sheets, 13 parts, 36 dims kept, 24 wrong auto dims deleted | every dim checked | PASS (checked by eye too) | ..\Drawings\drawing_checks.json |
| 3D printing | 2 plain Bambu plates next to the assembly: 9 ASA blade segments on 225 x 211 mm (tallest 208 mm), PETG spinner; overhang 1.3 % on the root segment (supports under the transition) | fits 256 x 256 | PASS | Printability\ |
| Buildability | every bought part has a vendor; BOM $2,661 ($618 confirmed on vendor pages); 6 items open | buildable | BUILDABLE (6 open) | Buildability\buildability_check.md |

## Design iterations driven by these checks

1. Hub clamp (CAD numbers): the outer blade bolts at r 110 were outside the first 190 mm hub disc and clamp plate, so they clamped nothing; both went to 240 mm.
2. Furl geometry (calculation): the first tail (hinge 30 deg, rest 40 deg) let the output run to 810 W, far past the 445 W generator rating. A sweep of 20 hinge-tilt / rest-angle pairs showed a soft tail limits power; chose 20 / 25 deg with a 35 mm offset: furl from 8.5 m/s, output levels off at about 440 W.
3. Interference (Inventor): spinner flange vs blade-bolt heads, generator cable gland vs the frame arm, hinge bracket through the tail sleeve, PTFE washer touching the hinge collar: all fixed until 0 clashes at all 8 poses.
4. Blade rods (design.py check): 6 mm rods at the first joint left a 0.49 mm wall; changed to 5 mm x 130 and 3 mm x 90 with the rod positions on the camber line: walls >= 1.12 mm.
5. Calculation speed: the BEM is tabulated over (wind speed, TSR) so the furl / operating-point search runs in seconds; the exact BEM is used for the Cp curves and the design check.

## Assumptions

Generator: vendor power curve read from an image, 80 % mechanical-to-DC efficiency, 0.15 Nm running drag, mounting PCD 110 and internal 6203 bearings assumed. Printed ASA: 1.36 GPa effective modulus, 15 MPa across layers. Carbon rods 1400 MPa. IEC 61400-2 class IV site; furling quasi-static; screw anchor 2500 lb. Prices: generator, TS-45 controller, ASA filament and 3 mm rod confirmed on vendor pages, the rest estimated.
