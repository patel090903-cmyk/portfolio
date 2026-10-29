# QuadDrone - buildability audit (2026-10-28)

Question: if Jay prints the frame and buys the parts, does it fly? Evidence: Export\STL_print (10 printed parts),
the 3 Bambu plate .3mf files, `_build\*.py`, `Analysis\fea_input\params.json`, existing Tests results, vendor
datasheets (web, checked today). Inventor was NOT opened. Nothing in CAD/BOM/portfolio was changed.

## Verdict: BUILDABLE WITH FIXES

The propulsion/electrical design is sound (TWR 2.5-3.1, 14-16 min hover, every current inside its rating) and
all 10 printed parts fit the 256 mm bed with walls >= 1.6 mm. But you cannot fly it from this BOM: it has no RC
link and no power distribution, the arm has sealed cavities that need 17-25 mm internal bridges, and two vendor
facts (motor bolt pattern, prop retention) are unverified against the CAD.

### Ranked issues
| # | Severity | Issue | Evidence | Fix |
|---|---|---|---|---|
| 1 | Blocker | No RC receiver / transmitter in BOM. PX4/ArduPilot will not arm without RC (or a GCS link). | BOM items 1-31 | Add ELRS TX + RX (~$90). Mount RX under the hatch, antenna out the vent slot. |
| 2 | Blocker | PM02 V3 is a power module, not a PDB. BOM item 28 says "XT60 in, 4 ESC pads" - the real PM02 V3 has an XT60 in/out and no ESC pads. Nothing feeds 4 ESCs. | docs.px4.io Holybro PM02 page | Add a PDB (XT60 + 4 pads, >= 80 A, ~$15), on the bottom plate under the top plate. |
| 3 | Fail (DfAM) | Arm (x4) is a hollow box with 5 SEALED cavities: 16.8 mm tall, 1.6 mm skins. Printed flat (as on Plate 2) the top skin bridges 17.0-24.6 mm over a closed void; supports there can never be removed. Any other orientation bridges the ribs instead (>= 17 mm). | Ray-cast of Arm.stl (`arm_cavity_probe.py`): skins at z 4.0-5.6 and 22.4-24.0; cavity width 24.6 mm at r=35 -> 17.0 mm at r=230. FDM max bridge 10 mm (dfam-check process-limits.md). | Either (a) give each cavity a 45 deg gable roof (self-supporting printed flat), or (b) delete the cavities and let the slicer fill the arm (3 walls + 20 % gyroid; ~+17 g/arm, +68 g total, TWR 2.69 -> 2.6 at 14.8 V). (b) is the 10-minute fix. |
| 4 | Verify | Motor bolt pattern: CAD uses 16x19 mm M3 (diagonal, 45 deg). T-Motor does not publish it for AIR2216 II; one reseller lists 16x16 for the Holybro 2216. | store.tmotor.com / ligpower.com pages give no drawing | Measure the motor base before printing arms (or slot the holes 16-19 mm). |
| 5 | Verify | Prop retention: CAD adds an M6 thin prop nut (BOM 13). Air Gear 450 T1045 props are sold as self-tightening (thread straight onto CW/CCW-threaded motor shafts). | Air Gear 450 part list (Digi-Key 108990080): "T1045 Polymer Self-Tightening Props" | Buy 2 CW + 2 CCW motors to match prop thread; drop the M6 nut unless the motor you get has a plain shaft. |
| 6 | Minor | PM02 V3 rated 60 A; full throttle draws 66 A (4 x 16.37 A + avionics). OK only as a burst (120 A < 60 s). | function_calcs.json: SF 0.91 cont / 1.82 burst | Fine for flying (hover 15-17 A). Don't bench-test at 100 % for > 60 s. |
| 7 | Minor | Motor at 100 % = 16.37 A vs 17 A (180 s) limit - only 4 % margin, time-limited. | T-Motor table | Cap throttle at ~95 % in firmware (MOT_THST_HOVER / PWM max) or accept short bursts. |
| 8 | Minor | Gimbal + camera has no real part number (110 g estimate). | BOM 30 | Pick a real unit; re-check the 4-damper plate pattern (GimbDampX1/X2 88/116, Y 18). |
| 9 | Minor | Battery: only the 154x46x30 mm Gens Ace SKU fits the tray; Gens Ace also sells a 45C 5000 4S at 160x45x34 mm / 550 g. Ships with Deans/EC5/T, not XT60. | BuddyRC vs gensace.de listings | Buy the 154x46x30 SKU and re-terminate to XT60. |
| 10 | Minor | Printed mass: CAD uses 1.09 g/cm3; PA6-CF is 1.17-1.25. Up to +48 g. | 434.5 cm3 printed | Already included in the worst-case AUW 1831 g below. |
| 11 | Process | PA6-CF needs a hardened nozzle, enclosure and dried filament (80 C, 8-12 h). On a P1S/A1 stock nozzle it will wear the nozzle; A1 (open) is not suitable. Don't switch to PETG-CF: motor surface reaches ~80 C at 100 % (T-Motor note), above PETG's HDT. | | Print on X1C/P1S with hardened 0.4 mm nozzle; keep parts dry (nylon loses ~40 % strength wet). |

Not checked (say so, not PASS): crash/hard-landing loads on legs and arms, M3 thread engagement in the motor
(M3x6 through a 3.6 mm clamp leaves 2.4 mm in the motor base - typical for 2216 but confirm the motor's thread
depth), min hole diameter and bridge spans by the DfAM tool (it does not measure them; #3 was measured separately),
ESC/BLHeli_S tuning, EMI near the GPS.

## 1. Buy list (buy_list.csv)
Verified = spec and/or price read from a vendor/doc page today.

| Part | Qty | Verified spec | CAD check | ~USD |
|---|---|---|---|---|
| T-Motor AIR2216 II KV920 | 4 | 64+/-2 g, 17 A/272 W peak 180 s, 4S, 115 mOhm (T-Motor store) | mass matches; bolt pattern unverified (#4) | 90 (combo with 4 props) |
| T-Motor T1045 props CW/CCW | 4 + spares | 13 g, 1.2 kg limit, self-tightening | separate M6 nut probably wrong (#5) | 15 |
| Hobbywing XRotor Micro 30A BLHeli-S DShot600 (30901075) | 4 | 30/40 A, 2-4S, no BEC, 23.8x14.5x5.8, 6 g | matches CAD envelope | ~70 (no list price found, stock patchy) |
| Holybro Pixhawk 6C aluminium | 1 | 84.8x44x12.4, 59.3 g | exact match | 190 (RDQ) |
| Holybro M9N GPS V1 10-pin | 1 | 50 mm, 32 g, switch + buzzer | match | 75 (Pyrodrone) |
| Holybro PM02 V3 | 1 | 60 A rated / 120 A < 60 s, 5.2 V 3 A | NOT a PDB (#2) | ~30 |
| Gens Ace 4S 5000 45C | 1-2 | 154x46x30, 480 g (BuddyRC SKU) | fits tray (47 mm rails) | 79 each |
| 2-axis gimbal + action cam | 1 | none (generic) | estimate only (#8) | ~150 |
| Dampers, foam, straps, M3 kit, standoffs | - | standard | lengths check out (clamp stack 27 mm on M3x35; leg 24 mm on M3x30) | ~47 |
| MISSING: ELRS TX+RX, PDB, wiring/XT60/bullets, charger, (telemetry) | - | - | not in CAD | ~185 (+60) |
| PA6-CF filament 1 kg | - | - | ~520 g of parts | ~70 |
| **Total** | | | | **~$1,000 (~$850 without gimbal/camera)** |

## 2. Printability (DfAM, FDM, 45 deg, 1.2 mm supported / 1.6 mm unsupported wall, 256 mm bed)
Tool: text-to-cad `dfam_tool.py` via `dfam\dfam_batch.py` (current + best of 6 axis orientations). Full data:
`dfam\dfam_summary.csv`, `dfam\dfam_full.json`.

| Part (qty) | Watertight | Wall min / p05 mm | Support as exported | Best orientation (support, height) | Bed fit | Result |
|---|---|---|---|---|---|---|
| Arm (4) | yes, 1 body | 1.60 / 1.60 | 11.8 % | flat as on Plate 2 (20 mm tall); vertical option 5.6 % but 238 mm tall on a 20 mm footprint - don't | 238x36 | walls PASS (= 1.6 unsupported limit, > 1.2 supported); **sealed-cavity bridges 17-25 mm FAIL (#3)** |
| BatteryTray | yes | 2.0 / 2.0 | 31.2 % | flip 180 X: 0 %, 21 mm | 153.5x70 | PASS (print upside-down) |
| BottomPlate | yes | 4.0 / 4.0 | 0 % | as is, 4 mm | 150x150 | PASS |
| TopPlate | yes | 3.0 / 3.0 | 0 % | as is, 3 mm | 150x150 | PASS |
| HatchPlate | yes | 2.5 / 2.5 | 0 % | as is, 2.5 mm | 140x96 | PASS |
| FcDampingPlate | yes | 2.5 / 2.5 | 0 % | as is | 112x68 | PASS |
| GimbalMountUpper | yes | 3.0 / 3.0 | 0 % | as is, 9 mm | 77x54 | PASS |
| GimbalMountLower | yes | 2.5 / 2.5 | 0 % | as is | 44x50 | PASS |
| GpsMast | yes | 2.0 / 2.0 | 16.1 % | flip 180 X (platform on bed): 5.5 %, 83 mm | 46x46 | PASS; Plate 1 already prints it platform-down (1622 mm2 on the bed, measured) = best orientation; small supports under the base flange/gussets |
| LandingLeg (4) | yes | 4.0 / 4.0 | 6.5 % | flip / on side: 0-0.3 % | 67.5x99 | PASS |

Count: 9 of 10 part designs pass the measured DfAM rules; 1 (Arm, x4) fails on sealed internal bridges.
Bambu plates (read with trimesh): Plate 1 extent 230.5x250.0 mm, Plate 2 246x238, Plate 3 230.5x250.5 - all inside
256x256 (Plate 3 has only ~2 mm margin at the back edge; Plate 1 starts 2 mm from the front edge - check the X1C
front-left exclusion zone when slicing). Not measured by the tool: min hole size (M3 holes are 3.3 mm, > 2 mm
limit by design value), bridges other than the arm.

## 3. Function (qd_function_calcs.py -> function_calcs.json)
Assumptions: T-Motor AIR2216 II KV920 + T1045 bench table at 16 V; same thrust needs throttle x 16/14.8 on a 14.8 V
pack; full thrust ~ V^2; usable energy 80 % of 74 Wh; avionics + gimbal 8 W. Worst-case AUW 1831 g = CAD 1696 g
+ 48 g real PA6-CF density + 101 g arm infill fix (#3b, conservative) + 20 g RX/PDB.

| Check | CAD AUW 1696 g | Worst AUW 1831 g | Criterion | Result |
|---|---|---|---|---|
| Thrust-to-weight @16.0 V / 14.8 V | 3.14 / 2.69 | 2.91 / 2.49 | >= 2.0 | PASS |
| Hover throttle @14.8 V | 52 % | 55 % | 40-60 % sweet spot | PASS |
| Hover power / current | 225 W / 15.2 A | 247 W / 16.7 A | - | - |
| Hover endurance (80 % DoD) | 15.8 min | 14.4 min | report | matches Tests (15.5 min) |
| ESC 30 A cont vs 16.37 A motor max | SF 1.83 | | >= 1.5 | PASS |
| Motor 17 A (180 s) vs 16.37 A | margin 1.04 | | time-limited | MARGINAL (#7) |
| PM02 60 A rated vs 66 A full throttle | SF 0.91 cont / 1.82 burst | | burst < 60 s | MARGINAL (#6) |
| Battery 45C x 5 Ah = 225 A vs 66 A | SF 3.4 (1.5 if the real C is 20) | | >= 1.5 | PASS |
| Prop tip-to-tip gap (500 mm diagonal, 254 mm props) | 99.6 mm (39 % D) | | >= 10 % D | PASS |
| Prop inner tip radius vs plate corner | 123 mm vs 84.9 mm | | clear | PASS |
| Arm bending at outer clamp, full thrust 13.07 N | nominal 2.76 MPa (hand calc, box 26.4x20x1.6); FEA peak 9.65 MPa | | SF >= 2 vs 45 MPa allowable | PASS: SF 4.7 dry, 2.8 wet (45 x 0.6) |
| Arm clamp bolt couple (2 x M3, 27 mm apart) | 86 N per bolt | | M3 A2-70 >> 1 kN | PASS |
| CG offset (CAD) | 0.7 mm | | < 5 mm | PASS |
| Arm modes vs rotor 1P at hover | 64-67 Hz vs 94 Hz | | separated | PASS (crosses at spool-up only) |

The existing FEA (gmsh + scikit-fem, Tests\FEA) is consistent with the hand calc (nominal 2.8 MPa, FEA 6.2 MPa away
from the clamp edge, 9.65 MPa at the clamp edge with contact/holes). It assumes dry PA6-CF and in-plane loading,
which holds for arms printed flat. Crash loads are not analysed.

Sources: [T-Motor AIR2216 II](https://store.tmotor.com/goods.php?id=1220), [LigPower Air Gear 450 II](https://www.ligpower.com/product/air-gear-450II-combo-set-no-esc.html),
[Air Gear 450 part list (Digi-Key)](https://mm.digikey.com/Volume0/opasdata/d220001/medias/docus/308/108990080_Web.pdf),
[Hobbywing XRotor Micro 30A](https://www.hobbywing.com/en/products/xrotor-micro-blheli-s-30a-dshot600185),
[PX4 Holybro PM02](https://docs.px4.io/main/en/power_module/holybro_pm02), [RDQ Pixhawk 6C alu](https://www.racedayquads.com/products/holybro-pixhawk-6c-aluminum-case),
[Pyrodrone M9N](https://pyrodrone.com/collections/all-products/products/holybro-m9n-gps-module-ist8310-standard-10-pin),
[BuddyRC Gens Ace 5000 4S 45C](https://www.buddyrc.com/collections/gens-ace-batteries/products/gens-ace-5000mah-14-8v-45c-4s1p-lipo-battery-pack-with-deans-plug-1),
[gensace.de 160x45x34 SKU](https://www.gensace.de/gens-ace-5000mah-14-8v-45c-4s1p-heli-lipo-battery.html).
