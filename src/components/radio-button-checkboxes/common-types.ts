export const UserOption = { // UserOption keys and values
    KEEP: 'Keep',
    CANCEL: 'Cancel',
} as const
export const userOptionKeys = Object.keys(UserOption) as (keyof typeof UserOption)[]
export type ValueOf<T> = T[keyof T]

export type UserOptionValueType = ValueOf<typeof UserOption> // Allowed values for UserOption
export type UserOptionKey = keyof typeof UserOption // Allowed keys for UserOption
const values = Object.entries(UserOption) as [
    UserOptionKey,
    (typeof UserOption)[UserOptionKey],
][];
export const UserOptionValues: UserOptionValueType[] = values.reduce((accum: UserOptionValueType[], [, value]) => accum.concat(value), [] as UserOptionValueType[])
