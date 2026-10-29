# RoboticArm6DOF - buildability audit (2026-10-28)

Question: if Jay prints the parts and buys the listed hardware, does it go together and does it work?
Scope: CAD exports and build scripts only (Inventor not opened). Nothing has been built; every number below is
calculated or measured on the CAD exports.

## Verdict: BUILDABLE WITH FIXES

All 21 printed parts print on a 256 mm bed with no wall failures, and the joint torques are inside the motor and servo
ratings. But the real-world stepper gearbox ratings (100 N shaft side load, 3 N.m output) are exceeded or nearly exceeded
at J2 and J3, the gearbox bolt pattern is a guess, and the BOM is missing everything electrical plus the homing sensors.
Fix items 1-6 before buying or printing.

### Ranked issues

| # | Severity | Issue | Numbers | Fix |
|---|---|---|---|---|
| 1 | HIGH | J3 belt pulls the PG19 gearbox shaft sideways harder than it is rated for | belt hub load 117 N (at the analysis' 59 N pretension) to 130 N (minimum safe slack tension) vs **100 N** rated. Margin 0.77-0.86 | Support the 15T pulley on both sides: add a printed outboard bracket with a 608 bearing on a stub shaft, or a jackshaft with 2 bearings and a coupler. Do not just slacken the belt: below ~25 N slack-side tension the 6.5 teeth in mesh jump. |
| 2 | HIGH | J2 gearbox torque and side load are at the limit with the 0.5 kg payload | gearbox output 1.59 N.m vs 3 N.m (**SF 1.88**, <2) at full reach + 2 rad/s^2. Pinion side load 107.5 N vs 100 N (SF 0.93). SF 2 holds only for a payload of 0.43 kg or less. The motor can push 7.98 N.m into the gearbox in a crash (momentary rating 5 N.m). | Raise the J2 spur ratio (e.g. 15T:90T m1.5, 6:1 -> gearbox 1.24 N.m), or rate the arm at 0.3 kg. Either way, limit the driver current to keep a stall below about 5 N.m. Note: a 0.63 A current cap holds the gearbox to 3 N.m but cuts running SF to about 1.3, so the ratio change is the real fix. |
| 3 | HIGH | Gearbox front bolt circle is a guess | design.py: `GB_HOLE_PCD = 30.0  # ASSUMED; verify`. The usual 36 mm NEMA17 planetary uses 4x M3 on a **28 mm** bolt circle (Bondtech listing); the StepperOnline drawing could not be retrieved (403). A 28 mm circle puts every hole 0.7 mm off: the J1 deck has round 3.2 mm holes, so M3 screws will not go in. | Get the StepperOnline dimension drawing (or measure the gearbox when it arrives) before printing the BaseHousing, ShoulderCheekR and UpperArmB. Or change the holes to short radial slots covering 28-30 mm. |
| 4 | HIGH | A stalled servo strips the printed wrist gears | At 7.4 V stall, the J4 pinion (m1.25, 16T, 8 mm face) sees 116 MPa and the J5 pinion (m1.0, 20T) sees 107 MPa, both above the PA6-CF XY UTS of 102 MPa. J4 working stress is 24.6 MPa vs the 30 MPa allowable: **SF 1.22**. | J4: face 8 -> 14 mm or m1.5. J5: face 10 -> 14 mm. Run the servos at 6 V. Add soft position limits in firmware. |
| 5 | HIGH | The BOM cannot make the arm move | Missing: stepper drivers and controller, servo PWM board, 24 V PSU, 6-7.4 V supply rated 15 A or more, **homing sensors** (none anywhere, so open-loop steppers have no zero), wiring and e-stop, circlip DIN 471-20, M3 grub screws, 16x M2 horn screws, M4 heat-set inserts, gripper pads | About 145 USD; see `buy_list.csv`. Also design endstop or AS5600 encoder mounts for J1/J2/J3. |
| 6 | MED | J1/J2 pinions have no way to grip the shaft | `_pinion(..., bore="R8")` makes a plain round 8 mm bore ("D-flat + M3 grub screw in production"), but neither feature is modelled. J2 passes 1.6 N.m through it. | Model a D-bore (7.5 mm across the flat), a captured M3 nut and a grub-screw hole, with a hub at least 8 mm long. Or use an off-the-shelf steel hub or pinion. |
| 7 | MED | J1 lateral slop is large | PG gearbox backlash is up to 3 deg; through the 4:1 ring that is 0.75 deg, or about 7 mm of side-to-side play at the 538 mm reach. Gravity does not preload J1. J2 has 0.64 deg (gravity mostly takes it up). The printed bearing seats add about 1.9 mm at the TCP for each 0.1 mm of seat play. | Fine for a demo pick-and-place, not for repeatable positioning. Use an anti-backlash split pinion or spring-loaded idler, or a zero-backlash drive (belt/cycloidal) for J1. |
| 8 | MED | Gripper holds 0.5 kg only with grippy pads | Bare PA6-CF pads (mu about 0.3): needs 8.5 N per jaw, has 9.6 N, **SF 1.13**. Rubber pads (mu 0.8): SF 3.0. A servo squeezing an object sits at stall, so the finger gear teeth see about 40 MPa for as long as it grips, and nylon creeps. | Add silicone pads. Close only to "object width minus about 2 mm", not to the hard stop. |
| 9 | LOW | Arm falls when the motors are switched off (estimate) | J2 back-drive torque at the motor is about 0.05 N.m vs about 0.02 N.m detent torque | Keep the drivers enabled. Park the arm before powering down, or add a gas spring or torsion spring counterbalance on J2. |
| 10 | LOW | Upper-arm halves only just fit the bed | UpperArmA/B are 274 mm long. They fit only on the diagonal: plate bbox 255.2 mm, about 0.4 mm free per side, no room for a brim (PA6-CF likes one). They will not fit a Prusa MK4 (250x210) or an Ender-3 (220). | Shorten them by about 20 mm or split each half, if Jay's printer is not a Bambu X1/P1/A1. |
| 11 | LOW | Doc inconsistency | `Tests\Torque\joint_torque_table.csv` lists J4 as "20T:30T m1" and J5 as "18T:36T m1". The CAD and the Lewis table use 16:24 m1.25 and 20:40 m1.0. The ratios are the same, so the torques hold. | Relabel the table. |

## 1. Buy list (summary - full table with verification notes in `buy_list.csv`)

| Item | Qty | Part | Approx USD | Verified? | CAD fit |
|---|---|---|---|---|---|
| Stepper + PG19 | 2 | StepperOnline 17HS19-1684S-PG19 | 72 | Specs verified from a reseller copy of the listing (19.19:1, 80 %, backlash <= 3 deg, 3 N.m / 5 N.m, radial 100 N, axial 50 N, 8 x 20 mm shaft with D-cut, gearbox 35 mm). Price inferred. | Ratio and shaft OK. Bolt circle unverified (issue 3). Radial rating exceeded (issues 1, 2). |
| Stepper + PG5 | 1 | StepperOnline 17HS19-1684S-PG5 | 35 | Exists (eBay US 34.99). The spec copy is labelled -PG5X: 5.18:1, 90 %, gearbox 27.3 mm. | OK (J1 loads are small) |
| Servo | 2 | DSSERVO DS3235 270 deg | 56 | 29 / 32 / 35 kg.cm at 5 / 6 / 7.4 V (2 listings). Price approx. | 40x20x40.5 case OK. Check the 49.5x10 ear holes on the real servo. |
| Servo | 2 | DSSERVO DS3218 270 deg | 32 | 19 kg.cm at 5 V, 21.5 kg.cm at 6.8 V, 60 g | OK |
| Bearings | 2+4+2+1 | 6004-2RS, 6201-2RS, 608-2RS, 6806-2RS (= SKF 61806-2RS1) | 31 | ISO standard sizes | Seats match catalogue OD/width |
| Belt | 1 | HTD 375-5M-15 | 12 | Verified (Contitech 375 5M 15, RS 475-0327) | Centre distance 109.91 mm = CAD |
| Pulley | 1 | HTD 5M 15T, 15 mm belt, 8 mm bore | 9 | Generic, no PN | OK |
| Horns, screws, shafts (20/12/12/8 mm h6 rod) | - | - | 60 | Standard | Horns need re-drilling: 4x M2 on a 12 mm bolt circle |
| Filament | - | PA6-CF about 0.7 kg, PETG about 0.55 kg | 90 | Estimate: measured solid volume x 0.55 fill | - |
| **Missing items** (issue 5) | - | Controller + 3x TMC2209, PCA9685, 24 V 150 W PSU, 6-7.4 V 15 A supply, 3 homing sensors, wiring/e-stop, small hardware, pads | 145 | Class-level, not specific PNs | - |
| **Total** | | | **about 550** | | |

## 2. Printability (dfam-check, FDM)

Method: text-to-cad `dfam_tool.py` on every STL in `Export\STL_print`, run in its current orientation and in the best of the 6 axis
orientations. Limits come from `references/process-limits.md` (FDM column): supported wall 1.2 mm, unsupported wall 1.6 mm,
self-supporting angle 45 deg. Bed is 256x256x256 mm. Data: `dfam\dfam_summary.csv`, `dfam\dfam_full.json`.

- **Watertight: 21/21 pass.** Each part is 1 body. No unit/scale flags.
- **Supported wall (p05 >= 1.2 mm): 21/21 pass.** Thinnest p05: J5Pinion 1.32, FingerL 1.41, FingerR 1.50, J4Pinion 1.51,
  J4Gear 1.53 (all gear teeth). Sampled minimums below 1.2 mm (PulleyHTD5M_45T 0.15, ForearmCover 0.30, Forearm 0.52,
  BaseHousing 0.57, J4Gear 0.91, UpperArmA/B 1.0) are edge or tooth-tip samples, and p05 is fine on each.
- **Unsupported wall (1.6 mm): review.** The 5 gear-tooth parts above have p05 of 1.3-1.5 mm, which is normal for m1.0-m1.25 teeth.
  Print them with a 0.4 mm hardened nozzle, not 0.6, or the m1 teeth lose their profile.
- **Overhangs (best orientation): 14 parts need no supports** (0-0.6 % of area below 45 deg).
  7 need supports: WristYoke 7.8 % area / 62 % support-to-part volume, WristBracket 4.7 % / 83 %, GripperBase 3.7 % / 58 %,
  Forearm 2.6 % / 27 %, UpperArmA 1.7 % / 7 %, UpperArmB 1.3 % / 6 %, ShoulderCheekR 1.0 % / 15 %. The three wrist and gripper parts are
  over the 30 % support-volume cost signal: tree supports, or split them into bolted halves.
  J4Gear: flip it 180 deg on Plate 8. That takes it from 1.7 % to 0 % support.
- **Bed fit: 21/21 fit 256 mm.** UpperArmA/B fit only on the diagonal (issue 10). All 8 Bambu plate .3mf files measure 256 mm or less
  (largest 255.2 x 158.5 and 254.0 x 139.9 mm).
- **Not measured by the tool** (said, not guessed): minimum hole diameter, bridges, clearance and fit of bearing seats.
  Printed seats for 6004/6201/6806/608 usually need a test print and +0.1-0.2 mm adjustment, so print a seat coupon first.
- **Material/process:** PA6-CF needs a hardened-steel nozzle, filament dried at about 80 C for 8-12 h, and an enclosed printer
  (X1C/P1S, not an A1). Parts absorb moisture: store them dry, and expect about 2 % more creep at wet equilibrium.

Cross-check with the original `Tests\DfAM`: same 21 watertight parts and same wall verdicts. Two parts disagree on supports:
J4Gear (needs supports as plated, none if flipped) and ShoulderCheekR (my best orientation still needs 1 %).

## 3. Function (independent calcs - `buildability_calcs.py` -> `buildability_calcs.json`)

Assumptions:
- Payload 0.5 kg at the TCP.
- Joint acceleration 2 rad/s^2.
- Link masses and CGs from Inventor `mass_model.json`.
- Stepper running torque 70 % of 0.52 N.m holding (assumed curve).
- Servo continuous torque 50 % of stall.
- Spur and belt efficiency 95 %.
- PA6-CF tooth allowable 30 MPa (fatigue), UTS 102 MPa.
- HTD 5M 15 mm allowable tension 300 N (assumed).
- Required SF 2.

| Joint | Need | Capacity | SF | Status |
|---|---|---|---|---|
| J1 (PG5 + 18:72) | 0.57 N.m (inertia only) | 6.45 N.m | 11 | PASS. J1 bearings: 349 N each vs C0 5000 N (s0 14). |
| J2 (PG19 + 18:84) | 7.06 N.m (6.52 static) -> gearbox 1.59 N.m | 3 N.m gearbox max | **1.88** | FAIL (marginal, SF < 2). Shaft side load 107.5 / 100 N. |
| J2 motor | 7.06 N.m | 24.8 N.m (motor running) | 3.5 | PASS. The gearbox is the limit, not the motor. |
| J3 (PG19 + HTD 15:45) | 2.95 N.m -> gearbox 1.04 N.m | 3 N.m | 2.9 | PASS torque. **FAIL** shaft side load 117-130 / 100 N. |
| J3 belt | tight side 107 N | 300 N (assumed) | 2.8 | PASS. 6.5 teeth in mesh, wrap 155 deg. |
| J4 (DS3235, 16:24) | 1.04 N.m | 2.24 N.m | 2.15 | PASS servo. Teeth SF 1.22 (FAIL vs 2), strip at stall. |
| J5 (DS3235, 20:40) | 1.04 N.m | 2.98 N.m | 2.87 | PASS. Teeth SF 1.77 (marginal), strip at stall. |
| J6 (DS3218 direct) | 0.12 N.m | 0.93 N.m | 7.6 | PASS |
| Gripper | 5.1 N/jaw (mu 0.5), 8.5 N (mu 0.3) | 9.6 N/jaw | 1.88 / 1.13 | Needs rubber pads |
| J1/J2 printed spur | 13.3 MPa (J2 pinion) | 30 MPa | 2.25 | PASS. 25-30 MPa if the motor drives to the gearbox max. |

Speed: J2 is about 27 deg/s at 400 motor rpm, J3 about 42 deg/s, and J1 about 170 deg/s at 600 rpm. That is slow but fine for a desktop
pick-and-place. The original analysis agrees on the static torques (J2 6.54 vs 6.52, J3 2.81 vs 2.79 N.m). It did not check the
gearbox shaft radial rating, and its J2 SF 2.03 excludes acceleration.

## Sources
- 17HS19-1684S-PG19 specs (reseller copy of the StepperOnline listing): https://ozrobotics.com/shop/nema-17-stepper-motor-bipolar-l48mm-w-gear-ratio-191-planetary-gearbox/ (search snippet; page since removed)
- 17HS19-1684S-PG5X specs: https://fabacademy.org/2025/labs/techworks/students/omar-albalbaki/Nema%2017%20Stepper%20Motor%20Bipolar%20L=48mm%20w%20Gear%20Ratio%20%201dd0e8ca7ada8111acb1cc440c5768c5.html
- PG5 price: https://www.ebay.de/itm/126887326512 (search snippet, US listing 34.99)
- 28 mm M3 bolt circle on a 5.18:1 NEMA17 planetary: https://3djake.com/bondtech/nema17-geared-stepper
- DS3235 torque: https://sigmanortec.ro/en/servomotor-ds3235mg-metal-ip66-35kg-74v , https://rcdrone.top/es/products/dsservo-waterproof-servo-ds3218-20kg-ds3225-25kg-ds3235-35kg
- HTD 375-5M-15: https://uk.rs-online.com/web/p/timing-belts/4750327 , https://www.motion.com/products/sku/00742350
- StepperOnline's own product page and PDF returned HTTP 403, so the gearbox drawing (bolt circle, pilot diameter) is still unverified.
