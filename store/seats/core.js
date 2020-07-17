export const state = () => ({
  allSeats: [],
  userSeats: [],
})

export const mutations = {
  setSeat(state, payload) {
    if (payload) {
      // extract user id
      const userId = payload.userId
      const contactEmail = payload.contact

      // extract data object
      const data = payload.data

      // parse the seat's json
      const contactSeat = JSON.parse(
        `{"${contactEmail}" : { "row":${data.row}, "col": ${data.row}}}`
      )
      if (state.allSeats.length > 0) {
        const userSeat = state.allSeats[0].userId[userId]
        if (userSeat) {
          // create the new seat for contact

          state.allSeats[0].userId[userId].push({ contact: contactSeat })
        }
      } else {
        const userIdKey = { userIdString: [] }
        state.allSeats.push({ userId: userIdKey })

        state.allSeats[0].userId[userId] = []
        const user = state.allSeats[0].userId[userId]

        user.push({ contact: contactSeat })
      }
    }
  },
  setUserSeats(state, userId) {
    if (state.allSeats.length > 0) {
      const userSeats = state.allSeats[0].userId[userId]
      state.userSeats.push(userSeats)
    }
    return []
  },
}

export const getters = {
  userSeats: (state) => state.userSeats,
  seats: (state) => state.allSeats,
}
