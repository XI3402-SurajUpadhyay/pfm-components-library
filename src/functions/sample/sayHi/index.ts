export type Config = {
    name: string;
    age: number;
    phone: string;
  };
  
  export const sayHi = (config: Config) => {
    console.log("Hi" + config.name);
  };
  