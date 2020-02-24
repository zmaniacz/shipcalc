/**************************************************
* ShipCalc 2.8.01 - tdzksave.js
* Original by Madox--Modifications by ZmaniacZ
* More modifications by Mardak!
* Back to ZmaniacZ again
* If you want to use the code, please ask.
* zz@redial.net
* 2006-07-02
**************************************************/

var ver = "2.8";

//standard load a stupid cookie function
function getCookie(NameOfCookie)
{
	if (document.cookie.length > 0)
	{
		begin = document.cookie.indexOf(NameOfCookie+"=");
		if (begin != -1)
		{
			begin += NameOfCookie.length+1;
			end = document.cookie.indexOf(";", begin);
			if (end == -1)
				end = document.cookie.length;
			return unescape(document.cookie.substring(begin, end));
		}
		else
		{
			return 0;
		}
	}
	return 0;
}

//standard set a stupid cookie function.
function setCookie(NameOfCookie, value, expiredays)
{

	var ExpireDate = new Date ();
	ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));

	document.cookie = NameOfCookie + "=" + escape(value) + ((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
}

//standard delete a stupid cookie function
function delCookie (NameOfCookie)
{
	if (getCookie(NameOfCookie)) {
		document.cookie = NameOfCookie + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

//Tiny helper function that is, in fact, mostly worhtless
function addstringitem (string)
{
	return string+'_';
}

//delete all the calc cookies
function clearsaved ()
{
	for(var i=1; i <= 10; i++)
		delCookie (ver+"calc"+i);

	setCookie(ver+"lastship", 0, 1000);
	location.reload();
}

//Save off a ship to a cookie.
function saveship (id)
{
	var shipstring = '';

	shipstring = implodeshipstring(0);	//create the actual shipstring

	setCookie(ver+"calc"+id, shipstring, 1000);	//set the cookie for this ship
	setCookie(ver+"lastship", id, 1000);	//set a cookie noting that this was the most recently saved ship
	location.reload();	//reload the ShipCalc.
}

//Clean out nasty undefineds.  Really only means anything with older shipstrings moving to newer versions of calc.
function cleanstring(ss)
{
  return ss.replace(/\|undefined/, '|0').replace(/\|(?=\|)/g, '|0');
}

//Meat an potatoes function.  Does the actual work of creating the string.
function implodeshipstring (clickable)
{
	var shipstring = '';
	var str = '';
	if(clickable) {	//If the string is clickable, we have to be sure to replace any spaces with %20.  I suspect I could do more here, but fuck it.
		str = String(e.shipname.value);
		str = str.replace(/ \b/g,"%20");
		shipstring += addstringitem(str);
	}
	else
		shipstring += addstringitem(e.shipname.value);
	
	//the following lines all add numbers to the shipstring based on values currently displayed in the ShipCalc.
	shipstring += addstringitem(e.ship.value);
	
	shipstring += addstringitem(e.race.value);
	
	shipstring += addstringitem(e.eq1.value);
	shipstring += addstringitem(e.eq2.value);
	shipstring += addstringitem(e.eq3.value);
	shipstring += addstringitem(e.eq4.value);
	shipstring += addstringitem(e.eq5.value);
	shipstring += addstringitem(e.eq6.value);
	shipstring += addstringitem(e.eq7.value);
	
	shipstring += addstringitem(e.weapons1.value);
	shipstring += addstringitem(e.weapons2.value);
	shipstring += addstringitem(e.weapons3.value);
	shipstring += addstringitem(e.weapons4.value);
	shipstring += addstringitem(e.weapons5.value);
	shipstring += addstringitem(e.weapons6.value);
	shipstring += addstringitem(e.weapons7.value);
	shipstring += addstringitem(e.weapons8.value);
	shipstring += addstringitem(e.weapons9.value);
	shipstring += addstringitem(e.weapons10.value);
	shipstring += addstringitem(e.weapons11.value);
	shipstring += addstringitem(e.weapons12.value);
	shipstring += addstringitem(e.weapons13.value);
	shipstring += addstringitem(e.weapons14.value);
	shipstring += addstringitem(e.weapons15.value);
	shipstring += addstringitem(e.weapons16.value);
	shipstring += addstringitem(e.weapons17.value);
	shipstring += addstringitem(e.weapons18.value);
	shipstring += addstringitem(e.weapons19.value);
	shipstring += addstringitem(e.weapons20.value);
	shipstring += addstringitem(e.weapons21.value);
	shipstring += addstringitem(e.weapons22.value);
	shipstring += addstringitem(e.weapons23.value);
	shipstring += addstringitem(e.weapons24.value);
	shipstring += addstringitem(e.weapons25.value);
	shipstring += addstringitem(e.weapons26.value);
	shipstring += addstringitem(e.weapons27.value);
	shipstring += addstringitem(e.weapons28.value);
	shipstring += addstringitem(e.weapons29.value);
	shipstring += addstringitem(e.weapons30.value);
	
	for(var i=0; i < numupgrades; i++)
		shipstring += addstringitem(upgrades[i].amount);
		
	shipstring += addstringitem(e.scoutdrones.value);
	shipstring += addstringitem(e.combatdrones.value);
	shipstring += addstringitem(e.resourcedrones.value);
	shipstring += addstringitem(e.repairdrones.value);
	shipstring += addstringitem(e.minedrones.value);
	shipstring += addstringitem(e.empdrones.value);
	shipstring += addstringitem(e.shielddrones.value);
	
	shipstring += addstringitem(e.plvl.value);
	shipstring += addstringitem(e.accaura.value);
	shipstring += addstringitem(e.dmgaura.value);
	shipstring += addstringitem(e.droneaura.value);
	shipstring += addstringitem(e.poweraura.value);
	shipstring += addstringitem(e.repaura.value);
	shipstring += addstringitem(e.pfiremode.value);
	shipstring += addstringitem(e.powToShdPct.value);
	shipstring += addstringitem(e.minPowPct.value);
	shipstring += addstringitem(e.minShdPct.value);
	shipstring += addstringitem(e.armShield.value);
	shipstring += addstringitem(e.armCombat.value);
	//shipstring += addstringitem(e.armScout.value);
	shipstring += addstringitem(e.armEMP.value);
	shipstring += addstringitem(e.armRepair.value);
	shipstring += addstringitem(e.armRemainingType.value);
	
	//clean it and compres it
	shipstring = cleanstring(shipstring);
	shipstring = ssCompress(shipstring);

	if(clickable)
		return "http://www.redial.net/shipcalc"+ver+".shtml?s="+shipstring;
	else
		return shipstring;
}

//decodes a shipstring.  Esentially, the reverse of implodeshipstring()
function explodeshipstring (shipstring, clickable)
{
	//decompress it and clean again for good measure
	shipstring = ssDecompress(shipstring);
	shipstring = cleanstring(shipstring);

	//split out the shipstring from the URL
	var i=0;
	if (clickable == 1)
	{
		var tempArray = shipstring.split('=');
		var stringArray = tempArray[1].split('_');
	}
	else
	{
		var stringArray = shipstring.split('_');
	}
	
	//Next set of lines pull out values and populate the ShipCalc
	e.shipname.value = stringArray[i++];
	e.defaultName.value = 0;

	//Calling SelectShip() necessary to load values correctly.  i.e. make sure 6 Carrier cargo upgrades are worth less than the same ona freighter
	e.ship.value = parseInt(stringArray[i++]);
	selectShip();

	//Call SelectRace() for same reasons except for racial adjustments
	e.race.value = parseInt(stringArray[i++]);
	selectRace();

	e.eq1.value = stringArray[i++];
	e.eq2.value = stringArray[i++];
	e.eq3.value = stringArray[i++];
	e.eq4.value = stringArray[i++];
	e.eq5.value = stringArray[i++];
	e.eq6.value = stringArray[i++];
	e.eq7.value = stringArray[i++];
	selectEq();

	e.weapons1.value = stringArray[i++];
	e.weapons2.value = stringArray[i++];
	e.weapons3.value = stringArray[i++];
	e.weapons4.value = stringArray[i++];
	e.weapons5.value = stringArray[i++];
	e.weapons6.value = stringArray[i++];
	e.weapons7.value = stringArray[i++];
	e.weapons8.value = stringArray[i++];
	e.weapons9.value = stringArray[i++];
	e.weapons10.value = stringArray[i++];
	e.weapons11.value = stringArray[i++];
	e.weapons12.value = stringArray[i++];
	e.weapons13.value = stringArray[i++];
	e.weapons14.value = stringArray[i++];
	e.weapons15.value = stringArray[i++];
	e.weapons16.value = stringArray[i++];
	e.weapons17.value = stringArray[i++];
	e.weapons18.value = stringArray[i++];
	e.weapons19.value = stringArray[i++];
	e.weapons20.value = stringArray[i++];
	e.weapons21.value = stringArray[i++];
	e.weapons22.value = stringArray[i++];
	e.weapons23.value = stringArray[i++];
	e.weapons24.value = stringArray[i++];
	e.weapons25.value = stringArray[i++];
	e.weapons26.value = stringArray[i++];
	e.weapons27.value = stringArray[i++];
	e.weapons28.value = stringArray[i++];
	e.weapons29.value = stringArray[i++];
	e.weapons30.value = stringArray[i++];
	selectWeapons ();

	for(var j=0; j < numupgrades; j++)
		addUpgrade(j,parseInt(stringArray[i++]),1);

	e.scoutdrones.value = stringArray[i++];
	e.combatdrones.value = stringArray[i++];
	e.resourcedrones.value = stringArray[i++];
	e.repairdrones.value = stringArray[i++];
	e.minedrones.value = stringArray[i++];
	e.empdrones.value = stringArray[i++];
	e.shielddrones.value = stringArray[i++];
	e.plvl.value = stringArray[i++];
	
	resetAuras();
	if(stringArray[i] == "NaN")
	{
		for(var j=0; j < numauras; j++)
			addAura(j,0,0);
	}
	else 
	{
		for(var j=0; j < numauras; j++)
			addAura(j,parseInt(stringArray[i++]),0);
	}
	
	e.pfiremode.value = stringArray[i++];
	
	e.powToShdPct.value = 0;
	e.minPowPct.value = 20;
	e.minShdPct.value = 50;
	if(stringArray[i] != null)
	{
		e.powToShdPct.value = stringArray[i++];
		e.minPowPct.value = stringArray[i++];
		e.minShdPct.value = stringArray[i++];
	}
	
	if(stringArray[i] != null)
	{
		e.armShield.value = stringArray[i++];
		e.armCombat.value = stringArray[i++];
		//e.armScout.value = stringArray[i++];
		e.armEMP.value = stringArray[i++];
		e.armRepair.value = stringArray[i++];
	}
	
	if(stringArray[i] != null)
	{
		e.armRemainingType.value = stringArray[i++];
	}
	
	selectEq();
	updateShip();
}

function loadshipname (id)
{
	var shipstring = getCookie(ver+"calc"+id);

	if(shipstring==0)
		return "None";

	var stringArray = shipstring.split('_');
		return stringArray[0];
}

function loadship (id)
{
	if(id==0)
		return 0;

	selectShip(1);
	var shipstring = getCookie(ver+"calc"+id);
	explodeshipstring(shipstring, 0);
}

function delship (id)
{
	delCookie (ver+"calc"+id);
	location.reload();
}

function ssCompress(ss) {
  var tmp;
  
	while (tmp = ss.match(/_((\d+_)\2+)/)) { 
		ss = ss.replace(new RegExp(tmp[0]), '_' + tmp[2].substring(0,tmp[2].length-1) + '!' + (tmp[1].length/tmp[2].length) + '_');
	}
  
  return ss;
}

function ssDecompress(ss) {
  var tmp, i;
  
	while(tmp = ss.match(/_(\d+)\!(\d+)_/)) { 
		rep = ''; 
		for (i = 0; i < tmp[2]; i++) { 
			rep += tmp[1] + '_';
		}
		ss = ss.replace(new RegExp(tmp[0].replace(/\./g, '\\!')), '_' + rep);
	}
  
  return ss;
}