/**************************************************
* ShipCalc 2.8.02 - tdzkcalc.js
* Original by Madox--Modifications by ZmaniacZ
* More modifications by Mardak!
* Back to ZmaniacZ again
* If you want to use the code, please ask.
* zz@redial.net
* 2006-07-08
**************************************************/

//global variables to store text data that gets outputted to the analysis box
dmgStats = "";
resStats = "";
repairStats = "";
repairOtherStats = "";
auraStats = "";
stats = "";

//global variables that get passed around between functions
offense = 0;
defense = 0;
effoffense = 0;
effdefense = 0;
totalequip = 8;

function Ship (name, size, wsize, speed, man, armour, armourint, chassis, shield, shieldrch, power, powerrch, php, shp, drones, cargo, gather, tcomps, damps, equipslots, equipment, cost)
{
	this.index = numships;
	this.level = 0;
	this.baselevel = 0;
	this.name = name;
	this.size = size;
	this.wsize = wsize;
	this.speed = speed;
	this.man = man;
	this.armour = armour;
	this.armourrch = 0;
	this.armourint = armourint;
	this.chassis = chassis;
	this.shield = shield;
	this.shieldrch = shieldrch;
	this.power = power;
	this.powerrch = powerrch;
	this.php = php;
	this.shp = shp;
	this.drones = drones;
	this.cargo = cargo;
	this.gather = gather;
	this.tcomps = tcomps;
	this.targeting = this.tcomps*8;
	this.dmgamps = damps;
	this.equipslots = equipslots;
	this.equipment = equipment;
	this.basecost = cost;
	this.cost = cost;
	this.stealth = 0;
}

function Race (name, man, manupgr, shield, armour, power, cargo, targeting, AI, AIupgr, equip, init, dronemult, gather)
{
   this.name = name;
   this.man = man;
   this.manupgr = manupgr;
   this.shield = shield;
   this.armour = armour;
   this.power = power;
   this.cargo = cargo;
   this.targeting = targeting;
   this.AI = AI;
   this.AIupgr = AIupgr;
   this.equip = equip;
   this.init = init;
   this.dronemult = dronemult;
   this.gather = gather;
}

function Equipment (name, cost, size)
{
   this.name = name;
   this.cost = cost;
   this.size = size;
}

function Upgrade (name, field, value, level, cost)
{
   this.name = name;
   this.field = field;
   this.value = value;
   this.level = level;
   this.cost = cost;
   this.amount = 0;
}

function Weapon (Name,Class,Accuracy,SLo,SHi,ALo,AHi,DLo,DHi,CHR,Cost,Type,Size,Super,Power,Siege,EMLo,EMHi,Ammo,Mult)
{
   this.Name = Name;
   this.Class = Class;
   this.Accuracy = Accuracy;
   this.SLo = SLo;
   this.SHi = SHi;
   this.ALo = ALo;
   this.AHi = AHi;
   this.DLo = DLo;
   this.DHi = DHi;
   this.CHR = CHR;
   this.Cost = Cost;
   this.Type = Type;
   this.Size = Size;
   this.Super = Super;
   this.Power = Power;
   this.Siege = Siege;
   this.EMLo = EMLo;
   this.EMHi = EMHi;
   this.Ammo = Ammo;
   this.Mult = Mult;
}

function Aura (Name,Stack,Setting)
{
   this.Name = Name;
   this.Stack = Stack;
   this.Setting = Setting;
}

function clone (object)
{
   var n = new Object ();
   for (var attribute in object)
      n[attribute] = object[attribute];

   return n;
}

function addCommas (str)
{
   if(str=="Infinity")
      return str;
   str = "" + str;
   var val = "";
   var num = str.length % 3;
   if (num == 0)
      num = 3;
   while (str.length > 0)
   {
      val += str.substring (0, num) + ",";
      str = str.substring (num);
      num = 3;
   }

   return val.substring (0, val.length - 1);
}

//Utility function for verifying if a ship currently contains a particular piece of equipment
function equipexist(name)
{
   for(var i = 1; i <= totalequip; i++)
   {
      if(equip[i].name == name)
         return i;
   }
   return 0;
}

//Function called when a new race is selected.  Forces a select ship to update ship values.
function selectRace ()
{
   race = races[e.race.value];
   equip[totalequip] = clone(equipments[race.equip]);

   selectShip ();
}

//called when a new ship or race is selected.  forces update of eq and weapons as well
function selectShip (resetFlag)
{
	//load the currently selected ship into the global ship object
	ship = clone(ships[e.ship.value]);

	//cargo and man upgrades are shipsize dependent
	cargoupgrade.value = ((ship.size <= 3) ? 100 : (130 - (ship.size * 10)));
	manupgrade.value = (30 - (ship.size*2));

	//we just reset all to zero
	if(resetFlag)
		for (var i in upgrades)
			upgrades[i].amount = 0;

	//apply all the currently applied upgrades to the new ship
	//man and ai can be race dependent
	for (i = 0; i < numupgrades; i++)
	{
		if (upgrades[i].field == "man")
			ship[upgrades[i].field] += upgrades[i].amount * (upgrades[i].value + race.manupgr);
		else if (upgrades[i].field == "armourint")
			ship[upgrades[i].field] += upgrades[i].amount * (upgrades[i].value + race.AIupgr);
		else
			ship[upgrades[i].field] += upgrades[i].amount * upgrades[i].value;
	}

	//reset it all!
	if(resetFlag)
	{
		//totalequip-1
		for (var i = 1; i < totalequip; i++)
			e["eq"+i].value = 0;

		//Primes and Secs are separated out here because theres a separate 'None' weapon entry for each type.
		for (var i = 1; i <= 20; i++)
			e["weapons"+i].value = 0;
		for (var i = 21; i <= 30; i++)
			e["weapons"+i].value = 1;

		e.scoutdrones.value = 0;
		e.combatdrones.value = 0;
		e.resourcedrones.value = 0;
		e.repairdrones.value = 0;
		e.minedrones.value = 0;
		e.empdrones.value = 0;
		e.shielddrones.value = 0;
			
		e.accaura.value   = auras[0].Setting = 0;
		e.dmgaura.value   = auras[1].Setting = 0;
		e.droneaura.value = auras[2].Setting = 0;
		e.poweraura.value = auras[3].Setting = 0;
		e.repaura.value   = auras[4].Setting = 0;
	
		e.defaultName.value = 1;
  }

	selectEq();
	selectWeapons();
	updateShip();
}

function selectEq(update)
{
	var availslots = ship.equipslots;
	var objTd;
	
	if(race.name == "Quelaar")
		availslots++;
		
	//totalequip-1
	for (var i = 1; i < totalequip; i++)
		equip[i] = clone(equipments[e["eq" + i].value]);
		
	//following code does the neat red unavailable boxes trick
	for(i = 1; i <= availslots; i++)
	{
		styleObj = document.getElementById("eq"+i)
		styleObj.className = "available";
	}
	
	for(i = availslots+1; i <= 7; i++)
	{
		styleObj = document.getElementById("eq"+i)
		styleObj.className = "unavailable";
	}
   
	if(update)
		updateShip();
}

function selectWeapons(update)
{
	var availphp = ship.php;
	var availshp = ship.shp;
	
	for(var i = 1; i <= 30; i++)
		weap[i] = clone(weapons[e["weapons"+i].value]);
		
	weap[31] = clone(weapons[0]);
	
	for(i = 1; i <= availphp; i++)
	{
		styleObj = document.getElementById("weapons"+i);
		styleObj.className = "available";
	}
	
	for(i = availphp+1; i <= 20; i++)
	{
		styleObj = document.getElementById("weapons"+i);
		styleObj.className = "unavailable";
	}
	
	for(i = 21; i <= availshp+20; i++)
	{
		styleObj = document.getElementById("weapons"+i);
		styleObj.className = "available";
	}
	
	for(i = availshp+21; i <= 30; i++)
	{
		styleObj = document.getElementById("weapons"+i);
		styleObj.className = "unavailable";
	}
   
	if(update)
		updateShip();
}

function addUpgrade (number, amount, setamount)
{
	if (amount == 0)
	{
		if (upgrades[number].field == "man")
			ship[upgrades[number].field] -= upgrades[number].amount * (upgrades[number].value + race.manupgr);
		else if (upgrades[number].field == "armourint")
			ship[upgrades[number].field] -= upgrades[number].amount * (upgrades[number].value + race.AIupgr);
		else
			ship[upgrades[number].field] -= upgrades[number].amount * upgrades[number].value;
			
		upgrades[number].amount = 0;
	} else
	{
		if(setamount==1)
		{
			amount = (amount - upgrades[number].amount);
			upgrades[number].amount += amount;
		} else
			upgrades[number].amount += amount;

		if (upgrades[number].amount < 0)
			upgrades[number].amount = 0;
		else
		{
			var mul = 0;
      if (upgrades[number].field == "man")
				mul = race.manupgr;
			if (upgrades[number].field == "armourint")
				mul = race.AIupgr;
         
			ship[upgrades[number].field] += amount * (upgrades[number].value + mul);
		}
	}
	updateShip();
}

function addAura(type, amount, update)
{
	auras[type].Setting += amount;
	
	if((auras[type].Setting > 1 || auras[type].Setting < -1) && !auras[type].Stack)
		auras[type].Setting = (auras[type].Setting > 1) ? 1 : -1;
	else if(auras[type].Setting > 3 || auras[type].Setting < -3)
		auras[type].Setting = (auras[type].Setting > 3) ? 3 : -3;
		
	if(update)
		updateShip();
}

function resetAuras()
{
		for(i = 0; i < numauras; i++)
		{
				auras[i].Setting = 0;
		}
}

function freezeUpgrades ()
{
	ship.basecost = 0;
	ship.baselevel = ship.level;
	
	for (var i in upgrades)
		upgrades[i].amount = 0;
		
	selectEq();
	selectWeapons();
	updateShip(1);
}

function updateShip (freeze)
{
	var level = ship.baselevel;
	var cost = ship.basecost;
	
	//costing
	if(!freeze)
	{
		for(i = numupgrades-1; i >= 0; i--)
		{
			var amount = upgrades[i].amount;
			while (amount > 0)
			{
				cost += Math.floor (upgrades[i].cost * Math.pow (10, level / 60));
				level += upgrades[i].level;
				amount--;
			}
		}
	}
		
	for(i = 1; i <= totalequip-1; i++)
		cost += equip[i].cost + equip[i].size * (ship.size - 1) * equip[i].cost;
			
	for (i = 1; i <= 30; i++)
		cost += weap[i].Cost;
		
	ship.level = level;
	if(race.name == "Tamaran")
		ship.cost = Math.floor(cost*0.90);
	else
		ship.cost = cost;
	
	//updating screen values
	e.level.value = ship.level;
	e.size.value = ship.size;
	e.speed.value = ship.speed*2;		//speed*2 for 2.8
	e.man.value = ship.man + race.man;
	e.php.value = ship.php;
	e.cargo.value = Math.floor(ship.cargo * race.cargo);
	e.targeting.value = ship.targeting + race.targeting;
	e.shield.value = Math.round(ship.shield * race.shield);
	e.armour.value = Math.round(ship.armour * race.armour);
	e.power.value = Math.round(ship.power * race.power);
	e.drones.value = ship.drones;
	e.shp.value = ship.shp;
	e.armourint.value = ship.armourint + race.AI;
	e.cost.value = "$ " + addCommas (ship.cost);
	e.chassis.value = ship.chassis;
	e.racialequip.value = equip[totalequip].name;
	e.armorpierce.value = ship.dmgamps*8;

	cloakbonus = 100;
	scvalue = (ship.size > 4) ? 4-Math.max(0,ship.size-4) : 4;
	if(race.name == "Wraith")
	{
		cloakbonus += 25;
		scvalue += 1;
	}
	if(equipexist("Cloaking Device"))
	{
		objTd = document.getElementById('uncloaked');
		objTd.removeChild(objTd.firstChild);
		objTd.appendChild( document.createTextNode("Un/Cloak") );
		e.cloakstealth.value = ship.stealth*scvalue + "/" + parseInt(cloakbonus+(ship.stealth*scvalue));
	} else
	{
		objTd = document.getElementById('uncloaked');
		objTd.removeChild(objTd.firstChild);
		objTd.appendChild( document.createTextNode("Uncloaked") );
		e.cloakstealth.value = ship.stealth*scvalue;
	}
	
	for (var i = 0; i < numupgrades; i++)
		e["upgr"+i].value = upgrades[i].amount;
		
	if (e.defaultName.value == 1 || e.shipname.value.length == 0)
	{
		e.shipname.value = race.name+ship.name;
		e.defaultName.value = 1;
	}
	
	updateList();
	recalcDrones();
	recalcRating();
	recalcAuras();
	recalcResource();
	recalcRepair();
	recalcDamage();
	updateAnalysis();
	updateShipstring();
}

function updateShipstring()
{
	//Get the shipstring first
	ss = implodeshipstring(1);
	
	//get and update the shipstring textbox
	objSS = document.getElementById("shipstring");
	objSS.value = ss;
	
	//update the shipstring for shopping use
	ss = "http://tdzk.agadak.net/shopping/2.8.shopping.php#"+ss;
	
	//Get the span, remove its child
	objSpan = document.getElementById("shopping");
	if(objSpan.firstChild != null)
		objSpan.removeChild(objSpan.firstChild);
	
	//create the <a> tag
	objA = document.createElement("a");
	objA.setAttribute("href",ss);
	objA.appendChild( document.createTextNode("Shopping!") );
	
	//add the new <a> tag to the span
	objSpan.appendChild(objA);
}

function recalcRating()
{
	offense = 0;
	defense = 0;
	effdefense = 0;
	sdronemult = .14;
	
	if(race.name == "Sniv")
		sdronemult = .16;
	//********************************PROBABLY WRONG
	if(race.name == "Wraith")
		sdronemult = .16;
	
	for(i = 1; i <= 30; i++)
		offense += ((weap[i].SLo + weap[i].SHi + weap[i].ALo + weap[i].AHi)/40 + (weap[i].DLo + weap[i].DHi)/60) * (1 + ((weap[i].CHR/100) * (weap[i].Mult - 1))) * ((300 + weap[i].Accuracy) / 400);
		
	offense = Math.ceil(offense + (parseInt(e.combatdrones.value)*.5) + (parseInt(e.empdrones.value)*.25));
	defense = Math.ceil((parseInt(e.armour.value)/100) + (parseInt(e.shield.value)/100) + (parseInt(e.combatdrones.value)/10) + (parseInt(e.empdrones.value)/20) + (parseInt(e.shielddrones.value)/7));
	
	var manBoost = 1;
	if (e.pfiremode.value==2 || e.pfiremode.value==3)
		manBoost = 2;
	else if (e.pfiremode.value==4)
		manBoost = 3;
		
	var levdiff = parseInt(e.plvl.value)-parseInt(e.elvl.value);
	
	// Estimate tcomps to be accuracy/15
	var effacc = Math.min(100, Math.max(Math.round(parseInt(e.eacc.value) - levdiff - e.man.value*manBoost/15), 10+Math.round(parseInt(e.eacc.value)/15)));
	var AImod = Math.min(90, Math.max(0, e.armourint.value/2 - (10 + parseInt(e.edamps.value)*8)));
	
	effdefense = Math.ceil((((parseInt(e.armour.value)/(1-AImod/100))/100) + (parseInt(e.shield.value)/100))/(effacc/100) + (parseInt(e.combatdrones.value)/10) + (parseInt(e.empdrones.value)/20) + (parseInt(e.shielddrones.value)*sdronemult));
}

function recalcDrones()
{
	var droneerror = 0;
	
	droneerror = parseInt(e.drones.value) - (parseInt(e.combatdrones.value) + parseInt(e.scoutdrones.value) + parseInt(e.repairdrones.value) + parseInt(e.resourcedrones.value) + parseInt(e.minedrones.value) + parseInt(e.empdrones.value) + parseInt(e.shielddrones.value));
	
	if((parseInt(e.combatdrones.value) + droneerror) >= 0)
		e.combatdrones.value = parseInt(e.combatdrones.value) + droneerror;
	else if((parseInt(e.scoutdrones.value) + droneerror) >= 0)
		e.scoutdrones.value = parseInt(e.scoutdrones.value) + droneerror;
	else if((parseInt(e.repairdrones.value) + droneerror) >= 0)
		e.repairdrones.value = parseInt(e.repairdrones.value) + droneerror;
	else if((parseInt(e.minedrones.value) + droneerror) >= 0)
		e.minedrones.value = parseInt(e.minedrones.value) + droneerror;
	else if((parseInt(e.resourcedrones.value) + droneerror) >=0 )
		e.resourcedrones.value = parseInt(e.resourcedrones.value) + droneerror;
	else if((parseInt(e.empdrones.value) + droneerror) >= 0)
		e.empdrones.value = parseInt(e.empdrones.value) + droneerror;
	else if((parseInt(e.shielddrones.value) + droneerror) >= 0)
		e.shielddrones.value = parseInt(e.shielddrones.value) + droneerror;
		
	//ARM settings code
	e.armRemaining.value = parseInt(e.drones.value) - parseInt(e.armShield.value) - parseInt(e.armCombat.value) - parseInt(e.armEMP.value) - parseInt(e.armRepair.value);
	
	//Fix for weird Zero Upgrade bug
	if(parseInt(e.drones.value) == 0)
		e.combatdrones.value = e.scoutdrones.value = e.repairdrones.value = e.minedrones.value = e.resourcedrones.value = e.empdrones.value = e.shielddrones.value = 0;
}

function recalcAuras()
{
	var empty = 1;
	
	e.accaura.value = auras[0].Setting;
	e.dmgaura.value = auras[1].Setting;
	e.droneaura.value = auras[2].Setting;
	e.poweraura.value = auras[3].Setting;
	e.repaura.value = auras[4].Setting;

   auraStats = "";
   auraStats += "Auras in effect:\n"
   if(e.accaura.value != 0) {
      auraStats += "Accuracy Aura\t:" + e.accaura.value + "0%\n";
      empty = 0;
   }
   if(e.dmgaura.value != 0) {
      auraStats += "Damage Aura\t:" + e.dmgaura.value + "5%\n";
      empty = 0;
   }
   if(e.droneaura.value != 0) {
      auraStats += "Drone Aura\t:" + e.droneaura.value + "0%\n";
      empty = 0;
   }
   if(e.poweraura.value != 0) {
      auraStats += "Power Aura\t:" + e.poweraura.value + "0%\n";
      empty = 0;
   }
   if(e.repaura.value != 0) {
      auraStats += "Repair Aura\t:" + e.repaura.value + "0%\n";
      empty = 0;
   }

   if(empty)
      auraStats = "";

   auraStats += "\n";
}

function recalcDamage()
{
	effoffense = 0; 			//effective offense rating
	var accmod = 0;				//holds the accuracy modifier
	var baseacc = 0.1;		//base accuracy modifier...may not be necessary
	var baseap = 0.1;			//base armor pierce...never less than 10%
	var weaponpower = 0;	//total weaponpower used per shot
	var pripower = 0;
	var secpower = 0;
	var droneacc = 0;			//drone accuracy modifier
	var wepacc = 0;				//final weapon accuracy
	var wepcritmod = 0;		//critical hit modifier
	var dronedmg = 0;			//damage per drone
	var lvldiff = 0;			//level difference
	var apmod = 0;				//Armor Pierce mod
	var isBleed = false;
	
	tempdmg = new Object();//array that holds damages during calculation
	//each of the next 3 arrays holds damage ranges in the following order:
	//1->Average damage to drones
	//2->max average damage to drones
	//3->max damage possible to drones
	//4->Average damage to shields
	//5->max average damage to shields
	//6->max damage possible to shields
	//7->Average damage to armor
	//8->max average damage to armor
	//9->max damage possible to armor
	//10->Average EMP damage
	//11->max average EMP damage
	//12->max possible EMP damage
	pridmg = new Object();	//array that holds damages done by primaries
	secdmg = new Object();	//array that holds damages done by secondaries
	drndmg = new Object();	//array that holds damages done by drones
	
	bleedthru = new Object();
	bleedthru[1] = bleedthru[2] = bleedthru[3] = 0;
	
	dmgStats = "";				//String that holds the text to be displayed in the analysis box
	
	//ensure we don't have invalid level numbers entered
	if(parseInt(e.plvl.value) < 1)
		e.plvl.value = 1;
	if(parseInt(e.elvl.value) < 1)
		e.elvl.value = 1;
		
	//calculate the level difference
	lvldiff = parseInt(e.plvl.value) - parseInt(e.elvl.value);
	
	//calculate the initial weapon accuracy modifier based on tcomps and level difference
	accmod += (parseInt(e.targeting.value)/100) + ((lvldiff)/100);
	//base accuracy is given as 1% per tcomp in addition to the 10% base each race already enjoys.
	baseacc += (ship.tcomps/100) + (parseInt(e.upgr13.value)/100);
	
	//apply acc aura
	accmod += (parseInt(e.accaura.value)/10);
	
	//apply drone accuracy, drone aura, and level diffference
	droneacc = .65 + (parseInt(e.droneaura.value)/10) + (lvldiff/100);
		
	//apply defender man
	if(e.efiremode.value == 2 || e.efiremode.value == 3) 
	{
		accmod -= (((parseInt(e.eman.value)/15)*2)/100);
		droneacc -= (((parseInt(e.eman.value)/15)*2)/100);
	} else if(e.efiremode.value == 4)
	{
		accmod -= (((parseInt(e.eman.value)/15)*3)/100);
		droneacc -= (((parseInt(e.eman.value)/15)*3)/100);
	} else
	{
		accmod -= (((parseInt(e.eman.value)/15)*1)/100);
		droneacc -= (((parseInt(e.eman.value)/15)*1)/100);
	}
	
	if(droneacc > 1)
		droneacc = 1;
	if(droneacc < .1)
		droneacc = .1;
		
	//apply offensive equipment
	for (i = 1; i <= 30; i++)
	{
		if(equipexist("Advanced Homing") && weap[i].Class=="Missile")
			weap[i].Accuracy+=20;
				
		if(equipexist("Armor-Piercing Warheads") && weap[i].Class=="Torpedo")
		{
			weap[i].SLo+=50;
			weap[i].ALo+=50;
		}
		
		if(equipexist("Tetra Shells") && weap[i].Class=="Flak")
			weap[i].DLo += 40;
		
		if(equipexist("Beam Regulators") && weap[i].Class=="Beam")
		{
			weap[i].SLo*=1.1;
			weap[i].SHi*=1.1;
			weap[i].ALo*=1.1;
			weap[i].AHi*=1.1;
			weap[i].DLo*=1.1;
			weap[i].DHi*=1.1;
			weap[i].Power*=0.75;
		}
			
		if(equipexist("Grooved Slugs") && weap[i].Class=="Projectile")
		{
			weap[i].Accuracy+=20;
			weap[i].CHR+=10;
			weap[i].AP+=20;
		}
		
		if(equipexist("Harmonic Amplifiers") && (weap[i].Class=="Flux" || weap[i].Class=="EMP"))
		{
			weap[i].DLo*=1.5;
			weap[i].DHi*=1.5;
			weap[i].SLo*=1.5;
			weap[i].SHi*=1.5;
		}
		
		if(equipexist("Mass Driver") && weap[i].Super=="Concussive")
		{
			weap[i].SLo*=1.25;
			weap[i].SHi*=1.25;
			weap[i].ALo*=1.25;
			weap[i].AHi*=1.25;
			weap[i].DLo*=1.25;
			weap[i].DHi*=1.25;
		}
		
		if(equipexist("Particle Accelerator") && weap[i].Super=="Particle")
		{
			weap[i].SLo*=1.25;
			weap[i].SHi*=1.25;
			weap[i].ALo*=1.25;
			weap[i].AHi*=1.25;
			weap[i].DLo*=1.25;
			weap[i].DHi*=1.25;
		}
		
		if(equipexist("Proximity Warheads") && weap[i].Class=="Rocket")
		{
			weap[i].SLo*=2;
			weap[i].SHi*=2;
			weap[i].ALo*=2;
			weap[i].AHi*=2;
			weap[i].DLo*=2;
			weap[i].DHi*=2;
			weap[i].Accuracy+=10;
		}
		
		if(equipexist("Reinforced Multiplier Fields") && weap[i].Class=="Helix")
		{
			weap[i].Power+=5;
			weap[i].SLo*=1.2;
			weap[i].SHi*=1.2;
			weap[i].ALo*=1.2;
			weap[i].AHi*=1.2;
			weap[i].CHR+=10; 
		}
		
		if(equipexist("Shaped Charges") && weap[i].Class=="Fusion")
			weap[i].CHR+=10; 
			
		if(equipexist("Singularity Generator") && weap[i].Class=="Plasma")
		{
			weap[i].CHR+=10;
			weap[i].Mult*=2;
		}
			
		if(equipexist("Trimedadine Laser Lenses") && weap[i].Class=="Laser")
		{
			weap[i].SLo*=3;
			weap[i].SHi*=3;
			weap[i].ALo*=3;
			weap[i].AHi*=3;
			weap[i].DLo*=3;
			weap[i].DHi*=3;
			weap[i].EMLo*=3;
			weap[i].EMHi*=3;
		}
		
		if(equipexist("Wave Intensifier") && weap[i].Super=="Energy")
		{
			weap[i].SLo*=1.25;
			weap[i].SHi*=1.25;
			weap[i].ALo*=1.25;
			weap[i].AHi*=1.25;
			weap[i].DLo*=1.25;
			weap[i].DHi*=1.25;
		}
	}
	
	//apply damage aura
	var dmgmod = 1;
	if(parseInt(e.dmgaura.value) == 1)
		dmgmod = 1.15;
	else if(parseInt(e.dmgaura.value) == -1)
		dmgmod = .85;
		
	//apply damage amps
	dmgmod *= 1+(ship.dmgamps/100)*2;
	
	//apply AI
	var AImod = 1-((parseInt(e.eai.value)/2)/100);
	AImod += (ship.dmgamps*8)/100;
	if(AImod > 1)
		AImod = 1;
	if(AImod < baseap)
		AImod = baseap;
		
	for (i = 1; i <= 30; i++)
	{
			weap[i].SLo*=dmgmod;
			weap[i].SHi*=dmgmod;
			weap[i].ALo*=dmgmod*AImod;
			weap[i].AHi*=dmgmod*AImod;
			//weap[i].ALo*=dmgmod*( (AImod+(weap[i].AP/100)) > 1 : 1 ? (AImod+(weap[i].AP/100)) );
			//weap[i].AHi*=dmgmod*( (AImod+(weap[i].AP/100)) > 1 : 1 ? (AImod+(weap[i].AP/100)) );
			weap[i].DLo*=dmgmod;
			weap[i].DHi*=dmgmod;
	}
	
	//calculate primes
	for (i = 1; i <= 12; i++)
		pridmg[i] = 0;
		
	for (i = 1; i <= 20; i++)
	{
		wepacc = (weap[i].Accuracy/100)+accmod;
			
		if(wepacc <= baseacc)
			wepacc = baseacc;
		if(wepacc > 1)
			wepacc = 1;
			
		wepcritmod = 1 - ((weap[i].CHR/100)*(1-weap[i].Mult));
		//chained crits approximation
		if(equipexist("Shaped Charges") && weap[i].Class=="Fusion")
			wepcritmod = 1.202941157;

		//drone damage
		tempdmg[1]=(.8)*(((weap[i].DLo+weap[i].DHi)/2)*(wepcritmod));
		tempdmg[2]=(.8)*(((weap[i].DLo+weap[i].DHi)/2)*(wepcritmod));
		tempdmg[3]=(.8)*weap[i].DHi;
		//shield damage
		tempdmg[4]=(wepacc)*(((weap[i].SLo+weap[i].SHi)/2)*(wepcritmod));
		tempdmg[5]=(((weap[i].SLo+weap[i].SHi)/2)*(wepcritmod));
		tempdmg[6]=weap[i].SHi;
		//armor damage
		tempdmg[7]=(wepacc)*(((weap[i].ALo+weap[i].AHi)/2)*(wepcritmod));
		tempdmg[8]=(((weap[i].ALo+weap[i].AHi)/2)*(wepcritmod));
		tempdmg[9]=weap[i].AHi;
		//emp damage
		tempdmg[10]=(wepacc)*(((weap[i].EMLo+weap[i].EMHi)/2)*(wepcritmod));
		tempdmg[11]=(((weap[i].EMLo+weap[i].EMHi)/2)*(wepcritmod));
		tempdmg[12]=weap[i].EMHi;
		
		pripower += weap[i].Power;
		
		if(e.port.checked==true)
		{
			if(weap[i].Siege==0)
				for (j = 4; j <= 12; j++)
					tempdmg[j]/=4;
		} else
		{
			if(weap[i].Siege==1)
				for (j = 1; j <= 12; j++)
					tempdmg[j]=0;
		}
		
		for(j = 1; j <= 12; j++)
			pridmg[j]+=tempdmg[j];
	}
	
	//calculate secs
	for (i = 1; i <= 12; i++)
		secdmg[i] = 0;
		
	for (i = 21; i <= 30; i++)
	{
		wepacc = (weap[i].Accuracy/100)+accmod;
		
		if(race.name == "Kitaran")
			wepacc += .10;
			
		if(wepacc <= baseacc)
			wepacc = baseacc;
		if(wepacc > 1)
			wepacc = 1;
			
		wepcritmod = 1 - ((weap[i].CHR/100)*(1-weap[i].Mult));
		
		//drone damage
		tempdmg[1]=(.8)*(((weap[i].DLo+weap[i].DHi)/2)*(wepcritmod));
		tempdmg[2]=(.8)*(((weap[i].DLo+weap[i].DHi)/2)*(wepcritmod));
		tempdmg[3]=(.8)*weap[i].DHi;
		//shield damage
		tempdmg[4]=(wepacc)*(((weap[i].SLo+weap[i].SHi)/2)*(wepcritmod));
		tempdmg[5]=(((weap[i].SLo+weap[i].SHi)/2)*(wepcritmod));
		tempdmg[6]=weap[i].SHi;
		//armor damage
		tempdmg[7]=(wepacc)*(((weap[i].ALo+weap[i].AHi)/2)*(wepcritmod));
		tempdmg[8]=(((weap[i].ALo+weap[i].AHi)/2)*(wepcritmod));
		tempdmg[9]=weap[i].AHi;
		//emp damage
		tempdmg[10]=(wepacc)*(((weap[i].EMLo+weap[i].EMHi)/2)*(wepcritmod));
		tempdmg[11]=(((weap[i].EMLo+weap[i].EMHi)/2)*(wepcritmod));
		tempdmg[12]=weap[i].EMHi;
		
		secpower += weap[i].Power;
		
		if(equipexist("Phasing Warheads") && weap[i].Class=="Pulsar")
		{
			bleedthru[1] += tempdmg[7]/2;
			bleedthru[2] += tempdmg[8]/2;
			bleedthru[3] += tempdmg[9]/2;
			isBleed = true;
		}
		
		if(e.port.checked==true)
		{
			if(weap[i].Siege==0)
				for (j = 4; j <= 12; j++)
					tempdmg[j]/=4;
		} else
		{
			if(weap[i].Siege==1)
				for (j = 1; j <= 12; j++)
					tempdmg[j]=0;
		}
		
		for(j = 1; j <= 12; j++)
			secdmg[j]+=tempdmg[j];
	}
	
	//calculate drone damages
	for (i = 1; i <= 12; i++)
		drndmg[i] = 0;
		
	var cdronedmg = (ship.size < 4) ? 10-((4-ship.size)*2) : 10;
	var edronedmg = (ship.size < 4) ? 10-((4-ship.size)*2) : 10;
	
	dronedmg = race.dronemult*(parseInt(e.empdrones.value)*edronedmg+parseInt(e.combatdrones.value)*cdronedmg);
	
	//drone damage
	drndmg[1]+=(droneacc)*(dronedmg);
	drndmg[2]+=dronedmg;
	drndmg[3]+=dronedmg;
	//shield damage
	drndmg[4]+=(droneacc)*(dronedmg);
	drndmg[5]+=dronedmg;
	drndmg[6]+=dronedmg;
	//armor damage
	drndmg[7]+=(droneacc)*(race.dronemult*parseInt(e.combatdrones.value)*cdronedmg);
	drndmg[8]+=race.dronemult*parseInt(e.combatdrones.value)*cdronedmg;
	drndmg[9]+=race.dronemult*parseInt(e.combatdrones.value)*cdronedmg;
	//emp damage
	drndmg[10]+=(1-((1-droneacc)*.9))*(parseInt(e.empdrones.value)*5);
	drndmg[11]+=race.dronemult*parseInt(e.empdrones.value)*5;
	drndmg[12]+=race.dronemult*parseInt(e.empdrones.value)*5;
	
	if(e.port.checked==true)
		for (j = 4; j <= 12; j++)
			drndmg[j]/=4;
			
	if(e.pfiremode.value==4)
	{
		for(z=1;z<=12;z++)
		{
			pridmg[z]=0;
			secdmg[z]=0;
		}
		pripower = 0;
		secpower = 0;
	}
	
	if(e.pfiremode.value==3)
	{
		for(z=1;z<=12;z++)
			pridmg[z]=0;
		pripower = 0;
	}
	
	if(e.pfiremode.value==2)
	{
		for(z=1;z<=12;z++)
			secdmg[z]=0;
		secpower = 0;
	}
			
	weaponpower = secpower+pripower;
			
	// Calculate effective ratings
	// drone*2/3 + shield + armor damages divide by 23
	// Why 23?  The world may never know.
	effoffense = Math.ceil(((pridmg[1]+secdmg[1]+drndmg[1])*2/3 + (pridmg[4]+secdmg[4]+drndmg[4]) + (pridmg[7]+secdmg[7]+drndmg[7]))/23);
    
	if(e.detailed.checked==false)
	{
		dmgStats += "\nDamage per attack round Avg (Max Avg/Total Max) \n";
		dmgStats += "Drones:\t\t" + Math.floor(pridmg[1]+secdmg[1]+drndmg[1]) + " (" + Math.floor(pridmg[2]+secdmg[2]+drndmg[2]) + "/" + Math.floor(pridmg[3]+secdmg[3]+drndmg[3])+ ")\n";
		dmgStats += "Shields:\t" + Math.floor(pridmg[4]+secdmg[4]+drndmg[4]) + " (" + Math.floor(pridmg[5]+secdmg[5]+drndmg[5]) + "/" + Math.floor(pridmg[6]+secdmg[6]+drndmg[6])+ ")\n";
		dmgStats += "Armour:\t\t" + Math.floor(pridmg[7]+secdmg[7]+drndmg[7]) + " (" + Math.floor(pridmg[8]+secdmg[8]+drndmg[8]) + "/" + Math.floor(pridmg[9]+secdmg[9]+drndmg[9])+ ")\n";
		dmgStats += "EMP:\t\t" +  Math.floor(pridmg[10]+secdmg[10]+drndmg[10]) + " (" + Math.floor(pridmg[11]+secdmg[11]+drndmg[11]) + "/" + Math.floor(pridmg[12]+secdmg[12]+drndmg[12])+ ")\n";
	} else
	{
		dmgStats += "\nPrimary Damage per attack round Avg (Max Avg/Total Max) \n";
		dmgStats += "Drones:\t\t" + Math.floor(pridmg[1]) + " (" + Math.floor(pridmg[2]) + "/" + Math.floor(pridmg[3])+ ")\n";
		dmgStats += "Shields:\t" + Math.floor(pridmg[4]) + " (" + Math.floor(pridmg[5]) + "/" + Math.floor(pridmg[6])+ ")\n";
		dmgStats += "Armour:\t\t" + Math.floor(pridmg[7]) + " (" + Math.floor(pridmg[8]) + "/" + Math.floor(pridmg[9])+ ")\n";
		dmgStats += "EMP:\t\t" +  Math.floor(pridmg[10]) + " (" + Math.floor(pridmg[11]) + "/" + Math.floor(pridmg[12])+ ")\n";
		
		dmgStats += "\nSecondary Damage per attack round Avg (Max Avg/Total Max) \n";
		dmgStats += "Drones:\t\t" + Math.floor(secdmg[1]) + " (" + Math.floor(secdmg[2]) + "/" + Math.floor(secdmg[3])+ ")\n";
		dmgStats += "Shields:\t" + Math.floor(secdmg[4]) + " (" + Math.floor(secdmg[5]) + "/" + Math.floor(secdmg[6])+ ")\n";
		dmgStats += "Armour:\t\t" + Math.floor(secdmg[7]) + " (" + Math.floor(secdmg[8]) + "/" + Math.floor(secdmg[9])+ ")\n";dmgStats += "EMP:\t\t" +  Math.floor(secdmg[10]) + " (" + Math.floor(secdmg[11]) + "/" + Math.floor(secdmg[12])+ ")\n";
		
		dmgStats += "\nDrone Damage per attack round Avg (Max Avg/Total Max) \n";
		dmgStats += "Drones:\t\t" + Math.floor(drndmg[1]) + " (" + Math.floor(drndmg[2]) + "/" + Math.floor(drndmg[3])+ ")\n";
		dmgStats += "Shields:\t" + Math.floor(drndmg[4]) + " (" + Math.floor(drndmg[5]) + "/" + Math.floor(drndmg[6])+ ")\n";
		dmgStats += "Armour:\t\t" + Math.floor(drndmg[7]) + " (" + Math.floor(drndmg[8]) + "/" + Math.floor(drndmg[9])+ ")\n";
		dmgStats += "EMP:\t\t" +  Math.floor(drndmg[10]) + " (" + Math.floor(drndmg[11]) + "/" + Math.floor(drndmg[12])+ ")\n";
	}
	
	if(isBleed)
	{
		dmgStats += "\nBleedthrough:\t" + Math.floor(bleedthru[1]) + " (" + Math.floor(bleedthru[2]) + "/" + Math.floor(bleedthru[3]) + ")\n";
	}
	
	//apply power aura
	var pwrmod = 1;
	pwrmod += parseInt(e.poweraura.value)/10;
	weaponpower *= pwrmod;
	
	if(equipexist("Internal Repair Module"))
	{
		if((e.powerrch.value/2) >= weaponpower)
		{
			dmgStats += "\n*Weapons will use " + Math.ceil(weaponpower) + " power each combat turn\n";
			dmgStats += "*Your IRM will recharge " + Math.floor(e.powerrch.value/2) + " power each combat turn\n";
			dmgStats += "*Your IRM generates all the weapons power you need in combat\n";
		} else
		{
			dmgStats += "\n*Weapons will use " + Math.ceil(weaponpower) + " power each combat turn\n";
			dmgStats += "*Your IRM will recharge " + Math.floor(e.powerrch.value/2) + " power each combat turn\n";
			dmgStats += "*You can fire a total of " + Math.floor((e.power.value-weaponpower)/(weaponpower-(e.powerrch.value/2))+1) + " salvos\n";
		}
	} else
	{
		dmgStats += "\n*Weapons will use " + Math.ceil(weaponpower) + " power each combat turn\n";
		dmgStats += "*You can fire a total of " + Math.floor((e.power.value-weaponpower)/(weaponpower)+1) + " salvos\n";
	}
}

function recalcResource()
{
	var resMod = 2;
	
	race.gather = 0;
	race.gather += ship.gather;
	
	//+1 per drone if Sniv, +25 base if Sniv
	if(race.name == "Sniv") {
		resMod += 1;
		//race.gather += 25;
	}
		
	//+1 per drone if Resourcer
	if(ship.name == "Resourcer")
		resMod += 1;
		
	//-1 per drone if Carrier
	if(ship.name == "Carrier")
		resMod -= 1;
		
	//+2 per drone if IPM
	if(equipexist("Improved Processing Module"))
		resMod += 2;
	
	//overall +25 + shipsize*5 if ERM, additional +10 if Sniv.
	if(equipexist("External Resourcing Module")) {
		race.gather += 25 + (5*ship.size);
		/**if(race.name == "Sniv")
			race.gather += 10*/
	}

	//apply resMod
	race.gather += e.resourcedrones.value*resMod;
	
	e.gather.value = race.gather;
	
	resStats = "";
	if(e.gather.value > 0 && e.cargo.value > 0)
	{
		resStats += "\nYour gather rate: " + race.gather;
		resStats += "\n*You can gather full cargo in " + Math.ceil(e.cargo.value/e.gather.value) + " turns\n";
		
		if(equipexist("Micro Purifier Module"))
			resStats += "*You can purify full cargo in " + Math.ceil((e.cargo.value/e.gather.value)*2) + " turns\n";
		
		if(equipexist("Micro Refinery Module"))
			resStats += "*You can refine full cargo in " + Math.ceil((e.cargo.value/e.gather.value)*2) + " turns\n";
			
		if(equipexist("Micro Factory Module"))
			resStats += "*You can construct full cargo in " + Math.ceil((e.cargo.value/e.gather.value)*2) + " turns\n";
		
		if(equipexist("Micro Extractor Module"))
			resStats += "*You can extract full cargo in " + Math.ceil((e.cargo.value/e.gather.value)*3) + " turns\n";
	}
}

function recalcRepair()
{
	myEMPRch = ship.emprch = 50;
	myShdRch = ship.shieldrch;
	myPowRch  = ship.powerrch;
	myArmRch = ship.armourrch;
	allyShdRch = 0;
	allyArmRch = 0;
	allyPowRch = 0;
	allyEMPRch = 0;
	
	var repDroneRate = 4;
	
	if(equipexist("External Repair Module"))
		repDroneRate += 2;
	
	if(race.name == "Tamaran")
		repDroneRate += 1;
		
	myArmRch += parseInt(e.repairdrones.value)*repDroneRate;
	allyArmRch = parseInt(e.repairdrones.value)*repDroneRate;
	
	//scourge irm bonus
	irmRate = 25;
	if(race.name == "Scourge")
		irmRate = 30;
	
	if(equipexist("Internal Repair Module"))
	{
		myShdRch += irmRate;
		myPowRch += irmRate;
		myArmRch += irmRate;
		myEMPRch += irmRate;
	}
	
	if(equipexist("Energy Transfer Module"))
	{
		allyShdRch = allyArmRch;
		allyPowRch = allyArmRch;
		allyEMPRch = Math.floor(allyArmRch/2);
	}
	
	//apply rep aura
	var repmod = 1;
	repmod += parseInt(e.repaura.value)/10;
	
	if(race.name == "Tamaran")
	{
		myEMPRch = Math.round(myEMPRch*1.25);
		myShdRch = Math.round(myShdRch*1.25);
		myPowRch = Math.round(myPowRch*1.25);
	}
	
	e.emprch.value    = Math.round(myEMPRch*repmod);
	e.shieldrch.value = Math.round(myShdRch*repmod);
	e.powerrch.value  = Math.round(myPowRch*repmod);
	e.armourrch.value = Math.round(myArmRch*repmod);
	
	allyEMPRch = Math.round(allyEMPRch*repmod);
	allyArmRch = Math.round(allyArmRch*repmod);
	allyPowRch = Math.round(allyPowRch*repmod);
	allyShdRch = Math.round(allyShdRch*repmod);
	
	repairStats = "";
	repairStats += "Self Rates\nPower Recharge Rate\t: " + parseInt(e.powerrch.value) + "\n";
	repairStats += "Shield Recharge Rate\t: " + parseInt(e.shieldrch.value) + "\n";
	repairStats += "Armour Repair Rate\t: " + parseInt(e.armourrch.value) + "\n";
	repairStats += "EMP Repair Rate\t\t: " + parseInt(e.emprch.value) + "\n";
	
	if(equipexist("Internal Repair Module"))
		repairStats += "\n*Your ship can regenerate " + Math.ceil(e.shieldrch.value/2) + " shields per combat round\n";
		
	repairOtherStats = "";
	if(parseInt(e.repairdrones.value) > 0)
	{
		repairOtherStats += "\nRepair Other Rates\n";
		repairOtherStats += "Armor Repair Rate\t: " + allyArmRch + "\n";
		
		if(equipexist("Energy Transfer Module"))
		{
			repairOtherStats += "Power Recharge Rate\t: " + allyPowRch + "\n";
			repairOtherStats += "Shield Recharge Rate\t: " + allyShdRch + "\n";
			repairOtherStats += "EMP Repair Rate\t\t: " + allyEMPRch + "\n";
		}
	}
}

//fills the upgrade list
function updateList()
{
	var weaponscount = 0;
	list = "";
	
	list += e.shipname.value + " - Level " + e.level.value + " " + race.name + " " + ship.name + "\n-----\n";
	
	for (i = numupgrades-1; i >= 0; i--)
	{
		var amount = upgrades[i].amount;
		if (amount > 0)
			list += amount + " x " + upgrades[i].name + "\n";
	}
	
	list += "-----\n";
	
	for (i=1; i<totalequip; i++)
		if(equip[i].name != "None")
			list += equip[i].name + "\n";
			
	if (equip[totalequip].name != "None")
		list += equip[totalequip].name + " (Racial)" + "\n";
		
	list += "-----\n";
	
	selectWeapons ();
	
	for (i = 1; i <= 30; i++)
	{
		if(weap[i].Name != "None")
		{
			weaponscount+=1;
			
			if(weap[i].Name != weap[i+1].Name)
			{
				list += weaponscount + " x ";
				list += weap[i].Name;
				
				if(weap[i].Ammo > 0)
					list += " (" + weap[i].Ammo + ")";
				
				if(weap[i].Size > ship.wsize)
					list+=" [Too large for ship]"
					
				list+="\n";
				weaponscount=0;
			}
		}
	}
	
	if (list == "")
		list = "(nothing)";
		
	e.list.value = list;
}

function updateAnalysis()
{
	var init;
	
	init = (parseInt(e.man.value)/4)+parseInt(e.plvl.value)+race.init;
	
	if(equipexist("Spatial Rift Generator"))
		init+=10;
		
	var sigscan = "";
	if (equipexist("Signature Scanners"))
	{
		sigscan = 25;
		if (equipexist("Scanners")) sigscan += 50;
		sigscan += e.scoutdrones.value*2;
		sigscan = "\tSignature Scan\t: " + sigscan;
	}
	
	stats = "";
	stats += e.shipname.value +"\n-----\n";
	stats += "Level " + e.level.value + " " + race.name + " " + ship.name + "\n\n";
	stats += "Rating: " + offense + "/" + defense + "\tBase Init: "+init+"\n";
	stats += "Effective Rating: " + effoffense + "/" + effdefense + "\n\n";
	stats += "Speed\t: " + e.speed.value + "\tManeuverability\t: " + e.man.value + "\n";
	stats += "CDrones\t: " + e.combatdrones.value + "\tShields\t\t: " + e.shield.value + "\n";
	stats += "Armour\t: " + e.armour.value + "\tPower\t\t: " + e.power.value + "\n";
	stats += "AI\t: " + e.armourint.value + sigscan + "\n\n";
	
	stats += auraStats + repairStats + dmgStats + resStats + repairOtherStats;
	
	e.stats.value = stats;
}
