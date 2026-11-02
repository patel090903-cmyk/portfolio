# TwoCylinderEngine - working-model check (2026-11-02)

Question: does the Inventor model work as a machine - opens cleanly, is fully constrained, has a driving parameter that
moves every mechanism through its range with the right kinematics, has no unexplained clashes at any pose, and do its
numbers match the calc report? Checked with Inventor's own tools by `..\..\_shared\working_model_check.py` (results in
`Working_Model_Check\working_model_check.json` / `.txt`). Designed and simulated only: nothing has been built.

**Verdict: WORKING MODEL. One parameter, Crank, turns the pressed crank and flywheel, moves both pistons and rods by the exact slider-crank law, turns both camshafts at half speed in the same sense (chain drive) and lifts all 8 valves from the cam-law parameters; 0 DOF, 0 unhealthy constraints, 0 clashes at 21 crank angles over the full 720 deg cycle, kinematic probes within 0.0000 deg.**

## 1. Opens cleanly, fully constrained

| Check | Result | Criterion | Status |
|---|---|---|---|
| Occurrences / constraints | 195 / 582 | - | - |
| Unhealthy constraints | 0 | 0 | PASS |
| Suppressed constraints | 0 | 0 | PASS |
| Degrees of freedom (all occurrences) | 0 | 0 (motion only through the driving parameters) | PASS |

## 2. Driving parameters

| Parameter | Drives | Range | Status |
|---|---|---|---|
| `Crank` | crank webs + centre + crankpins + flywheel + ring gear + pump rotor about X; pistons (PinZ1/PinZ2) and rods (Rod1/Rod2) by the slider-crank expressions; camshafts and sprockets at Crank/2; 8 valves + retainers + keepers + buckets + shims by LiftIN1/EX1/IN2/EX2 | 0-720 deg (one 4-stroke cycle; checked every 45 deg plus 10, 350, 370, 466, 646) | PASS |

Parameters in the saved assembly: `{'Crank': '0 deg', 'r_crank': '24.5 mm', 'L_rod': '94.0 mm', 'PinZ1': 'r_crank * cos(Crank) + sqrt((L_rod) ^ 2 ul - ( r_crank * sin(Crank) ) ^ 2 ul)', 'PinZ2': '-r_crank * cos(Crank) + sqrt((L_rod) ^ 2 ul - ( r_crank * sin(Crank) ) ^ 2 ul)', 'Rod1': '-asin(r_crank / L_rod * sin(Crank))', 'Rod2': 'asin(r_crank / L_rod * sin(Crank))', 'Cam': 'Crank / 2 ul', 'PsiEX1': '( Cam - 126 deg ) - 360 deg * round(( Cam - 126 deg ) / 360 deg)', 'UEX1': 'min(abs(PsiEX1) / 68 deg;1 ul)', 'LiftEX1': 'max(7.15 mm * ( 1 ul + ( -1.8 ul ) * ( (UEX1) ^ 2 ul ) + ( -0.6 ul ) * ( (UEX1) ^ 4 ul ) + ( 2.6 ul ) * ( (UEX1) ^ 6 ul ) + ( -1.2 ul ) * ( (UEX1) ^ 8 ul ) ) - 0.15 mm;0 mm)', 'PsiIN1': '( Cam - 233 deg ) - 360 deg * round(( Cam - 233 deg ) / 360 deg)', 'UIN1': 'min(abs(PsiIN1) / 68 deg;1 ul)', 'LiftIN1': 'max(7.15 mm * ( 1 ul + ( -1.8 ul ) * ( (UIN1) ^ 2 ul ) + ( -0.6 ul ) * ( (UIN1) ^ 4 ul ) + ( 2.6 ul ) * ( (UIN1) ^ 6 ul ) + ( -1.2 ul ) * ( (UIN1) ^ 8 ul ) ) - 0.15 mm;0 mm)', 'PsiEX2': '( Cam - 216 deg ) - 360 deg * round(( Cam - 216 deg ) / 360 deg)', 'UEX2': 'min(abs(PsiEX2) / 68 deg;1 ul)', 'LiftEX2': 'max(7.15 mm * ( 1 ul + ( -1.8 ul ) * ( (UEX2) ^ 2 ul ) + ( -0.6 ul ) * ( (UEX2) ^ 4 ul ) + ( 2.6 ul ) * ( (UEX2) ^ 6 ul ) + ( -1.2 ul ) * ( (UEX2) ^ 8 ul ) ) - 0.15 mm;0 mm)', 'PsiIN2': '( Cam - 323 deg ) - 360 deg * round(( Cam - 323 deg ) / 360 deg)', 'UIN2': 'min(abs(PsiIN2) / 68 deg;1 ul)', 'LiftIN2': 'max(7.15 mm * ( 1 ul + ( -1.8 ul ) * ( (UIN2) ^ 2 ul ) + ( -0.6 ul ) * ( (UIN2) ^ 4 ul ) + ( 2.6 ul ) * ( (UIN2) ^ 6 ul ) + ( -1.2 ul ) * ( (UIN2) ^ 8 ul ) ) - 0.15 mm;0 mm)'}`

## 3. Interference and kinematics across the range

AnalyzeInterference over every occurrence at each pose; pairs counted above 0.01 mm3.

| Pose | Occurrences | Interfering pairs | Volume mm3 | Excluded | Kinematic probes (max error) |
|---|---|---|---|---|---|
| Crank 0 | 193 | 0 | 0 | ValveSpring_C2IN | 4 probes, 0.00000 deg |
| Crank 45 | 193 | 0 | 0 | ValveSpring_C2IN | 4 probes, 0.00000 deg |
| Crank 90 | 195 | 0 | 0 | - | 4 probes, 0.00000 deg |
| Crank 135 | 193 | 0 | 0 | ValveSpring_C1EX | 4 probes, 0.00000 deg |
| Crank 180 | 193 | 0 | 0 | ValveSpring_C1EX | 4 probes, 0.00000 deg |
| Crank 225 | 193 | 0 | 0 | ValveSpring_C1EX | 4 probes, 0.00000 deg |
| Crank 270 | 193 | 0 | 0 | ValveSpring_C1EX | 4 probes, 0.00000 deg |
| Crank 315 | 191 | 0 | 0 | ValveSpring_C1EX, ValveSpring_C2EX | 4 probes, 0.00000 deg |
| Crank 360 | 189 | 0 | 0 | ValveSpring_C1IN, ValveSpring_C1EX, ValveSpring_C2EX | 4 probes, 0.00000 deg |
| Crank 405 | 191 | 0 | 0 | ValveSpring_C1IN, ValveSpring_C2EX | 4 probes, 0.00000 deg |
| Crank 450 | 191 | 0 | 0 | ValveSpring_C1IN, ValveSpring_C2EX | 4 probes, 0.00000 deg |
| Crank 495 | 191 | 0 | 0 | ValveSpring_C1IN, ValveSpring_C2EX | 4 probes, 0.00000 deg |
| Crank 540 | 189 | 0 | 0 | ValveSpring_C1IN, ValveSpring_C2IN, ValveSpring_C2EX | 4 probes, 0.00000 deg |
| Crank 585 | 191 | 0 | 0 | ValveSpring_C1IN, ValveSpring_C2IN | 4 probes, 0.00000 deg |
| Crank 630 | 193 | 0 | 0 | ValveSpring_C2IN | 4 probes, 0.00000 deg |
| Crank 675 | 193 | 0 | 0 | ValveSpring_C2IN | 4 probes, 0.00000 deg |
| Crank 10 | 193 | 0 | 0 | ValveSpring_C2IN | 4 probes, 0.00000 deg |
| Crank 350 | 189 | 0 | 0 | ValveSpring_C1IN, ValveSpring_C1EX, ValveSpring_C2EX | 4 probes, 0.00000 deg |
| Crank 370 | 189 | 0 | 0 | ValveSpring_C1IN, ValveSpring_C1EX, ValveSpring_C2EX | 4 probes, 0.00000 deg |
| Crank 466 | 191 | 0 | 0 | ValveSpring_C1IN, ValveSpring_C2EX | 4 probes, 0.00000 deg |
| Crank 646 | 193 | 0 | 0 | ValveSpring_C2IN | 4 probes, 0.00000 deg |

Total interfering pairs over all poses: **0**.

Exclusions and contacts explained:

- A valve spring is left out of the interference check only at the poses where its own valve is open: the spring is a rigid solid at the 32 mm installed height, so the retainer moves into it by the valve lift. Checked separately (Tests/Clearances): at full lift (7.0 mm) each of the 8 springs overlaps ONLY its own retainer (82.3 mm3 intake / 82.1 mm3 exhaust); the open length 25.0 mm stays 3.25 mm above coil bind (21.75 mm).
- The cam chain is a static model (the two side-plate bands, rollers and pins not modelled); the sprocket teeth turn between the plates, so it is checked at every pose without exclusion.
- The 6 contacts below 0.01 mm3 are touching faces (bearings on journals and in their seats, needle cages on the crankpins).

Kinematics:

- Probes (Inventor-measured rotation vs the driver): left crank web and flywheel about X = Crank, both camshafts about X = Crank/2; max error 0.00000 deg at all 21 poses (baseline taken at Crank 0).
- Piston pin height, rod angle, cam angle and all 8 valve lifts checked against design.py at 32 crank angles by cad_props.py: max errors 0.0 (Tests/Kinematics/kinematics_check.json).
- Firing: cylinder 1 at 0 deg, cylinder 2 at 180 deg (180 deg crank, intervals 180 / 540). Overlap TDC of cylinder 1 at 360, of cylinder 2 at 540; cam drive sense: cams turn the same way as the crank (chain), confirmed by the probes.
- Clearances measured in Inventor (MeasureTools minimum distance, Tests/Clearances): piston to intake valve 2.05 mm (crank 368), to exhaust valve 2.55 mm (crank 352); intake to exhaust valve 2.64 mm through overlap; piston to head 1.10 mm at every TDC (0.3 deck + 0.8 gasket).

## 4. Mass and key numbers vs the calc report

| Quantity | CAD (Inventor) | Calc report / earlier check | Status |
|---|---|---|---|
| Assembly mass | 36.70 kg (32.9 kg without the starter) | calc report uses the same Inventor masses (cad_props.json) | MATCH |
| Reciprocating mass per cylinder | 0.269 kg (piston, rings, pin, clips, rod small-end share) | inertia forces and balance (balance factor 0.44) | MATCH |
| Crank group / flywheel inertia | 0.0416 / 0.0388 kg m2 | flywheel speed fluctuation Cs 0.098 at idle | MATCH |
| Valve-train moving mass | 60.3 g intake / 57.0 g exhaust | valve float 9967 rpm (limit 8500) | MATCH |
| Piston-to-valve clearance | 2.05 / 2.55 mm (Inventor) | 2.05 / 2.55 mm (analytic, analysis.json) | MATCH |

## 5. Fixed in this audit

- 2026-11-02: intake and exhaust valve heads came within 0.16 mm of each other at overlap (24 / 20.5 mm heads on 22 mm centres crossed the roof ridge: no metal left between the seats). Respec: custom 22 / 19 mm heads at 11.4 mm offset -> 2.64 mm measured, chain path still inside 118 links (117.94 pitches).
- 2026-11-02: crankpin press fit 0.04 mm gave only SF 1.27 on slip against the 146.7 N m peak crank torque. Respec: web bores 27.915 +/-0.004 on the 28 g5 pins = 0.065-0.082 mm, slip SF 2.06 at the loosest fit, web hoop stress 413 MPa at the tightest.
- 2026-11-02 (con-rod FEA): the shank met both eyes in sharp corners and the small-end eye wall was 4 mm; tension at 8500 rpm gave Goodman SF 1.18. Respec: R4 / R5 shank-to-eye blends, R1.5 pocket corners, small-end OD 27 -> 29 mm (rod 222 -> 232 g): SF 1.58 at 8500 rpm, 1.72 at 8000, 2.37 at 6000. Re-checked: 0 clashes at all 21 crank angles.
- 2026-11-02: the shared check now takes its probe baseline at Crank 0 (the saved file was at 60 deg and skewed the probes by exactly 60 / 30 deg).

## 6. Limits (said plainly)

- Springs are rigid at installed height (explained above); rings are modelled as plain rings without gaps; the chain is static; the carburettors, starter, oil filter and spark plugs are envelopes.
- Gas dynamics, combustion and friction are calculation models (calc report), not CAD; nothing has been built or run.
