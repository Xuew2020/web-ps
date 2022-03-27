export const crateElement = document.createElement;

export const createDocumentFragment = document.createDocumentFragment;

export const append = (parentNode: Node, childNode: Node) => {
  parentNode.appendChild(childNode);
};

export const getBoundingRect = (node: Element) => {
  return node.getBoundingClientRect();
}
