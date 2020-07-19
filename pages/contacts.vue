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
                  <template v-for="contact in contacts[0]">
                    <tr :key="contact.email">
                      <td>{{ contact.fullName }}</td>
                      <td>{{ contact.email }}</td>

                      <!-- display if the user has seats -->
                      <div v-if="userSeats.length > 0">
                        <div
                          v-for="seat in userSeats[0]"
                          :key="seat[contact.email]"
                        >
                          <span>
                            <td v-if="Boolean(seat[contact.email])">
                              {{ seat[contact.email].row }}:{{
                                seat[contact.email].col
                              }}
                            </td>
                            <td v-else>hello</td>
                            <!-- <td v-else>
                              <b-button
                                class="btn btn-sm btn-info"
                                @click="selectedSeat.contact = contact.email"
                                >Assign Seats</b-button
                              >
                            </td> -->
                          </span>
                          <!-- <span v-else
                            ><td>
                              <b-button
                                class="btn btn-sm btn-info"
                                @click="selectedSeat.contact = contact.email"
                                >Assign Seats</b-button
                              >
                            </td></span
                          > -->
                        </div>
                      </div>
                      <td v-else>
                        <b-button
                          class="btn btn-sm btn-info"
                          @click="selectedSeat.contact = contact.email"
                          >Assign Seat</b-button
                        >
                      </td>
                    </tr>
                  </template>
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

      <!-- display when user has selected a contact to assign a seat -->
      <div v-if="selectedSeat.contact" class="mt-auto">
        <b-row class="mb-4">
          <b-col>
            <b-button class="btn btn-sm btn-info float-left" @click="clearSeat"
              >Close</b-button
            >
            <b-button
              class="btn btn-sm btn-info float-right"
              @click="completeSeatAssignment"
              >Submit</b-button
            >
          </b-col>
        </b-row>
        <!-- display this when user has contacts and has selected a seat -->
        <b-row v-if="selectedSeat.isActive && contacts.length > 0">
          <b-col class="text-center">
            <span
              >you've selected row #{{ selectedSeat.row }} and col #{{
                selectedSeat.col
              }}
              for {{ selectedSeat.contact }}</span
            >
          </b-col>
        </b-row>
        <div v-if="contacts.length > 0">
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
        <!-- <div v-else>
          <b-row v-for="row in userRoom.rows" :key="row" class="mt-2">
            row #{{ row }}
            <b-col v-for="col in userRoom.cols" :key="col">
              <div v-for="seat in userSeats[0]" :key="seat.contact">
                <div v-for="contact in contacts[0]" :key="contact.email">
                  {{ typeof seat.contact }} {{ seat.contact }}
                  <Seat
                    v-if="
                      row === seat.contact[contact.email].row &&
                      col === seat.contact[contact.email].col
                    "
                    :seat="{
                      row: seat.contact[contact.email].row,
                      col: seat.contact[contact.email].row,
                      isOccupied: true,
                    }"
                  />
                  <Seat v-else />
                </div>
              </div>
            </b-col>
          </b-row>
        </div> -->
      </div>
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
      userSeats: 'seats/core/userSeats',
    }),
  },
  created() {
    const userId = this.loggedInUser.id
    this.getUserContacts(userId)
    this.getUserRoom(userId)
    this.setUserSeats(userId)
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
    clearSeat() {
      this.selectedSeat = {
        row: Number,
        col: Number,
        contact: '',
        isActive: false,
      }
    },
    ...mapMutations({
      setUserContacts: 'contacts/contacts/setUserContacts',
      getAllContacts: 'contacts/contacts/setContact',
      getUserRoom: 'seats/settings/setUserRoom',
      setSeat: 'seats/core/setSeat',
      setUserSeats: 'seats/core/setUserSeats',
      addRow: 'seats/settings/addRow',
    }),
    getUserContacts() {
      this.setUserContacts(this.loggedInUser.id)
    },
    addRoomRow() {
      this.addRow(this.loggedInUser.id)
    },
    completeSeatAssignment() {
      // retrieve logged in user id
      const userId = this.loggedInUser.id
      // remove isActive from seat
      const contact = this.selectedSeat.contact
      const seat = {
        row: this.selectedSeat.row,
        col: this.selectedSeat.col,
      }
      this.setSeat({ data: seat, userId, contact })
      this.setUserSeats(userId)
    },
  },
}
</script>
