# PlanetaryGearbox - buildability check (2026-10-28)

Question: if Jay orders these parts and machines the four metal parts, does it go together and work? This check uses the
CAD (Inventor measurements), the calculations in `..\..\Analysis\gearbox_analysis.py` and catalogue pages read on
2026-10-28. Nothing has been built. **Verdict: BUILDABLE, with three things to measure on the real parts first (below).**

## 1. Every bought part has a real part number

| Item | Part number | Qty | Checked against | Price (USD) |
|---|---|---|---|---|
| Sun gear m1 z20, bore 5 + M4 set screw | KHK SS1-20A | 1 | KHK catalogue page (bore 5, hub 16, 20 long, 0.037 kg, 5.75 / 0.33 Nm) | ~20 (est., price not shown online) |
| Planet gear m1 z30, plain bore 10 | KHK SS1-30 | 4 | KHK catalogue page (bore 10, hub 25, 20 long, 0.082 kg, 10.1 / 0.79 Nm) | ~25 each (est.) |
| Internal ring m1 z80, 110 x 78 x 10 | KHK SI1-80 | 1 | KHK catalogue page (0.35 kg, 38.8 / 6.59 Nm) | 91.64 (list) |
| NEMA 17 stepper, 0.59 Nm, 5 mm D-shaft | StepperOnline 17HS19-2004S1 | 1 | StepperOnline drawing A0842 | ~14 (est.) |
| Planet bearings 5 x 10 x 4 | NSK MR105ZZ | 8 | nsk.com (Cr 475 N, C0r 168 N) | ~2 each |
| Output bearings 12 x 28 x 8 sealed | SKF 6001-2RSH | 2 | distributor listings (C 5.4 kN, C0 2.36 kN); one lists it as discontinued, 6001-2RSH/C3 or NSK 6001DDU fit the same seat | ~8 each |
| Retaining ring 12 x 1 | DIN 471, McMaster 98541A119 | 1 | McMaster table (groove 11.5 x 1.1) | ~10 / pack |
| E-clip for the 5 mm pin | DIN 6799 RS 4 | 4 | DIN size table (groove 4.0 x 0.64) | ~8 / pack |
| Shim 5 x 10 x 0.5 | DIN 988 | 4 | DIN size table | ~8 / pack |
| Screws | ISO 4762 M4x35 (6), M3x8 (4), M5x16 (4) | 14 | standard | ~10 |
| Planet pins | 5 mm hardened ground shaft (Misumi SFJ / PSFJ class), cut to 30 | 4 | Misumi range (code to confirm when ordering) | ~10 |
| Stock | 120 mm 6061-T6 bar x 75, 70 mm 1045 bar x 65 | - | - | ~50 |
| Print | PETG, about 250 g | - | - | ~5 |
| Not modelled | TMC2209-class driver, 24 V 5 A supply, NLGI 1 grease, Loctite 641, M6 bench bolts | - | - | ~60 |

Estimated total about **$450** before shipping, plus shop time for 4 turned parts. Gear prices other than the SI1-80 are
estimates because KHK's US site did not show them.

## 2. Fits and thread engagements (CAD + calculation)

| Joint | Check | Result |
|---|---|---|
| Motor shaft in the sun | 5 mm D-shaft (24 long, 15 mm D-cut) in the SS1-20A 5 mm bore; 19 mm engaged; M4 set screw 5 mm from the hub end, at z = 10 | Engaged. See open item 1 for the set-screw position. |
| Motor pilot | 22 -0.05 boss in a 22 H7 recess | Max 36 um offset of the sun (was 65 um with the first 22.05 recess, which left only 4 um of sun-planet backlash worst case; now 26 um) |
| Motor screws | ISO 4762 M3 x 8 from inside the adapter, counterbored 2 deep | 4.0 mm into the motor's 4.5 mm threads: no bottoming |
| Ring clamp | 6 x M4 x 35 through adapter (15) and ring (10) | 10 mm into 13 mm deep M4 threads in 6061 (2.5 d) |
| Bracket | 4 x M5 x 16 through the 8 mm upright | 8 mm into 10 mm deep M5 threads (1.6 d, light load) |
| Planet bearings | MR105ZZ OD 10 in the SS1-30 plain 10 mm bore | Slip / transition fit, retained with Loctite 641; inner rings captured between E-clip and shim |
| Planet pins | 5 h6 pin in 5 P7 carrier bores, 8 mm long | Press fit (drawing corrected from an H7 note that would have been a sliding fit) |
| Output bearings | 12 k5 shaft, 28 J7 housing, 24 mm shoulder between them | Shaft located both ways by the 17 mm shoulder and the DIN 471 ring |
| Ring | 110 OD in 110 H7 recesses, 3 mm deep each side | Centred by the recesses, not the bolts; 4 mm band of the ring stays visible |

## 3. Moving clearances (Inventor, Tests\Assembly_Checks)

- 0 DOF, 0 interfering pairs at 9 values of `Input` (0 to 341 deg); tooth gaps 0.037-0.039 mm in every pose.
- Planet tips to the housing and adapter faces: 2.03 mm. Iteration 1 had 0.00 mm (planets running on the ring seats); the
  bores went from 80 to 86 mm.
- Planet to planet 3.37 mm, planet to carrier 0.50 mm (shim), carrier to housing 1.0 mm, sun hub to adapter 1.0 mm.

## 4. Assembly order (each step has tool access)

1. Bearings: MR105ZZ pairs into each planet with Loctite 641. 6001 #1 into the housing from the chamber side, #2 from the
   nose side.
2. Carrier: press the 4 pins into the carrier. Shim, planet, E-clip on each pin.
3. Carrier shaft through both 6001 inner rings (support the inner rings while pressing), DIN 471 ring on the nose side.
4. Ring into the housing recess. Turn each planet until it meshes; (20 + 80)/4 = 25 is an integer, so all four go in.
5. Motor + adapter: 4 x M3 from inside the cup. Sun onto the D-shaft, set screw on the flat (reachable inside the open
   cup). Grease the gears, about 1/3 of the chamber.
6. Lower the motor side onto the ring, turning the motor shaft until the sun meshes. 6 x M4 x 35 from the motor side
   (heads sit at 49 mm radius, outside the 30 mm motor corners, so a hex key reaches them).
7. Bracket on the output face with 4 x M5 x 16; bracket to the bench with M6 bolts in the slots.

## 5. Loads (calculated, see the calc report)

| Item | Result |
|---|---|
| Gear rating | 5.13 Nm continuous output, set by KHK's 0.33 Nm surface-durability figure for the sun; AGMA contact would allow 2.3x more. The motor can deliver 2.83 Nm, so the motor runs out first (SF 1.79 on the gear rating). |
| Motor radial load | 7.8 N worst-case from uneven planet load sharing vs 21 N allowed at 20 mm (the sun's centre is 20 mm from the flange) |
| Bearings | MR105 static SF 5.6 at holding torque, 3.1 at the gear rating; 6001 L10 623,000 h with 200 N overhung load at 60 rpm |
| Pins, shaft, clamp | pin SF 17, shaft fatigue SF 3.5 at the circlip groove, ring clamp slip SF 84 |
| Printed bracket | stresses under 1.5 MPa; printability check: watertight, min wall 4.2 mm, 0.2 % support area, fits the bed |

## 6. Open items: measure these before machining

1. **Sun set screw vs the D-cut.** The D-cut starts 24 - 15 = 9 mm from the motor face (+-1.25 mm with the datasheet
   tolerances); the set screw centre sits at 10 mm. On a long-tolerance shaft the screw lands on the edge of the flat.
   Measure the motor; if the flat starts past 9.5 mm, grind it 2 mm longer.
2. **KHK bore and OD tolerances.** The product pages do not list the SS1-30 bore tolerance or the SI1-80 OD tolerance. The
   tolerance stack assumes the ring OD is h8; the Loctite 641 fit tolerates any H7-H8 bore.
3. **Grease path to the motor.** The adapter's 18 mm hole around the sun hub is open to the motor face. Use NLGI 1
   sparingly or add a thin felt / O-ring at the pilot if grease migrates.

No other part of this check failed. The gearbox has not been built; every number above is a CAD measurement, a
calculation or a catalogue value.
