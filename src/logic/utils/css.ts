export const classNames = (...classes: (string | false | undefined)[]): string => classes.filter((x) => !!x).join(' ')
