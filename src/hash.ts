const map = new WeakMap<object, string>();
export function hash(arg: any) {
  const argType = typeof arg;
  const constractor = arg && arg.constractor;

  if (Object(arg) === arg) {
    //this typeof object
    // cant be null nor undefined
    const result = map.get(arg);
    if (result) return result;

    // need to 
  }
}
