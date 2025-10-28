export type TeamData = {
    players: string[]
}

export type AppData = Record<'playerPool'|'team1'|'team2', string[]> // TODO come up with better name

export type TeamIdx = 0 | 1
