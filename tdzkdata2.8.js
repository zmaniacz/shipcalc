/**************************************************
* MadoxCalc 2.4.02 - tdzkdata.js
* Original by Madox--Modifications by ZmaniacZ
* More modifications by Mardak!
* Back to ZmaniacZ again
* If you want to use the code, please ask.
* zz@redial.net
* 2004-09-27
**************************************************/

numships = 0;
numraces = 0;
numequipment = 0;
numupgrades = 0;
numweapons = 0;
numauras = 0;

ships = new Object ();
races = new Object ();
equipments = new Object ();
upgrades = new Object ();
weapons = new Object ();
auras = new Object ();

//function Ship (name, size, wsize, speed, man, armour, armourint, chassis, shield, shieldrch, power, powerrch, php, shp, drones, cargo, gather, tcomps, damps, equipslots, equipment, cost)
//ships[numships++] = new Ship ("Escape Pod", 0, 0, 14, 140, 25, 0, 0, 25, 5, 0, 0, 0, 0, 0, 25, 5, 0, 0, 0, '', 2000000);
ships[numships++] = new Ship ("Frigate", 2, 2, 22, 220, 250, 2, 1, 250, 20, 100, 50, 2, 1, 10, 150, 25, 0, 0, 4, '', 1000000);
ships[numships++] = new Ship ("Freighter", 2, 1, 20, 200, 350, 4, 2, 350, 20, 100, 20, 2, 0, 0, 300, 0, 0, 0, 4, '', 15000000);
ships[numships++] = new Ship ("Resourcer", 3, 1, 18, 200, 350, 4, 1, 350, 20, 100, 20, 1, 0, 20, 250, 100, 0, 0, 5, '', 20000000);
ships[numships++] = new Ship ("Corvette", 3, 4, 18, 180, 600, 8, 4, 600, 40, 300, 140, 6, 2, 0, 100, 0, 4, 0, 4, '', 50000000);
ships[numships++] = new Ship ("Cruiser", 5, 5, 16, 140, 800, 10, 5, 800, 80, 400, 100, 4, 4, 20, 100, 10, 0, 0, 5, '', 75000000);
ships[numships++] = new Ship ("Destroyer", 6, 6, 14, 120, 1000, 10, 6, 1000, 100, 500, 200, 8, 4, 0, 0, 0, 0, 0, 4, '', 100000000);
ships[numships++] = new Ship ("Carrier", 7, 4, 14, 100, 500, 4, 3, 500, 40, 300, 40, 2, 2, 100, 100, 0, 0, 0, 4, '', 125000000);
ships[numships++] = new Ship ("Interceptor", 1, 3, 24, 240, 300, 4, 4, 500, 80, 200, 100, 6, 0, 0, 0, 0, 2, 0, 4, '', 20000000);
ships[numships++] = new Ship ("Battleship", 7, 7, 14, 100, 1500, 20, 8, 500, 40, 300, 40, 4, 6, 0, 0, 0, 0, 0, 4, '', 100000000);
ships[numships++] = new Ship ("Ranger", 4, 4, 18, 160, 400, 8, 3, 400, 40, 200, 120, 4, 4, 20, 50, 10, 0, 0, 6, '', 60000000);
//function Ship (name, size, wsize, speed, man, armour, armourint, chassis, shield, shieldrch, power, powerrch, php, shp, drones, cargo, gather, tcomps, damps, equipslots, equipment, cost)

//function Race (name, man, manupgr, shield, armour, power, cargo, targeting, AI, AIupgr, equip, init, dronemult, gather)
races[numraces++] = new Race ("Derivian",  0,  0, 1.00, 1.00, 1.00, 1.00,   0, 0, 0, 21,  0, 1.00, 0);
races[numraces++] = new Race ("Zallun",  -30, -3, 1.25, 1.25, 1.00, 0.85,   0, 4, 2, 16,  0, 1.00, 0);
races[numraces++] = new Race ("Kitaran",  30,  6, 0.75, 0.75, 1.00, 1.00,   0, 0, 0, 24, 10, 1.00, 0);
races[numraces++] = new Race ("Tamaran",   0,  0, 0.75, 0.75, 1.00, 1.25,   0, 0, 0, 25,  0, 1.00, 0);
races[numraces++] = new Race ("Sniv",      0,  0, 0.85, 0.85, 1.00, 1.00,   0, 0, 0, 40,  0, 1.20, 0);
races[numraces++] = new Race ("Wraith",    0,  0, 1.15, 0.75, 1.25, 1.00,   0, 0, 0, 18,  0, 0.80, 0);
races[numraces++] = new Race ("Quelaar",   0,  0, 0.90, 0.90, 1.00, 1.00, -10, 0, 0,  0,  0, 1.00, 0);
//function Race (name, speed, man, manupgr, shield, armour, power, cargo, targeting, AI, AIupgr, gather, equip, init, dronemult)

//function Equipment (name, cost, size)
equipments[numequipment++] = new Equipment ("None",               												0,   0);
equipments[numequipment++] = new Equipment ("Baryon Flood Generator",               2000000,   0);
equipments[numequipment++] = new Equipment ("Energy Dampening Field",               2000000,   0);
equipments[numequipment++] = new Equipment ("Gravitron Disruption Field",           2000000,   0);
equipments[numequipment++] = new Equipment ("Interdiction Field",                   2000000,   0);
equipments[numequipment++] = new Equipment ("Ion Stream Emitter",                   2000000,   0);
equipments[numequipment++] = new Equipment ("Positron Collection System",           2000000,   0);
equipments[numequipment++] = new Equipment ("Radiation Pulse Emitter",              2000000,   0);
equipments[numequipment++] = new Equipment ("Subspace Anchor Field",                2000000,   0);

equipments[numequipment++] = new Equipment ("Ablative Armor",                       2000000,   0);
equipments[numequipment++] = new Equipment ("Active Defense Grid",                 15000000,   0);
equipments[numequipment++] = new Equipment ("Angled Armor Plating",                17500000,   0);
equipments[numequipment++] = new Equipment ("Concussive Dampener",                  2000000,   0);
equipments[numequipment++] = new Equipment ("Force Deflector Shields",             17500000,   0);
equipments[numequipment++] = new Equipment ("Overflow Shields",                    15000000,   0);
equipments[numequipment++] = new Equipment ("Refractive Shields",                   2000000,   0);
equipments[numequipment++] = new Equipment ("Structural Integrity Field Generator", 2000000,   0);

equipments[numequipment++] = new Equipment ("Ammunition Rack",            12500000,   0);
equipments[numequipment++] = new Equipment ("Cloaking Device",             5000000,   1);
equipments[numequipment++] = new Equipment ("Drone Transponder",           5000000,   1);
equipments[numequipment++] = new Equipment ("Resource Scanners",           7500000,   1);
equipments[numequipment++] = new Equipment ("Scanners",                     100000,   0);
equipments[numequipment++] = new Equipment ("Signature Dampener",          5000000,   0);
equipments[numequipment++] = new Equipment ("Signature Scanners",         10000000,   0);
equipments[numequipment++] = new Equipment ("Spatial Rift Generator",      2000000,   0);
equipments[numequipment++] = new Equipment ("Subspace Jump Drive",          200000,   1);

equipments[numequipment++] = new Equipment ("Advanced Homing",             20000000,  0);
equipments[numequipment++] = new Equipment ("Armor-Piercing Warheads",     25000000,  0);
equipments[numequipment++] = new Equipment ("Beam Regulators",             25000000,  0);
equipments[numequipment++] = new Equipment ("Grooved Slugs",               15000000,  0);
equipments[numequipment++] = new Equipment ("Harmonic Amplifiers",         20000000,  0);
equipments[numequipment++] = new Equipment ("Mass Driver",                 20000000,  0);
equipments[numequipment++] = new Equipment ("Particle Accelerator",        20000000,  0);
equipments[numequipment++] = new Equipment ("Positron Gap Generator",      15000000,  0);
equipments[numequipment++] = new Equipment ("Proximity Warheads",          25000000,  0);
equipments[numequipment++] = new Equipment ("Shaped Charges",              25000000,  0);
equipments[numequipment++] = new Equipment ("Singularity Generator",       20000000,  0);
equipments[numequipment++] = new Equipment ("Tetra Shells",                10000000,  0);
equipments[numequipment++] = new Equipment ("Trimedadine Laser Lenses",    25000000,  0);
equipments[numequipment++] = new Equipment ("Wave Intensifier",            20000000,  0);

equipments[numequipment++] = new Equipment ("Advanced Reprogramming Module",1000000,  0);
equipments[numequipment++] = new Equipment ("Energy Transfer Module",       1000000,  0);
equipments[numequipment++] = new Equipment ("External Repair Module",       2000000,  1);
equipments[numequipment++] = new Equipment ("Internal Repair Module",      25000000,  1);

equipments[numequipment++] = new Equipment ("External Resourcing Module",   250000,   1);
equipments[numequipment++] = new Equipment ("Improved Processing Module",  1000000,   0);
equipments[numequipment++] = new Equipment ("Micro Extractor Module",      5000000,   0);
equipments[numequipment++] = new Equipment ("Micro Purifier Module",       3000000,   0);
equipments[numequipment++] = new Equipment ("Micro Refinery Module",       2500000,   0);
equipments[numequipment++] = new Equipment ("Micro Factory Module",        5000000,   0);
//function Equipment (name, cost, size)

//function Upgrade (name, field, value, level, cost)
upgrades[numupgrades++] = new Upgrade ("Shield Battery",       "shield",         100,  5,  100000);
upgrades[numupgrades++] = new Upgrade ("Shield Generator",     "shieldrch",       25,  5,  100000);
upgrades[numupgrades++] = new Upgrade ("Armour Upgrade",       "armour",         100,  5,  100000);
upgrades[numupgrades++] = new Upgrade ("Armour Integrity",     "armourint",        8,  5,  100000);
upgrades[numupgrades++] = new Upgrade ("Power Battery",        "power",          100,  5,  100000);
upgrades[numupgrades++] = new Upgrade ("Power Generator",      "powerrch",        25,  5,  100000);
manupgrade = upgrades[numupgrades++] = new Upgrade ("Maneuverability", "man",    "?",  5,  100000);
upgrades[numupgrades++] = new Upgrade ("Stealth Coating",      "stealth",          1,  5,  100000);
upgrades[numupgrades++] = new Upgrade ("Drone Hangars",        "drones",          10, 10,  250000);
upgrades[numupgrades++] = new Upgrade ("Main Engine",          "speed",            2, 10, 1000000);
cargoupgrade = upgrades[numupgrades++] = new Upgrade ("Cargo Hold", "cargo",     "?", 10, 1000000);
upgrades[numupgrades++] = new Upgrade ("Primary Hardpoint",    "php",              1, 10, 1000000);
upgrades[numupgrades++] = new Upgrade ("Secondary Hardpoint",  "shp",              1, 10, 1000000);
upgrades[numupgrades++] = new Upgrade ("Targeting Computer",   "targeting",        8,  5,  500000);
upgrades[numupgrades++] = new Upgrade ("Damage Amplifiers",    "dmgamps",          1,  5,  500000);
//function Upgrade (name, field, value, level, cost)

//function Weapon (Name,Class,Accuracy,SLo,SHi,ALo,AHi,DLo,DHi,CHR,Cost,Type,Size,Super,Power,Siege,EMLo,EMHi,Ammo,Mult)
weapons[numweapons++] = new Weapon ("None","None",0,0,0,0,0,0,0,0,0,1,0,"None",0,0,0,0,"N/A",0);
weapons[numweapons++] = new Weapon ("None","None",0,0,0,0,0,0,0,0,0,2,0,"None",0,0,0,0,"N/A",0);
//--
weapons[numweapons++] = new Weapon ("Laser Cannon","Laser",50,5,10,5,10,5,10,5,500000,1,1,"Energy",4,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Burst Laser Cannon","Laser",70,5,15,5,15,20,40,5,800000,1,1,"Energy",6,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Focused Laser Cannon","Laser",50,15,20,15,20,15,20,10,800000,1,1,"Energy",8,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Super Laser Cannon","Laser",50,15,25,15,25,15,25,5,1000000,1,2,"Energy",10,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Plasma Cannon","Plasma",50,20,50,20,50,20,50,10,1000000,1,1,"Particle",8,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Focused Plasma Cannon","Plasma",50,30,60,30,60,30,60,10,1500000,1,2,"Particle",12,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Plasma Burst Cannon","Plasma",70,20,50,20,50,40,80,5,1250000,1,3,"Particle",10,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Flux Cannon","Flux",60,40,130,0,0,0,0,5,250000,1,1,"Energy",6,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Harmonic Flux Cannon","Flux",50,60,150,0,0,0,0,5,750000,1,1,"Energy",8,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Flux Disruptor Cannon","Flux",40,80,170,0,0,0,0,5,1500000,1,2,"Energy",10,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("EMP Disruptor","EMP",40,10,50,0,0,10,20,5,1000000,1,1,"Energy",3,0,60,90,"N/A",2);
weapons[numweapons++] = new Weapon ("Heavy EMP Disruptor","EMP",50,20,60,0,0,20,30,5,3500000,1,2,"Energy",5,0,80,120,"N/A",2);
weapons[numweapons++] = new Weapon ("EMP Phase Disruptor","EMP",50,30,70,0,0,30,40,5,4500000,1,3,"Energy",7,0,100,150,"N/A",2);
weapons[numweapons++] = new Weapon ("Light Beam Cannon","Beam",80,50,70,30,50,5,15,10,5000000,1,2,"Energy",10,0,0,0,"N/A",3);
weapons[numweapons++] = new Weapon ("Medium Beam Cannon","Beam",70,60,80,40,60,5,15,10,7500000,1,3,"Energy",15,0,0,0,"N/A",3);
weapons[numweapons++] = new Weapon ("Heavy Beam Cannon","Beam",60,70,90,50,70,5,15,10,10000000,1,4,"Energy",20,0,0,0,"N/A",3);
weapons[numweapons++] = new Weapon ("Fusion Cannon","Fusion",60,30,100,40,110,15,30,5,5000000,1,4,"Particle",10,0,10,30,"N/A",2);
weapons[numweapons++] = new Weapon ("Heavy Fusion Cannon","Fusion",50,35,120,45,130,15,30,5,7500000,1,5,"Particle",15,0,20,40,"N/A",2);
weapons[numweapons++] = new Weapon ("Doomsday Fusion Cannon","Fusion",40,40,140,50,150,15,30,5,10000000,1,6,"Particle",20,0,30,50,"N/A",2);
weapons[numweapons++] = new Weapon ("30mm Autocannon","Projectile",70,10,20,20,50,10,20,5,1500000,1,1,"Particle",4,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("40mm Autocannon","Projectile",60,10,30,25,60,15,30,5,2250000,1,1,"Particle",6,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("50mm Autocannon","Projectile",50,10,40,30,70,20,40,5,3000000,1,1,"Particle",8,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("45mm Flechette Cannon","Projectile",75,10,20,30,60,40,80,5,3500000,1,2,"Particle",10,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("75mm Gauss Cannon","Projectile",50,10,20,90,130,10,20,10,3500000,1,2,"Particle",10,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("210mm Sabot Cannon","Cannon",65,35,40,55,60,10,20,5,5000000,1,4,"Concussive",10,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("255mm Sabot Cannon","Cannon",55,55,60,75,80,10,20,5,7500000,1,4,"Concussive",15,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("300mm Sabot Cannon","Cannon",45,75,80,95,100,10,20,5,10000000,1,5,"Concussive",20,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Flak Cannon","Flak",80,10,20,10,20,40,90,5,750000,1,2,"Particle",6,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Heavy Flak Cannon","Flak",85,10,20,15,25,60,110,5,1500000,1,3,"Particle",8,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Cyclone Flak Cannon","Flak",90,10,20,20,30,80,130,5,2500000,1,4,"Particle",10,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Plasma Projectile Weaver","PPW",50,125,200,75,100,10,30,5,25000000,1,6,"Particle",25,1,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Triad Plasma Projectile Weaver","PPW",60,150,250,100,200,10,30,5,37500000,1,7,"Particle",30,1,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Rocket","Rocket",50,5,15,5,15,5,15,5,500000,2,1,"Concussive",0,0,0,0,20,2);
weapons[numweapons++] = new Weapon ("Heavy Rocket","Rocket",45,10,25,10,25,10,25,5,1250000,2,1,"Concussive",0,0,0,0,40,2);
weapons[numweapons++] = new Weapon ("Rocket Bomb","Rocket",35,20,50,40,70,10,20,5,2000000,2,2,"Concussive",0,0,0,0,70,2);
weapons[numweapons++] = new Weapon ("Cluster Bomb","Rocket",40,10,20,20,40,30,60,5,3500000,2,2,"Concussive",0,0,0,0,70,2);
weapons[numweapons++] = new Weapon ("Hornet Missile","Missile",70,20,60,40,80,20,50,5,2500000,2,1,"Concussive",0,0,0,0,55,2);
weapons[numweapons++] = new Weapon ("Swarm Missile","Missile",80,10,40,30,60,60,120,5,3000000,2,1,"Concussive",0,0,0,0,65,2);
weapons[numweapons++] = new Weapon ("Harpoon Missile","Missile",60,50,80,70,100,10,20,5,3500000,2,2,"Concussive",0,0,0,0,80,2);
weapons[numweapons++] = new Weapon ("Flux Wave Battery","Flux",45,70,170,0,0,10,20,5,3000000,2,1,"Energy",0,0,0,0,45,2);
weapons[numweapons++] = new Weapon ("Focused Flux Battery","Flux",50,100,200,0,0,20,30,5,4000000,2,2,"Energy",0,0,0,0,70,2);
weapons[numweapons++] = new Weapon ("EMP Battery","EMP",50,30,50,0,0,20,40,5,5000000,2,2,"Energy",0,0,100,140,60,2);
weapons[numweapons++] = new Weapon ("EMP Phase Battery","EMP",50,40,70,0,0,30,50,5,7500000,2,3,"Energy",0,0,120,160,80,2);
weapons[numweapons++] = new Weapon ("Resonance Disruptor Missile","Resonance",70,0,0,110,140,25,60,5,1500000,2,3,"Energy",0,0,0,0,75,2);
weapons[numweapons++] = new Weapon ("Resonance Pulse Missile","Resonance",55,0,0,130,170,20,40,5,2000000,2,4,"Energy",0,0,0,0,110,2);
weapons[numweapons++] = new Weapon ("Resonance Rift Missile","Resonance",40,0,0,150,200,15,30,5,2500000,2,5,"Energy",0,0,0,0,200,2);
weapons[numweapons++] = new Weapon ("Light Torpedo","Torpedo",50,20,115,30,125,10,20,5,3500000,2,4,"Concussive",0,0,0,0,60,2);
weapons[numweapons++] = new Weapon ("Medium Torpedo","Torpedo",40,30,140,50,160,10,20,5,6000000,2,4,"Concussive",0,0,0,0,80,2);
weapons[numweapons++] = new Weapon ("Heavy Torpedo","Torpedo",30,40,165,60,185,10,20,5,8000000,2,5,"Concussive",0,0,0,0,125,2);
weapons[numweapons++] = new Weapon ("Fusion Torpedo","Special",95,150,200,150,200,350,500,5,12500000,2,5,"",0,0,0,0,2000,2);
weapons[numweapons++] = new Weapon ("Plasma Bomb","Plasma",60,25,60,25,60,25,50,10,2500000,2,2,"Particle",0,0,0,0,50,2);
weapons[numweapons++] = new Weapon ("Plasma Halo Bomb","Plasma",80,20,55,20,55,70,100,5,4500000,2,3,"Particle",0,0,0,0,100,2);
weapons[numweapons++] = new Weapon ("Heavy Plasma Bomb","Plasma",50,35,70,35,70,30,60,10,3500000,2,3,"Particle",0,0,0,0,100,2);
weapons[numweapons++] = new Weapon ("Mortar","Mortar",60,100,150,100,150,10,20,5,10000000,2,6,"Concussive",0,1,0,0,100,2);
weapons[numweapons++] = new Weapon ("Heavy Mortar","Mortar",50,150,250,150,250,10,20,5,17500000,2,7,"Concussive",0,1,0,0,100,2);
weapons[numweapons++] = new Weapon ("Fusion Mortar","Mortar",80,200,400,200,400,100,300,5,25000000,2,7,"Concussive",0,1,0,0,200,2);
weapons[numweapons++] = new Weapon ("Meson Bomb","Meson",60,60,70,50,60,10,20,5,6000000,2,3,"Particle",0,0,0,0,50,2);
weapons[numweapons++] = new Weapon ("Heavy Meson Bomb","Meson",50,80,90,70,80,20,30,5,8000000,2,4,"Particle",0,0,0,0,65,2);
weapons[numweapons++] = new Weapon ("Meson Nova Bomb","Meson",40,100,110,90,100,30,40,5,10000000,2,5,"Particle",0,0,0,0,100,2);
weapons[numweapons++] = new Weapon ("Scourge Sidearm","Plasma",60,30,65,40,75,40,75,10,10000000,1,3,"Particle",20,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Scourge Scrambler","Plasma",70,30,90,15,40,25,60,10,15000000,1,3,"Particle",24,0,25,50,"N/A",2);
weapons[numweapons++] = new Weapon ("Scourge Flail","Plasma",80,10,25,10,30,50,150,5,20000000,1,4,"Particle",20,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Scourge Tempest","Plasma",50,50,90,60,110,10,40,10,30000000,1,4,"Particle",40,0,0,0,"N/A",2);
weapons[numweapons++] = new Weapon ("Scourge Vortex","Plasma",40,70,140,90,180,10,60,10,100000000,1,6,"Particle",80,0,0,0,"N/A",3);
//function Weapon (Name,Class,Accuracy,SLo,SHi,ALo,AHi,DLo,DHi,CHR,Cost,Type,Size,Super,Power,Siege,EMLo,EMHi,Ammo,Mult, AP)

//function Aura (Name,Stack,Setting)
auras[numauras++] = new Aura ("Accuracy", 1, 0);
auras[numauras++] = new Aura ("Damage",   0, 0);
auras[numauras++] = new Aura ("Drone",    1, 0);
auras[numauras++] = new Aura ("Power",    1, 0);
auras[numauras++] = new Aura ("Repair",   1, 0);
//function Aura (Name,Stack,Setting)