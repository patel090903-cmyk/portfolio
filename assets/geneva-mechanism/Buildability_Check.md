# GenevaMechanism - buildability check (2026-10-29)

Question: if Jay orders these parts and has the machined parts made, does it go together and work? This check uses the CAD
(Inventor measurements), the calculations in `..\..\Analysis\geneva_analysis.py`, the 2D outline check and vendor / distributor
pages read on 2026-10-29. Nothing has been built. **Verdict: BUILDABLE, with five things to settle before ordering (section 6).**

## 1. Every bought part has a real part number

| Item | Part number | Qty | Checked against | Price (USD) |
|---|---|---|---|---|
| Stepper gearmotor, NEMA 23, 1.4 A, Neugart PLE60 5:1, 14 mm shaft, 3.28 Nm holding at the output | Oriental Motor PKP264D14A2-PLE60-5B | 1 | Oriental catalogue page (specs + web price) and Neugart PLE catalogue 05/2026 (T2N 40 Nm, dims) | 502.50 (confirmed, web price) |
| Jaw coupling hub, 41.3 OD, 20 mm clamp bore | Ruland MJC41-20-A | 1 | RS Hong Kong listing HKD 248.80 | ~32 (confirmed, converted) |
| Jaw coupling hub, 41.3 OD, 14 mm clamp bore | Ruland MJC41-14-A | 1 | RS UK listing GBP 26.71 ex VAT | ~34 (confirmed, converted) |
| Jaw spider, 98 Shore A | Ruland MJC41 spider (98A) | 1 | Ruland range; rating and stiffness not read (open item 3) | ~12 (est.) |
| Drive roller (stud cam follower) 16 x 11, M6x1 | Schaeffler INA KR16-PP | 1 | Schaeffler medias: Cr 3200 N, C0r 3450 N, Cu 465 N, B 28, B2 16 | ~22 (est.; listings EUR 15-45) |
| Deep groove ball bearing 20 x 47 x 14, sealed | SKF 6204-2RSH | 4 | SKF data: C 13.5 kN, C0 6.55 kN | ~9 each (est.) |
| Parallel keys | DIN 6885 A 6x6x14 (2), A 5x5x16 (1) | 3 | DIN 6885 | ~1.5 each (est.) |
| Hex standoffs M5 female-female 8 AF x 60, aluminium | McMaster 94868A class | 4 | standard | ~4 each (est.) |
| Screws | ISO 4762 M8x20 (4), M8x25 (12), M6x16 (6), M5x12 (8), M5x16 (12), M5x25 (4); set screws ISO 4029 M5x6, M6x8 | 48 | standard | ~15 (est.) |
| Stock | 16 mm 4140 plate (wheel), 80 mm 4140 bar (driver), 1045 bar (shafts, hub, spacers), 6061-T6 plate 10 / 12 / 15 / 20 mm, 30 mm 6061 bar | - | standard sizes | machining estimates in the BOM |
| Not modelled | stepper driver (1.4 A, 24-48 V, 1/16 microstep), 24 V 5 A supply, M12 inductive home sensor + flag, controller + E-stop, polycarbonate guard, grease / Loctite / bench bolts | - | - | ~230 (est.) |

Estimated total about **$1,811** (parts + estimated machining, BOM `..\..\GenevaMechanism_BOM.csv`), of which **$569 is confirmed**
on vendor pages (the gearmotor and both coupling hubs). Everything else is an estimate.

## 2. Fits and joints (CAD + calculation)

| Joint | Check | Result |
|---|---|---|
| Bearing seats | 4 x 6204-2RSH in 47 K6 counterbores, 14 deep, with a 6 mm shoulder (lower plate from the top, top plate from below) | Cross-located: each shaft is held up by one plate and down by the other; 0.1 mm axial float set by the spacers |
| Wheel shaft | 24 collar on the lower inner ring, wheel on the collar (key 6x6x14, 20 H7 / h6), 26 spacer to the upper inner ring, table hub on a 17 k6 step (key 5x5x16 + M6 set screw) | Table weight goes collar -> lower 6204 -> lower plate; nothing loads the seals |
| Crank shaft | driver hub lands (26) between the lower inner ring and a 24 spacer, key 6x6x14 in the hub only, M5 set screw; 19 mm plain end in the MJC41 clamp hub | Driver can't creep axially; the spacer is 24 OD so it clears the wheel tips by 1.03 mm (CAD) |
| Roller | KR16-PP stud through a 6 H7 bore at r 50.00 in the driver arm, collar on a 13 x 2 boss, thin M6x1 nut 3 Nm underneath | Roller centred on the 14 mm wheel; nut 3.8 mm above the lower plate (CAD) |
| Gearmotor | PLE60 40 h7 pilot in a 40 H7 recess, 4 x M5 x 12 from the top of the motor plate into the M5 x 8 face threads; plate on 4 x 60 mm standoffs | Mounting-hole orientation on the PLE60 face assumed (open item 4) |
| Frame | 4 tall + 4 short 30 mm pillars, M8 screws in C'bores; bearing plates line-bored together | Centre distance 100.00 +/-0.01 depends on line boring, not on the pillars |

## 3. Moving clearances (Inventor, Tests\Assembly_Checks)

- 0 DOF, 0 interfering pairs at 28 crank angles (-180 to 420 deg); kinematics error 0.0000 deg. A deliberate 2 deg wheel offset
  produced a 156.7 mm3 roller / slot clash, so the interference check is live.
- Wheel to locking disc 0.10 mm (the lock clearance) in the dwell, at least 1.53 mm while indexing; roller to slot 0.03 mm per side.
- Wheel tips to the crank shaft 3.03 mm and to the crank spacer 1.03 mm at mid-index; table to top plate 32 mm; table hub to
  top plate 2.0 mm; gearmotor to base plate 12 mm.

## 4. Assembly order (each step has tool access)

1. Machine the plates; clamp lower and top plate on the short pillars (dowelled) and line-bore both 47 K6 seat pairs in one set-up.
2. Bolt the tall pillars to the base plate and the lower plate (M8 from below / above).
3. Press the two lower 6204 bearings into the lower plate (from the top).
4. Wheel shaft: key + wheel onto the collar, wheel spacer on top; drop into the lower wheel bearing.
5. Crank shaft: driver (key, M5 set screw, Loctite 243) with the KR16 already fitted (nut 3 Nm), crank spacer; drop into the lower
   crank bearing at crank = 180 deg (mid-dwell, locking disc in the wheel arc).
6. Press the upper bearings into the top plate, lower it over both shafts onto the short pillars, M8 screws.
7. Table hub (key, M6 set screw) on the 17 mm step, table (6 x M6), nests (12 x M5).
8. Motor plate + gearmotor on the 4 standoffs under the lower plate; coupling hubs and spider, clamp screws through the gaps
   between the standoffs. Home sensor on the lower plate reading the driver arm.

## 5. Loads (calculated, see the calc report)

| Item | Result |
|---|---|
| Kinematics | 30 indexes/min: 0.667 s index, 1.333 s dwell; 13.3 rad/s2 peak, 5.70 rad/s2 step at entry |
| Torque | crank 0.87 Nm rigid / 0.89 Nm dynamic peak; wheel 1.11 Nm; J_out 0.0793 kg m2 with 6 x 0.5 kg payload |
| Motor | estimated pull-out 2.29 Nm vs 1.08 Nm needed: SF 2.12; 36 indexes/min is the limit at SF 1.5 |
| Contact | 39 N flank force, 132 MPa Hertz (SF 11); KR16 static SF 88 |
| Jam | above the table-key capacity only if the table jams in the first 13.9 deg after entry (toggle) |
| Bearings / shafts / keys | static SF 80; shaft stress 2-3 MPa; keys 16 MPa of 100 |

## 6. Open items: settle these before ordering

1. **Jam protection.** Near entry the slot force has almost no lever about the crank, so a blocked table multiplies the motor
   torque without limit; a current limit doesn't help. Add stall detection (encoder or a StallGuard-type driver) and a ball-detent
   torque limiter in the table hub set near 5 Nm that re-engages every 60 deg. Not modelled yet.
2. **Motor curve and resonance.** The SF 2.12 uses my R-L estimate, not Oriental's published pull-out curve (an image I didn't read).
   150 motor rpm (2.5 rev/s) is in the typical stepper mid-band resonance zone: run 1/16 microstepping or finer, and check
   Oriental's curve; the PLE60 10:1 version (motor at 300 rpm) is the fallback if the curve is lower.
3. **Coupling data.** MJC41 98A rated torque (9 Nm assumed vs 3.28 Nm motor holding) and torsional stiffness (600 Nm/rad assumed)
   were not in the listings I could read. The dynamic factor depends on the stiffness (1.04 at 600, 1.94 at 300 Nm/rad); get the
   Ruland datasheet, or use a bellows coupling if it is softer than about 500 Nm/rad.
4. **Gearmotor drawing.** The motor / adapter split inside the 4.44 in length, the PLE60 face-hole orientation and the shaft key
   (keyed shaft in a clamp hub, or the smooth-shaft option) are assumptions; match the motor plate and coupling bore to the drawing.
5. **Machining quotes.** The wheel (wire EDM + induction hardening of the flanks and arcs) and the line-bored plates are the costly
   parts; all machining prices are estimates.

No other part of this check failed. The machine has not been built; every number above is a CAD measurement, a calculation or a
catalogue value.
