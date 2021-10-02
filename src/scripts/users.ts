import browser from 'webextension-polyfill';

export interface User {
  id: string;
  name: string;
  url: string;
  country: string;
}

/**
 * Empty user array for current game
 * @param {string} game - the name of the game, used as a key
 */
const reset = (game: string): Promise<void> => browser.storage.sync.remove(game);

/**
 * Gets users from the storage sync using the specified game name as the key
 * @param {string} game - the name of the game, used as a key
 * @returns {Promise<Record>}
 */
const get = (game: string): Promise<Record<string, User[]>> => browser.storage.sync.get(game);

/**
 * Saves users to the storage sync under the specified game name
 * @param {string} game - the name of the game, used as a key
 * @param {User[]} users - the user array
 */
const set = (game: string, users: User[]): Promise<void> =>
  browser.storage.sync.set({ [game]: users });

export default {
  reset,
  set,
  get,
};
