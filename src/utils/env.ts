

//shorthand function for process.env.NAME
export function env(varName: string) {
  return process.env[varName];
}