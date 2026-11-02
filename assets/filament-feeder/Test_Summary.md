# FilamentFeeder - test results summary

Model: `..\FilamentFeeder.iam` (assembly parameters `Feed` mm and `Lever` deg). Full write-up: `..\Analysis\FilamentFeeder_CalcReport.pdf`.
**Designed and calculated only: every result here is a CAD measurement, a calculation or a catalogue value. Nothing has been printed, built or tested.**

| Test | Result | Criterion | Status |
|---|---|---|---|
| Working model (Inventor) | 50 occurrences, 147 constraints, 0 DOF; Feed and Lever drive every gear, the motor shaft, spool, filament and idler arm; 0 clashing pairs at 11 poses; probes within 0.00000 deg | 0 DOF, 0 clashes | PASS |
| Gear meshes (involute, CAD) | 16/48 and 17/17 clash-free at every pose; pinion backlash 0.0566 mm; drive gears in flank contact | no overlap | PASS |
| Clearances (Inventor) | filament to grooves 0.0669 mm (envelope), loading gap 0.8991 mm at 6 deg, motor shaft to guide 0.2612 mm | > 0 | PASS |
| Clamp and grip | spring 8 x 1 x 18, k 4.446 N/mm, 26.68 N x lever 2.0 = 53.35 N; push capacity 42.7-85.4 N (mu 0.4-0.8 ASSUMED), 64.0 N nominal | >= 50 N | PASS (mu to be measured) |
| Flow before slip | 25.5 mm3/s nominal (15.8-35.2); model F_req = 8 N + 2.2 N per mm3/s (ASSUMED, PLA, 0.4 nozzle, 215 C) | >= 15 mm3/s | PASS (assumed demand model) |
| Motor torque margin | printing at the nominal grip limit: SF 5.9; printing 15 mm3/s: SF 9.3; retraction 40 mm/s (20 N assumed): SF 17.4; load / unload 80 mm/s (10 N): SF 27.8 | >= 2 | PASS (pull-out curve assumed) |
| Resolution | 415.2 steps/mm at 1/16 (2.41 um / microstep) | report | - |
| Gear teeth (Lewis, grip-limited) | 48T brass (m0.5, b 5): SF 5.16; 48T POM, rejected: SF 1.29; 16T steel pinion: SF 7.54; 17T drive-gear mesh (hardened): SF 8.75 | >= 2 | PASS (brass 48T; POM rejected) |
| Shafts | main 3 mm: 137 MPa (SF 7.3), deflection 0.0187 mm; idler 3 mm: 71 MPa | SF >= 2 | PASS |
| Bearings | 683ZZ [15.8, 37.5] N, MR63ZZ 26.7 N: L10 > 10^6 h at 15 mm3/s | report | PASS |
| Spring | stress 577 MPa clamped (SF 1.68), 818 MPa open (SF 1.18); coil-bind margin 0.99 mm | SF >= 1.1, > 0 | PASS |
| Idler arm (PA6-CF) | 5.6 MPa at the bearing seat (SF 7.98); creep decides the material | >= 2 | PASS |
| Spool upright + axle | post 1.23 MPa across layers (SF 12.2), axle 9.8 MPa | >= 3 | PASS |
| Spool drag | 0.035 N steady, 2.01 N at 2000 mm/s2 | << grip | PASS |
| Printability | FeederBody: 4.1 % overhang; FeederCover: 0.5 % overhang; RunoutBody: 1.1 % overhang; RunoutLid: 0.0 % overhang; SpoolUpright: 0.4 % overhang; SpoolHub: 4.8 % overhang; IdlerArm: 5.3 % overhang | report | PASS (supports only in the body gear pocket) |

## Design changes made from the checks (2026-11-02)

1. First working-model check found 5 clashes (runout switch vs push-fit, push-fit vs push-fit, pivot screw vs motor boss, motor-shaft end vs body wall, main-shaft end vs cover): runout block moved 14 mm, M3x28 pivot screw, drive pocket widened, cover seat 0.5 mm deeper. Re-checked: 0 clashes.
2. 48T gear: POM -> brass (Lewis SF 1.29 -> 5.2 at the grip-limited force).
3. Idler arm: PETG -> PA6-CF (constant spring load: creep).
4. Spool hub: flat internal ceiling -> 45 deg cone so it prints without support.

## Open items (said plainly)

- The grip coefficient (0.4-0.8) and the feed-force demand model are assumptions: measure the push force before slip on a test rig.
- The motor pull-out curve is a typical curve, not StepperOnline's published one.
- Drive-gear dimensions are my envelope of the Bondtech BMG-type gear; confirm the kit (bore and length) before printing the body.
- The spring is a closest-stock assumption (8 x 1.0 x 18, 6.5 active coils): confirm the rate with the supplier.
