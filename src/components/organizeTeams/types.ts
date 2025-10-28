export type TeamData = {
    players: string[]
}
export type AppData = { // TODO come up with better name
    playerPool: string[],
    team1: string[], // names of Players, e.g. 'Alice', 'Bob'
    team2: string[] // names of Players, e.g. 'Alice', 'Bob'
}
export type TeamIdx = 0 | 1
// ('team1'|'team2')
