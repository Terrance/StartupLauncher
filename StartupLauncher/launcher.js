var shell = new ActiveXObject("WScript.Shell");
var menus =
[
	[
		"btnLaunchAll",
		"Launch All",
		"if (confirm('This will launch all apps and quit.  Are you sure?')) { launchAll(); window.close(); }"
	],
	[
		"btnDone",
		"Done",
		"if (confirm('Close Startup Launcher?')) { window.close(); }"
	],
	[
		"mnuAbout",
		"About...",
		[
			["Written by Ollie Terrance"],
			["http://terrance.x10.mx", "shell.run('http://terrance.x10.mx');"]
		]
	]
];
function resize(w, h)
{
	window.resizeTo(w, h);
	window.moveTo((screen.availWidth - w) / 2, (screen.availHeight - h) / 2);
}
function loadApps()
{
	var count = 0;
	for (var name in blocks)
	{
		addBlock(count, name, blocks[name]);
		count++;
	}
	window.resize(300, document.getElementById("blocks").offsetHeight + 80);
}
function addBlock(id, name, apps)
{
	code = '<button id="block' + id + '" class="block" onclick="launchApp(&quot;' + name + '&quot;, ' + id + ');">';
	code += '<h2>' + name + '</h2>';
	if (typeof(apps) == "object")
	{
		digest = [];
		others = [];
		for (var x in apps)
		{
			if (x < 3)
			{
				digest.push(apps[x][0]);
			}
			else
			{
				others.push(apps[x][0]);
			}
		}
		extra = "";
		if (apps.length > 3)
		{
			extra = ' and <span style="cursor: help;" title="' + others.join(", ") + '">' + others.length + ' more</span>';
		}
		digest = digest.join(", ") + extra + ".";
		code += '<span>' + digest + '</span>';
	}
	code += '</button>';
	document.getElementById("blocks").innerHTML += code;
}
function launchAll()
{
	var count = 0;
	for (var name in blocks)
	{
		button = document.getElementById("block" + count);
		if (button.className.indexOf("clicked") === -1)
		{
			launchApp(name, count);
		}
		count++;
	}
}
function launchApp(name, id)
{
	button = document.getElementById("block" + id);
	button.className = "block clicked";
	button.blur();
	if (typeof(blocks[name]) == "object")
	{
		for (var x in blocks[name])
		{
			shell.run(blocks[name][x][1]);
		}
	}
	else
	{
		shell.run(blocks[name]);
	}
}