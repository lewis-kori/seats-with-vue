export const state = () => ({
  allContacts: [],
  userContacts: [],
})

export const mutations = {
  setContact(state, payload, currentUserId) {
    console.log('don', currentUserId)
    console.log('payload', payload)
    if (payload) {
      if (state.allContacts.length > 0) {
        const userContact = state.allContacts[0].userId['1']
        if (userContact) {
          state.allContacts[0].userId['1'].push(payload)
        }
      } else {
        const userIdKey = { '1': [] }
        state.allContacts.push({ userId: userIdKey })

        state.allContacts[0].userId['1'] = []
        const user = state.allContacts[0].userId['1']
        user.push(payload)
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
