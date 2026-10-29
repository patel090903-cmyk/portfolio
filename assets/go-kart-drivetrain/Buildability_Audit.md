# GoKartDrivetrain: buildability audit (2026-10-28)

**Verdict: BUILDABLE WITH FIXES.** The drivetrain concept works: gearing, axle, bearings, keys and welds all hold up when I recheck them against real datasheet numbers. But four purchased-part interfaces are drawn around parts that either aren't catalogue items or haven't been confirmed (13T 7/8-bore sprocket, 60T 6-bolt 3.25 in sprocket, ME1114 face bolt pattern, 4-bolt 90 mm wheel hub). The #35 chain also runs at or above its allowable working load at launch. And the design has no brake. Fix these before buying anything.

Scope: design-only review from `_build\design.py`, `_build\build_parts.py`, `Analysis\analysis.json`, `Tests\Summary.md`, `Tests\Loads\load_cases.csv`, and the `Export\STL` / `Export\STEP_parts` files. Inventor was not opened. Nothing has been built or tested; every number here is calculated.

Files in this folder:
- `buy_list.csv`: real part numbers, what's verified, how the CAD compares, approximate prices
- `buildability_calcs.py` and `buildability_calcs.json`: my independent calcs (run with `python buildability_calcs.py`)

## 1. Ranked issues

| # | Issue | Evidence (measured / sourced) | Fix |
|---|---|---|---|
| 1 | **The motor sprocket isn't a catalogue part.** The 13T #35 with a 7/8 in bore and 3/16 key is modelled as "Martin 35BS13 re-bored". | Martin 35BS13 is listed only in 1/2, 5/8 and 3/4 in bores, with a 1-1/4 in hub (Source Atlantic, Motion, Applied). Re-bored to 7/8 in, only **2.1 mm** of hub is left over the keyseat (2.8 mm in the CAD's 33 mm hub). | Use a **Browning H3515X7/8** (15T #35, 7/8 bore, 3/16 x 3/32 key, 1.344 in hub, catalogue part): 3.3 mm over the keyseat. Ratio becomes 60/15 = 4.00. 25 mph then needs 3116 rpm (62 % of 5000). Chain goes to **100 links** (formula gives 98.83 at the same centres; the extra ~5.6 mm is inside the +-12 mm slot). |
| 2 | **The #35 chain is at or over its allowable load at launch.** The design checked only ultimate strength (SF 4.4 on the ANSI 2100 lbf figure). | Tsubaki RS35: max allowable **480 lbf = 2135 N**, min ultimate 1760 lbf = 7.83 kN. Chain tension: 350 A / 13T = **2111 N (99 % of allowable)**. 420 A (motor peak) = 2533 N (119 %). The real Sevcon G4845 is a **450 A** 2-min unit, which gives 2697 N (126 %) if it isn't limited. | Program the controller to 300-350 A phase current **and** use the 15T sprocket: 1834 N (86 %) at 350 A. For full 450 A, go to **#35-2 duplex** (allowable 810 lbf: 65-75 %) or #40. Treat the chain as a wear item either way. |
| 3 | **No brake anywhere in the CAD or BOM.** | Karts brake on the rear axle only. A grip-limited stop of about 0.51 g needs about **127 N.m** of axle brake torque. Regen from the Sevcon isn't a safe or legal primary brake. | Add a 1-1/4 in keyed brake-disc hub, a 180-200 mm disc and a hydraulic kart caliper with master cylinder (about $150-300). There's axial room on the axle between the right bearing (Y -315) and the sprocket (Y +235). |
| 4 | **The 60T sprocket's bolt pattern is unverified.** The CAD uses a 7075 plate with 6 x 8.4 holes on a 3.25 in circle and a 64 mm bore, plus the custom 6061 hub GK-302. | I found no #35 60T with that pattern. Real kart #35 split sprockets use 6 bolts on a 5-1/4 in circle (4-9/16 in centre hole). Martin **35BS60 1-1/4** (B-hub, 2-1/4 in hub, OD 7.380 in) is a catalogue part. | Buy a 35BS60 bored 1-1/4 in with a 1/4 keyway and key it straight onto the axle. That deletes GK-302. Or buy a 5-1/4 in BC split sprocket and redraw GK-302 as a carrier for that pattern. |
| 5 | **The ME1114 face bolt pattern is assumed.** design.py marks "4 x 3/8-16 on 6.5 in BC" as ASSUMED. | Not published on the Thunderstruck or EMS listings, and my search found no drawing. | Get the Motenergy mechanical drawing (Thunderstruck or EMS) **before** machining GK-103. The bracket's 4 x 10.5 holes and 64.5 mm pilot bore depend on it. |
| 6 | **The wheel package doesn't match real parts.** | 11x7.10-5 tyres need a **7.75-8.00 in wide** rim (Kenda K404, Mitas leaflet); the CAD rim is 5 in wide. The CAD hub uses 4 x M8 on 90 mm. Real 1-1/4 in kart hubs are 3-bolt on 2.5 in (JOES 25560, $54.99) or 3 x 58 mm. | Buy the hub and rim as a matching pair, and re-place the hubs on the keyed axle for the wider rim. Rear width stays under 1400 mm. |
| 7 | **The battery and BMS are a class assumption.** | 250 A from 40 Ah is 6.25C, which is a pulse rating for typical 40 Ah LFP prismatic cells (1-3C continuous). Retail 48 V packs mostly ship with a 100-150 A BMS. My sim puts 0-25 mph at **2.2 s with 250 A, 2.8 s with a 150 A BMS, 3.5 s with 100 A** (13T). | Build the pack DIY from 16 cells with a 16S BMS rated at least 250 A (PACE 16S is rated up to 300 A). Or accept about 2.8 s with a 150 A BMS: still under the 4 s target. |
| 8 | **The UCFL206 holes don't match the CAD.** | Timken and NSK give a **16 mm** hole on 117 mm centres (M14 bolt). The CAD housing has 14 mm holes, and the hanger has 13.5 mm holes for 1/2-13 bolts. | 1/2-13 grade 8 bolts work (the kerb load of 4065 N is easily carried by clamp friction), but add hardened washers. Opening the hanger holes to 14 mm gives assembly float. |
| 9 | **Insert set screws on a full-length keyway.** | UC206 set screws can land in the 1/4 in keyway and bite at the max-moment section (the bearing). | Clock the set screws at least 90 deg from the keyway, or use eccentric-collar inserts. |

## 2. Buy list summary (details and sources in `buy_list.csv`)

| Item | Real part | Status | Approx USD |
|---|---|---|---|
| Motor | Motenergy ME1114 | verified: Kt 0.12, 420 A, 5000 rpm, 7/8 x 1-11/16 shaft, 3/16 key. Peak torque listed as 65 Nm (Thunderstruck) vs 81 Nm (EMS): conflict | 1,030 (Thunderstruck) |
| Controller | Sevcon Gen4 **G4845** (Size 4, 36/48 V) | verified: 450 A 2-min, 540 A 10 s. Needs programming and a harness | ~1,200-1,600 new (quote item, unverified); 160-240 used |
| Battery | DIY 16S 40 Ah LFP + BMS rated at least 250 A | no off-the-shelf match | ~700-1,100 |
| Contactor, fuse, key, throttle, cable | Albright SW200 / Kilovac EV200, 250 A fuse, Hall pedal, 2 AWG | generic | ~250-470 |
| Sprockets | Browning H3515X7/8 + Martin 35BS60 1-1/4 | catalogue | ~80-145 |
| Chain | Tsubaki RS35 (or 35-2) | verified ratings | ~40-70 |
| Bearings | UCFL206-20 x2 (Timken/NSK/NTN) | verified: C 19.5 kN, C0 11.3 kN | ~40-80 |
| Hubs / rims / tyres | JOES 25560 x2, 5x8 in rims, 11x7.10-5 x2 | hub verified ($54.99) | ~310-430 |
| Axle, keys, hardware | 1-1/4 x 40 keyed kart axle, 1018 key stock, grade 8 | generic | ~115-225 |
| Stock for made parts | 4130 3/8 plate, A36 6 mm, 6061 | - | ~120 (plate route) / up to 450 (bracket from solid) |
| **Missing: brake + chain guard** | kart brake kit, sheet guard | not designed | ~170-340 |
| **Total** | | | **~$4,100-5,900** (about $3,000-4,500 with a used controller). Chassis, steering, seat and shop time not included. |

## 3. Manufacturability (text-to-cad `dfm`, CNC + fabrication)

No part is meant to be 3D printed, so `dfam-check` doesn't apply; that matches `Tests\Summary.md`. I measured geometry from the exported STLs with trimesh (OCP/cadquery isn't installed in this Python, so I couldn't read exact B-rep radii) and took feature sizes from `build_parts.py`. Rule sources are the Hubs "How to design parts for CNC machining" guide and the Protolabs milling guidelines, as cited in `dfm/references/cnc.md`. I didn't apply any shop-specific limits.

| Part / feature | Evidence | Rule | Result | Action |
|---|---|---|---|---|
| GK-103 motor bracket, machined from solid 6061 | STL bbox 250 x 117.6 x 233 mm, volume 727 cm3. That's **89 % of the bbox removed**; the stated stock is 250x240x260, about 18.5 kg for a 1.96 kg part | cost, not a constraint | review (cost) | Waterjet two 3/8 in 6061 plates plus 2 gussets and TIG-weld (6061-T6 drops to ~T4 strength in the HAZ: recheck with Sy ~110 MPa against the FEA's 43 MPa peak, SF ~2.5). Or bolt the plates with dowels. |
| GK-103 motor plate | 9.5 mm thick, about 150 mm tall: wall height/thickness about 16 | Hubs: tall thin walls chatter | review | Fine if machined before the pocketing, or use the plate route above. |
| GK-103 pilot bore 64.5 mm + 4 x 10.5 holes | depend on the ASSUMED motor face (issue 5) | - | unverified | Hold until you have the Motenergy drawing. |
| GK-301 axle: 1/4 x 1/8 keyway, **1016 mm long** | design.py | needs a mill with at least 1 m of X travel (typical knee mills have about 760-800 mm), or a keyseater | review | Buy a pre-keyed 1-1/4 x 40 in kart axle; it's the standard item. 4140 PH at 28-32 HRC cuts fine with carbide. L/D 32: chamfer only, no turning. |
| GK-301 seats for UC inserts | 1-1/4 in nominal | set-screw inserts want a ground h7-h9 shaft | review | Ground kart axle stock satisfies this. |
| GK-101 bearing hanger, 3/8 in 4130 profile + 52 bore + 2 x 13.5 holes + saddle | STL 160 x 9.5 x 192.8 mm | profile cut, then drill | pass (geometry) | Waterjet or laser the profile; finish the 52 bore after welding. |
| GK-101 weld to the 1-1/4 x 0.083 rail | 9.5 mm plate to 2.1 mm tube wall (4.5:1) | thickness mismatch: burn-through and distortion risk | review | Put the heat into the plate. Tack both hangers with a straight dummy axle through both bores, then weld alternating sides. UC inserts tolerate about +-2 deg of misalignment. |
| GK-102 motor base, 6 mm A36, 270 x 142 | STL bbox matches | weld warp on a 6 mm plate | review | Drill or check the 4 x 10.5 holes after welding. The slotted bracket absorbs +-12 mm anyway. |
| GK-302 sprocket hub, 6061, 1/4 in internal keyseat 45 mm long, 6 x 8.4 holes | STL 104 x 104 x 42.9 mm | an internal keyseat needs a broach (standard 1/4 in broach OK) | pass, but drop the part if you take issue-4 fix A | - |

What I couldn't check: exact internal corner radii (needs B-rep), thread specs, tolerances and fits (there are no detail drawings with tolerances), and weld procedure.

## 4. Function: independent calcs (`buildability_calcs.json`)

Assumptions are the design's own (185 kg with driver, 60 % rear, CG 280 mm, wheelbase 1040 mm, rolling radius 137 mm, Crr 0.018, CdA 0.54), plus the datasheet values listed above. Safety-factor targets: at least 1.5 on yield with Kt, at least 1.5 Goodman, at least 2 static on bearings and keys, and the chain at or under the **maximum allowable load** (not just ultimate strength).

| Check | 13T (design) | 15T (fix) | Target | Result |
|---|---|---|---|---|
| Ratio / motor rpm at 25 mph | 4.615 / 3595 rpm (72 %) | 4.00 / 3116 rpm (62 %) | < 5000 rpm | pass |
| No-load top speed, Ke = Kt, 95 % modulation (full / nominal / low pack) | 28.6 / 26.9 / **25.2 mph** | 33.0 / 31.1 / 29.1 mph | >= 25 mph | 13T is marginal on a low pack (no field weakening); 15T has margin |
| Wheel force at 350 A vs traction limit (mu 0.9 / 1.1: 1293 / 1702 N) | 1344 N: spins at mu 0.9 | 1165 N | - | needs a launch current ramp on cold tyres |
| Chain tension at 350 A | 2111 N = **99 %** of RS35 allowable, SF 3.7 on min ultimate | 1834 N = 86 %, SF 4.3 | <= 100 % allowable | 13T marginal, 15T pass |
| Chain tension at 450 A (G4845 unlimited) | 2697 N = **126 %** | 2357 N = **110 %** | <= 100 % | **FAIL** unless the current is limited or the chain is duplex/#40 |
| Motor key 3/16 x 19, 1018 CD, at 450 A | shear SF 4.0, crush SF 3.4 | same | >= 2 | pass |
| Hub wall over the 7/8 keyseat | 2.1 mm (35BS13) | 3.3 mm (H3515X7/8) | - | 13T is not a catalogue part |
| Axle C4 kerb (434 N.m + 189 N.m), end-milled Kt 2.14 / 3.0 | vm 334 MPa, **SF 1.96** on 655 MPa (nominal SF 4.44) | same | >= 1.5 | pass |
| Axle fatigue, C1 launch, Goodman (Kf 1.9, Kfs 2.6, Se 256 MPa) | **SF 1.63** | same | >= 1.5 | pass, thin margin. Set-screw dimples not included |
| UC206-20 static at kerb (4065 N vs C0 11.3 kN) | SF 2.78 | - | >= 2 | pass |
| UC206-20 L10 at cruise (673 N, 779 rpm) / continuous launch load | 519,000 h / 8,800 h | - | > 2000 h | pass |
| Chain length at C = 283.89 mm | 97.99 links (formula) vs 98 in the CAD | 98.83, so use 100 | even link count | pass |
| 0-25 mph, 350 A, battery 250 / 150 / 100 A | 2.20 / 2.81 / 3.48 s | 2.22 / 2.90 s | < 4 s | pass |
| Brake | none | - | about 127 N.m axle torque | **FAIL (missing)** |

These agree with the original analysis wherever the inputs are the same. The original's axle SF of 2.69 with Kt is less conservative than my end-milled-keyseat 1.96, and both pass. The chain-allowable and brake findings are new.

## 5. Sources (accessed 2026-10-28)
- ME1114 listing: https://www.thunderstruck-ev.com/motenergy-1114-10-kw-brushless-motor.html ($1,030; 0.12 Nm/A; 65 Nm; 420 A; 7/8 x 1-11/16 x 3/16 shaft; 29 lb; "works with Curtis AC-F4A or Sevcon Gen4")
- ME1114 (EMS, conflicting 60 ft-lb / 35 lb): https://mail.electricmotorsport.com/store/ems_ev_parts_motors_me1114.php
- Sevcon G48-series datasheet (G4845: 450 A 2 min, 540 A 10 s): https://www.thierry-lequeu.fr/data/gen4-48.pdf
- Tsubaki RS35 ratings: https://catalog.tsubaki.ca/viewitems/rs25-through-rs240-chains/rs35-roller-chains ; RS40: https://catalog.ustsubaki.com/view/303480282/12/
- Martin 35BS13 bores and hub: https://www.sourceatlantic.ca/Product/35BS13-1-2 , https://www.motion.com/products/sku/00188556
- Browning H3515X7/8: https://www.motion.com/products/sku/02173605
- Martin 35BS60 1-1/4: https://usarollerchain.com/products/35bs60-1-14-sprocket
- #35 split kart sprockets (6 bolts on 5-1/4 BC): https://www.gopowersports.com/split-sprockets-35/?revpage=2
- UCFL206-20 (Timken / NSK): https://documents.mrosupply.com/product_documents/51/19/5119496/ucfl206-20_QSk3SMW , https://www.nsk.com/ph-en/engineering/ucfl206d1-x-as3s.html
- JOES 25560 hub: https://www.summitracing.com/parts/JOE-25560
- 11x7.10-5 rim width: https://onlineshop.bohnenkamp-benelux.com/en/tyre-kenda-k404-11-x-7-10-5-19211107 , Mitas go-kart leaflet 2025
- PACE 16S BMS: https://lifepo4.com.au/shop/lifepo4-bms/pace/16s/pace-bms-16s-51-2v/
