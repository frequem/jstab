const TAB_DEFAULT = "0";
const TABID_COOKIE_NAME = "tabid";

function getTabCookie(default_tabid=TAB_DEFAULT){
	let tabid = default_tabid;
	
	if(typeof readCookie === 'function')
		tabid = readCookie(TABID_COOKIE_NAME);
	return tabid || default_tabid;
}

function setTabCookie(tabid){
	if(typeof setCookie === 'function')
		setCookie(TABID_COOKIE_NAME, tabid, 365);
}

function showTabContent(tabid){
	let tab_contents = document.getElementsByClassName("tabcontent");
	for(let i=0; i<tab_contents.length; i++){
		let tab_content = tab_contents[i];
		let is_visible = tab_content.classList.contains("visible");
		if(tab_content.dataset.tabid == tabid){
			if(!is_visible){
				tab_content.classList.add("visible");
				if(typeof onTabChange === 'function')
					onTabChange(tabid);
			}
		}else{
			if(is_visible)
				tab_content.classList.remove("visible");
		}
	}
}

function onTabClick(tabid){
	let tabs = document.getElementsByClassName("tab");
	for(let i=0; i<tabs.length; i++){
		let tab = tabs[i];
		if(tab.dataset.tabid == tabid)
			tab.classList.add("active");
		else
			tab.classList.remove("active");
	}
	showTabContent(tabid);
	setTabCookie(tabid);
}

function registerTabHandlers(){
	tabs = document.getElementsByClassName("tab");
	for(let i=0; i<tabs.length; i++){
		let tab = tabs[i];
		tab.addEventListener("click", function(){
			onTabClick(tab.dataset.tabid);
		});
	}
}

function tabInit(){
	registerTabHandlers();
	onTabClick(getTabCookie());
}
