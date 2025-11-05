export type BankRecord = {
    date: string,
    description: string,
    type: 0 | 1,  // 0 = Credit, 1 = Debit
    amount: number,
    balance: string
}
export { }
