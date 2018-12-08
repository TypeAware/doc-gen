const x = {
  foo: 'zoom1',
  bar: 'zoom2',
};

x.x = x;

const v = [x, x, x];

// const cache = new Set();
const sym = Symbol('circular.ref');

v[sym] = new Set();

const result = JSON.stringify(v, (key, val) => {
  
  // if(val === x){
  //   return {bar: val.bar};
  // }
  
  const cache = val[sym] || new Set();
  
  if (val && typeof val === 'object') {
    
    val[sym] = new Set(Array.from(cache));
    
    if (cache.has(val)) {
      // Circular reference found, discard key
      return '(circular ref)';
    }
    // Store value in our map
    cache.add(val);
  }
  
  
  return val;
  
});

console.log({result});