function HashMap () {
  let size = 16, populated = 0, loadFactor = 0.875, buckets = new Array(size),
  length = 0, keys = [], values = [], keysValuePairs = [];

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

  function retrieve (key, get) {
    const index = hash(key) % size;
    let result = get == false ? false : null;
    validateIndex(index);

    let currentNode = buckets[index];
    while (currentNode) {
      if (currentNode.key == key) {
        result = get == false ? true : currentNode.value;
        break;
      }; if (!currentNode.next) break;
      currentNode = currentNode.next;
    }

    return result;
  };

  return {
    buckets, hash, length: () => length, keys: () => keys, values: () => values, entries: () => keysValuePairs,
    set: (key, value) => {
      if (populated / size >= loadFactor) expandMap();
      const index = hash(key) % size;
      validateIndex(index);

      let currentNode = buckets[index];

      while (currentNode) {
        if (currentNode.key) {
          if (currentNode.key == key) {
            currentNode.value = values[currentNode.index] = keysValuePairs[currentNode.index][1] = value;
            break;
          };

          if (!currentNode.next) {
            currentNode.next = Node(key, value, length);
            const index = currentNode.next.index;

            keys[index] = key;
            values[index] = value;
            keysValuePairs[index] = [key, value];

            length++;
            break;
          }; currentNode = currentNode.next;
        } else {
          currentNode.key = key;
          currentNode.value = value;
          currentNode.index = length;

          const index = currentNode.index;

          keys[index] = key;
          values[index] = value;
          keysValuePairs[index] = [key, value];

          length++;
          break;
        };
      }
    },

    get: (key) => retrieve(key, true),
    has: (key) => retrieve(key, false),
    clear: () => {
      for (let i = 0; i < size; i++) buckets[i] = Node();
      keys = values = keysValuePairs = [];
    },

    remove: (key) => {
      const index = hash(key) % size;
      validateIndex(index);

      let removed = false, currentNode = buckets[index], prevNode = null;

      while (currentNode) {
        if (currentNode.key == key) {
          if (prevNode) prevNode.next = currentNode.next;
          else buckets[index] = currentNode.next ? currentNode.next : Node();
          
          keys.splice(currentNode.index, 1);
          values.splice(currentNode.index, 1);
          keysValuePairs.splice(currentNode.index, 1);

          while (currentNode.next) {
            currentNode.next.index = currentNode.index;
            currentNode = currentNode.next;
          }

          length--;
          removed = true;
          break;
        };

        prevNode = currentNode;
        currentNode = currentNode.next;
      }

      return removed;
    },
  };
};

function Node (key = null, value = null, index = null, next = null) {
  return { key, value, index, next };
};

let newMap = HashMap();
newMap.set("Omega", "First");
newMap.set("Alpha", "second");
newMap.set("hello", "third");
newMap.set("world", "fourth");
newMap.set("openai", "fifth");
newMap.set("Omega", "first");
// newMap.remove("world");
// newMap.clear();
// console.log(newMap.buckets, newMap.get("Omega"));
// console.log(newMap.buckets, newMap.remove("Omega"), newMap.buckets);
// console.log(newMap.buckets);
console.log(newMap.buckets, newMap.keys(), newMap.values(), newMap.entries());
