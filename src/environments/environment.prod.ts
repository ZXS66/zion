const today = new Date();
export const environment = {
  production: true,
  builtTime: `${today.getFullYear()}.${(today.getMonth() + 1)}.${today.getDate()}`,
  locale: "zh",
  host: "https://johnzhu.cn",
  apiToken: "I'm blind, not dead.",
};
