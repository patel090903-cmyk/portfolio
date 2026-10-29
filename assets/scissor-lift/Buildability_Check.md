# ScissorLift - buildability check (2026-10-29)

Question: if Jay orders these parts and has the frames welded, does it go together and work? This check uses the CAD
(Inventor measurements), the calculations in `..\..\Analysis\scissor_analysis.py` and vendor / distributor listings read on
2026-10-29. Nothing has been built. **Verdict: BUILDABLE, with five things to settle before ordering (section 6).**

## 1. Every bought part has a real part number

| Item | Part number | Qty | Checked against | Price (USD) |
|---|---|---|---|---|
| Geared BLDC motor, 24 V 200 W, 71.5:1 planetary, 33 Nm / 42 rpm | StepperOnline M82B200-24P-30S/G82-71.5S1 | 1 | StepperOnline listing (title in search results: 33 Nm, 42 rpm, 71.5:1); drawing not read | ~240 (est., price not shown) |
| BLDC driver 24-48 V 15 A | StepperOnline BLD-515C | 1 | StepperOnline listing | ~60 (est.) |
| Lead screw TR16x4 RH, rolled, 1 m | DIN 103 TR16x4 (Misumi MTSRW16 class) | 1 | DIN 103 dims (d2 14, d3 11.5) | ~35 (est.) |
| Flanged bronze nut TR16x4 | DIN 103 flange nut, CuSn7 | 1 | Essentra lists the TR20x4 flanged bronze nut at GBP 72.88 (1 off); TR16 envelope assumed | ~55 (est.) |
| Thrust bearing 10 x 26 x 11 | SKF 51200 | 1 | distributor listings: C 12.7 kN, C0 18.6 kN | ~7 (est.) |
| Radial bearing 10 x 30 x 9 | SKF 6200-2RSH | 1 | SKF data C 5.07, C0 2.36 kN | ~4 |
| Track rollers 15 x 35 x 11 | 6202-2RS (INA LR202-2RSR recommended) | 4 | SKF data C 8.06, C0 3.75 kN | ~4 each |
| Pivot bushings 20 x 23 x 30 | SKF PCM 202330 E | 10 | SKF PCM range (catalogue limits 250 / 80 MPa, pv 1.6) | ~6 each (est.) |
| Thrust washers 20 x 32 x 1.5 | SKF PCMW class | 12 | - | ~2 each |
| Jaw coupling 10 / 16 bores | Lovejoy L-095 + NBR spider | 1 | Lovejoy L-095 21.9 Nm nominal (catalogue, confirm) | ~40 (est.) |
| Retaining rings | DIN 471-20 (12), DIN 471-15 (4) | 16 | DIN 471 tables | ~10 |
| Screws | ISO 4762 M6x20 (4), M8x20 (4), M6x16 (4) | 12 | standard | ~5 |
| Steel | RHS 60x30x3, SHS 40x40x3, RHS 50x30x3, RHS 40x20x2, PL 4 / 8 / 10, 45 x 11 tube, C45 / 42CrMo4 bar | - | EN 10219 sizes | ~200 material (est.) |
| Not modelled | 24 V 15 A supply, pendant, 2 limit switches, E-stop + wiring, maintenance prop, coupling guard, grease | - | - | ~245 (est.) |

Estimated total about **$1,370** before shipping and welding labour (BOM `..\..\ScissorLift_BOM.csv`). None of the
vendor pages returned a readable price, so every price is an estimate.

## 2. Fits and joints (CAD + calculation)

| Joint | Check | Result |
|---|---|---|
| Arm pivots | 20 f7 pin in PCM 202330 E bushing (23 H7 boss bore), clevis plates 20 H8, DIN 471 rings each end | Pin fixed axially by the rings, arm turns on the bushing; 1.5 mm thrust washer in every 2 mm gap (0.5 mm end play) |
| Centre pin | 20 f7 x 68 through both arm bosses + washer | 2.0 mm between frames at every height (CAD) |
| Roller pins | 20 p6 pressed into the carriage blocks / inner-arm bosses (20 P7), 6202 on a 15 k6 seat with DIN 471-15 | Press fit: no rotation; roller turns on its own bearing |
| Nut | flange on the +X face of the carriage nut plate, 4 x M6 x 20 into 8 + 3 mm of thread | The carriage pushes the nut through the flange face, not the screws |
| Screw | thread shoulder on the 51200 shaft washer, 10 h6 journal through 6200, clamp hub (no keyway) | Thrust (compression) goes to the drive block; the motor sees torque only |
| Gearmotor | 4 x M6 x 16 through its flange into the 10 mm motor plate, 40 pilot in a 40.5 hole | Follows an assumed flange (open item 2) |

## 3. Moving clearances (Inventor, Tests\Assembly_Checks)

- 0 DOF, 0 interfering pairs at 7 heights (250-900 mm); kinematics error 0.0.
- Inner to outer frame 2.0 mm everywhere (the washer gaps). Carriage to drive block 21.5 mm and nut flange to the thrust
  bearing 11.5 mm at the collapsed stop, so the lower limit switch must trip before the 250 mm position (set it at 252).
- Inner frame lower cross tube to the screw: 33.3 mm minimum (collapsed).
- Rollers sit on their rails with zero gap at every height (contact, 0 mm3).

## 4. Assembly order (each step has tool access)

1. Weld the four frames and the carriage; bore the bosses (23 H7 / 20 P7) in one set-up after welding, so the pin axes stay
   parallel. Powder coat, mask the bores.
2. Press the bushings into all arm bosses; press the roller pins into the carriage blocks and the inner-arm top bosses.
3. Drive block: 51200 into its seat, 6200 from the motor side; screw in from the carriage side; bolt the block to the base.
4. Carriage onto the screw (nut on the plate first, 4 x M6); rollers + DIN 471-15 rings on the carriage pins.
5. Inner frame into the base clevises (washers, pins, rings). Outer frame onto the carriage roller pins.
6. Join the frames at the centre pins. Lower the platform onto the inner-arm rollers and pin it to the outer frame.
7. Coupling + gearmotor; limit switches at 252 and 898 mm; grease the screw and nut; set the driver torque limit to 21 Nm.

## 5. Loads (calculated, see the calc report)

| Item | Result |
|---|---|
| Screw force | 10.7 kN at 250 mm with friction, 0.9 kN at 900 mm |
| Motor | 15.0 / 19.0 Nm needed (mu 0.10 / 0.15) vs 33 Nm rated: SF 2.20 / 1.73; lift 177 s |
| Pins | weakest is the carriage roller pin, SF 3.15 (206 MPa, 42CrMo4); bushings 14.9 MPa of 80 |
| Arms | 70.6 MPa peak (SF 5.0), weld fatigue SF 2.55 at 50,000 cycles |
| Screw / nut / bearing | buckling SF 6.8, nut 12.2 MPa, 51200 s0 1.73 |
| Stability | tip SF 3.04 with the load on one side at 900 mm and a 147 N push |

## 6. Open items: settle these before ordering

1. **Holding brake.** TR16x4 self-locks only while mu > 0.088. Greased bronze should hold at rest, but vibration can make it
   creep. Use a braked motor or a brake on the screw, and always fit the maintenance prop before working under the deck.
2. **Gearmotor drawing and price.** Flange, pilot, shaft and length are an envelope. Get the G82-71.5 drawing and match the motor-plate holes and the coupling bore.
3. **Nut length.** 12.2 MPa at the start is close to the ~15 MPa bronze guideline; a 50 mm nut (if offered) gives 9.8 MPa.
4. **Track rollers.** Plain 6202-2RS rollers work (s0 1.82), but crowned INA LR202-2RSR rollers in the same envelope handle edge loading on the rail better.
5. **Prices.** All prices are estimates; confirm them before ordering.

No other part of this check failed. The lift has not been built; every number above is a CAD measurement, a calculation or a catalogue value.
