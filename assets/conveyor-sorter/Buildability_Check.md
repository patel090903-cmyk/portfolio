# ConveyorSorter - buildability check (2026-10-29)

Question: if Jay orders these parts, has the plates machined and prints the printed parts, does it go together and work? This
check uses the CAD (Inventor measurements in `..\Assembly_Checks\` and `..\Working_Model_Check\`), the calculations in
`..\..\Analysis\` (summarised in `..\Summary.md`), the BOM `..\..\ConveyorSorter_BOM.csv` and vendor pages read on 2026-10-29.
Nothing has been built. **Verdict: BUILDABLE, with five things to settle before ordering (section 6).**

## 1. Every bought part has a real part number

| Item | Part number | Qty | Checked against | Price (USD) |
|---|---|---|---|---|
| Gearmotor 12 V, 50.9:1, 117 rpm, 6.71 Nm stall, encoder | goBILDA 5203-2402-0051 | 1 | goBILDA listing (confirmed) | 54.99 |
| Diverter servos 50 kg cm at 7.4 V, 25T | Savox SB-2290SG | 2 | retailer listings (search) | ~137 each (est.) |
| ToF distance sensor | Pololu 3415 (VL53L1X carrier) | 1 | Pololu listing (confirmed) | 22.95 |
| Through-beam sensor (emitter + receiver = 1 set) | Omron E3Z-T61 | 1 set | distributor listings (~$181-201 per set) | ~180 (est.) |
| Controller | Arduino Mega 2560 Rev3 | 1 | Arduino store (confirmed) | 49.90 |
| Motor driver 13 A | Cytron MD10C | 1 | EU listing, US price not read | ~22 (est.) |
| Bearing units 20 mm | UCFL204 (NSK / FYH) | 4 | catalogue dims (Cr 12.8 kN) | ~12 each (est.) |
| Jaw coupling 15 / 8 mm | Lovejoy L-070 + NBR spider | 1 | Timken / Lovejoy data: 4.88 Nm | ~34 (est.) |
| Belt 200 x 2 mm PVC, endless 3195 mm | Habasit / Ammeraal light PVC | 1 | class values | ~150 (est.) |
| Extrusion 40x80 / 40x40 slot 8, 20x20 slot 6 | Misumi HFS8 / HFS5 class, cut + tapped | 11 pieces | Misumi class | ~495 (est.) |
| Totes 600 x 400 x 420 PP | Schaefer / Akro-Mils class | 3 | class | ~35 each (est.) |
| Supplies / buck / E-stop / wiring | Mean Well 12 V 10 A, 7.4 V 10 A buck, E-stop + contactor | - | class | ~140 (est.) |
| Fixings added in this check | floor anchors M8, M6 countersunk + T-nuts, M4 inserts + screws, M3 / M4 hub screws, M5 + T-nuts, 16 mm button | 64 pieces | standard | ~35 (est.) |
| Filament | PA6-CF 1 kg + PETG 1 kg | 2 | class | ~80 (est.) |

Total **$2,832.75** (BOM), of which **$127.84 is confirmed** on vendor pages (gearmotor, ToF carrier, Arduino); the rest are
estimates, including one-off machining of the end plates, pulleys, shafts and motor mount (~$1,000 together) and the
SendCutSend-class slider bed, paddles and chutes.

## 2. Fits and joints (CAD)

| Joint | Check | Result |
|---|---|---|
| Pulleys on shafts | 20 H7 bore on 20 h7 shafts, UC204 set-screw inserts each side | Located by the inserts; the drive pulley is keyless (set screws + Loctite) |
| Bearing units to end plates | 2 x M10 x 35 8.8 per UCFL204 into 26 / 11 mm holes; tail plates slotted +-15 mm | Take-up range measured 1485-1515 mm pulley centres |
| End plates to rails | 4 x M8 button head into the rail end threads per plate | Standard tapped extrusion ends |
| Slider bed | 18 x M6 countersunk into slot-8 T-nuts (added to the BOM in this check) | Flush with the bed top, the belt runs over it |
| Gearmotor - coupling - shaft | 4 x M4 x 10 into the goBILDA face, L-070 hubs on the 8 mm D-shaft and 15 mm shaft end | 2.0 mm from the hub to the M4 heads (CAD) |
| Servos | 4 x M4 x 12 into heat-set inserts per printed mount (added) | Diverter hub: 4 x M3 into the aluminium horn, paddle clamped by 2 x M4 |
| Sensors / box | M5 + slot-6 T-nuts on the 20x20 gantry, M5 + slot-8 T-nuts for the control box (added) | - |

## 3. Moving clearances (Inventor)

- 104 occurrences, 0 DOF, 0 unhealthy constraints; 0 interfering pairs at the design pose, both diverters at 20 / 40 deg
  (alone and together) and TakeUp -15 / +15 mm (`..\Working_Model_Check\working_model_check.txt`).
- Overhead: lowest gantry part 207.8 mm above the belt vs 150 mm tallest item; ToF range 57.8 mm at that item (> 40 mm minimum).
- Coupling: 6.0 mm to the motor mount, 5.2 mm to the head bearing unit, 2.0 mm to the gearmotor's M4 screw heads.

## 4. Assembly order (each step has tool access)

1. Frame: legs, braces and rails with drop-in T-nuts; feet into the leg core threads; level, then drill and set the 4 x M8 anchors.
2. End plates onto the rail ends (M8); bearing units on the plates (head fixed, tail in the slots with the take-up blocks).
3. Shafts and pulleys through the bearing units; belt over the pulleys before the second insert is locked (endless belt).
4. Slider bed between the rails (18 x M6 countersunk, T-nuts slid in first); guides and chutes.
5. Motor mount, gearmotor (4 x M4), coupling; align, then lock the set screws.
6. Press the inserts into the printed servo mounts; servos, horns, hubs (4 x M3), paddles (2 x M4); gantry with the sensors.
7. Control box on the rail (M5), wiring, E-stop; tension the belt with the jack screws (0.2 % = 3.2 mm) and track it.

## 5. Loads (calculated, see `..\Summary.md`)

| Item | Result |
|---|---|
| Belt drive | 0.95 Nm normal, 2.87 Nm at a 7-item jam vs 6.71 Nm stall; slip SF 4.86 / 1.62 |
| Coupling L-070 | SF 5.1 normal, 1.70 at the jam; below the motor stall (0.73x): needs the firmware stall cut-off |
| Shafts / bearings | static SF 25 at stall, fatigue SF 5.75; L10 5.7e7 h |
| Servos | hold SF 2.15, impact SF 1.49; 40 deg in 0.109 s |
| Stability | unanchored it tips at 54 N sideways at belt height; with 4 x M8 anchors 341 N uplift each at 300 N (SF 12) |

## 6. Open items: settle these before ordering

1. **Coupling upgrade (L-070 -> L-075, 10.2 Nm).** The respec choice, but it does not drop in: the L-075 hub is 9.9 mm larger in
   diameter (34.5 -> 44.5 mm) and 3.8 mm longer, and the CAD shows only 2.0 mm from the L-070 hub to the gearmotor's M4 screw
   heads and 6.0 mm to the motor mount. It needs the motor mount re-drawn with a ~5 mm longer stand-off (and low-head screws).
   Until then the L-070 stays, protected by the encoder stall cut-off in firmware. The L-075 rating (90 in-lb) is from reseller
   listings: confirm it in the Lovejoy catalogue.
2. **Floor anchors are required** (added to the BOM). The respec alternative, outrigger feet that widen the 270 mm foot track,
   is not modelled; anchors give SF 12 and are cheaper. Use outriggers only if the floor can't be drilled.
3. **Through-beam sensor quantity.** The E3Z-T61 is sold as an emitter + receiver set: the BOM's qty 2 is one set (priced per half).
4. **Firmware.** Arduino Mega code for the ToF / through-beam sort decision, servo timing and the encoder stall cut-off is not written.
5. **Prices.** Only $128 of $2,833 is confirmed; the machined and laser-cut parts need quotes.

No other part of this check failed. The machine has not been built; every number above is a CAD measurement, a calculation or a
catalogue value.
