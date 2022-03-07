import { Mutation } from '../utils/constants';

export const getTextNodes = (el: Element = document.body): Element[] => {
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

const textReplace = ({
  query, replaceString, isCaseSensitive,
}: Mutation, nodes: Element[]) => {
  const casedQuery = isCaseSensitive ? query : query.toLowerCase();
  console.log('textReplace::casedQuery', casedQuery);
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const currentValue = node.textContent || null;
    let newValue = currentValue;
    newValue = newValue?.replace(casedQuery, replaceString) || null;
    if (currentValue && newValue && currentValue !== newValue) {
      node.textContent = newValue;
    }
  }
};

const regexReplace = ({
  query, replaceString, isCaseSensitive,
}: Mutation, nodes: Element[]) => {
  try {
    const regexQuery = new RegExp(query, `g${!isCaseSensitive ? 'i' : ''}`);
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
  mutations.forEach((pair) => {
    if (pair.isUsingRegex) {
      regexReplace(pair, nodes);
    } else {
      textReplace(pair, nodes);
    }
  });
};
