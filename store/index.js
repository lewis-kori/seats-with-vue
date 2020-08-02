export const state = () => ({
  auth: {
    user: {},
    loggedIn: false,
  },
})

export const mutations = {
  setUser(state, payload) {
    state.auth.user = payload
    state.auth.loggedIn = true
  },
}

export const getters = {
  isAuthenticated: (state) => state.auth.loggedIn,
  loggedInUser: (state) => state.auth.user,
}
