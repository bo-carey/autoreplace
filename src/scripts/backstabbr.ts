import users from './users';
import { cleanText, waitForElementToExist } from './utilities';

/**
 * Looks through the page to see if user data is available in
 * the info table. If it is, parses user information from
 * the info table and saves it in the browser storage sync.
 *
 * @param {NodeList} - tableRows
 */
const gatherUserDataAutomatically = (tableRows: NodeList): Promise<string> => {
  console.dir('gatherUserDataAutomatically');
  return new Promise(async (resolve, reject) => {
    if (!tableRows) return reject('gatherUserDataAutomatically::tableRows is falsey');
    let [gameRow, userRow]: HTMLElement[] = [];
    Array.from(tableRows).forEach((el: Node) => {
      const header = (el as HTMLElement).querySelector<HTMLElement>('th');
      console.log(`gatherUserDataAutomatically::header`, header);
      console.log(`gatherUserDataAutomatically::header.textContent`, header?.textContent);
      if (header && header.textContent === 'Players') userRow = el as HTMLElement;
      if (header && header.textContent === 'Game Name') gameRow = el as HTMLElement;
    });
    if (!gameRow || !userRow)
      return reject('gatherUserDataAutomatically::gameRow or userRow not found');
    const gameRowNode = (gameRow as HTMLElement).querySelector('td') as HTMLElement;
    const gameName = gameRowNode.textContent as string;
    const userListNodes = (userRow as HTMLElement).querySelector('td ul') as HTMLElement;
    const userData = [];
    for (const li of Array.from(userListNodes.children)) {
      const anchor = li.children[0] as HTMLAnchorElement;
      const id = cleanText(anchor.textContent as string);
      userData.push({
        id,
        name: id.replace(/#\d+/, ''),
        url: anchor.href,
        country: cleanText(li.lastChild ? (li.lastChild.textContent as string) : ''),
      });
    }
    await users.set(gameName, userData);
    resolve(gameName);
  });
};

const displayData = (gameName: string) => {
  waitForElementToExist('.playerlist').then(async () => {
    const userList = await users.get(gameName);
    if (!userList) return;
    const countryList = document.getElementsByClassName('country') as HTMLCollection;
    if (!countryList.length) return;
    Array.from(countryList).forEach((country) => {
      const newDiv = document.createElement('div');
      const nameSpan = document.createTextNode('Name');
      newDiv.appendChild(nameSpan);
      country.insertAdjacentElement('afterend', newDiv);
    });
  });
};

export function runBackstabbrAssistant(): void {
  const infoDiv = document.getElementById('info') as HTMLDivElement;
  if (infoDiv != null) {
    waitForElementToExist('#info table > tbody > tr')
      .then((element) => {
        const nodelist = element as unknown as NodeList;
        gatherUserDataAutomatically(nodelist)
          .then((gameName) => {
            displayData(gameName);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => console.error(err));
  }
}
