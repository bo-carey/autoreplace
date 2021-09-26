import users, {User} from './users';
import Countries from './countries';
import browser from 'webextension-polyfill';
import { rejects } from 'assert';

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
		const id = anchor.textContent.replace(/(^\s+)|(\s+$)/gm, "") || "";
		const name = id.replace(/#\d+/, "");
		const url = anchor.href || "";
		const country = li.lastChild.textContent.replace(/(^\s+)|(\s+$)/gm, "") || "";
		userData.push({id, name, url, country});
	}
	await users.set(gameName, userData);
}

/**
 * Queries a DOM element until it exists or a timeout is triggered.
 * @param {string} query - the string to pass to the query
 * @param {number} [expireTime = 30000] - time in ms to wait before ending execution
 * @returns {Promise<HTMLElement>}
 */
const waitForElementToExist = (query: string, expireTime: number = 30000): Promise<HTMLElement> => {
	console.dir("waitForElementToExist");
	return new Promise((res, rej) => {
		let timeout = null;
		let interval = null;
		interval = setInterval(() => {
			const element = document.querySelector<HTMLElement>(query);
			if (element != null) {
				res(element)
				clearInterval(interval);
				clearTimeout(timeout);
			}
		}, 500);
		if (expireTime) {
			timeout = setTimeout(() => {
				rej(`waitForElementToExist::waited ${expireTime}ms - time expired`);
				clearInterval(interval);
			}, expireTime);
		}
	})
}

const infoDiv = document.getElementById("info") as HTMLDivElement;
if (infoDiv != null) {
	waitForElementToExist("table > tbody > tr")
		.then(element => gatherData())
		.catch(err => console.error(err))
}