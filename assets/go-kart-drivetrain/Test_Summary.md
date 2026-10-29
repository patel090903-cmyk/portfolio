# GoKartDrivetrain - test results summary

Model: `..\GoKartDrivetrain.iam` (driven by the assembly parameters `ChainLine` and `ChainAdjust`). Full write-up: `..\Analysis\GoKartDrivetrain_CalcReport.pdf` (copies in `FEA\`, `Performance\`, `Loads\`).
**Designed and simulated only: every result here is calculated or simulated from the CAD model. Nothing has been built or physically tested, so there is no measured test data.**

| Test | Result | Criterion | Status | Files |
|---|---|---|---|---|
| Assembly DOF / health | 61 occurrences, 180 constraints {'Flush': 140, 'Mate': 40}, total DOF 0, 0 unhealthy | 0 DOF, 0 unhealthy | PASS | Assembly_Checks\assembly_checks.json |
| Interference | 7 poses (design, ChainAdjust -12/-6/+6/+12 mm, ChainLine 246/254 mm): 0 clashing pairs | 0 pairs > 0.01 mm3 | PASS | Assembly_Checks\assembly_checks.txt |
| Sprocket alignment (ChainLine 246-254 mm) | plane offset 0.0e+00 mm, axis angle 0.0e+00 deg | < 0.5 mm, < 0.1 deg | PASS | Assembly_Checks\assembly_checks.txt |
| Chain tensioning (ChainAdjust slot) | +-12 mm slot -> centres 272.2 - 295.6 mm (nominal 283.89); takes up ~2.5 % stretch | covers wear to 2 %+ | PASS | Assembly_Checks\assembly_checks.txt |
| Gearing for 25 mph | 13/60 = 4.615:1; 25 mph = 779 rpm axle / 3595 rpm motor (72 % of 5000) | reach 25 mph at low battery | PASS | ..\Analysis\analysis.json |
| Top speed / torque margin at 25 mph | free 28.1 / 27.3 / 25.7 mph (full/nominal/low); needs 2.56 Nm, margin 6.7x / 2.5x | >= 25 mph, margin > 1.5 | PASS | Performance\motor_torque_speed.png |
| Launch torque | 41.7 Nm (350 A controller limit; ME1114 peak stall 65 Nm), 16x cruise | report | - | ..\Analysis\analysis.json |
| Acceleration (simulated) | 0-25 mph 1.98 s nominal / 2.41 s low battery, 0-20 1.42 s, peak 0.66 g, 12.2 m, battery peak 11.3 kW | 0-25 mph < 4 s | PASS | Performance\acceleration_sim.png, acceleration_sim_nominal.csv |
| Gradeability (simulated) | 10 % grade 26.4 mph, 20 % 25.6 mph; start limit 91 % (traction) | start on 20 % | PASS | Performance\gradeability.png |
| Cruise power / range | 1080 W battery at 25 mph -> ~61 km (80 % DoD, 2.05 kWh) | report | - | ..\Analysis\analysis.json |
| Chain #35 strength | tension 2095 N at 42 Nm -> SF 4.42 on 9.34 kN min. ultimate; 7.4 m/s at 25 mph | SF >= 3 on ultimate | PASS | Loads\chain_rating.png |
| Chain #35 power rating | 2.15 kW (15,000 h) vs cruise x Ks 1.25 kW (SF 1.71); full-power bursts 6.3x rating | cruise within rating | PASS (wear = maintenance item) | Loads\chain_rating.png |
| Axle static | worst C4 kerb: 434 N m + 151 N m at the bearing, 144 MPa; SF 4.54 nominal / 2.69 with keyway Kt | SF >= 1.5 (with Kt) | PASS | Loads\axle_moments.png |
| Axle fatigue (DE-Goodman) | SF 1.97 (C1 launch, bearing), 2.59 (1.5 g corner); Se 256 MPa | SF >= 1.5 | PASS | ..\Analysis\analysis.json |
| Keys | axle sprocket SF 4.6 shear / 4.0 crush; wheel hub SF 8.0 shear / 6.9 crush; motor sprocket SF 5.1 shear / 4.5 crush | SF >= 2 | PASS | ..\Analysis\analysis.json |
| Sprocket teeth / bolts | one tooth carrying all 2095 N: SF 2.71 (13T) / 2.57 (60T); 6 x 5/16 bolts SF 26 | SF >= 2 | PASS | ..\Analysis\analysis.json |
| Bearing life UC206-20 | L10 41,922 h left / 101,491 h right (duty cycle, 18 mph avg); static SF 2.78 / 7.32 | L10 > 2000 h, static SF > 2 | PASS | Loads\bearing_loads.png |
| Motor-mount slot bolts | 4 x 3/8-16 gr 8 at 75 % proof: slip SF 11.3 | no slip, SF >= 2 | PASS | ..\Analysis\analysis.json |
| Hanger welds | 23 MPa, SF 6.2 (AISC 0.3 Su) | SF >= 1.5 | PASS | ..\Analysis\analysis.json |
| FEA Motor-mount bracket 6061-T6 | worst C1 launch: peak 43 MPa (SF 6.46), 99.9th pct 26 MPa (SF 10.76), deflection 0.22 mm, 275,640 DOF | SF >= 1.5 on peak and p99.9 | PASS | FEA\fea_MotorMountBracket_vonMises.png, ..\Analysis\fea_results\MotorMountBracket_worst.vtu |
| FEA Bearing hanger 4130 | worst C4 kerb 2g+1g L: peak 129 MPa (SF 3.57), 99.9th pct 93 MPa (SF 4.94), deflection 0.92 mm, weld zone p99.9 SF 4.81 vs 360 MPa, 260,616 DOF | SF >= 1.5 on peak and p99.9 | PASS | FEA\fea_BearingHanger_vonMises.png, ..\Analysis\fea_results\BearingHanger_worst.vtu |
| FEA Rear axle 4140 PH | worst C4 kerb 2g+1g: peak 147 MPa (SF 4.45), 99.9th pct 139 MPa (SF 4.71), deflection 3.63 mm, 411,261 DOF | SF >= 1.5 on peak and p99.9 | PASS | FEA\fea_RearAxle_vonMises.png, ..\Analysis\fea_results\RearAxle_worst.vtu |
| Mass (Inventor) | drivetrain 30.48 kg, rear wheels 5.40 kg | report | - | ..\GoKartDrivetrain_BOM.csv |
| 3D printing | not applicable: every made part is steel or aluminium (4140 axle, 4130 hangers, 6061 bracket and hub, A36 base); no Bambu .3mf made. STL of the made parts exported for reference only | - | n/a | ..\Export\STL\ |

## Design iterations driven by these checks

1. FEA (iteration 1): the 1/4 in bearing hanger peaked at 262 MPa (p99.9 190, SF 1.75 / 2.42) on the sharp taper kink and deflected 2.99 mm under the kerb + side load -> 3/8 in plate with R25 blends: 129 MPa, SF 3.57 / 4.94, 0.92 mm (FEA\fea_iterations.png).
2. FEA (iteration 1): the 1/2 in motor bracket was oversized (p99.9 SF 14.5) -> 3/8 in plates, 2.51 -> 1.96 kg, p99.9 SF 10.8.
3. Interference check: the reference chassis rear bumper stays clipped both hanger plates (138 mm3 each) and the chain at ChainLine 254 -> stays rerouted; 0 pairs at every pose after.
4. Gearing: 13T chosen as the smallest #35 sprocket with a sound hub over the 7/8 in keyed motor shaft; 60T keeps 43 mm ground clearance and reaches 25 mph even on a nearly flat pack (back-EMF limit).
5. FEA load set: the torque shear on the keyway-interrupted axle seats had a ~760 N net force -> made force-free; every bearing load corrected to the exact resultant (axle residual 153 N = the 1 % bearing-friction torque).

## Cross-checks

- Axle: FEA peak 147 MPa at the left bearing vs beam theory 144 MPa (nominal) at the same section.
- Chain loop closed exactly (98 links, closure error < 1e-12 mm); Inventor-measured sprocket centre distance on the assembly drawing = 283.89 mm.

## Assumptions

Kart 185 kg with driver, 60 % rear, CG 280 mm, Crr 0.018, CdA 0.54 m2, mu 1.1, rolling radius 137 mm. Motor: Motenergy ME1114 listing values (0.12 Nm/A, 65 Nm, 5000 rpm, 6.5 mOhm, 29 lb); rotor inertia, face bolt pattern and outer shape assumed. Controller 350 A / 250 A battery, 16S LiFePO4 40 Ah 30 mOhm (class assumptions, not modelled). Quasi-static limit loads, linear-elastic FEA without weld fillets or keys. Materials: 6061-T6 Sy 276, 4130 Sy 460 (HAZ 360), 4140 PH Sy 655 / Su 1020 MPa. Purchased parts without vendor CAD are catalogue-dimension models; fasteners are step.parts STEP files. Not modelled: seat, brakes, chain guard, steering, electrical installation.


## Respec 2026-10-29 (working-model + BOM audit)

The buildability audit found the #35 chain at 99-126 % of its working allowable and no brake. Changes, all in the CAD, the BOM and `Analysis\analysis.json` (re-run of `drivetrain_analysis.py`):

| Item | Before | After | Status |
|---|---|---|---|
| Chain | ANSI #35, 98 links, 13T / 60T = 4.615:1 | ANSI #40, 78 links (285.4 mm centres), Martin 40BS13 7/8 + 40BS50 1-1/4 = 3.846:1 | respecced |
| Axle sprocket mount | 7075 plate on a bolt-on 6061 hub, 6 x 5/16 bolts | 40BS50 keyed straight to the axle (hub + 6 bolts deleted) | respecced |
| Chain load at launch | 2.10 kN = 99 % of the #35 allowable (126 % at 450 A) | 1.57 kN = 44 % of the #40 allowable (3.6 kN); 2.24 kN = 62 % at the traction limit; SF 8.6 on ultimate | PASS |
| 0-25 mph (nominal pack) | 1.98 s | 2.14 s (2.19 s on a low pack), still < 4 s | PASS |
| Free top speed | 27.3 mph | 32.5 mph (controller governs at 25 mph) | - |
| Start gradeability | 91 % | 76 % (traction-limited) | PASS |
| Axle static SF (with Kt) | 2.69 | 2.86 (chain load lower) | PASS |
| Ground clearance under the axle sprocket | 43 mm | 32 mm | report |
| Brake | none | 180 mm disc on a keyed 1-1/4 in hub (right side), single-piston hydraulic caliper on a 1/4 in bracket welded to the right hanger, master cylinder + line (GoPowerSports kit) | added |
| Guard | none | 1.5 mm steel side plate + top cover over the tight span | added |
| Motion | static (only ChainLine / ChainAdjust) | `Drive` turns the axle, wheels, brake disc and (x 50/13) the motor shaft + 13T: measured error 0.0 deg; chain seats exactly at whole-tooth steps | added |
| Interference | - | 0 pairs at Drive 0 / 2 / 13 / 26 axle teeth (chain included), Drive 37 deg and ChainAdjust +-12 mm (chain excluded): `Working_Model_Check\` | PASS |

Not re-run: the FEA (the chain pull on the hanger and bracket dropped 25 %, so the old results are conservative) and the calc report PDF / drawings (they still show the #35 first design). Open: brake torque of the single-piston caliper (about 127 N.m needed at the axle; ask the vendor), caliper bracket weld check, rim width, UCFL206 hole size.
