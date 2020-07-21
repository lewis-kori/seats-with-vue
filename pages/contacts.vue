<template>
  <div>
    <NavBar
      v-if="newContactFormVisible"
      :text="'Close'"
      @toggle-contact-form-visibility="toggleNewContactFormVisibility"
    />
    <NavBar
      v-else
      @toggle-contact-form-visibility="toggleNewContactFormVisibility"
    />
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
        <!-- display if the logged in user has no seats selected -->
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
        @attach-contact-to-seat="attachContactToSeat"
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
        <b-row v-if="selectedSeat.isActive">
          <b-col class="text-center">
            <span
              >you've selected row #{{ selectedSeat.row }} and col #{{
                selectedSeat.col
              }}
              for {{ selectedSeat.contact }}</span
            >
          </b-col>
        </b-row>
        <div v-if="contacts.length >= 0 && userSeats.length === 0">
          <!-- prioritize empty seats first -->
          <b-row v-for="row in userRoom.rows" :key="row" class="mt-2">
            row #{{ row }}
            <b-col v-for="col in userRoom.cols" :key="col">
              <Seat
                v-if="row === selectedSeat.row && col === selectedSeat.col"
                :seat="selectedSeat"
              />
              <Seat v-else />
              <b-badge variant="secondary" @click="assignSeat(row, col)"
                >select</b-badge
              >
              col #{{ col }}
            </b-col>
          </b-row>
          <b-row class="mt-3 mb-4 text-center">
            <!-- Adds a row to the currently logged in user' state in vuex -->
            <b-col class="m-auto">
              <b-button class="btn btn-lg btn-info" @click="addRow"
                >Add Row</b-button
              >
            </b-col>
          </b-row>
        </div>

        <div v-else-if="contacts.length >= 0 && userSeats.length > 0">
          <b-row v-for="row in userRoom.rows" :key="row" class="mt-2">
            row #{{ row }}
            <b-col v-for="col in userRoom.cols" :key="col">
              <!-- ensure an occupied seat col has only one seat in the UI -->
              <div
                v-if="
                  !occupiedSeats.some(
                    (seat) => seat.row === row && seat.col === col
                  )
                "
              >
                <div
                  v-if="row === selectedSeat.row && col === selectedSeat.col"
                >
                  <Seat :seat="selectedSeat" />
                </div>

                <div v-else>
                  <Seat />
                  <b-badge variant="secondary" @click="assignSeat(row, col)"
                    >select</b-badge
                  >
                  col #{{ col }}
                </div>
              </div>

              <div v-for="(seat, index) in userSeats[0]" :key="index">
                <!-- removes duplication of seats in subsequent iteration -->
                <span v-if="!coveredSeats.includes(seat)">{{
                  coveredSeats.push(seat)
                }}</span>
                <div
                  v-if="coveredSeats.length >= 0 || coveredSeats.includes(seat)"
                >
                  <div v-for="contact in contacts[0]" :key="contact.email">
                    <!-- removes duplication of contacts in subsequent seat iteration -->
                    <span v-if="!coveredContacts.includes(contact.email)">{{
                      coveredContacts.push(contact.email)
                    }}</span>
                    <div
                      v-if="
                        Boolean(seat[contact.email]) &&
                        coveredContacts.includes(contact.email)
                      "
                    >
                      <div
                        v-if="
                          row === seat[contact.email].row &&
                          col === seat[contact.email].col
                        "
                      >
                        <!-- calls function to add the occupied seats(hidden element) -->
                        <span v-show="false">{{
                          occupiedSeats.push({
                            row: seat[contact.email].row,
                            col: seat[contact.email].col,
                          })
                        }}</span>
                        <Seat
                          :seat="{
                            row: seat[contact.email].row,
                            col: seat[contact.email].row,
                            contact: contact.email,
                          }"
                        />
                        col #{{ col }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3 mb-4 text-center">
            <!-- Adds a row to the currently logged in user' state in vuex -->
            <b-col class="m-auto">
              <b-button class="btn btn-lg btn-info" @click="addRow"
                >Add Row</b-button
              >
            </b-col>
          </b-row>
        </div>
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
      coveredContacts: [],
      coveredSeats: [],
      occupiedSeats: [],
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
    attachContactToSeat(contact) {
      this.selectedSeat.contact = contact
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
