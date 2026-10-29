# GenevaMechanism - test results summary

Model: `..\GenevaMechanism.iam` (assembly parameter `Crank`, 0 deg = mid-index; the wheel follows the Inventor expression `Wheel`). Full write-up: `..\Analysis\GenevaMechanism_CalcReport.pdf` (copy in `Dynamics\`).
**Designed and calculated only: every result here is a CAD measurement, a calculation or a catalogue value. Nothing has been built or tested.**

| Test | Result | Criterion | Status | Files |
|---|---|---|---|---|
| Assembly DOF / health | 91 occurrences (33 files), 270 constraints (233 flush, 35 mate, 2 angle), total DOF 0, 0 unhealthy | 0 DOF, 0 unhealthy | PASS | Assembly_Checks\assembly_checks.json |
| One-parameter drive | Crank drives the crank group; Wheel = -(60 deg x round(Crank/360) + atan(0.5 sin psi_c / (1 - 0.5 cos psi_c))), psi_c clamped to +-60 deg; both angle drivers verified at 27 / 133 / 341 / 412 deg before being kept | matches design.py | PASS | ..\_build\build_assembly.log |
| Interference | 0 clashing pairs at 28 crank angles (-180 to 420 deg, every 10 deg through the index, entry / exit +-60 / +-61 / +-65). Sanity test: a 2 deg wheel offset gives a 156.7 mm3 roller / slot clash, so the check is live | 0 pairs | PASS | Assembly_Checks\assembly_checks.txt |
| Kinematics in CAD | wheel and table angle vs design.py at all 28 poses: max error 0.0000 deg | matches | PASS | Assembly_Checks\assembly_checks.json |
| Moving clearances (CAD) | wheel - locking disc 0.10 mm (lock clearance) / 1.53 mm while indexing; roller in slot 0.03 mm per side; wheel tip - crank shaft 3.03 mm; wheel - crank spacer 1.03 mm; roller nut - lower plate 3.8 mm | > 0 | PASS | Assembly_Checks\assembly_checks.txt |
| 2D outline check | tangent entry: 0.0 deg between roller velocity and slot axis at entry (r 86.60 mm); disc gap while indexing >= 0.10 mm | > 0 | PASS | Kinematics\geneva2d.json, geneva2d.png |
| Locking accuracy | wheel play 0.06 deg (0.12 mm at R115) from crank 120 deg on; 0.12 deg at 90 deg; 0.94 deg (1.9 mm) at 65 deg, just after exit | work between crank 90-270 deg | PASS with a rule | Kinematics\geneva2d.json |
| Kinematics (calc) | 30 rpm: index 0.667 s, dwell 1.333 s (2/3); peak wheel speed 3.14 rad/s, accel 13.3 rad/s2 (1.35 w2), entry step 5.70 rad/s2 (tan 30 x w2) | report | - | Kinematics\geneva_kinematics.png |
| Slot count | 4 / 5 / 6 / 8 slots: peak accel 5.41 / 2.30 / 1.35 / 0.70 w2, crank torque coefficient 10.0 / 2.46 / 0.99 / 0.31, dwell 75 / 70 / 66.7 / 62.5 % | 6 chosen | - | Kinematics\slot_count_comparison.png |
| Torques (rigid) | J_out 0.0793 kg m2 (Inventor 0.0397 + payload 0.0397); crank 0.866 Nm drive / -0.686 Nm brake, RMS 0.27 Nm; wheel 1.11 Nm; peak power 2.7 W | report | - | Dynamics\torque_and_motor_sizing.png |
| Dynamic factor | 3-DOF torsional sim: wheel 1.04, crank 1.02 nominal; 1.01-1.94 (wheel) / 1.01-1.05 (crank) over coupling 300-3000 Nm/rad and table joint x0.5-x2; design values 2.0 / 1.25 | report | - | Dynamics\torque_and_motor_sizing.png |
| Motor | PKP264D14A2-PLE60-5B: estimated pull-out 2.29 Nm at the output (150 motor rpm) vs 1.08 Nm needed: SF 2.12; max 36 indexes/min at SF 1.5; load angle 0.6 elec. deg | SF >= 1.5 | PASS (curve estimated) | ..\Analysis\analysis.json |
| Gearbox | PLE60 T2N 40 Nm vs 3.28 Nm motor holding torque: SF 12.2 | SF >= 2 | PASS | ..\Analysis\analysis.json |
| Roller / slot contact | 39 N peak flank force (x Kd 2.0), Hertz 132 MPa over 10 mm (SF 11 on 1500 MPa); KR16 static SF 88, below its fatigue limit load | SF >= 2 | PASS | Strength\contact_and_jam.png |
| Jam (table blocked) | toggle: roller force 66 N at mid-index, above C0r only in the first 1.0 deg after entry; wheel torque above the 5 mm table key capacity (18.7 Nm) in the first 13.9 deg | protect | OPEN (stall detection + torque limiter) | Strength\contact_and_jam.png |
| Shafts / keys | wheel shaft 2.3 MPa, crank shaft 2.1 MPa at motor holding torque; keys 16.4 / 11.8 MPa (allow 100); roller stud 12.4 MPa | SF >= 2 | PASS | ..\Analysis\analysis.json |
| Bearings 6204-2RSH | 82 N axial, static SF 80, below Pu; 218 N per bearing with 8 kg at the table rim | s0 >= 2 | PASS | ..\Analysis\analysis.json |
| Entry shock | tangent entry: no velocity jump; 0.45 Nm torque step rings the table at 61 Hz, decays to 6e-5 deg by mid-dwell; a 1 mm crank radius error gives only a 0.021 rad/s jump | report | - | ..\Analysis\analysis.json |
| Drawings | GA: 370 / 359 / 300 overall and the 100.00 centre distance checked, 33 parts-list rows, 30 balloons (nut, set screw and hub key hidden in the view); manufacturing: 4 sheets, 14 parts, 15 wrong auto dims deleted (e.g. 185.26 / 245.41 on the 173 mm wheel), radii R87 / R36.1 / R8.03 / R36 / R76 / R15 checked | every dim checked | PASS (sheets also checked by eye) | ..\Drawings\drawing_checks.json |
| Mass (Inventor) | 23.2 kg: frame 14.6, wheel + table 5.3, gearmotor 1.65, crank group 0.87, bearings 0.44, fasteners 0.31 | report | - | ..\GenevaMechanism_BOM.csv |
| 3D printing | no printed parts (all machined steel / aluminium), so there is no Bambu .3mf | - | n/a | - |
| Buildability | every bought part has a part number; fits, assembly order and cost (~$1,811, $569 confirmed) checked; 5 items open | buildable | BUILDABLE (5 open) | Buildability\buildability_check.md |

## Design iterations driven by these checks

1. Locking-disc relief (2D check): my first relief (R33 on 76 mm) only cleared the area next to the roller; the sweep showed the disc overlapping the wheel by 304 mm2 while indexing, because the wheel tips pass within 13 mm of the crank axis, so the relief has to reach almost to the shaft. Tried centres 70-100 mm: reliefs smaller than about R60 on 72 mm still hit the wheel at mid-index; larger ones leave the lock open longer after exit. Chose R76 on 85 mm (it opens the bore by 1 mm, so there is no thin sliver) with a 0.10 mm lock clearance: 0.06 deg play in the dwell instead of 0.10 deg with the first 0.15 mm clearance.
2. Driver hub at the wheel plane: the first layout (on paper) had a 36 mm hub through the wheel band; the tips come within 13 mm of the crank axis, so the hub now stops below the wheel, the key sits only in the hub, and a 24 mm spacer (not 26) carries the upper bearing (1.03 mm to the tips in CAD).
3. Fasteners (CAD): tapped holes were first modelled at tap-drill size (6.8 / 4.2 / 5.0), which would have shown every screw as a clash; remodelled at nominal size with the thread cosmetic, as in the other projects.
4. Dynamic factor (sim): with a soft coupling (300 Nm/rad) the crank speed ripple almost doubles the wheel-shaft peak (Kd 1.94); with the stiff 98A spider it is 1.04. Specified the 98A spider and kept Kd 2.0 for the wheel-side strength checks because the coupling stiffness is assumed.
5. Speed (motor sizing): 30 indexes/min keeps SF 2.1 on the estimated pull-out torque; 45/min would need 2.4 Nm, more than the estimated 2.29 Nm the motor gives at 225 rpm.

## Assumptions

Payload 0.5 kg per station at 115 mm. Coupling stiffness 600 Nm/rad (assumed; 300-3000 simulated), wheel-to-table joint = half the shaft stiffness, damping 0.05. Motor pull-out from an R-L model with a 0.7 running factor (Oriental's curve not read). Seal drag 0.025 Nm per bearing. Contact allowable 1500 MPa (induction-hardened 4140 flanks). Prices: gearmotor and coupling hubs confirmed on vendor pages, everything else estimated.
