# ScissorLift - test results summary

Model: `..\ScissorLift.iam` (assembly parameter `Lift` = deck height, 250-900 mm). Full write-up: `..\Analysis\ScissorLift_CalcReport.pdf` (copy in `Structural\`).
**Designed and calculated only: every result here is a CAD measurement, a calculation or a catalogue value. Nothing has been built or tested.**

| Test | Result | Criterion | Status | Files |
|---|---|---|---|---|
| Assembly DOF / health | 76 occurrences (23 files), 225 constraints (169 flush, 54 mate, 2 angle), total DOF 0, 0 unhealthy | 0 DOF, 0 unhealthy | PASS | Assembly_Checks\assembly_checks.json |
| Interference | 7 heights (250, 300, 400, 500, 650, 800, 900 mm): 0 clashing pairs (iteration 1: 16 pairs, all circlips, 355 mm3) | 0 pairs | PASS (iteration 2) | Assembly_Checks\assembly_checks.txt |
| Kinematics in CAD | deck height, arm angle (10.30-64.30 deg) and carriage X (885.5-390.2 mm) vs design.py: max error 0.0000 mm / 0.00000 deg | matches design.py | PASS | Assembly_Checks\assembly_checks.json |
| Moving clearances | inner-outer frame 2.0 mm (thrust-washer gaps) at every height; carriage to drive block 21.5 mm collapsed; inner frame to screw 33.3 mm minimum | > 0 | PASS | Assembly_Checks\assembly_checks.txt |
| Screw force | 10.45 kN at 250 mm (10.72 kN with friction), 0.91 kN at 900 mm; statics = virtual work to 3e-15 | report | - | Structural\forces_vs_height.png |
| Drive torque | peak 15.0 Nm (mu 0.10) / 19.0 Nm (mu 0.15) at the screw vs 33 Nm rated (71.5:1 BLDC): SF 2.20 / 1.73. 30:1 version (15 Nm) rejected: SF 1.00 / 0.79 | SF >= 1.5 | PASS (iteration 2) | Drive\torque_vs_height.png |
| Lift time / power | 124 screw turns at 42 rpm = 177 s; peak shaft power 66 W of 200 W; RMS torque 4.3-5.5 Nm | report | - | ..\Analysis\analysis.json |
| Self-locking | locks while mu > 0.088 (lead angle 5.20 deg); greased bronze static mu 0.10-0.15 | margin | OPEN (brake or prop) | ..\Analysis\analysis.json |
| Nut TR16x4 bronze | 12.2 MPa at the start (allow ~15), pv 0.38 MPa m/s | p < 15 MPa | PASS (thin) | ..\Analysis\analysis.json |
| Screw / journal / coupling | screw root von Mises 151 MPa SF 2.25; 10 mm journal SF 1.83 at the 21 Nm driver limit; L-095 coupling SF 1.15 on worst running torque | SF >= 1.5 (coupling >= 1) | PASS | ..\Analysis\analysis.json |
| Screw buckling | compression, pinned-pinned nut to thrust bearing: min SF 6.8 (at 900 mm) | SF >= 3 | PASS | Drive\screw_buckling.png |
| Thrust bearing 51200 | s0 1.73 at 10.7 kN; L10 33 years at 20 lifts/day | s0 >= 1.5 | PASS | ..\Analysis\analysis.json |
| Pins 20 mm 42CrMo4 | base pivot SF 8.0, centre pin SF 6.3, carriage roller pin SF 3.15 (206 MPa); bushing p 14.9 MPa of 80 | SF >= 2 | PASS | ..\Analysis\analysis.json |
| Arms RHS 60x30x3 S355 | peak 70.6 MPa (lateral half load, collapsed): SF 5.0; buckling SF 21; weld fatigue SF 2.55 at 50,000 cycles (FAT 71) | SF >= 2 | PASS | Structural\arm_stress.png |
| Platform | 150 kg at the far edge raised: 109 MPa, SF 2.15 on S235, 5.7 mm tip deflection; mid-span collapsed 0.66 mm | SF >= 2 | PASS | ..\Analysis\analysis.json |
| Track rollers 6202-2RS | 2.06 kN peak per roller vs C0 3.75 kN: s0 1.82 | s0 >= 1.5 | PASS (LR202 recommended) | ..\Analysis\analysis.json |
| Stability | lateral half load at 900 mm + 147 N push: tip SF 3.04; longitudinal 6.87 | SF >= 1.5 | PASS | Stability (in the calc report) |
| Drawings | GA: overall 1370 / 250 / 900 / 560 checked, 0 dropped, 23 balloons, 23 parts-list rows; manufacturing: 4 sheets, pin centres 450 / 900 checked on both arm frames, 6 wrong auto-dims deleted (e.g. a 900 "overall" on the 945 mm arm frames, 26 on the 20 mm pins) | every dim checked | PASS (sheets also checked by eye) | ..\Drawings\drawing_checks.json |
| Mass (Inventor) | 80.8 kg total: platform 32.2, base 17.0, inner frame 11.6, outer frame 9.9, drive 6.9 | report | - | ..\ScissorLift_BOM.csv |
| 3D printing | no printed parts in this project, so there is no Bambu .3mf | - | n/a | - |
| Buildability | every bought part has a part number; fits, assembly order and cost (~$1,370 incl. controls, estimates) checked; 5 items open | buildable | BUILDABLE (5 open) | Buildability\buildability_check.md |

## Design iterations driven by these checks

1. Drive (calc, iteration 1 -> 2): the first pick was the 30:1 version of the gearmotor (15 Nm, 100 rpm, 74 s lift). The torque check showed 15.0 Nm needed at the bottom with a greased nut and 19.0 Nm with poor lubrication: SF 1.00 / 0.79, so it would stall at the start. Changed to the 71.5:1 version (33 Nm, 42 rpm): SF 2.20 / 1.73, and the lift now takes 177 s.
2. Coupling: the first coupling was a Lovejoy L-075 (about 10 Nm nominal), below the running torque. Now an L-095 (21.9 Nm nominal) with clamp hubs, and the driver current limit caps the screw torque at 21 Nm so a jam can't overload the 10 mm journal.
3. Screw size: TR20x4 was the first choice, but its lower lead-angle efficiency needs 16 % more torque. TR16x4 is still self-locking (barely, see open item 1) and its 12.2 MPa nut pressure is within the bronze guideline.
4. Screw in compression: putting the drive at the roller end means the screw is short when the force is high (10.7 kN acts over 11 mm of free length) and long only when the force is under 1 kN. Buckling SF is 6.8 at worst. A tension layout would have loaded a small locknut with the full 10.7 kN.
5. Interference (CAD, iteration 1 -> 2): all 16 retaining rings overlapped their grooves (355 mm3 total) because the ring bore was modelled 0.4-0.6 mm under the groove diameter. Ring bores now sit on the groove: 0 clashes at 7 heights.
6. Layout: the screw axis sits on the carriage pivot axis (z 47.5), so the screw force makes no moment on the nut. That set the base rail height (RHS 50x30) so the 82 mm gearmotor clears the floor, which made the collapsed angle 10.3 deg and the peak screw force 10.4 kN.

## Assumptions

Rated load as a uniformly distributed load on four EN 1570-1 style areas, no dynamic factor (slow lift). Nut mu 0.10 nominal / 0.15 worst, bushings 0.10, roller drag 0.5 %. Gearmotor ratings are from StepperOnline listings as shown in search results; its geometry is an envelope. Bearing ratings from distributor listings of SKF data. Tip-over push 10 % of rated load (my assumption); unanchored base on a level floor. Beam theory, no FEA (simple sections, peak 71 MPa in the arms, 206 MPa in a 42CrMo4 pin). All prices are estimates.

