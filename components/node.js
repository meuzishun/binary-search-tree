export function createNode(value) {
  const node = {
    value: value,
    left: null,
    right: null,
  };

  function getValueMethod(node) {
    return {
      getValue() {
        return node.value;
      },
    };
  }

  function setValueMethod(node) {
    return {
      setValue(value) {
        node.value = value;
      },
    };
  }

  function getLeftMethod(node) {
    return {
      getLeftNode() {
        return node.left;
      },
    };
  }

  function setLeftMethod(node) {
    return {
      setLeftNode(value) {
        node.left = value;
      },
    };
  }

  function getRightMethod(node) {
    return {
      getRightNode() {
        return node.right;
      },
    };
  }

  function setRightMethod(node) {
    return {
      setRightNode(value) {
        node.right = value;
      },
    };
  }

  return Object.assign(
    {},
    getValueMethod(node),
    setValueMethod(node),
    getLeftMethod(node),
    setLeftMethod(node),
    getRightMethod(node),
    setRightMethod(node)
  );
}
