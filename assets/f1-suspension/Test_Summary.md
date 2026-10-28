# F1Suspension - test results summary

Model: `..\F1Suspension.iam` (driven by the assembly parameters `Heave` and `Steer`). Full write-up: `..\Analysis\F1Suspension_CalcReport.pdf` (copies in `FEA\`, `Kinematics\`, `Loads\`).
**Designed and simulated only: every result here is calculated or simulated from the CAD model. Nothing has been built or physically tested, so there is no measured test data.**

| Test | Result | Criterion | Status | Files |
|---|---|---|---|---|
| Assembly DOF / health | 126 occurrences, 324 constraints {'Flush': 233, 'Insert': 24, 'Mate': 63, 'Angle': 4}, 0 unhealthy | 0 unhealthy, one pose per Heave/Steer | PASS | Assembly_Checks\assembly_checks.json |
| Kinematics: Inventor solver vs Python model | 19 poses; max error camber 1e-05 deg, toe 0e+00 deg, damper 1e-04 mm, hardpoints 3e-05 mm | < 0.01 mm / 0.001 deg | PASS | Kinematics\inventor_vs_python.png |
| Interference over travel and steering | 19 poses (Heave -25..+35 every 5 mm, rack +-28 mm at -25/0/+35): 0 clashing pairs | 0 pairs > 0.01 mm3 (spring overlap expected) | PASS | Assembly_Checks\assembly_checks.txt |
| Static geometry | KPI 8.46 deg, caster 6.93 deg, scrub 39.0 mm, trail 31.3 mm | report | - | ..\Analysis\analysis.json |
| Camber gain | -0.536 deg/25 mm bump; outer wheel in roll +0.712 deg/deg | negative gain in bump | PASS | Kinematics\camber_vs_travel.png, camber_vs_roll.png |
| Bump steer | 0.26 mdeg over full travel (inner tie-rod point optimised) | < 0.05 deg | PASS | Kinematics\bump_steer.png |
| Roll centre | 72.3 mm static (80 rebound / 62 bump), 201 mm/deg lateral in roll | report | - | Kinematics\roll_centre_*.png |
| Anti-dive | 28.2 % | report | - | Kinematics\track_antidive.png |
| Motion ratios | pushrod 0.696, rocker 1.286, installation 0.894 (0.816 -> 1.009) | rising rate | PASS | Kinematics\motion_ratio.png |
| Damper stroke | 54.7 of 60 mm used | < stroke | PASS | Kinematics\damper_rocker.png |
| Spring / wheel rate / ride | spring 160.0 N/mm, wheel rate 133.3 N/mm (bump 174), ride 4.09 Hz | ~4 Hz target | PASS | Kinematics\wheel_rate.png |
| Spring stress / coil bind | 844 MPa at full bump (SF 1.24); min length 96 vs solid 83 mm | SF >= 1.2, no bind | PASS | ..\Analysis\analysis.json |
| Steering | +-28 mm rack -> 11.5 deg | report | - | Kinematics\steering.png |
| Member Upper front leg (22.2 x 1.65) | max T 1.9 kN, max C -5.7 kN; buckling SF 6.55 | SF >= 1.5 buckling and yield | PASS | Loads\member_checks.csv |
| Member Upper rear leg (22.2 x 1.65) | max T 3.9 kN, max C -0.4 kN; buckling SF 101.58 | SF >= 1.5 buckling and yield | PASS | Loads\member_checks.csv |
| Member Lower front leg (25.4 x 1.65) | max T 20.9 kN, max C -4.7 kN; buckling SF 8.85 | SF >= 1.5 buckling and yield | PASS | Loads\member_checks.csv |
| Member Lower rear leg (25.4 x 1.65) | max T 9.4 kN, max C -14.7 kN; buckling SF 2.84 | SF >= 1.5 buckling and yield | PASS | Loads\member_checks.csv |
| Member Tie rod (22.2 x 1.65) | max T 2.2 kN, max C -1.9 kN; buckling SF 19.99 | SF >= 1.5 buckling and yield | PASS | Loads\member_checks.csv |
| Member Pushrod (25.4 x 2.11) | max T -2.6 kN, max C -21.3 kN; buckling SF 2.15 | SF >= 1.5 buckling and yield | PASS | Loads\member_checks.csv |
| Joint hardware | max joint load 21.3 kN; bolt shear SF 6.9, GE12E SF 2.54, rod end SF 1.64 (ratings assumed, catalogue class) | SF >= 1.5 | PASS | ..\Analysis\analysis.json |
| FEA Lower wishbone 4130 | worst C2 braking 4.0 g: peak 412 MPa (SF 1.12), 99.9th pct 266 MPa (SF 1.73), 520,863 DOF | SF >= 1.5 on p99.9 (peak = sharp-corner singularity) | PASS | FEA\fea_LowerWishbone_vonMises.png, FEA\LowerWishbone_worst.vtu |
| FEA Upper wishbone 4130 | worst C2 braking 4.0 g: peak 200 MPa (SF 2.30), 99.9th pct 122 MPa (SF 3.78), 329,403 DOF | SF >= 1.5 on p99.9 (peak = sharp-corner singularity) | PASS | FEA\fea_UpperWishbone_vonMises.png, FEA\UpperWishbone_worst.vtu |
| FEA Upright 7075-T6 | worst C2 braking 4.0 g: peak 732 MPa (SF 0.69), 99.9th pct 283 MPa (SF 1.78), 482,826 DOF | SF >= 1.5 on p99.9 (peak = sharp-corner singularity) | PASS | FEA\fea_Upright_vonMises.png, FEA\Upright_worst.vtu |
| FEA Chassis clevis 7075-T6 | worst C2 LF: peak 436 MPa (SF 1.15), 99.9th pct 317 MPa (SF 1.59), 246,786 DOF | SF >= 1.5 on p99.9 (peak = sharp-corner singularity) | PASS | FEA\fea_WishboneClevis_vonMises.png, FEA\WishboneClevis_worst.vtu |
| FEA Rocker 7075-T6 | worst C4 bump 3 g: peak 184 MPa (SF 2.73), 99.9th pct 171 MPa (SF 2.95), 288,402 DOF | SF >= 1.5 on p99.9 (peak = sharp-corner singularity) | PASS | FEA\fea_Rocker_vonMises.png, FEA\Rocker_worst.vtu |
| Mass (Inventor) | corner 42.08 kg, unsprung 33.61 kg | report | - | ..\Analysis\mass_model.json, ..\F1Suspension_BOM.csv |

## Design iterations driven by these checks

1. FEA: pushrod bracket on the lower wishbone put a ~1.3 kN.m couple into the 25.4 x 1.65 legs (> 1 GPa) -> pushrod moved to an upright clevis above the LBJ (six-member statics, legs pure axial).
2. FEA: 13 kN fore-aft load at the LBJ was axial on a 12 mm housing -> LBJ bolt turned vertical (load radial), wide in-plane apex block.
3. FEA: tube axes off the pin-to-pin force lines (10-17 mm eccentricity) -> every leg tube routed on its force line, plugged ends, deeper necks.
4. FEA: upright load set was not moment-balanced (caliper pad radius) -> lug forces solved for force + moment; caliper lugs and lower arm upsized.
5. Interference sweeps: rod-end/clevis and housing/spacer contact at full lock -> 24 mm clevis gaps with high-misalignment cone spacers; damper perch/rocker, rack clevis/chassis and rim/upper wishbone contacts fixed (rack travel limited to +-28 mm).

## Assumptions

Vehicle 800 kg, 45 % front, CG 300 mm, downforce 2.0 x weight (40 % front), brake bias 57 % front; quasi-static limit loads; tyre radius 360 mm rigid, 350 N/mm vertical stiffness. Materials: 4130 normalised Sy 460 MPa (weld/HAZ 360), 7075-T6 Sy 503 MPa. Purchased parts without vendor CAD are catalogue/envelope models with estimated masses and assumed ratings. FEA linear elastic, no weld fillets. Not modelled: heave spring, anti-roll bar, the right-hand corner, tyre moments, fatigue.
