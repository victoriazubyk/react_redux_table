
const initialState = {
    userList: [
        {   
            name: 'Vika', 
            surname: 'Zubyk', 
            score: 32,
            tableData: {id: 0}
        },
        { 
            name: 'Marichka',
            surname: 'Ursul', 
            score: 23,
            tableData: {id: 1}
        },
    ]
}

export default function rootReducer(state = initialState, action) {

    switch(action.type) {
        case 'ADD':         
            return {
                userList: [...state.userList, action.payload]
            }
        case 'DELETE':
            return {
                userList: state.userList.filter(user => user.tableData.id !== action.payload.tableData.id)
            }
        case 'UPDATE':
            return {
                userList: state.userList.map(user => {
                    return user.tableData.id === action.payload.tableData.id ? action.payload : user;
                })
            }
        default:
            return state;
    }

}