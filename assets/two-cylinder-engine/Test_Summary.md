# TwoCylinderEngine - test results summary

Model: `..\TwoCylinderEngine.iam` (assembly parameter `Crank`, 0 = cylinder 1 TDC firing, 720 deg cycle). Full write-up: `..\Analysis\TwoCylinderEngine_CalcReport.pdf`.
**Designed and calculated only: every result here is a CAD measurement, a calculation, an FEA simulation or a catalogue value. Nothing has been built, run or tested.**

| Test | Result | Criterion | Status | Files |
|---|---|---|---|---|
| Working model (Inventor) | 195 occurrences, 582 constraints, 0 DOF, 0 unhealthy; one parameter `Crank` drives crank, pistons, rods, both cams (Crank/2) and 8 valves; 0 clashing pairs at 21 crank angles over 720 deg; probes within 0.00000 deg | 0 DOF, 0 clashes | PASS | Working_Model_Check.md, Working_Model_Check\ |
| Kinematics vs design.py | pin height, rod angle, cam angle, 8 valve lifts at 32 crank angles: max errors {'pin_mm': 0.0, 'rod_deg': 0.0, 'cam_deg': 0.0, 'valve_mm': 0.0, 'crank_deg': 0.0} | 0 | PASS | Kinematics\kinematics_check.json |
| Firing / cam drive | cyl 1 fires at 0, cyl 2 at 180 (180 deg crank, 180 / 540 intervals); cams turn with the crank at half speed (chain), probes confirm | 4-stroke timing | PASS | Working_Model_Check.md |
| Piston to valve (Inventor, 2 deg steps) | cyl 1: intake 2.047 mm at 368, exhaust 2.552 mm at 352; cyl 2: 2.047 / 2.552 mm; analytic 2.05 / 2.55 | >= 1.5 in / 2.0 ex | PASS | Clearances\ |
| Intake to exhaust valve | 2.641 mm at crank 364 (was 0.16 mm before the 2026-11-02 valve respec) | >= 1.0 | PASS (fixed) | Clearances\ |
| Piston to head (squish) | 1.1 mm at every TDC (deck 0.3 + gasket 0.8) | 0.8-1.2 | PASS | Clearances\ |
| Valve springs (rigid in CAD) | at 7.0 mm lift each spring overlaps only its own retainer (82 mm3); coil-bind margin 3.25 mm | only retainers | PASS (explained) | Clearances\ |
| Valve float | 9967 / 10252 rpm (moving mass 60.3 / 57.0 g from CAD; spring rate 23.0 N/mm ASSUMED) | > 8500 rpm | PASS (measure the spring) | Valvetrain\valve_float.png |
| Cam lobe | min radius of curvature 4.22 mm, contact offset 10.52 mm < bucket R12.5, nose Hertz 492 MPa | rho > 0, offset < R | PASS | Valvetrain\ |
| Valve timing | IVO 14 BTDC / IVC 46 ABDC, EVO 48 BBDC / EVC 12 ATDC (0 lift), 240 deg | report | - | Valvetrain\valve_lift_cam_law.png |
| Displacement / CR | 295.9 cc, CR 10.6 (chamber 12.011 cc) | 296 cc, 10.6 | PASS | ..\Analysis\analysis.json |
| Performance (cycle model) | 20.93 kW at 8500 rpm, 24.37 N m at 6500 rpm; inlet Mach index 0.483 | report | - (eta_v assumed) | Performance\ |
| Balance | primary force 0 (180 deg), pitch couple 223.6 N m, secondary 2726 N at 8500; balance factor 0.438 | report | - | Balance\balance_layouts.png |
| Flywheel | idle 1500 rpm, 0.30 charge: Cs 0.0982 (target 0.1); WOT 2500 rpm: Cs 0.0668 (target 0.05); WOT 4000 rpm: Cs 0.0288 (target 0.05) | <= target | PARTLY: idle and 4000 rpm pass; 2500 rpm WOT misses (rough at low-speed full load, acceptable on a stand) | ..\Analysis\analysis.json |
| Con-rod buckling | SF 11.84 (Johnson, 4340 QT) | >= 3 | PASS | ..\Analysis\analysis.json |
| Con-rod FEA (P2 tets) | 297,078 DOF; compression 11.93 kN: 179.7 MPa (SF 5.57); tension 6.62 kN: 350.7 MPa (SF 2.85) | SF >= 1.5 yield | PASS | FEA\ |
| Con-rod fatigue (Goodman) | per speed: WOT 6000 2.37, WOT 8000 1.72, WOT 8500 (limit) 1.58; worst-of-both combined 1.5 | >= 1.5 | PASS (after the R4/R5 blends + 29 mm eye; was 1.18) | FEA\ |
| Piston pin | bending 188 MPa, SF 4.79 | >= 2 | PASS | ..\Analysis\analysis.json |
| Crankpin | bending 39 MPa, SF 38.89 | >= 2 | PASS | ..\Analysis\analysis.json |
| Crankpin press fit | first spec 0.040: slip SF 1.27; min fit 0.065: slip SF 2.06; max fit 0.082: slip SF 2.6 vs 146.7 N m peak; web hoop 413 MPa at max fit | slip SF >= 2 | PASS (respecced from 0.04 mm) | ..\Analysis\analysis.json |
| Head studs M8 10.9 | clamp ratio 4.97, hot stress 674 MPa of 940 proof | >= 2, < proof | PASS | ..\Analysis\analysis.json |
| Bearings (L10 at continuous WOT) | big_end K28x34x17A: WOT 6000 603 h, WOT 8000 141 h; main 6306/C3 (2 off): WOT 6000 1770 h, WOT 8000 819 h | report | - (big end 141 h at continuous 8000: fine for a stand duty, short for road use) | ..\Analysis\analysis.json |
| Cooling | about 9.5 kW continuous with blower + oil cooler; full-power pulls ~78 s | report | LIMIT (stand use) | ..\Analysis\analysis.json |
| Mass (Inventor) | 36.705 kg with starter, 32.905 kg without | report | - | ..\Analysis\cad_props.json |
| Printability (velocity stacks, ASA) | 2 x VelocityStack: spigot down, bell up (flare 34 deg from vertical, no supports); 4 walls, 30 % gyroid, brim off, overhang 0.0 % | no supports | PASS | Printability\ |

## Respecs made in the 2026-11-02 audit

1. **Valve heads**: the first layout (EX300-size 24 / 20.5 mm heads on 22 mm centres) left 0.16 mm between the intake and exhaust valves at overlap (measured in Inventor) because both heads crossed the roof ridge. Custom 22 / 19 mm heads at an 11.4 mm offset: 2.64 mm, chain path still inside 118 links.
2. **Crankpin press fit**: 0.04 mm interference gave slip SF 1.27. Web bores now 27.915 +/-0.004 on 28 g5 pins (0.065-0.082 mm): SF 2.06 at the loosest fit.
3. **Con-rod**: sharp shank-to-eye corners and a 4 mm small-end wall gave Goodman SF 1.18 at 8500 rpm. R4 / R5 blends, R1.5 pocket corners, small-end OD 29 mm: SF 1.58.
4. **Working-model check**: the probe baseline is now taken at Crank 0 (a file saved at 60 deg skewed the probes), and cad_props.py forces Crank 0 before the throw-moment calculation (the drawing save stores the assembly at 60 deg and had halved the moment).

## Open items (said plainly)

- Spring rate, piston compression height and valve-train donor dimensions are assumed until the parts are measured.
- The volumetric-efficiency curve and Wiebe constants are assumed; no gas-dynamics or CFD model.
- Con-rod FEA uses a cosine bearing pressure and a fixed reaction half-bore (no contact, no bush); a contact model and a proof test would confirm the eye stresses.
- Big-end needle life is 141 h at continuous 8000 rpm WOT: acceptable for test-stand running, not for a road engine.
