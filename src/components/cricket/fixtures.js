const fixtures = {
  TenOkPlayers: [
    { // Batsman-Bowlers 1, total = 1
      'name': 'Rohit Sharma',
      'type': 'Batsman',
      'battingSkill': 90,
      'bowlingSkill': 90,
      'fieldingSkill': 90
    },
    { // Batsmen/Bowlers 2, total = 2
      'name':'Virat Kohli',
      'type': 'Batsman',
      'battingSkill': 90,
      'bowlingSkill': 70,
      'fieldingSkill': 80
    },
    { // Batsmen/Bowlers 3, total = 3
      'name':'Jasprit Bumrah',
      'type':'Bowler',
      'battingSkill': 50,
      'bowlingSkill': 90,
      'fieldingSkill': 70
    },
    { // Batsmen/Bowlers 4, total = 4
      'name':'Kuldeep Yadav',
      'type':'Bowler',
      'battingSkill': 50,
      'bowlingSkill': 85,
      'fieldingSkill': 75
    },
    { // Batsmen/Bowlers 5 total = 5
      'name': 'Shubhman Gill',
      'type': 'Batsman',
      'battingSkill': 84,
      'bowlingSkill': 32,
      'fieldingSkill': 84
    },
    { // Batsmen/Bowlers 6 (max allowed), total = 6
      'name': 'Mohammed Shami',
      'type': 'Bowler',
      'battingSkill': 32,
      'bowlingSkill': 91,
      'fieldingSkill': 80
    },
    { // WicketKeeper 1, max allowed; total = 7
      'name':'Ishaan Kishan',
      'type':'WicketKeeper',
      'battingSkill': 84,
      'bowlingSkill': 30,
      'fieldingSkill': 80
    },
    { // AllRounder 1, total = 8
      'name':'Ravindra Jadeja',
      'type':'AllRounder',
      'battingSkill': 90,
      'bowlingSkill': 80,
      'fieldingSkill': 95
    },
    { // AllRounder 2, total = 9
      'name':'Hardik Pandya',
      'type':'AllRounder',
      'battingSkill': 80,
      'bowlingSkill': 70,
      'fieldingSkill': 90
    },
    {  // AllRounder 3, total = 10
      'name':'Ravichandran Ashwin',
      'type':'AllRounder',
      'battingSkill': 70,
      'bowlingSkill': 90,
      'fieldingSkill': 80
    }
  ],
  ElevenOkPlayers: [
    { // Batsman-Bowlers 1, total = 1
      'name': 'Rohit Sharma',
      'type': 'Batsman',
      'battingSkill': 90,
      'bowlingSkill': 90,
      'fieldingSkill': 90
    },
    { // Batsmen/Bowlers 2, total = 2
      'name':'Virat Kohli',
      'type': 'Batsman',
      'battingSkill': 90,
      'bowlingSkill': 70,
      'fieldingSkill': 80
    },
    { // Batsmen/Bowlers 3, total = 3
      'name':'Jasprit Bumrah',
      'type':'Bowler',
      'battingSkill': 50,
      'bowlingSkill': 90,
      'fieldingSkill': 70
    },
    { // Batsmen/Bowlers 4, total = 4
      'name':'Kuldeep Yadav',
      'type':'Bowler',
      'battingSkill': 50,
      'bowlingSkill': 85,
      'fieldingSkill': 75
    },
    { // Batsmen/Bowlers 5 total = 5
      'name': 'Shubhman Gill',
      'type': 'Batsman',
      'battingSkill': 84,
      'bowlingSkill': 32,
      'fieldingSkill': 84
    },
    { // Batsmen/Bowlers 6 (max allowed), total = 6
      'name': 'Mohammed Shami',
      'type': 'Bowler',
      'battingSkill': 32,
      'bowlingSkill': 91,
      'fieldingSkill': 80
    },
    { // WicketKeeper 1, max allowed; total = 7
      'name':'Ishaan Kishan',
      'type':'WicketKeeper',
      'battingSkill': 84,
      'bowlingSkill': 30,
      'fieldingSkill': 80
    },
    { // AllRounder 1, total = 8
      'name':'Ravindra Jadeja',
      'type':'AllRounder',
      'battingSkill': 90,
      'bowlingSkill': 80,
      'fieldingSkill': 95
    },
    { // AllRounder 2, total = 9
      'name':'Hardik Pandya',
      'type':'AllRounder',
      'battingSkill': 80,
      'bowlingSkill': 70,
      'fieldingSkill': 90
    },
    {  // AllRounder 3, total = 10
      'name':'Ravichandran Ashwin',
      'type':'AllRounder',
      'battingSkill': 70,
      'bowlingSkill': 90,
      'fieldingSkill': 80
    },
    {  // AllRounder 4, total = 11
      'name':'Ravichandran Ashwin',
      'type':'AllRounder',
      'battingSkill': 70,
      'bowlingSkill': 90,
      'fieldingSkill': 80
    }
  ],
  MaxAllRoundersReached: [
    {
      'name': 'Rohit Sharma',
      'type': 'Batsman',
      'battingSkill': 90,
      'bowlingSkill': 90,
      'fieldingSkill': 90
    },
    {
      'name':'Virat Kohli',
      'type': 'Batsman',
      'battingSkill': 90,
      'bowlingSkill': 70,
      'fieldingSkill': 80
    },
    {
      'name':'Shikhar Dhawan',
      'type': 'Batsman',
      'battingSkill': 85,
      'bowlingSkill': 50,
      'fieldingSkill': 80
    },
    {
      'name': 'Shreyas Iyer',
      'type': 'Bowler',
      'battingSkill': 87,
      'bowlingSkill': 40,
      'fieldingSkill': 80
    },
    {
      'name':'Mayank Agarwal',
      'type': 'Bowler',
      'battingSkill': 90,
      'bowlingSkill': 40,
      'fieldingSkill': 90
    },
    {
      'name':'Rishabh Pant',
      'type':'WicketKeeper',
      'battingSkill': 90,
      'bowlingSkill': 20,
      'fieldingSkill': 91
    },
    {
      'name':'Ajinkya Rahane',
      'type': 'AllRounder',
      'battingSkill': 84,
      'bowlingSkill': 45,
      'fieldingSkill': 83
    },
    {
      'name':'Chateshwar Pujara',
      'type':'AllRounder',
      'battingSkill': 89,
      'bowlingSkill': 40,
      'fieldingSkill': 70
    },
    {
      'name': 'Shubhman Gill',
      'type': 'AllRounder',
      'battingSkill': 84,
      'bowlingSkill': 32,
      'fieldingSkill': 84
    },
    {
      'name': 'Joe Smith',
      'type': 'AllRounder',
      'battingSkill': 84,
      'bowlingSkill': 32,
      'fieldingSkill': 84
    },
  ],
  MaxBatsmenPlusBowlersReached: [
    {
      'name': 'Rohit Sharma',
      'type': 'Batsman',
      'battingSkill': 90,
      'bowlingSkill': 90,
      'fieldingSkill': 90
    },
    {
      'name':'Virat Kohli',
      'type': 'Batsman',
      'battingSkill': 90,
      'bowlingSkill': 70,
      'fieldingSkill': 80
    },
    {
      'name':'Shikhar Dhawan',
      'type': 'Batsman',
      'battingSkill': 85,
      'bowlingSkill': 50,
      'fieldingSkill': 80
    },
    {
      'name': 'Shreyas Iyer',
      'type': 'Bowler',
      'battingSkill': 87,
      'bowlingSkill': 40,
      'fieldingSkill': 80
    },
    {
      'name':'Mayank Agarwal',
      'type': 'Bowler',
      'battingSkill': 90,
      'bowlingSkill': 40,
      'fieldingSkill': 90
    },
    {
      'name':'Ajinkya Rahane',
      'type': 'Bowler',
      'battingSkill': 84,
      'bowlingSkill': 45,
      'fieldingSkill': 83
    },
  ],
  IsPlayerSelected: {
    players: [
      {
        'name': 'Rohit Sharma',
        'type': 'Batsman',
        'battingSkill': 90,
        'bowlingSkill': 90,
        'fieldingSkill': 90
      },
      {
        'name': 'Virat Kohli',
        'type': 'Batsman',
        'battingSkill': 90,
        'bowlingSkill': 70,
        'fieldingSkill': 80
      },
      {
        'name': 'Shikhar Dhawan',
        'type': 'Batsman',
        'battingSkill': 85,
        'bowlingSkill': 50,
        'fieldingSkill': 80
      },
      {
        'name': 'Shreyas Iyer',
        'type': 'Batsman',
        'battingSkill': 87,
        'bowlingSkill': 40,
        'fieldingSkill': 80
      }
    ],
    selected: [
      {
        'name': 'Rohit Sharma', // is in Players at idx 0
        'type': 'Batsman',
        'battingSkill': 90,
        'bowlingSkill': 90,
        'fieldingSkill': 90
      }
    ]
  }
}
export default fixtures
