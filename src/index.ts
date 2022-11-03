export type Config = {
  name: string;
  age: number;
};

export const sayHi = (config: Config) => {
  console.log("Hi" + config.name);
};
