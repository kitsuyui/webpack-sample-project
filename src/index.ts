import { Foo } from "./foo";

const greeting = (name: string): string => {
  return new Foo(name).showMessage();
};

const main = (): void => {
  greeting("World");
};

if (require.main === module) {
  main();
}
