export type JsonData =
  | string
  | number
  | boolean
  | null
  | {[key: string]: JsonData}
  | JsonData[]
