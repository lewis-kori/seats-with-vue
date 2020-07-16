<template>
  <div>
    <NavBar @toggle-contact-form-visibility="toggleNewContactFormVisibility" />
    <div class="container">
      <!-- contact list section -->
      <div v-if="contactListVisible">
        <!-- display when member has contacts -->
        <div v-if="contactListVisible && contacts.length > 0">
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
                  <tr v-for="contact in contacts[0]" :key="contact.email">
                    <td>{{ contact.fullName }}</td>
                    <td>{{ contact.email }}</td>
                    <td>
                      <b-button
                        class="btn btn-sm btn-info"
                        @click="selectedSeat.contact = contact.email"
                        >Assign Seat</b-button
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-col>
          </b-row>
        </div>

        <div v-else>
          <b-row
            ><b-col class="text-center"
              ><span>You Have no contacts yet</span></b-col
            ></b-row
          >
        </div>
      </div>

      <!-- start new contact section -->
      <NewContact
        v-else-if="newContactFormVisible"
        :user-id="loggedInUser.id"
        @toggle-contact-form-visibility="toggleNewContactFormVisibility"
        @get-user-contacts="getUserContacts"
      />
      <b-row v-if="!selectedSeat.isSactive">
        <b-col class="text-center">
          <span
            >you've selected row #{{ selectedSeat.row }} and col #{{
              selectedSeat.col
            }}</span
          >
        </b-col>
      </b-row>
      <b-row v-for="row in userRoom.rows" :key="row" class="mt-2">
        row #{{ row }}
        <b-col v-for="col in userRoom.cols" :key="col">
          <Seat
            v-if="row === selectedSeat.row && col === selectedSeat.col"
            :seat="selectedSeat"
          />
          <Seat v-else />
          <span @click="assignSeat(row, col)">select</span>
          col #{{ col }}
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import NavBar from '@/components/NavBar'
import NewContact from '@/components/NewContact'
import Seat from '@/components/Seat'
export default {
  middleware: 'auth',
  components: { NewContact, NavBar, Seat },
  layout: 'empty',
  data() {
    return {
      contactListVisible: true,
      newContactFormVisible: false,
      selectedSeat: {
        row: Number,
        col: Number,
        contact: '',
        isActive: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',
      contacts: 'contacts/contacts/userContacts',
      userRoom: 'seats/settings/userRoom',
    }),
  },
  created() {
    const userId = this.loggedInUser.id
    this.getUserContacts(userId)
    this.getUserRoom(userId)
  },
  methods: {
    toggleNewContactFormVisibility() {
      this.contactListVisible = !this.contactListVisible
      this.newContactFormVisible = !this.newContactFormVisible
    },
    assignSeat(row, col) {
      this.selectedSeat.row = row
      this.selectedSeat.col = col
      this.selectedSeat.isActive = true
    },
    ...mapMutations({
      setUserContacts: 'contacts/contacts/setUserContacts',
      getAllContacts: 'contacts/contacts/setContact',
      getUserRoom: 'seats/settings/setUserRoom',
      addRow: 'seats/settings/addRow',
    }),
    getUserContacts() {
      this.setUserContacts(this.loggedInUser.id)
    },
    addRoomRow() {
      this.addRow(this.loggedInUser.id)
    },
  },
}
</script>
