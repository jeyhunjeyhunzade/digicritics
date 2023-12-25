export const classNames = (...classes: Array<string | null>) => {
  return classes.filter(Boolean).join(" ");
};
