import browser from 'webextension-polyfill';

interface User {
	id: string,
	name: string,
	url: string,
	country: string
}

/**
 * Empty user array for current game
 * @param {string} game - the name of the game, used as a key
 */
const reset = (game: string) => browser.storage.sync.remove(game);

/**
 * Saves a user to the storage sync under the specified game name
 * @param {string} game - the name of the game, used as a key
 * @param {User} user - the user object to save
 */
const add = async (game: string, user: User) => {
	const currentState = await browser.storage.sync.get(game) as User[];
	browser.storage.sync.set({[game]: [user, ...currentState]});
}

export default {
	reset,
	add
}