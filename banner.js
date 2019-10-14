const shortcutColors=["FF4351","FD6631","FE9949","FEC418","FFD426","19BD03","55DAE1","1B9AF7","3871DE","7B72E9","DB49D8","000000","ED4694","B4B2A9","A9A9A9"];
const iosSafari=/iP[aoh](d|one).+?Safari/g;

function closestShortcutColor(color) {
function dist(s, t) {
        if (!s.length || !t.length) 
            return 0;
        return dist(s.slice(2), t.slice(2)) + Math.abs(parseInt(s.slice(0, 2), 16) - parseInt(t.slice(0, 2), 16));
    }
if(!color){
color="000000"
}
        return shortcutColors.sort(function (a, b) {
            return dist(a, str) - dist(b, str);
        })[0];
    };

function makeShortcutURL(url, name, color) {
    color = parseInt(color, 16);
    var plist =`
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>WFWorkflowActions</key>
	<array>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.comment</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>WFCommentActionText</key>
				<string>Generated by @easrng's Shortcut install banner script.</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.url</string>
			<key>WFWorkflowActionParameters</key>
			<dict>
				<key>WFURLActionURL</key>
				<string>${url}</string>
			</dict>
		</dict>
		<dict>
			<key>WFWorkflowActionIdentifier</key>
			<string>is.workflow.actions.showwebpage</string>
			<key>WFWorkflowActionParameters</key>
			<dict/>
		</dict>
	</array>
	<key>WFWorkflowClientRelease</key>
	<string>2.2.2</string>
	<key>WFWorkflowClientVersion</key>
	<string>788</string>
	<key>WFWorkflowIcon</key>
	<dict>
		<key>WFWorkflowIconGlyphNumber</key>
		<integer>59717</integer>
		<key>WFWorkflowIconImageData</key>
		<data>
             
		</data>
		<key>WFWorkflowIconStartColor</key>
		<integer>${color}</integer>
	</dict>
	<key>WFWorkflowImportQuestions</key>
	<array/>
<key>WFWorkflowName</key>
	<string><proxy></string>
	<key>WFWorkflowInputContentItemClasses</key>
	<array>
		<string>WFAppStoreAppContentItem</string>
		<string>WFArticleContentItem</string>
		<string>WFContactContentItem</string>
		<string>WFDateContentItem</string>
		<string>WFEmailAddressContentItem</string>
		<string>WFGenericFileContentItem</string>
		<string>WFImageContentItem</string>
		<string>WFiTunesProductContentItem</string>
		<string>WFLocationContentItem</string>
		<string>WFDCMapsLinkContentItem</string>
		<string>WFAVAssetContentItem</string>
		<string>WFPDFContentItem</string>
		<string>WFPhoneNumberContentItem</string>
		<string>WFRichTextContentItem</string>
		<string>WFSafariWebPageContentItem</string>
		<string>WFStringContentItem</string>
		<string>WFURLContentItem</string>
	</array>
	<key>WFWorkflowTypes</key>
	<array>
		<string>WatchKit</string>
	</array>
</dict>
</plist>
`
    url = "shortcuts://import-shortcut/?url=" + encodeURIComponent("data:application/octet-stream;base64," + btoa(plist)) + "&name=" + encodeURIComponent(name);
    return (url);
}

if(
!!navigator.userAgent.match(iosSafari) // is MobileSafari
&&
!navigator.standalone // Not Homescreen
&&
localStorage.getItem("_shortcutInstalled")!="1" // Shortcut not installed
){
var name=document.querySelector('meta[name="apple-mobile-web-app-title"]')
name=name?name.content:document.title


var color=document.querySelector('meta[name="theme-color"]').content.slice(1);

color=closestShortcutColor(color);
url=makeShortcutURL(document.location.href, name,color + "FF");


var t=document.createElement("div")
t.setAttribute("style","box-sizing:border-box;font-family:system-ui,-apple-system,sans-serif;background-color: #f3f3f2; width: 100%;position:fixed;top:0;left:0;display:flex;flex-direction:row;padding:0.5em;align-items:center;height:4em;transform:translateY(-4em);")

t.innerHTML=`<div style="text-align: center;"><a href="javascript:;" style="color: #7f7f7e;text-decoration:underline;" onclick="localStorage.setItem('_shortcutInstalled','1');document.querySelector(':root').style.transform='';this.parentElement.parentElement.remove();">&times;</a></div>
<div style="box-sizing:border-box;margin-left:0.5em;width: 3em; height: 3em; border-radius:0.8em; background: #${color};padding:0.2em;"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIg%0D%0ANTEyIj48cGF0aCBkPSJNMjgwLjUgMjgwLjVsLTQ5LTQ5Yy0uOS0uOS0yLjUtLjctMy4yLjRsLTQ5%0D%0ALjUgOTguNWMtMS4xIDEuOCAxIDMuOSAyLjggMi44bDk4LjUtNDkuNWMxLjEtLjcgMS4zLTIuMy40%0D%0ALTMuMnoiLz48cGF0aCBkPSJNMjU2IDQ4QzE0MS4xIDQ4IDQ4IDE0MS4xIDQ4IDI1NnM5My4xIDIw%0D%0AOCAyMDggMjA4IDIwOC05My4xIDIwOC0yMDhTMzcwLjkgNDggMjU2IDQ4em00MC42IDI0OS4zTDEz%0D%0ANyAzNzcuOGMtMS44IDEuMS0zLjktMS0yLjgtMi44bDgwLjYtMTU5LjZjLjItLjMuNC0uNS43LS43%0D%0ATDM3NSAxMzQuMmMxLjgtMS4xIDMuOSAxIDIuOCAyLjhsLTgwLjYgMTU5LjZjLS4xLjMtLjMuNS0u%0D%0ANi43eiIvPjwvc3ZnPg==" style="filter:invert(1);width:100%;height:100%;"></div>
<div style="color: #3a3a39;margin-left:0.5em;flex-grow:1;">${name}<div style="font-size:0.8em;">GET — On Shortcuts</div></div>
<div style="text-align: center;"><a style="text-decoration: none; color: #007aff;margin-left:0.5em;" href="${url}" onclick="localStorage.setItem('_shortcutInstalled','1');document.querySelector(':root').style.transform='';this.parentElement.parentElement.remove();">View</a></div>`

document.querySelector(":root").style.transform="translateY(4em)"
document.querySelector(":root").appendChild(t);
}
}
