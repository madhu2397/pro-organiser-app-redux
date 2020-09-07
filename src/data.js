export const boardData = {
    boards: {
        board1: {
            columns: [
                {
                    id: 'backlog',
                    name: 'Backlog'
                },
                {
                    id: 'in_progress',
                    name: 'In Progress'
                },
                {
                    id: 'done',
                    name: 'Done'
                }
            ],
            members: [
                {
                    initials: 'RS',
                    name: 'Rushabh Shah'
                },
                {
                    initials: 'JT',
                    name: 'John Thomas'
                },
                {
                    initials: 'SB',
                    name: 'Sonali Bakshi'
                }
            ],
            cards: [
                {
                    id: 0,
                    order: 0,
                    title: 'Create a login section.',
                    description: 'We will be creating a login page which has the ability to take a user\'s name and password and check with database for authentication.',
                    members: ['RS', 'JT'],
                    due_date: 1607020200000,
                    column: 'backlog',
                    board_id: 'board1'
                },
                {
                    id: 1,
                    order: 1,
                    title: 'Add a navigation bar.',
                    description: 'We will add a navigation bar to the page.',
                    members: ['SB'],
                    due_date: 1607020200000,
                    column: 'backlog',
                    board_id: 'board1'
                },
                {
                    id: 2,
                    order: 0,
                    title: 'Add a footer.',
                    description: null,
                    members: ['JT'],
                    due_date: 1607020200000,
                    column: 'in_progress',
                    board_id: 'board1'
                },
                {
                    id: 3,
                    order: 0,
                    title: 'Change the CSS for cards',
                    description: null,
                    members: ['RS', 'JT'],
                    due_date: 1607020200000,
                    column: 'done',
                    board_id: 'board1'
                }
            ],
            id: 'board1'
        }
    },
    allBoards: [
        {
            id: 'board1',
            name: 'Front-end',
            type: 'Design'
        }
    ]
}