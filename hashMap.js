function HashMap () {
  let size = 16, loadFactor = 0.75;

  const buckets = new Array(size);
  for (let bucket = 0; bucket < size; bucket++) buckets[bucket] = { key: null, value: null}

  function hash (inputStr) {
    let code = 0;
    const primeNum = 31;
    for (let i = 0; i < inputStr.length; i++) code = code * primeNum + inputStr.charCodeAt(i);

    return code;
  };

  function validateIndex (index) {
    if (index < 0 || index >= size) throw new Error("Out of bound index");
  };

  return {
    hash,
    set: (key, value) => {
      let index = hash(key) % size;
      validateIndex(index);

      if (buckets[index].key == key) buckets[index].value = value
      else {
        buckets[index].key = key;
        buckets[index].value = value;
      };

      return buckets;
    },
  };
};

let newMap = HashMap();
console.log(newMap.set("Omega", "firstSet"), newMap.set("Omega", "overwrittenSet") );
