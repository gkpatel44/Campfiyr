const development = process.env.NODE_ENV.trim() === "development";

export default function isDev() {
  console.log(
    "HAPPENIN IS IN DEV MODE?: ",
    process.env.NODE_ENV,
    " val: ",
    development
  );
  return development;
}
