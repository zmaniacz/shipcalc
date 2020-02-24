/**************************************************
* ShipCalc 2.8.01 - tdzkinit.js
* Original by Madox--Modifications by ZmaniacZ
* More modifications by Mardak!
* Back to ZmaniacZ again
* If you want to use the code, please ask.
* zz@redial.net
* 2006-07-02
**************************************************/
//See if an external weapons file cookie has been set, if so, load the bloody file!
//at least, thats what WILL go here

function createOption(f,e,newValue,newText) 
{	//create options for our selects
	var objSelect = document.getElementById(e);
	var objOption = document.createElement("option");
	objNewText = document.createTextNode(newText);
	objOption.value = newValue;
	objOption.appendChild(objNewText);
	objSelect.appendChild(objOption);
}

equip = new Object ();
weap = new Object ();
dmg = new Object ();
savedships = new Object ();

cargoupgrade.value = 100;
manupgrade.value = 30;

ship = clone(ships[0]);
race = races[0];

for (i = 1; i <= 30; i++)
	weap[i] = clone(weapons[0]);

for (i = 1; i <= 12; i++)
	dmg[i] = 0;

for (i = 1; i <= 7; i++)
	equip[i] = clone(equipments[0]);

equip[8] = clone(equipments[race.equip]);

e=1;
