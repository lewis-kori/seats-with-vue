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
          this.$toast.success('Contact created successfully.')
        }
      } else {
        const userIdKey = JSON.parse(`{ "userId": [] }`)
        state.allContacts.push(userIdKey)

        state.allContacts[0].userId[userId] = []
        const user = state.allContacts[0].userId[userId]
        user.push(data)
        this.$toast.success('Contact created successfully.')
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
