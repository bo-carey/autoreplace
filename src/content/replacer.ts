import { Mutation } from '../utils/constants';

export const getTextNodes = (el: Element | Node = document.body): Element[] => {
  const treeWalker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (node: Node) => {
      if (node?.textContent?.length === 0
            || node?.parentNode?.nodeName === 'SCRIPT'
            || node?.parentNode?.nodeName === 'STYLE'
      ) {
        // Don't include 0 length, <script>, or <style> text nodes.
        return NodeFilter.FILTER_SKIP;
      } // else
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const textNodes = [];
  let node = treeWalker.nextNode();
  while (node) {
    textNodes.push(node as Element);
    node = treeWalker.nextNode();
  }
  return textNodes;
};

const textReplace = (mutation: Mutation, nodes: Element[]) => {
  const { query, replaceString, isCaseSensitive } = mutation;
  const searchValue = query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  const searchExp = new RegExp(searchValue, `g${isCaseSensitive ? '' : 'i'}`);
  console.log('textReplace::searchExp', searchExp);
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const currentValue = node.textContent || null;
    let newValue = currentValue;
    newValue = newValue?.replace(searchExp, replaceString) || null;
    if (currentValue && newValue && currentValue !== newValue) {
      node.textContent = newValue;
    }
  }
};

const regexReplace = (mutation: Mutation, nodes: Element[]) => {
  const { query, replaceString, isCaseSensitive } = mutation;
  try {
    const regexQuery = new RegExp(query, `g${isCaseSensitive ? '' : 'i'}`);
    console.log('regexReplace::regexQuery', regexQuery);
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const currentValue = node.textContent || null;
      const newValue = node.textContent?.replace(regexQuery, replaceString) || null;
      if (currentValue && newValue && currentValue !== newValue) {
        node.textContent = newValue;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const replaceText = (mutations: Mutation[], nodes: Element[]) => {
  console.log('replaceText', { mutations, nodes });
  mutations.forEach((pair) => {
    if (pair.isUsingRegex) {
      regexReplace(pair, nodes);
    } else {
      textReplace(pair, nodes);
    }
  });
};
