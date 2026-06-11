export function constantHash(arg: any, seen?: Map<object, string>): string {
  const type = typeof arg;
  const constructor = arg && arg.constructor;

  if (constructor === Date) return arg.toJSON();

  if (Object(arg) === arg && constructor !== RegExp) {
    // the map is a per-call cycle guard only: hashes are recomputed on every
    // call so in-place mutations of the input are detected. Placeholders are
    // visit-order based, which keeps cyclic structures hashing stably.
    if (!seen) seen = new Map();
    const placeholder = seen.get(arg);
    if (placeholder !== undefined) return placeholder;
    seen.set(arg, '$' + seen.size + '~');

    if (constructor === Array) {
      let result = '@';
      for (const item of arg) {
        result += constantHash(item, seen) + ',';
      }
      return result;
    }

    if (constructor === Object) {
      let result = '#';
      const keys = Object.keys(arg).sort();
      for (const key of keys) {
        if (arg[key] !== undefined) {
          result += key + ':' + constantHash(arg[key], seen) + ',';
        }
      }
      return result;
    }

    // class instances, functions, RegExp-likes: stringify
    return String(arg);
  }

  if (type === 'symbol') return arg.toString();

  return type === 'string' ? JSON.stringify(arg) : '' + arg;
}
