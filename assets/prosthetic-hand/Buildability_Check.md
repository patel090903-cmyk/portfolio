# ProstheticHand - buildability check (2026-10-29)

Question: if Jay orders these parts and prints the plates, does the hand go together and work? This check uses the CAD
(Inventor measurements), the calculations in `..\..\Analysis\hand_analysis.py` and vendor / distributor listings read on
2026-10-29. Nothing has been built. **Verdict: BUILDABLE, with six things to settle before ordering (section 6).**

## 1. Every bought part has a real part number

| Item | Part number | Qty | Checked against | Price (USD) |
|---|---|---|---|---|
| Linear actuator 20 mm, 100:1, 6 V, pot feedback | Actuonix PQ12-100-6-P | 4 | Actuonix datasheet Rev D (40 N @ 6 mm/s, 50 N max, 35 N back-drive, 15 g, 36.5 x 21.5 x 15 body) | **78.65 each, confirmed** (RobotShop US) |
| Micro servo, metal gear | Hitec HS-82MG | 2 | Hitec / reseller listings: 3.4 kg-cm at 6 V, 0.10 s/60 deg, 19 g | **23.99 each, confirmed** (BuddyRC, sale) |
| Sleeve bearing 3 x 4.5 x 3 | igus iglidur G GSM-0304-03 | 30 | RS 667-1419 listing | **EUR 19.48 / 30, confirmed** (~0.70 each) |
| Dowel pins 3 m6 stainless | ISO 8734 3x20 (8), 3x18 (3), 3x16 (6) | 17 | ISO 8734 | ~0.6 each (est.) |
| Wrist bolt + nut | 1/2-20 UNF x 3/4 hex cap screw grade 5 + 1/2-20 jam nut | 1 + 1 | standard prosthetic wrist thread | ~2 (est.) |
| Cover screws | M2 x 8 thread-forming for plastics | 6 | - | ~1 (est.) |
| Tendon | PowerPro Spectra 80 lb (0.43 mm, 356 N) | 4 m | Bass Pro: 80 lb x 500 yd $69.99 confirmed; 150 yd est. | ~25 (est.) |
| Return elastic | 2.0 mm natural-latex cord | 1 m | - | ~8 (est.) |
| Controller | Arduino Nano Every ABX00028 | 1 | Arduino | ~14.50 (est.) |
| Motor drivers | Pololu DRV8833 dual carrier #2130 | 2 | Pololu | ~6 each (est.) |
| 6 V regulator, 5 A | Pololu D24V50F6 | 1 | Pololu | ~25 (est.) |
| Battery | 2S 7.4 V 800 mAh LiPo (58 x 31 x 13) | 1 | - | ~12 (est.) |
| EMG sensors (in the socket) | SparkFun MyoWare 2.0 | 2 | - | ~40 each (est.) |
| Filament | PETG ~0.2 kg, PLA ~0.05 kg | - | - | ~6 |

Estimated total about **$624** (BOM `..\..\ProstheticHand_BOM.csv`), of which **$384** is from listings read today
(actuators, servos, bushings). The socket is made by a prosthetist and not priced.

## 2. Fits and joints (CAD + calculation)

| Joint | Check | Result |
|---|---|---|
| Finger joints | 3 m6 dowel pressed into both cheeks (printed 3.0, ream); tongue on 2 x GSM-0304-03 in a 4.5 bore | 0.3 mm side gap each side; extension stop = tongue heel on the slot bottom (zero-volume contact in CAD) |
| Tendon path | rod eye -> palm guide 1.2 -> wrap groove at every joint -> knot at the fingertip anchor hole | moment arms constant; guide bend 8-54 deg (large only when the hand is open and the tension is low) |
| PQ12 mounting | rear lug on a 3 x 16 dowel in a printed clevis, body seated on the bay floor (Z -11.5) | rod clears its channel by 1.1 mm at full extension |
| Thumb yoke | rotation-servo horn in a 6 x 3 seat + 3 x 16 pivot dowel in 2 bushings; flexion servo slides in from the open -y side | yoke clears the index PQ12 by 2.5 mm at every rotation |
| Wrist | 1/2-20 bolt head captive in the palm, jam nut captive in the bay wall | 0.56 Nm hand-tight preload keeps the faces closed under a 50 N side load at 110 mm |

## 3. Moving clearances (Inventor, Tests\Assembly_Checks)

- 0 DOF; 0 structural clashes over 108 poses; kinematics error 0.0003 mm.
- Closed fist: little fingertip 0.35 mm from the palm, index P1 0.3 mm from the knuckle block.
- Fingers closing onto an opposed thumb touch it: that is the grasp, and the firmware must stop on current. Envelope for the
  firmware (largest Grip before contact) is in `assembly_checks.json`.

## 4. Assembly order (each step has tool access)

1. Print plate 1 (PETG) and plate 2 (PLA). Ream the 3.0 pin holes and the 4.5 bushing bores; press the bushings into every tongue.
2. Palm: drop the 1/2-20 bolt head into its hex pocket from inside; press the four MCP dowels with the P1s in their slots.
3. String each finger: knot the tendon at the fingertip, run it through the grooves and channels to the palm guide; same for
   the latex cord on the dorsal side (45 % pre-stretch, tie off at the knuckle-block guide).
4. PQ12s: rear lug on its 3 x 16 dowel, tie the tendon to the rod eye with the rod fully extended and the finger open.
5. Thumb: flexion servo + spool into the yoke, tendon onto the spool; rotation servo into the thenar pocket; yoke onto its horn,
   pivot dowel through the bracket.
6. Electronics into the bay (battery bottom, Nano, drivers, regulator), jam nut into the wall pocket, cable through the 6 mm hole.
7. Screw the hand onto the bay (hand-tight, 0.6 Nm), cover on with 6 x M2, socket flange to the socket's lamination plate.

## 5. Loads (calculated, see the calc report)

| Item | Result |
|---|---|
| Power grip | 11.8 N toward the palm on 50 mm, 25.7 N on 30 mm (40 N target not met) |
| Pinch | tip 8.5 N, lateral 7.3 N (rotation servo limited) |
| Pins / bushings | MCP pin SF 3.1, bushings 6.4 MPa of 80 |
| Printed parts | cheek bearing SF 4.7 (PETG), lug clevis SF 18 |
| Tendon | SF 3.6 with a knot at 50 N stall |

## 6. Open items: settle these before ordering

1. **Grip force.** The PQ12 can't give 40 N of power grip in this envelope (11.8 N on 50 mm, frictionless). Silicone covers will
   help; for 40 N, move to a higher-work actuator (Actuonix L12-30 class, ~+25 g each) and re-check the 450 g budget.
2. **Thumb rotation servo.** It limits both pinches to 7-9 N. A 2:1 printed spur stage (80 deg of rotation is enough) would let
   the index (17 N) set the tip pinch.
3. **HS-82MG data.** Travel (160 deg assumed), envelope (spline offset, tab height) and allowed side load on the spline (44 N from
   the spool) are not published; check them on a real servo.
4. **Friction and elastic.** Tendon friction on PETG (mu 0.10 assumed) and the latex cord modulus decide the real grip and the
   return margin (SF 1.22). Measure both on a one-finger test print first.
5. **Battery.** 800 mAh gives about 127 grasps in a 16 h day; a 2S 1300 mAh pack (+25 g) is the realistic choice if the mass allows.
6. **Prices.** Electronics, pins, tendon and elastic prices are estimates; confirm them before ordering.

No other part of this check failed. The hand has not been built; every number above is a CAD measurement, a calculation or a
catalogue value.
