type Positions = 'Batsman' | 'WicketKeeper' | 'AllRounder' | 'Bowler'

export type Player = {
    name: string,
    type: Positions,
    battingSkill: number,
    bowlingSkill: number,
    fieldingSkill: number
}

export type Fixture = Record<string, Player[]>

export { }
