# ConveyorSorter - test results summary

Model: `..\ConveyorSorter.iam` (assembly parameters `TakeUp`, `Divert1`, `Divert2`). Full write-up: `..\Analysis\ConveyorSorter_CalcReport.pdf` (copies in `Drive\`, `Sorting\`, `Structure\`).
**Designed and simulated only: every result here is calculated or simulated from the CAD model. Nothing has been built or physically tested.**

| Test | Result | Criterion | Status | Files |
|---|---|---|---|---|
| Assembly DOF / health | 104 occurrences, 309 constraints {'Flush': 249, 'Mate': 58, 'Angle': 2}, total DOF 0, 0 unhealthy | 0 DOF, 0 unhealthy | PASS | Assembly_Checks\assembly_checks.json |
| Interference | 10 poses (design, Divert1/2 at 20 and 40 deg and both at 40, TakeUp -15/-7.5/+7.5/+15 mm): 0 clashing pairs | 0 pairs | PASS | Assembly_Checks\assembly_checks.txt |
| Item clearance under the gantry | lowest part ToFBoard 207.84 mm above the belt vs 150 mm tallest item; ToF range 57.84 mm at that item | > H_max, ToF >= 40 mm | PASS (iteration 2) | Assembly_Checks\assembly_checks.txt |
| Take-up | pulley centres 1485-1515 mm measured; covers 0.94 % belt stretch (install 0.2 % = 3.2 mm) | > install + 0.5 % stretch | PASS | ..\Analysis\analysis.json |
| Belt drive (normal) | Te 30.8 N, 0.95 Nm at 77.0 rpm, PWM 80 %, 1.52 A; motor stall margin 7.0x | margin >= 2 | PASS | Drive\motor_torque_speed.png |
| Accumulation jam | 7 items held: Te 92.5 N, 2.87 Nm; motor saturates, belt slows to 0.218 m/s; slip SF 1.62 | no slip, below stall | PASS | Drive\motor_torque_speed.png |
| Belt slip on the drive pulley | pretension 200 N/strand -> Te max 149 N; SF 4.86 normal / 1.62 jam | SF >= 1.5 | PASS | ..\Analysis\analysis.json |
| Belt tension | T1 1.23 N/mm worst vs 10 N/mm allowable | < allowable | PASS | ..\Analysis\analysis.json |
| Jaw coupling L-070 | rated 4.88 Nm: SF 5.1 normal / 1.70 jam; only 0.73x motor stall | SF >= 1.5 at jam | PASS with firmware stall cut-off | ..\Analysis\analysis.json |
| Shafts 20 mm 1045 CD | 19.7 MPa bending; static SF 25 at stall; fatigue SF 5.75 (Kf 2); 0.14 mm, 0.076 deg at the bearing | SF >= 2, slope < 2 deg | PASS | ..\Analysis\analysis.json |
| Bearings UCFL204 | 200 N each: L10 5.7e+07 h, static SF 33 | L10 > 20,000 h | PASS | ..\Analysis\analysis.json |
| Diversion physics | item slides along the 40 deg paddle at 0.151 m/s (works below 76 deg); pushed off in 1.06 s | slides, not jams | PASS | ..\Analysis\analysis.json |
| Servo torque | hold 2.29 Nm (SF 2.15), impact 3.28 Nm (SF 1.49) vs 4.9 Nm stall; 40 deg in 0.109 s | hold SF >= 1.5, impact >= 1.2 | PASS | ..\Analysis\analysis.json |
| Paddle 6061 3 mm | 25.2 MPa impact (SF 11), 3.4 mm tip deflection | SF >= 2, < 5 mm | PASS | ..\Analysis\analysis.json |
| Decision timing | beam to first paddle contact 303 mm: margin 0.33 s for the 180 mm item; length sigma 0.28 mm | margin > 0 | PASS | Sorting\sort_timeline.png |
| Sort simulation | 4000 random items, 370 mm gap at 0.25 m/s: 1858 items/h, mechanical success 100.0 %, 27 boundary misclassifications (0.68 %) | 100 % mechanical | PASS | Sorting\sort_throughput.png |
| Minimum gap | analytic 360 mm; Monte Carlo sweep 100 % from 375 mm (25 mm grid) | agree | PASS | Sorting\sort_throughput.png |
| Frame rail deflection | 0.49 mm (jam load + 500 N lean) vs L/500 = 2.2 mm | < L/500 | PASS | Structure\frame_stability.png |
| Sideways stability | unanchored it tips at 54 N at belt height -> 4 x M8 floor anchors, 341 N uplift each at 300 N (SF 12) | anchored | PASS (anchors required) | Structure\frame_stability.png |
| Chutes | 35 deg vs mu 0.40: cartons slide, 1.20 m/s at the exit | slides | PASS | ..\Analysis\analysis.json |
| Drawings | 6 sheets: 17 part views, 8 wrong auto-dims removed, 0 view overlaps; assembly 41 balloons, min spacing 2.47 cm, 0 inside views / parts list; pulley centres dimension 1500.0 mm | no overlaps | PASS (each sheet also checked by eye) | ..\Drawings\drawing_checks.json |
| Mass (Inventor) | machine 32.7 kg + totes 7.2 kg; electrical (not modelled) 1.1 kg | report | - | ..\ConveyorSorter_BOM.csv |
| 3D printing | plate 1 [PA6-CF]: 212 x 84 x 36 mm, 4 parts: DiverterHub#1 (horn face down), DiverterHub#2 (horn face down), ServoMount#1 (base down, towers up), ServoMount#2 (base down, towers up); plate 2 [PETG]: 238 x 168 x 44 mm, 5 parts: ControlBox (open side up), ControlBoxLid (flat), BeamSensorBracket#1 (back plate down), BeamSensorBracket#2 (back plate down), ToFHead (beam face down, sensor pocket up) | fits 256 x 256 bed | PASS | ..\ConveyorSorter_Bambu_Plate1.3mf / Plate2.3mf |

## Design iterations driven by these checks

1. Overhead clearance: the first gantry put the ToF sensor 127.8 mm above the belt, under the 150 mm item limit, and the beam 1 mm above the tallest item. The VL53L1X also needs 40 mm minimum range. Raised the gantry 80 mm (230 mm posts): sensor 207.84 mm up, 0 DOF and 0 clashes re-checked (iteration 1 results in `Assembly_Checks\Iteration1\`).
2. Stability: with a 270 mm foot track the frame tips at 54 N sideways at belt height, so the assembly drawing calls for 4 x M8 floor anchors.
3. Coupling: the L-070 jaw coupling is rated 4.88 Nm, below the 6.71 Nm motor stall. The worst real load (jam, 2.87 Nm) has SF 1.70, so it stays, with an encoder stall cut-off in firmware. L-075 (10.2 Nm) is the upgrade.
4. Parts list: the gantry post and the servo shared part number CS-311, which merged them into one parts-list row. Post renumbered CS-313.
5. Drawings: the reference auto-dimension helper took shaft and pulley lengths from edge-on circles (427.5 mm instead of 411 mm). Overall dims now come from straight edges or edge end points, and every value is checked against the part's real extents before it is kept.

## Assumptions

Belt class values (2.4 kg/m2, 5 N/mm at 1 %, mu 0.30 on the slider bed, 0.25 on the bare pulley, 0.50 carton on PVC). goBILDA 5203 datasheet values (117 rpm, 6.71 Nm, 9.2 A); rotor inertia and face pattern assumed. Savox SB-2290SG 50 kg cm at 7.4 V, 0.15 s deploy with latency. ToF noise 3 mm per sample. Items uniform in size, up to 1.5 kg, centred between the guides; a metering infeed (not modelled) sets the gap. 40x80 rail Ix 44 cm4. Not modelled: infeed, wiring, firmware, belt splice. No FEA: the highest stress is 25 MPa (paddle), so beam theory is enough.
