# WindTurbine - buildability check (2026-10-29)

Question: if Jay orders these parts, prints the blades and has the steel parts made, does it go together, charge a battery and survive?
This check uses the CAD (Inventor measurements), the calculations in `..\..\Analysis\wind_analysis.py` and vendor pages read on
2026-10-29. Nothing has been built. **Verdict: BUILDABLE, with six things to settle before ordering (section 6).**

## 1. Every bought part has a vendor and a part number or spec

| Item | Part | Qty | Checked against | Price (USD) |
|---|---|---|---|---|
| Generator 24 V 3-phase PM, 400 W at 800 rpm, max 445 W, 4.5 kg | ATO-PMG-NE400WM (24 V option) | 1 | ato.com page: specs, 24 V power curve, dimension drawing | 298.97 (confirmed) |
| Charge controller, diversion mode, 45 A | Morningstar TriStar TS-45 | 1 | solar-electric.com listing | 223.00 (confirmed) |
| ASA filament 1 kg | Bambu Lab ASA | 2 | MatterHackers listing | 46.99 each (confirmed) |
| Carbon rod 3 mm x 1 m | pultruded CF rod | 1 | Ready Made RC listing | 2.30 (confirmed) |
| Carbon rod 5 mm x 1 m | pultruded CF rod | 1 | Easy Composites EU listing (EUR 10.45); no US page read | ~12 (est.) |
| Yaw bearings | 6007-2RS 35 x 62 x 14 | 2 | SKF data C 16.8 kN, C0 10.2 kN | ~12.50 each (est.) |
| Mast | 2 in. x 10 ft galvanised Sch 40 pipe + 2 in. coupling | 2 + 1 | Home Depot STZ 315-2X120 / 311-CO-2 (search results) | ~85 each, ~11 (est.) |
| Battery bank | Renogy 12 V 100 Ah AGM, 2 in series | 2 | search result $195 | ~390 (est.) |
| Dump load, rectifier, stop switch | 2 x 500 W 0.6 ohm RXLG resistors; MDS100A + heatsink; 3-pole stop switch | - | generic listings / search results | ~165 (est.) |
| Guying | 3/16 in. 7x19 galvanised cable 100 ft, 4 turnbuckles 3/8 in., 16 clips + 8 thimbles, 8 shackles 1/4 in., 4 screw anchors 6 x 48 in. | - | Hanes / Tie Down Engineering search results | ~270 (est.) |
| Base | 13 bags of concrete (600 mm cube pad), 4 x M12 wedge anchors | - | Quikrete | ~94 (est.) |
| Wiring, protection, earthing | 3 x 12 AWG drop, 2 x 8 AWG 20 m, box / glands, 40 A breaker + 60 A fuse, ground rod + surge arrester | - | Southwire / ERICO search results | ~385 (est.) |
| Fasteners | ISO 4762 M8 x 35 / 40 A2, DIN 7984 M6 x 12, M10 / M16 hex bolts + nylocs, M6 x 40 A2, DIN 471 35, PTFE washer | 30 | standard | ~15 (est.) |
| Made parts | hub + clamp plate (6061), yaw spindle (1045), nacelle frame, tail boom, guy collar, hinged base (S235 weldments), tail vane (5052) | 9 | drawings in `..\..\Drawings` | ~337 (est.) |
| Printed | 9 blade segments (ASA), spinner (PETG) | 10 | 2 plates, `..\..\WindTurbine_Bambu_Plate*.3mf` | filament above |

Total about **$2,661** (BOM `..\..\WindTurbine_BOM.csv`), of which **$618 is confirmed** on vendor pages (generator, controller, ASA
filament, 3 mm rod). Everything else is an estimate.

## 2. Fits and joints (CAD + calculation)

| Joint | Check | Result |
|---|---|---|
| Blades to hub | root block 44 x 20 clamped between the 240 hub disc and the 240 clamp plate by 2 x M8 per blade into the hub thread (inner bolts M8 x 40 also clamp the spinner flange) | both bolts inside the clamp faces; 9 kN clamp friction per blade |
| Blade segments | 2 x 5 mm CF rods x 130 across r 270, 2 x 3 mm x 90 across r 460, holes 5.2 / 3.2, structural epoxy; joint faces bonded | rod walls >= 1.12 mm (design.py), rod SF 4.9 |
| Hub on generator | 17 H7 bore on the 17 mm shaft, clamped against the 25 mm collar by M16x1.5 nyloc at 60 Nm | friction SF 9 on peak rotor torque; thread protrudes 1.5 mm past the nut |
| Generator to frame | 4 x DIN 7984 M6 x 12 counterbored flush in the 6 mm plate (PCD 110 assumed from the drawing) | hub - plate gap 2.0 mm (CAD) |
| Yaw | frame tube with 2 x 6007-2RS (seats 62 K6) on the 35 h6 spindle; lower inner ring on the spindle collar carries the head; DIN 471 ring on top | 0 DOF in yaw constraint set; s0 20 |
| Spindle to mast | 52.2 plug in the 52.5 pipe bore, collar on the pipe end, 2 x M10 cross bolts at 90 deg | cable passes the 22 bore |
| Tail hinge | 1-1/4 in. Sch 40 sleeve (35.0 bore) on the 33.4 post tilted 20 deg, PTFE washer on the collar, cap + M10 on top | 0.8 mm diametral clearance; grease |
| Mast joint / base | 2 in. NPT coupling; M16 pin through the base lugs and the mast foot (tilt-up) | thread root SF 7.1 |

## 3. Moving clearances (Inventor)

- 0 DOF, 0 unhealthy, 0 interfering pairs at 8 poses (Spin 0 / 60 / 100, Furl 40 / 80, Yaw -150 / 90); probe errors <= 0.00013 deg.
- Blade to mast >= 108.8 mm over a rotor turn (blade deflection 10 mm operating, 23 mm parked at 42 m/s).
- Tail vane to blades 280 mm and tail to mast 57 mm at full furl (80 deg); blade root to the generator plate 14 mm.

## 4. Assembly order (each step has tool access)

1. Pour the 600 mm pad with the base hinge on 4 x M12 wedge anchors; screw in the 4 guy anchors at 4.0 m radius (45 / 135 / 225 / 315 deg).
2. Print and bond the blades: segments on 2 x 5 mm / 2 x 3 mm carbon rods with structural epoxy in a straight jig; weigh and match the three
   blades to +-2 g; static balance the rotor on the hub.
3. Lay the mast on trestles: couple the two pipes, fit the guy collar (M10 cross bolt), pull the 3 x 12 AWG drop cable through.
4. Spindle into the mast top (2 x M10); bearings and frame onto the spindle, DIN 471 ring; generator onto the plate (4 x M6, Loctite 243).
5. Hub on the shaft (M16x1.5 nyloc 60 Nm), blades and clamp plate, spinner under the inner bolts (12 Nm); tail boom on the hinge post,
   PTFE washer, cap; vane (3 x M6); furl stops.
6. Pin the mast foot in the base hinge, attach the guys, tilt up with the gin pole and come-along; tension the guys to about 400 N.
7. Stop switch closed (shorted) during erection; rectifier, TS-45, dump load, breaker and fuse, then the batteries; earth rod and surge arrester.

## 5. Loads (calculated, see the calc report)

| Item | Result |
|---|---|
| Output | 294 W at 11 m/s (704 rpm), 251 W into the battery; max 448 W (generator max 445 W); charging from 3.6 m/s |
| Furling | starts at 8.5 m/s; 54 deg at 20 m/s; runaway 1573 rpm if the battery / controller disconnects |
| Blade | root 7.7 MPa (SF 1.94 across printed layers), rods SF 4.9-5.0, tip deflection 10 / 23 mm |
| Tower | 57 MPa at the guy point in the 42 m/s parked case (SF 4.2); guys SF 13, anchors 7.7, buckling SF 10 |
| Bearings / hub | yaw 6007 s0 20; generator bearings (assumed 6203) long life; hub friction SF 9 |

## 6. Open items: settle these before ordering

1. **Start-up torque.** The rotor torque at standstill reaches the generator's 0.35 Nm catalogue starting torque only at 8.5 m/s
   (5.6 m/s against the assumed 0.15 Nm running drag). Measure the breakaway torque of the delivered generator with a spring scale on a
   lever; if it is above about 0.2 Nm, ask ATO for a lower-cogging unit or add root solidity (wider inboard chord).
2. **Generator data.** The 24 V power curve was read by hand from an image; the efficiency, mounting PCD 110, internal bearings and the curve
   above 800 rpm are assumptions. Get ATO's drawing and datasheet, then spin the generator with a drill into the battery and log volts, amps and rpm.
3. **Printed blade strength.** SF 1.94 at the root assumes 15 MPa across ASA layers in the runaway + parked case. Tensile-test printed coupons
   across layers and proof-load one finished blade to 2 x the operating root moment before flying it; balance the rotor.
4. **Tower-top frequency.** The head on the 1.6 m overhang above the guys is about 7 Hz by a rough estimate, inside the 1P band (6.7-14 Hz).
   Balance the rotor (the 1P source) and tap-test after erection; moving the guy collar to 5.2 m raises it to about 14 Hz.
5. **Furl speed.** The 8.5 m/s furl start comes from a quasi-static balance without tail aerodynamics or yaw dynamics. Check it in the field
   and trim with tail ballast (heavier = later furl).
6. **Site and prices.** Soil must hold the screw anchors (check the rating for the soil), the 4 m guy radius needs space, and local height /
   permit rules apply. Only $618 of the $2,661 is confirmed on vendor pages; the steel work and electronics are estimates.

No other part of this check failed. The turbine has not been built; every number above is a CAD measurement, a calculation or a
catalogue value.
