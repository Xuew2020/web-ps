export const createElement = tag => document.createElement(tag);

export const createDocumentFragment = () => document.createDocumentFragment();

export const append = (parentNode: Node, childNode: Node) => {
  parentNode.appendChild(childNode);
};

export const getBoundingRect = (node: Element) => {
  return node.getBoundingClientRect();
}
