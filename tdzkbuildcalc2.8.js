				document.getElementById("ship").remove(0);
				for(i = 0; i < numships; i++)
					createOption("form","ship",i,ships[i].name);

				document.getElementById("form").elements["race"].remove(0);
				for(i = 0; i < numraces; i++)
					createOption("form","race",i,races[i].name);

				document.getElementById("form").elements["saveshipmenu"].remove(0);
				for(i = 1; i <= 10; i++)
					createOption("form","saveshipmenu",i,loadshipname(i));
	
				document.getElementById("form").elements["erace"].remove(0);
				for(i = 0; i < numraces; i++)
					createOption("form","erace",i,races[i].name);
	
				for(i = 1; i <= 7; i++)
				{
					document.getElementById("form").elements["eq"+i].remove(0);
					for(j = 0; j < numequipment; j++)
						if(equipments[j].name != "Jump Drive & Positron Gap Generator" && equipments[j].name != "Polymorphic Armor")
							createOption("form","eq"+i,j,equipments[j].name);
				}
	
				for(i = 1; i <= 10; i++)
				{
					document.getElementById("form").elements["weapons"+i].remove(0);
					for(j = 0; j < numweapons; j++)
						if(weapons[j].Type==1)
							createOption("form","weapons"+i,j,weapons[j].Name);
				
					document.getElementById("form").elements["weapons"+(i+10)].remove(0);
					for(j = 0; j < numweapons; j++)
						if(weapons[j].Type==1)
							createOption("form","weapons"+(i+10),j,weapons[j].Name);
				
					document.getElementById("form").elements["weapons"+(i+20)].remove(0);
					for(j = 0; j < numweapons; j++)
						if(weapons[j].Type==2)
							createOption("form","weapons"+(i+20),j,weapons[j].Name);
				}