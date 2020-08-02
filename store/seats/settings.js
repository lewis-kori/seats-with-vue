export const state = () => ({
  allRooms: {
    userId: {
      '1': {
        rows: 6,
        cols: 6,
      },
      '2': {
        rows: 7,
        cols: 5,
      },
      '3': {
        rows: 4,
        cols: 5,
      },
    },
  },

  userRoom: {},
})

export const mutations = {
  setUserRoom(state, userId) {
    state.userRoom = state.allRooms.userId[userId]
  },
  addRow(state) {
    state.userRoom.rows++
  },
}

export const getters = {
  userRoom: (state) => state.userRoom,
}
