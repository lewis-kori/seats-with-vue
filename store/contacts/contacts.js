export const state = () => ({
  allContacts: [],
  userContacts: [],
})

export const mutations = {
  setContact(state, payload) {
    if (payload) {
      // extract user id
      const userId = payload.userId
      // extract data object
      const data = payload.data
      if (state.allContacts.length > 0) {
        const userContact = state.allContacts[0].userId[userId]
        if (userContact) {
          state.allContacts[0].userId[userId].push(data)
        }
      } else {
        const userIdKey = { userIdString: [] }
        state.allContacts.push({ userId: userIdKey })

        state.allContacts[0].userId[userId] = []
        const user = state.allContacts[0].userId[userId]
        user.push(data)
      }
    }
  },
  setUserContacts(state, userId) {
    if (state.allContacts.length > 0) {
      const userContacts = state.allContacts[0].userId[userId]
      state.userContacts.push(userContacts)
    }
    return []
  },
}

export const getters = {
  userContacts: (state) => state.userContacts,
  contacts: (state) => state.allContacts,
}
