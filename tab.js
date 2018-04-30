const TABGROUP_DEFAULT = "DEFAULT_GROUP";
const TAB_COOKIE_NAME = "jstab_data";

var tab_groups = [];
var tab_cookie = {};

function restoreTabCookie(){
	for(let key in tab_cookie){
		setTabActive(tab_cookie[key], key);
		setTabContentVisible(tab_cookie[key], key);
	}
}

function readTabCookie(){
	let c = null;
	
	if(typeof readCookie === 'function')
		c = readCookie(TAB_COOKIE_NAME);
	
	if(c !== null){
		tab_cookie = JSON.parse(c);
	}
}

function setTabCookie(tabid, tabgroup){
	tab_cookie[tabgroup] = tabid;
	if(typeof setCookie === 'function'){
		setCookie(TAB_COOKIE_NAME, JSON.stringify(tab_cookie), 365);
	}
}

function setTabContentVisible(tabid, tabgroup){
	let tab_contents = document.getElementsByClassName("tabcontent");
	for(let i=0; i<tab_contents.length; i++){
		let tab_content = tab_contents[i];
		
		let group = tab_content.dataset.tabgroup;
		if(group === undefined){
			group = TABGROUP_DEFAULT;
		}
		
		if(tabgroup !== group)
			continue;
		
		let is_visible = tab_content.classList.contains("visible");
		if(tab_content.dataset.tabid == tabid){
			if(!is_visible){
				tab_content.classList.add("visible");
				if(typeof onTabChange === 'function')
					onTabChange(tabid, tabgroup);
			}
		}else{
			if(is_visible)
				tab_content.classList.remove("visible");
		}
	}
}

function setTabActive(tabid, tabgroup){
	for(let i=0; i<tab_groups[tabgroup].length; i++){
		let tabelem = tab_groups[tabgroup][i];
		if(tabelem.dataset.tabid == tabid)
			tabelem.classList.add("active");
		else
			tabelem.classList.remove("active");
	}
}

function onTabClick(tabid, tabgroup){
	setTabActive(tabid, tabgroup);
	setTabContentVisible(tabid, tabgroup);
	setTabCookie(tabid, tabgroup);
}

function registerTabHandlers(){
	for(let group in tab_groups){
		for(let i=0; i<tab_groups[group].length; i++){
			let tabelem = tab_groups[group][i];
			tabelem.addEventListener("click", function(){
				onTabClick(tabelem.dataset.tabid, group);
			});
		}
	}
}

function tabInit(){
	let tabs = document.getElementsByClassName("tab");
	for(let i=0; i<tabs.length; i++){
		let tabelem = tabs[i];
		
		let group = tabelem.dataset.tabgroup;
		if(group === undefined){
			group = TABGROUP_DEFAULT;
		}
		
		if(!(group in tab_groups)){
			tab_groups[group] = [];
		}
		tab_groups[group].push(tabelem);
		
		//default tab if cookie is not set
		if(tabelem.dataset.tabdefault !== undefined){
			tab_cookie[group] = tabelem.dataset.tabid;
		}
	}
	
	registerTabHandlers();
	readTabCookie();
	restoreTabCookie();
}
