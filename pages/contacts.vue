<template>
  <div>
    <div class="container">
      <!-- contact list section -->

      <!-- display when member has contacts -->
      <div v-if="contacts.length > 0">
        <b-row>
          <b-col>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Seat</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="contact in contacts[0]">
                  <tr :key="contact.email">
                    <td>{{ contact.fullName }}</td>
                    <td>{{ contact.email }}</td>

                    <!-- display if the user has seats -->
                    <div v-if="userSeats.length > 0">
                      <div
                        v-for="(seat, seatIndex) in userSeats[0]"
                        :key="seatIndex"
                      >
                        <span>
                          <td v-if="Boolean(seat[contact.email])">
                            {{ seat[contact.email].row }}:{{
                              seat[contact.email].col
                            }}
                          </td>
                        </span>
                      </div>
                    </div>
                  </tr>
                </template>
              </tbody>
            </table>
          </b-col>
        </b-row>
      </div>
      <!-- display if the logged in user has no seats selected -->
      <div v-else>
        <b-row
          ><b-col class="text-center"
            ><span>You Have no contacts yet</span></b-col
          ></b-row
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  middleware: 'auth',
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      contacts: 'contacts/contacts/userContacts',
      userSeats: 'seats/core/userSeats',
    }),
  },
  created() {
    const userId = this.loggedInUser.id
    this.getUserContacts(userId)
    this.setUserSeats(userId)
  },
  methods: {
    ...mapMutations({
      setUserContacts: 'contacts/contacts/setUserContacts',
      getAllContacts: 'contacts/contacts/setContact',
      setUserSeats: 'seats/core/setUserSeats',
    }),
    getUserContacts() {
      this.setUserContacts(this.loggedInUser.id)
    },
  },
}
</script>
