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
        `{"${contactEmail}" : { "row":${data.row}, "col": ${data.col}}}`
      )
      if (state.allSeats.length > 0) {
        const userSeat = state.allSeats[0].userId[userId]
        if (userSeat) {
          // create the new seat for contact
          state.allSeats[0].userId[userId].push(contactSeat)
          this.$toast.success('Seat has been assigned successfully.')
        }
      } else {
        const userIdKey = JSON.parse(`{ "userId": [] }`)
        state.allSeats.push(userIdKey)

        state.allSeats[0].userId[userId] = []
        const user = state.allSeats[0].userId[userId]

        user.push(contactSeat)
        this.$toast.success('Seat has been assigned successfully.')
      }
    }
  },
  setUserSeats(state, userId) {
    if (state.allSeats.length > 0) {
      const userSeats = state.allSeats[0].userId[userId]
      state.userSeats.push(userSeats)
    }
  },
}

export const getters = {
  userSeats: (state) => state.userSeats,
  seats: (state) => state.allSeats,
}
