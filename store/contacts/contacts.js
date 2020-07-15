export const state = () => ({
  contacts: [],
})

export const mutations = {
  setContact(state, payload, userId) {
    state.contacts.push(payload)
  },
}

export const getters = {
  userContacts: (state) => (userId) => {
    const userContacts = state.contacts[userId]
    if (userContacts) {
      return state.contacts[userId]
    } else {
      return []
    }
  },
}
