const table = new WeakMap<object, string>();
let counter = 0;
export function constantHash(arg: any): string {
  const type = typeof arg;
  const constructor = arg && arg.constructor;
  const isDate = constructor === Date;

  if (Object(arg) === arg && !isDate && constructor !== RegExp) {
    const existing = table.get(arg);
    if (existing) return existing;

    let result = ++counter + '~';
    table.set(arg, result); 

    if (constructor === Array) {
      result = '@'; 
      for (const item of arg) {
        result += constantHash(item) + ','; 
      }
      table.set(arg, result);
    }

    else if (constructor === Object) {
      result = '#'; 
      const keys = Object.keys(arg).sort(); 
      for (const key of keys) {
        if (arg[key] !== undefined) {
          result += key + ':' + constantHash(arg[key]) + ','; 
        }
      }
      table.set(arg, result);
    }

    return result;
  }

  if (isDate) return arg.toJSON();

  if (type === 'symbol') return arg.toString();

  return type === 'string' ? JSON.stringify(arg) : '' + arg;
}
