function HashMap () {
  let size = 16, populated = 0, loadFactor = 0.875, buckets = new Array(size);
  for (let bucket = 0; bucket < size; bucket++) buckets[bucket] = Node();

  function hash (inputStr) {
    let code = 0;
    const primeNum = 31;
    for (let i = 0; i < inputStr.length; i++) code = code * primeNum + inputStr.charCodeAt(i);

    return code;
  };

  function validateIndex (index) {
    if (index < 0 || index >= size) throw new Error("Out of bound index");
  };

  function expandMap () {
    size = size * 2;
    let newMap = new Array(size);
    for (let i = 0; i < size; i++) newMap[i] = buckets[i];

    buckets = newMap;
  };

  return {
    buckets, hash,
    set: (key, value) => {
      if (populated / size >= loadFactor) expandMap();
      let index = hash(key) % size;
      validateIndex(index);

      let currentNode = buckets[index];
      while (currentNode) {
        if (currentNode.key) {
          if (currentNode.key == key) return currentNode.value = value;
          if (!currentNode.next) currentNode.next = Node(key, value)
          else currentNode = currentNode.next;
        } else {
          currentNode.key = key;
          currentNode.value = value;
          break;
        }
      }
      return buckets;
    },

    get: (key) => {
      let index = hash(key) % size;
      validateIndex(index);

      let currentNode = buckets[index];
      while (currentNode) {
        if (currentNode.key == key) return currentNode.value;
        if (!currentNode.next) break;
        currentNode = currentNode.next;
      }

      return null;
    },
  };
};

function Node (key = null, value = null, next = null) {
  return { key, value, next };
};

let newMap = HashMap();
newMap.set("Omega", "first");
newMap.set("Alpha", "second");
newMap.set("hello", "third");
newMap.set("world", "fourth");
console.log(newMap.get("something"));
// console.log(newMap.buckets);
