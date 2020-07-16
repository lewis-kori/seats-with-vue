export const state = () => ({
  allContacts: [],
  userContacts: [],
})

export const mutations = {
  setContact(state, payload) {
    if (payload) {
      state.allContacts.push(payload)
    }
  },
  setUserContacts(state, userId) {
    const userContacts = (state.allContacts.userId = userId)
    state.userContacts.push(userContacts)
  },
}

export const getters = {
  userContacts: (state) => state.userContacts,
  contacts: (state) => state.allContacts,
}
