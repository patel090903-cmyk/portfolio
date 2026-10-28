# RoboticArm6DOF - test results summary

Model: `..\RoboticArm6DOF.iam`. Full write-up: `..\Analysis\RoboticArm6DOF_CalcReport.pdf` (copies in `FEA\`, `Torque\`, `Dynamics\`).
**Everything here is calculated or simulated from the CAD model. No hardware exists yet, so there is no measured test data.**

| Test | Result | Criterion | Status | Files |
|---|---|---|---|---|
| Assembly DOF | 99 occurrences {'0T/0R': 99}; 193 constraints, 0 unhealthy | fully constrained | PASS | Assembly_Checks\assembly_checks.json |
| Kinematics: Inventor solver vs Python FK | max TCP error 0.00043 mm over 11 poses | < 0.01 mm | PASS | Assembly_Checks\assembly_checks.json |
| Interference @ home | 4 pairs, 0.001 mm3 | < 0.01 mm3 (tangency) | PASS | Assembly_Checks\assembly_checks.txt |
| Interference @ random1 | 4 pairs, 0.001 mm3 | < 0.01 mm3 (tangency) | PASS | Assembly_Checks\assembly_checks.txt |
| Interference @ random2 | 4 pairs, 0.001 mm3 | < 0.01 mm3 (tangency) | PASS | Assembly_Checks\assembly_checks.txt |
| Interference @ reach_horizontal | 4 pairs, 0.001 mm3 | < 0.01 mm3 (tangency) | PASS | Assembly_Checks\assembly_checks.txt |
| Interference @ pick_low | 4 pairs, 0.001 mm3 | < 0.01 mm3 (tangency) | PASS | Assembly_Checks\assembly_checks.txt |
| Motion study (Inventor, pick-and-place) | 18 frames, 0 interference hits | 0 | PASS | Motion_Study\motion_study.json, motion.gif |
| Joint sweep q1 (q2=20, q3=75, q4=0, q5=75, q6=0) | collision-free [-170.0, 170.0] deg | report | - | Assembly_Checks\joint_range_sweep.json |
| Joint sweep q2 (q1=0, q3=75, q4=0, q5=75, q6=0) | collision-free [-60.0, 110.0] deg | report | - | Assembly_Checks\joint_range_sweep.json |
| Joint sweep q2 (q1=0, q3=0, q4=0, q5=0, q6=0) | collision-free [-60.0, 110.0] deg | report | - | Assembly_Checks\joint_range_sweep.json |
| Joint sweep q3 (q1=0, q2=20, q4=0, q5=75, q6=0) | collision-free [-100.0, 100.0] deg | report | - | Assembly_Checks\joint_range_sweep.json |
| Joint sweep q3 (q1=0, q2=90, q4=0, q5=0, q6=0) | collision-free [-100.0, 100.0] deg | report | - | Assembly_Checks\joint_range_sweep.json |
| Joint sweep q4 (q1=0, q2=20, q3=75, q5=75, q6=0) | collision-free [-180.0, 180.0] deg | report | - | Assembly_Checks\joint_range_sweep.json |
| Joint sweep q5 (q1=0, q2=20, q3=75, q4=0, q6=0) | collision-free [-60.0, 100.0] deg | report | - | Assembly_Checks\joint_range_sweep.json |
| Joint sweep q5 (q1=0, q2=20, q3=75, q4=90, q6=0) | collision-free [-60.0, 100.0] deg | report | - | Assembly_Checks\joint_range_sweep.json |
| Joint sweep q6 (q1=0, q2=20, q3=75, q4=0, q5=75) | collision-free [-180.0, 180.0] deg | report | - | Assembly_Checks\joint_range_sweep.json |
| Joint sweep grip (q1=0, q2=20, q3=75, q4=0, q5=75, q6=0) | collision-free [0.0, 45.0] deg | report | - | Assembly_Checks\joint_range_sweep.json |
| Mass (Inventor) | moving 1.90 kg, total 5.02 kg; CG [24.78, 3.74, 184.65] mm (home) | report | - | ..\Analysis\mass_model.json |
| Reach / workspace | 537.8 mm shoulder-TCP horizontal; tool-down reach at grasp height 390.0 mm | >= 350 mm | PASS | Workspace\workspace.png |
| Joint torque J1 | req 0.13 N.m (static 0.00, traj 0.13) vs capacity 7.09 N.m | SF >= 2 | PASS (52.98) | Torque\joint_torque_table.csv |
| Joint torque J2 | req 6.54 N.m (static 6.54, traj 5.16) vs capacity 13.30 N.m | SF >= 2 | PASS (2.03) | Torque\joint_torque_table.csv |
| Joint torque J3 | req 2.81 N.m (static 2.81, traj 1.87) vs capacity 8.55 N.m | SF >= 2 | PASS (3.04) | Torque\joint_torque_table.csv |
| Joint torque J4 | req 0.84 N.m (static 0.84, traj 0.02) vs capacity 2.24 N.m | SF >= 2 | PASS (2.67) | Torque\joint_torque_table.csv |
| Joint torque J5 | req 0.85 N.m (static 0.85, traj 0.03) vs capacity 2.98 N.m | SF >= 2 | PASS (3.51) | Torque\joint_torque_table.csv |
| Joint torque J6 | req 0.08 N.m (static 0.08, traj 0.00) vs capacity 0.98 N.m | SF >= 2 | PASS (10.0) | Torque\joint_torque_table.csv |
| Stepper J1 along trajectory | motor SF 55.6 (peak 143 rpm), gearbox 0.04 N.m (SF 85.24) | SF >= 1.5 / 2 | PASS | Dynamics\joint_torques.png |
| Stepper J2 along trajectory | motor SF 4.39 (peak 383 rpm), gearbox 1.16 N.m (SF 2.58) | SF >= 1.5 / 2 | PASS | Dynamics\joint_torques.png |
| Stepper J3 along trajectory | motor SF 10.29 (peak 135 rpm), gearbox 0.66 N.m (SF 4.57) | SF >= 1.5 / 2 | PASS | Dynamics\joint_torques.png |
| Gripper force | 9.62 N available vs 5.1 N required per jaw | SF >= 1.5 | PASS (1.88) | ..\Analysis\analysis.json |
| Gear J1 m1.5 18:72 (Lewis) | pinion 17.82 MPa, gear 12.73 MPa | SF >= 1.5 vs 30 MPa | PASS (1.68) | ..\Analysis\analysis.json |
| Gear J2 m1.75 18:84 (Lewis) | pinion 11.81 MPa, gear 8.31 MPa | SF >= 1.5 vs 30 MPa | PASS (2.54) | ..\Analysis\analysis.json |
| Gear J4 m1.25 16:24 (Lewis) | pinion 18.87 MPa, gear 16.58 MPa | SF >= 1.5 vs 30 MPa | PASS (1.59) | ..\Analysis\analysis.json |
| Gear J5 m1.0 20:40 (Lewis) | pinion 13.22 MPa, gear 10.94 MPa | SF >= 1.5 vs 30 MPa | PASS (2.27) | ..\Analysis\analysis.json |
| Belt HTD 375-5M-15 | tight side 137.7 N, 6.5 teeth in mesh | SF >= 2 vs 300 N (assumed) | PASS (2.18) | ..\Analysis\analysis.json |
| FEA A - caseA_upper_arm | 4.88 MPa peak (4.88 away from the fixed zone), u max 0.137 mm | SF >= 2 vs 45 MPa | PASS (9.2) | FEA\caseA_upper_arm_vonMises.png, FEA\caseA_upper_arm.vtu |
| FEA B - caseB_shoulder_cheek | 12.95 MPa peak (12.95 away from the fixed zone), u max 0.459 mm | SF >= 2 vs 45 MPa | PASS (3.5) | FEA\caseB_shoulder_cheek_vonMises.png, FEA\caseB_shoulder_cheek.vtu |
| FEA C - caseC_forearm | 9.08 MPa peak (9.08 away from the fixed zone), u max 0.216 mm | SF >= 2 vs 45 MPa | PASS (5.0) | FEA\caseC_forearm_vonMises.png, FEA\caseC_forearm.vtu |
| DfAM (FDM, 45 deg, 1.2 mm walls) | 21 printed parts measured in print orientation: 21 watertight, 14 need no supports, 7 need supports (UpperArmA, UpperArmB, Forearm, WristYoke, WristBracket, GripperBase, J4Gear) | see DfAM\ | - | DfAM\dfam_summary.json |

FEA solver: gmsh + scikit-fem (P2 tetrahedra) + PyPardiso, run outside Inventor (Inventor Stress Analysis not used). PA6-CF: E 3560 MPa, nu 0.35, allowable 45 MPa (Z), UTS 102 MPa (XY). Load = full extension + 0.5 kg x dynamic factor 1.5.

Assumptions (see the report section 9): Payload 0.5 kg treated as a point mass at the TCP (between the finger pads); 20 mm CG offset assumed for J4/J6 checks. Printed parts modelled solid at the filament density (PA6-CF 1.09, PETG 1.27 g/cm3): conservative (heavier) for thin-wall parts. Stepper pull-out curve ASSUMED (typical 17HS19-class at 24 V); holding torque 0.52 N.m and gearbox ratings (3 N.m max permissible, 5 N.m moment) from StepperOnline listings. Servo stall torques from DSSERVO listings at 6 V; continuous design budget = 50 % of stall. Efficiencies: PG5 90 %, PG19 80 % (datasheet); printed spur stage 95 %, HTD belt 95 % (assumed). Motor and gearbox masses: 0.55 kg (PG5) / 0.60 kg (PG19) estimated; servo masses from listings. Printed gear tooth allowable 30 MPa (PA6-CF, bending fatigue, assumed ~0.3 x XY UTS); Lewis form factor, Barth velocity factor. HTD 5M 15 mm allowable working tension taken as 300 N (conservative assumption; check the belt supplier's table).
