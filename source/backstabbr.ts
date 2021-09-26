import users, {User} from './users';
import Countries from './countries';
import { cleanText, waitForElementToExist } from './utilities';

/**
 * Looks through the page to see if user data is available in 
 * the info table. If it is, parses user information from
 * the info table and saves it in the browser storage sync.
 */
const gatherData = async () => {
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
		const id = cleanText(anchor.textContent) || "";
		const name = id.replace(/#\d+/, "");
		const url = anchor.href || "";
		const country = cleanText(li.lastChild.textContent) || "";
		userData.push({id, name, url, country});
	}
	await users.set(gameName, userData);
}

const displayData = (gameName) => {
	waitForElementToExist(".playerlist")
		.then(async (playerCountry) => {
			const userList = await users.get(gameName);
			if (!userList) return;
			const countryList = document.getElementsByClassName("country") as HTMLCollection;
			if (!countryList.length) return;
			Array.from(countryList).forEach(country => {
				const newDiv = document.createElement('div');
				const nameSpan = document.createTextNode("Name");
				newDiv.appendChild(nameSpan);
				country.insertAdjacentElement("afterend", newDiv)
			});
		})
}

const infoDiv = document.getElementById("info") as HTMLDivElement;
if (infoDiv != null) {
	waitForElementToExist("table > tbody > tr")
		.then(element => gatherData())
		.catch(err => console.error(err))
}