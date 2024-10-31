export const placeholder = (str: string): string => `__{{${str}}}__`

export const replacePlaceholders = (text: string, values: Record<string, string | number>): string => {
  Object.entries(values).forEach(([key, value]) => {
    text = text.replaceAll(placeholder(key), `${value}`)
  })
  return text
}
