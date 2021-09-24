import users, {User} from './users';
import Countries from './countries';
import browser from 'webextension-polyfill';


/**
 * Looks through the page to see if user data is available in 
 * the info table. If it is, parses user information from
 * the info table and saves it in the browser storage sync.
 */
const attemptToGatherData = async () => {
	const tableRows = document.querySelectorAll("table > tbody > tr") as NodeList;
	if (!tableRows) return;
	let gameRow = null as HTMLElement;
	let userRow = null as HTMLElement;
	Array.from(tableRows).forEach((el: Node) => {
		const header = (el as HTMLElement).querySelector('th') as HTMLElement;
		if (header && header.textContent === "Players") userRow = el as HTMLElement;
		if (header && header.textContent === "Game Name") gameRow = el as HTMLElement;
	});
	if (!gameRow || !userRow) return;
	const gameRowNode = (gameRow as HTMLElement).querySelector('td') as HTMLElement;
	const gameName = gameRowNode.textContent;
	const userListNodes = (userRow as HTMLElement).querySelector('td ul') as HTMLElement;
	const userData = [];
	for (let i = 0; i < userListNodes.children.length; i++) {
		const li = userListNodes.children[i] as HTMLElement;
		const anchor = li.children[0] as HTMLAnchorElement;
		const id = anchor.textContent.replace(/(^\s+)|(\s+$)/gm, "") || "";
		const name = id.replace(/#\d+/, "");
		const url = anchor.href || "";
		const country = li.lastChild.textContent.replace(/(^\s+)|(\s+$)/gm, "") || "";
		userData.push({id, name, url, country});
	}
	await users.set(gameName, userData);
}

const waitForElementToExist = (querySelector: string, callback: Function): void => {
	console.dir('waitForElementToExist')
	const interval = setInterval(() => {
		if (document.querySelector<HTMLElement>(querySelector) != null) {
			callback();
			clearInterval(interval);
		}
	}, 500);
}

const infoDiv = document.getElementById("info") as HTMLDivElement;
if (infoDiv != null) waitForElementToExist("table > tbody > tr", attemptToGatherData)