import users from './users';

const countryNames = ["Russia", "Italy", "Germany", "France", "Austria", "Turkey"] as string[];
const gameData = {name: "", users: []};

/**
 * Looks through the page to see if user data is available in 
 * the info table. If it is, parses user information from
 * the info table and saves it in the browser storage sync.
 */
const attemptToGatherData = () => {
	const tableRows = document.querySelectorAll("#info .table tr") as NodeList;
	if (!tableRows) return;
	const userRow = Array.from(tableRows).find((el: Node) => {
		const header = (el as HTMLElement).querySelector('th') as HTMLElement;
		if (header && header.textContent === "Players") return true;
		return false;
	});
	users.reset("Some game");
	const dataNodes = (userRow as HTMLElement).querySelector('td ul') as HTMLElement;
	for (let i = 0; i < dataNodes.childNodes.length; i++) {
		const li = dataNodes.childNodes[i];
		const anchor = Array.from(li.childNodes).find((el: Node) => {
				return (el as HTMLElement).getElementsByTagName('a').item(0);
			}
		) as HTMLAnchorElement;
		let id = anchor?.textContent || "";
		let name = anchor?.textContent ? anchor.textContent.replace(/#\d+/, "") : "";
		let url = anchor?.href || "";
		let country = li.textContent || "";
		users.add("Some game", {id, name, url, country});
	}
}

document.addEventListener('load', attemptToGatherData);
const gameNav = document.getElementById("game-tabs") as HTMLElement;
if (gameNav) gameNav.addEventListener('click', attemptToGatherData);