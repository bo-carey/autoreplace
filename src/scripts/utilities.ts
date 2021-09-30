/**
 * Queries a DOM element until it exists or a timeout is triggered.
 * @param {string} query - the string to pass to the query
 * @param {number} [expireTime = 30000] - time in ms to wait before ending execution
 * @returns {Promise<Element>}
 */
export const waitForElementToExist = (query: string, expireTime = 30000): Promise<Element> => {
  console.dir('waitForElementToExist');
  return new Promise((res, rej) => {
    let timeout: ReturnType<typeof setTimeout>;
    let elapsedTime = 0;
    const interval = setInterval(() => {
      const element = document.querySelector(query);
      if (element != null) {
        console.dir(`waitForElementToExist::element found in ${elapsedTime}s`);
        res(element);
        clearInterval(interval);
        clearTimeout(timeout);
      }
      elapsedTime += 0.5;
    }, 500);
    if (expireTime) {
      timeout = setTimeout(() => {
        rej(`waitForElementToExist::waited ${expireTime}ms - time expired`);
        clearInterval(interval);
      }, expireTime);
    }
  });
};

/**
 * Removes trailing whitespace from strings
 * @param {string} text
 * @returns {string}
 */
export const cleanText = (text = ''): string => text.replace(/(^\s+)|(\s+$)/gm, '');
