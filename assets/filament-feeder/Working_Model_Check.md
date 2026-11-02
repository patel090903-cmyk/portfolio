# FilamentFeeder - working-model check (2026-11-02)

Question: does the Inventor model work as a machine - opens cleanly, is fully constrained, has a driving parameter that
moves every mechanism through its range with the right kinematics, has no unexplained clashes at any pose, and do its
numbers match the calc report? Checked with Inventor's own tools by `..\..\_shared\working_model_check.py` (results in
`Working_Model_Check\working_model_check.json` / `.txt`). Designed and simulated only: nothing has been built.

**Verdict: WORKING MODEL. Feed turns the main drive shaft, 48T gear and main drive gear by Feed / r_eff, the idler drive gear the other way, the motor shaft and 16T pinion three times faster the other way, the spool and hub by Feed / 85 mm, and slides the filament; Lever swings the idler arm open. 0 DOF, 0 unhealthy constraints, 0 clashes at 11 poses (Feed 0 to 60 mm, across a tooth pitch and a full drive-gear turn, idler open 3 and 6 deg); probes within 0.0000 deg.**

## 1. Opens cleanly, fully constrained

| Check | Result | Criterion | Status |
|---|---|---|---|
| Occurrences / constraints | 50 / 147 | - | - |
| Unhealthy constraints | 0 | 0 | PASS |
| Suppressed constraints | 0 | 0 | PASS |
| Degrees of freedom (all occurrences) | 0 | 0 (motion only through the driving parameters) | PASS |

## 2. Driving parameters

| Parameter | Drives | Range | Status |
|---|---|---|---|
| `Feed` | main shaft + 48T gear + main drive gear (DriveAng), idler drive gear (-DriveAng), motor shaft + pinion (-3 DriveAng), spool + hub (SpoolAng), filament (+Feed) | any (checked 0-60 mm: 0.4, 1.0, 2.3 mm inside one tooth pitch, 11.56 / 23.12 mm = half / one drive-gear turn) | PASS |
| `Lever` | idler arm + idler shaft + 2 MR63ZZ + idler drive gear about the M3 pivot | 0 (clamped) to 6 deg (open for loading) | PASS |

Parameters in the saved assembly: `{'Feed': '0 mm', 'Lever': '0 deg', 'r_eff': '3.68 mm', 'DriveAng': 'Feed / r_eff * 180 deg / PI', 'MotorAng': '-3 ul * DriveAng', 'SpoolAng': 'Feed / 85 mm * 180 deg / PI'}`

## 3. Interference and kinematics across the range

AnalyzeInterference over every occurrence at each pose; pairs counted above 0.01 mm3.

| Pose | Occurrences | Interfering pairs | Volume mm3 | Excluded | Kinematic probes (max error) |
|---|---|---|---|---|---|
| Feed 0 / Lever 0 | 50 | 0 | 0 | - | 6 probes, 0.00000 deg |
| Feed 0.4 / Lever 0 | 50 | 0 | 0 | - | 6 probes, 0.00000 deg |
| Feed 1 / Lever 0 | 50 | 0 | 0 | - | 6 probes, 0.00000 deg |
| Feed 2.3 / Lever 0 | 50 | 0 | 0 | - | 6 probes, 0.00000 deg |
| Feed 4.7 / Lever 0 | 50 | 0 | 0 | - | 6 probes, 0.00000 deg |
| Feed 11.56 / Lever 0 | 50 | 0 | 0 | - | 6 probes, 0.00000 deg |
| Feed 23.12 / Lever 0 | 50 | 0 | 0 | - | 6 probes, 0.00000 deg |
| Feed 60 / Lever 0 | 50 | 0 | 0 | - | 6 probes, 0.00000 deg |
| Feed 0 / Lever 6 (open) | 49 | 0 | 0 | Spring_8x1x18 | 6 probes, 0.00000 deg |
| Feed 5 / Lever 6 (open) | 49 | 0 | 0 | Spring_8x1x18 | 6 probes, 0.00000 deg |
| Feed 2 / Lever 3 | 49 | 0 | 0 | Spring_8x1x18 | 6 probes, 0.00000 deg |

Total interfering pairs over all poses: **0**.

Exclusions and contacts explained:

- The compression spring is a rigid solid at its 12 mm installed length, so it is left out of the clash check only while the arm is open; at 6 deg it overlaps only the arm (21.7 mm3 = its extra 2.5 mm of compression), measured in Inventor (Tests/Clearances).
- The gear teeth are true involutes generated in design.py (16/48 and 17/17, 0.06 mm backlash); both meshes are clash-free at every pose, with 0.057 mm pinion backlash and flank contact (0 overlap) between the drive gears.
- The 1 contact below 0.01 mm3 at Lever 0 is the D2F lever tip resting 0.03 mm above the filament (measured).

Kinematics:

- Probes (Inventor-measured rotation about Y vs the driver): main drive gear and 48T gear = DriveAng, pinion = -3 DriveAng, idler drive gear = -DriveAng, idler arm = -Lever, spool = Feed / 85 mm; max error 0.00000 deg.
- Each driven joint was verified against design.py at 3 Feed and 3 Lever test values in build_assembly.py before it was kept.
- Clearances measured in Inventor: filament to each groove 0.067 mm (the CAD groove envelope; the tooth bite is not modelled), loading gap at Lever 6: 0.90 mm, motor-shaft end to the inlet guide 0.26 mm, idler arm to body >= 0.31 mm.

## 4. Mass and key numbers vs the calc report

| Quantity | CAD (Inventor) | Calc report / earlier check | Status |
|---|---|---|---|
| Assembly mass | 2.21 kg (incl. a full 1.25 kg spool) | calc report uses the same design data | MATCH |
| Clamp force | 53.4 N (spring 26.7 N x lever 2.0) | push capacity 64 N at mu 0.6 | MATCH |
| Steps / mm | 415.2 at 1/16 microstep (3:1, d_eff 7.36) | BMG reference value 415 | MATCH |

## 5. Fixed in this audit

- 2026-11-02 first check: the runout switch hit its push-fit and the two push-fits overlapped (runout block 14 mm too close), the pivot screw tip touched the motor boss, the 24 mm motor shaft end ran into the body wall and the main shaft end into the cover: block moved, M3x28 pivot screw, drive pocket widened to x -19.5, cover bearing seat 0.5 mm deeper; re-checked: 0 clashes.
- Calc: the 48T gear in POM had a Lewis safety factor of 1.29 at the grip-limited force -> brass (SF 5.2); the idler arm in PA6-CF instead of PETG (constant spring load: creep).

## 6. Limits (said plainly)

- The spring is rigid (explained above); the drive-gear teeth that bite the filament are not modelled (groove envelope only).
- Push-fits, switch, motor and spool are envelope models; nothing has been printed, assembled or run.
