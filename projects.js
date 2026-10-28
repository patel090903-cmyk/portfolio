// Portfolio data. To add a finished project: set status "complete" and fill the detail fields;
// copy its images/PDFs into assets/<slug>/ and reference them by file name.
window.PORTFOLIO = {
  owner: "Jay Patel",
  tagline: "Mechanical engineering design projects: CAD, analysis, and manufacturing-ready documentation. Each one is designed and simulated; none are built yet.",
  school: "Mechanical Engineering, Stevens Institute of Technology",
  projects: [
    {
      slug: "quad-drone",
      title: "Quadcopter Drone",
      status: "complete",
      difficulty: "Very High",
      tagline: "3D-printable carbon-nylon quadcopter design: 1.7 kg, 139-part Inventor assembly, FEA and flight simulation.",
      cover: "assembly_iso.png",
      tools: ["Autodesk Inventor 2027", "Python", "scikit-fem / gmsh", "SU2", "Bambu Studio"],
      skills: ["Structural FEA", "Propulsion modelling", "Flight dynamics", "Design for 3D printing", "Assembly design"],
      summary: "A complete quadcopter airframe designed in Inventor around a T-Motor AIR2216 / 1045 propulsion set, a Pixhawk 6C flight controller and a 4S 5000 mAh pack. The frame is designed to be 3D printed in PA6-CF on a Bambu printer. It has not been built yet. Every purchased part is a vendor model or a sized stand-in, and every printable part has a CAD-measured mass, an FEA result and a print file.",
      specs: [
        ["All-up weight", "1696 g (1616 g measured in CAD + 80 g wiring allowance)"],
        ["Assembly", "139 occurrences, 31 unique files, 221 constraints, all 0 DOF"],
        ["Interference", "0 pairs across all 139 components"],
        ["Thrust-to-weight", "2.69 at 14.8 V, 3.14 at 16.0 V"],
        ["Hover endurance", "15.5 min (229 W, 80% depth of discharge)"],
        ["Frame material", "Bambu PA6-CF (planned), 3 print plates prepared"],
        ["Max payload (TWR >= 2)", "500 g"]
      ],
      results: [
        ["Arm FEA at max thrust (13.07 N + 0.20 N.m)", "9.65 MPa peak at clamp edge, 0.80 mm deflection", "Safety factor 4.7 (7.3 away from the clamp)"],
        ["Centre frame FEA at 3 g", "5.06 MPa at arm roots, 0.125 mm deflection", "Safety factor 8.9"],
        ["Hover stability (linearised)", "Roll phase margin 48 deg, gain margin 21 dB", "Stable, 28 poles in the left half-plane"],
        ["15 deg roll step", "5.6% overshoot, 0.58 s settling", "Simulated"],
        ["8 m/s wind + 6 m/s gust", "0.93 m max position error, no motor saturation", "Simulated"],
        ["Propulsion model vs bench data", "Electrical power within 1.2% RMS", "Fitted model"],
        ["Arm modal analysis", "64 Hz flap, 73.5 Hz lateral", "Found a blade-pass resonance risk at hover (2P within 0.1%)"]
      ],
      highlights: [
        "Built a 6-DOF flight simulator in Python (quaternion dynamics, CAD-derived inertia, blade-element rotor model) with a PX4-style cascaded PID controller.",
        "Validated the rotor model against UIUC wind-tunnel data and fitted the motor/ESC/battery model to manufacturer bench tables.",
        "Ran SU2 RANS CFD to estimate arm-in-downwash losses (5.5% of thrust) and airframe drag area.",
        "Ran modal analysis and a Campbell diagram on the 3D-printable frame and flagged a resonance at hover, with a recommended fix."
      ],
      views: [
        ["assembly_iso.png", "Isometric"],
        ["assembly_side.png", "Side"]
      ],
      drawings: [
        ["drawing_assembly_1.png", "Assembly drawing"]
      ],
      analysis: [
        { title: "Structural FEA", items: [
          ["fea_arm.png", "Arm von Mises stress at maximum thrust"],
          ["fea_frame.png", "Centre frame von Mises stress at 3 g"],
          ["campbell.png", "Campbell diagram, blade-pass vs frame modes"]
        ] },
        { title: "Propulsion and performance", items: [
          ["thrust_vs_throttle.png", "Thrust vs throttle"],
          ["power_vs_thrust.png", "Power vs thrust, hover point"],
          ["payload_sweep.png", "Endurance vs payload"],
          ["mass_breakdown.png", "Mass breakdown by group"]
        ] },
        { title: "Flight simulation (simulated)", items: [
          ["step_response.png", "Attitude step responses"],
          ["wind_gust.png", "Wind and gust rejection"],
          ["mission.png", "Mission tracking"]
        ] }
      ],
      downloads: [
        ["Calculation report (PDF)", "QuadDrone_CalcReport.pdf"],
        ["Assembly drawing (PDF)", "QuadDrone_Assembly.pdf"],
        ["Bill of materials (CSV)", "QuadDrone_BOM.csv"],
        ["Simulation summary (Markdown)", "Summary_Simulations.md"]
      ],
      notes: "The drone has not been built. All results are CAD measurements, calculations or computer simulations, not flight or bench tests of this airframe. Damper stiffness, battery resistance and gimbal mass are assumptions; the full write-up lists each one."
    },
    {
      slug: "robotic-arm",
      title: "6-DOF Robotic Arm",
      status: "complete",
      difficulty: "Very High",
      tagline: "3D-printable six-axis arm design for a 500 g payload: 538 mm reach, designed gear and belt reductions, 99-part Inventor assembly, dynamics and FEA.",
      cover: "assembly_iso.png",
      tools: ["Autodesk Inventor 2027", "Python", "scikit-fem / gmsh", "NumPy / Matplotlib", "Bambu Studio"],
      skills: ["Robotics", "Kinematics", "Rigid-body dynamics", "Torque calculations", "Gear design", "Structural FEA", "Design for 3D printing", "Mechanical assemblies"],
      summary: "A desktop six-axis arm designed in Inventor around commercial actuators: NEMA17 steppers with StepperOnline planetary gearboxes on the base, shoulder and elbow, and DSSERVO digital servos on the wrist and gripper. I designed every reduction stage: printed involute spur gears on J1, J2, J4 and J5, and an HTD 5M belt inside the box-section upper arm on J3. The belt let me move the elbow motor next to the shoulder, which takes torque off J2. Joint angles are Inventor parameters that drive a fully constrained assembly, and the gear pinions are coupled to their joints so the teeth stay in mesh at any pose. All structural parts and gears are designed to print in PA6-CF on a Bambu printer.",
      specs: [
        ["Payload / reach", "0.5 kg; 538 mm shoulder-to-TCP at full extension, 390 mm tool-down at table height"],
        ["Link lengths", "L1 204 / L2 200 / L3 192 / wrist-to-TCP 146 mm, spherical wrist"],
        ["Mass (Inventor)", "1.90 kg moving, 5.02 kg total incl. base"],
        ["Assembly", "99 occurrences, 41 unique files, 193 constraints, all 0 DOF"],
        ["Actuators", "J1 17HS19-PG5, J2/J3 17HS19-PG19, J4/J5 DS3235, J6 + gripper DS3218"],
        ["Total ratios", "J1 20.7:1, J2 89.6:1, J3 57.6:1 (HTD belt), J4 1.5:1, J5 2:1, J6 1:1"],
        ["Material", "PA6-CF (links, gears), PETG (base, cover); 8 Bambu plates"]
      ],
      results: [
        ["Shoulder J2 worst static torque (0.5 kg, full extension)", "6.54 N.m required vs 13.3 N.m continuous capacity", "SF 2.03 (gearbox-limited)"],
        ["Elbow J3 worst static torque", "2.81 N.m vs 8.55 N.m", "SF 3.04"],
        ["Wrist J4 / J5 worst static torque", "0.84 / 0.85 N.m vs 2.24 / 2.98 N.m", "SF 2.67 / 3.51"],
        ["Pick-and-place cycle, Newton-Euler dynamics (12.8 s)", "J2 stepper SF 4.4 at 383 rpm, gearbox at 1.16 of 3 N.m", "Simulated"],
        ["Forward kinematics, Inventor solver vs Python model", "0.00043 mm max TCP error over 11 poses", "Validated in CAD"],
        ["Interference: 5 poses, 18-frame motion study, joint sweeps", "0 clashes (only 0.001 mm3 screw tangency)", "Measured in Inventor"],
        ["FEA upper arm / shoulder cheek / forearm (x1.5 dynamic)", "4.9 / 13.0 / 9.1 MPa peak, 0.14 / 0.46 / 0.22 mm", "SF 9.2 / 3.5 / 5.0 vs 45 MPa"],
        ["Gear teeth (Lewis + Barth factor)", "Lowest SF 1.59 (J4 16:24 m1.25), J2 2.54", "Simulated, 30 MPa allowable"],
        ["Gripper and belt", "9.6 N per jaw vs 5.1 N needed; belt tight side 138 N", "SF 1.88 / 2.18"],
        ["DfAM check (FDM, 45 deg, 1.2 mm walls)", "21/21 parts watertight, 14 print with no supports", "Measured on STLs"]
      ],
      highlights: [
        "Sized every joint from a Newton-Euler model built on the CAD mass properties. A grid search over the measured joint ranges found the worst static torque, and each motor, gearbox and stage was checked for torque, speed and gearbox rating.",
        "Modelled involute gears in Inventor and coupled each pinion to its joint through the ratio and mesh phase. Interference stays at zero over a full tooth pitch on every pair.",
        "Validated the kinematics in CAD by driving Inventor's solver to random poses and comparing it with my Python forward kinematics. Swept every joint with interference checks to set collision-free limits.",
        "Ran gmsh + scikit-fem FEA on the critical printed parts. The DfAM check found weak points (horn bolt holes cutting into pinion roots, gear tooth stress) that I fixed by redesigning the gears."
      ],
      views: [
        ["assembly_iso.png", "Isometric, home pose"],
        ["assembly_rear.png", "Rear isometric: J2 stepper and 84T gear"],
        ["full_extension_side.png", "Side, full extension (worst case for the shoulder)"],
        ["exploded_view.png", "Exploded view"]
      ],
      drawings: [
        ["drawing_assembly_1.png", "Assembly drawing"],
        ["drawing_manufacturing_1.png", "Manufacturing drawings, sheet 1"],
        ["drawing_manufacturing_2.png", "Manufacturing drawings, sheet 2"],
        ["drawing_manufacturing_3.png", "Manufacturing drawings, sheet 3"],
        ["drawing_manufacturing_4.png", "Manufacturing drawings, sheet 4"]
      ],
      analysis: [
        { title: "Kinematics and motion", items: [
          ["motion_study_montage.png", "Inventor motion study of the pick-and-place cycle, no interference"],
          ["workspace.png", "Reachable workspace"],
          ["tcp_path.png", "TCP path, pick to place"]
        ] },
        { title: "Joint torque and dynamics", items: [
          ["joint_torques.png", "Joint torque along the cycle vs capacity (simulated)"],
          ["joint_angles_speeds.png", "Joint angles and speeds (simulated)"],
          ["torque_vs_capacity.png", "Torque requirement vs capacity per joint"],
          ["J2_torque_map.png", "Shoulder gravity-torque map"]
        ] },
        { title: "Structural FEA", items: [
          ["fea_upper_arm.png", "Upper arm von Mises stress at full extension"],
          ["fea_shoulder_cheek.png", "Shoulder cheek von Mises stress"],
          ["fea_forearm.png", "Forearm von Mises stress"]
        ] }
      ],
      downloads: [
        ["Calculation report (PDF)", "RoboticArm6DOF_CalcReport.pdf"],
        ["Assembly drawing (PDF)", "RoboticArm6DOF_Assembly.pdf"],
        ["Manufacturing drawings (PDF)", "RoboticArm6DOF_Manufacturing.pdf"],
        ["Bill of materials (CSV)", "RoboticArm6DOF_BOM.csv"],
        ["Test summary (Markdown)", "Test_Summary.md"],
        ["Motion study (GIF)", "motion_study.gif"]
      ],
      notes: "All results are calculated or simulated from the CAD model; the arm has not been built. Assumptions include a stepper pull-out curve typical of the motor class, 50% of servo stall as the continuous rating, 30 MPa allowable stress for printed gear teeth, a 300 N belt working limit, solid printed parts in the FEA, and estimated motor and gearbox masses. The full report lists each one."
    },
    {
      slug: "f1-suspension",
      title: "F1 Pushrod Suspension",
      status: "complete",
      difficulty: "Very High",
      tagline: "Full-size double-wishbone pushrod front corner designed in Inventor: kinematics, motion ratios, member forces and FEA under 4 g cornering and braking.",
      cover: "assembly_iso_wheel_hidden.png",
      tools: ["Autodesk Inventor 2027", "Python", "SciPy / NumPy", "scikit-fem / gmsh", "Matplotlib"],
      skills: ["Vehicle dynamics", "Suspension kinematics", "Statics and member forces", "Column buckling", "Structural FEA", "Mechanism design", "Mechanical assemblies", "Engineering drawings"],
      summary: "A full-size front-left corner for an F1-class single seater (800 kg, 1600 mm track, 305/720 R18 tyre), designed in Inventor from one hardpoint table so the CAD, kinematics, loads and FEA all share the same numbers. 4130 tube wishbones carry GE 12 E spherical bearings; a 7075-T6 upright holds a double-row hub bearing, a carbon disc and a 6-piston caliper; the pushrod runs from the upright to a twin-plate rocker on the chassis that compresses a coil-over damper. The assembly is built with real joints (revolute pivots, spherical ball joints, a sliding rack) and is driven by two Inventor parameters, Heave and Steer. Analysis found five real design problems, from a pushrod bracket that bent the lower wishbone to rod ends hitting their clevises at full lock, and each was fixed in the model. Designed and simulated only; nothing has been built.",
      specs: [
        ["Vehicle", "800 kg, 45% front, CG 300 mm, wheelbase 3600 mm, track 1600 mm, downforce 2.0 x weight (40% front)"],
        ["Wheel / tyre", "18 in forged Mg rim, 305/720 R18, centre lock, C/C disc 328 x 32"],
        ["Static geometry", "Camber -3.0 deg, KPI 8.5 deg, caster 6.9 deg, scrub radius 39 mm, trail 31 mm"],
        ["Travel / steering", "+35 / -25 mm wheel travel; +-28 mm rack gives 11.5 deg road-wheel angle"],
        ["Springing", "160 N/mm coil (d12, 4.9 coils) on a 60 mm-stroke damper; wheel rate 133 N/mm; ride 4.1 Hz"],
        ["Materials", "4130 normalised tube (wishbones, pushrod, tie rod), 7075-T6 (upright, rocker, brackets), Ti-6Al-4V hub"],
        ["Mass (Inventor)", "42.1 kg corner, 33.6 kg unsprung (links counted 50%)"],
        ["Assembly", "126 occurrences, 33 unique files, 324 constraints; ISO 4762 screws, locknuts and 6202 bearings from step.parts"]
      ],
      results: [
        ["Camber gain / roll camber", "-0.54 deg per 25 mm bump; outer wheel +0.71 deg per deg of roll", "Simulated"],
        ["Bump steer (tie-rod inner point optimised)", "0.26 mdeg toe change over the full 60 mm travel", "Simulated"],
        ["Roll centre / anti-dive", "72 mm static (62 to 80 mm over travel); 28% anti-dive", "Simulated"],
        ["Motion ratio", "Installation ratio 0.894 static, rising 0.82 to 1.01; damper uses 54.7 of 60 mm stroke", "Simulated"],
        ["Inventor solver vs Python kinematics", "1e-5 deg camber, 3e-5 mm hardpoint error over 19 poses", "Validated in CAD"],
        ["Interference over travel and full lock", "0 clashing pairs at 19 poses", "Checked in Inventor"],
        ["Member forces (4 limit cases)", "Lower front leg 20.9 kN tension (4 g braking); pushrod 21.3 kN compression (3 g bump)", "Calculated"],
        ["Pushrod / lower rear leg buckling", "SF 2.15 / 2.84 (Johnson / Euler, pinned ends)", "Calculated"],
        ["FEA lower / upper wishbone (4130)", "266 / 122 MPa at the 99.9th percentile, 4 g braking", "SF 1.73 / 3.78 vs yield (simulated)"],
        ["FEA upright / clevis bracket / rocker (7075-T6)", "283 / 317 / 171 MPa at the 99.9th percentile", "SF 1.78 / 1.59 / 2.95 vs yield (simulated)"]
      ],
      highlights: [
        "Solved the corner as a rigid-body mechanism in Python (least squares on the five link closures), then built the same mechanism in Inventor with real joints and checked the two solvers against each other at 19 poses. They agree to 1e-5 deg.",
        "Optimised the inner tie-rod point to cut bump steer to 0.26 mdeg, and tuned the hardpoints for about 0.5 deg of camber gain per 25 mm, a 72 mm roll centre and 28% anti-dive.",
        "Resolved the tyre loads into the six two-force members for 4 g cornering, 4 g braking, combined and 3 g bump cases. Checked buckling, bolt shear and bearing ratings, and sized the spring for a 4 Hz ride.",
        "Ran gmsh + scikit-fem FEA on both wishbones, the upright, the chassis bracket and the rocker with balanced load sets. The FEA and the interference sweeps drove five redesigns, including moving the pushrod to the upright, turning the lower ball-joint bolt vertical and putting every tube on its force line."
      ],
      views: [
        ["assembly_iso.png", "Isometric, static ride height"],
        ["assembly_rear_iso.png", "Rear isometric"],
        ["assembly_front.png", "Front"],
        ["assembly_side.png", "Side (outboard)"],
        ["assembly_top.png", "Top"],
        ["assembly_exploded_iso.png", "Exploded view"],
        ["position_bump_front.png", "Full bump (+35 mm), front"],
        ["position_droop_front.png", "Full droop (-25 mm), front"],
        ["assembly_iso_wheel_hidden.png", "Isometric with the wheel hidden: wishbones, upright, pushrod, rocker and damper"],
        ["assembly_rear_iso_wheel_hidden.png", "Rear isometric with the wheel hidden"],
        ["position_lock_right_top.png", "Full steering lock, top"],
        ["assembly_exploded_front.png", "Exploded view, front"]
      ],
      drawings: [
        ["drawing_assembly_1.png", "Assembly drawing"],
        ["drawing_manufacturing_1.png", "Manufacturing drawings, sheet 1: wishbones"],
        ["drawing_manufacturing_2.png", "Manufacturing drawings, sheet 2: upright and rocker"],
        ["drawing_manufacturing_3.png", "Manufacturing drawings, sheet 3: brackets and links"],
        ["drawing_manufacturing_4.png", "Manufacturing drawings, sheet 4: hub and small parts"]
      ],
      analysis: [
        { title: "Suspension kinematics", items: [
          ["camber_vs_travel.png", "Camber vs wheel travel"],
          ["camber_vs_roll.png", "Camber to ground in roll"],
          ["bump_steer.png", "Bump steer after optimising the tie-rod inner point"],
          ["roll_centre_heave.png", "Roll-centre height in heave"],
          ["roll_centre_roll.png", "Roll-centre migration in roll"],
          ["track_antidive.png", "Track change and anti-dive"],
          ["steering.png", "Steering: road-wheel angle vs rack travel"],
          ["inventor_vs_python.png", "Inventor assembly solver vs Python model"]
        ] },
        { title: "Motion ratio and springing", items: [
          ["motion_ratio.png", "Pushrod, rocker and installation ratios"],
          ["wheel_rate.png", "Wheel rate and spring force over travel"],
          ["damper_rocker.png", "Damper length and rocker angle over travel"]
        ] },
        { title: "Loads and forces", items: [
          ["member_forces.png", "Member forces per load case"],
          ["buckling.png", "Column buckling safety factors"]
        ] },
        { title: "Structural FEA", items: [
          ["fea_LowerWishbone_vonMises.png", "Lower wishbone von Mises stress, 4 g braking"],
          ["fea_UpperWishbone_vonMises.png", "Upper wishbone von Mises stress, 4 g braking"],
          ["fea_Upright_vonMises.png", "Upright von Mises stress, 4 g braking"],
          ["fea_WishboneClevis_vonMises.png", "Chassis clevis bracket, worst pickup load"],
          ["fea_Rocker_vonMises.png", "Rocker von Mises stress, 3 g bump"]
        ] }
      ],
      downloads: [
        ["Calculation report (PDF)", "F1Suspension_CalcReport.pdf"],
        ["Assembly drawing (PDF)", "F1Suspension_Assembly.pdf"],
        ["Manufacturing drawings (PDF)", "F1Suspension_Manufacturing.pdf"],
        ["Bill of materials (CSV)", "F1Suspension_BOM.csv"],
        ["Member forces (CSV)", "member_forces.csv"],
        ["Test summary (Markdown)", "Test_Summary.md"],
        ["Assembly STEP", "F1Suspension.stp"]
      ],
      notes: "Designed and simulated only: the corner has not been built or tested, and every number is a model prediction. Loads are quasi-static limit cases from a point-mass vehicle model with assumed downforce, weight distribution and brake bias. Spherical bearings, rod ends, the damper, hub bearing, caliper, disc, rim and tyre are catalogue-dimension or envelope models with estimated masses and assumed ratings. FEA safety factors are quoted on the 99.9th-percentile stress because the CAD has sharp corners where real parts have weld and machining fillets; peak values are listed in the report. Heave springs, the anti-roll bar and the right-hand corner are not modelled."
    },
    { slug: "go-kart-drivetrain", title: "Electric Go-Kart Drivetrain", status: "planned", difficulty: "High",
      tagline: "Electric drivetrain for a 25 mph kart: motor, reduction, axle, chain and mounts, sized from torque and acceleration targets.",
      skills: ["EV systems", "Drivetrain design", "Engineering calculations"] },
    { slug: "conveyor-sorter", title: "Automated Conveyor Sorting System", status: "planned", difficulty: "High",
      tagline: "Modular belt conveyor that sorts packages up to 5 kg by size, with drive sizing, sensor mounts and structural FEA.",
      skills: ["Automation", "Manufacturing systems", "Material handling", "Machine design"] },
    { slug: "planetary-gearbox", title: "Planetary Gearbox", status: "planned", difficulty: "Medium-High",
      tagline: "Compact 5:1 planetary reducer with sun, planets, ring, carrier, bearings and housing, plus stress analysis.",
      skills: ["Machine design", "Power transmission", "Gear calculations", "Tolerance analysis"] },
    { slug: "scissor-lift", title: "Hydraulic Scissor Lift", status: "planned", difficulty: "Medium-High",
      tagline: "100 kg payload over 500 mm of travel, with cylinder force through the stroke and FEA on arms and pins.",
      skills: ["Structural analysis", "Hydraulic systems", "FEA", "Mechanical design"] },
    { slug: "prosthetic-hand", title: "Mechanical Prosthetic Hand", status: "planned", difficulty: "Very High",
      tagline: "3D-printable five-finger tendon-driven hand with return mechanisms, tendon force and joint torque analysis.",
      skills: ["Biomedical engineering", "Robotics", "Biomechanics", "Additive manufacturing"] },
    { slug: "geneva-mechanism", title: "Geneva Indexing Machine", status: "planned", difficulty: "Medium",
      tagline: "Motor-driven indexing mechanism with interchangeable 4, 5 and 6-slot wheels and a comparison of their dynamics.",
      skills: ["Mechanism design", "Kinematics", "Machine dynamics"] },
    { slug: "wind-turbine", title: "Wind Turbine with Gearbox", status: "planned", difficulty: "High",
      tagline: "1 m horizontal-axis turbine with blades, hub, gearbox and nacelle, plus power and torque estimates by wind speed.",
      skills: ["Renewable energy", "Rotating machinery", "Machine design"] },
    { slug: "two-cylinder-engine", title: "Two-Cylinder Engine", status: "planned", difficulty: "Very High",
      tagline: "Four-stroke twin with crank, pistons, valve train and timing, plus displacement, compression ratio and inertial forces.",
      skills: ["Engine design", "Kinematics", "Complex assemblies"] },
    { slug: "filament-feeder", title: "3D Printer Filament Feeder", status: "planned", difficulty: "Medium",
      tagline: "Geared, spring-tensioned 1.75 mm filament feeder with feed force and torque calculations.",
      skills: ["Product design", "Precision mechanisms", "Additive manufacturing"] }
  ]
};
