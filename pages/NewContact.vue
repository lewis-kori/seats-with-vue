<template>
  <div class="container">
    <!-- start new contact section -->
    <NewContact
      :user-id="loggedInUser.id"
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
              <div v-if="row === selectedSeat.row && col === selectedSeat.col">
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
                      <span v-show="false">
                        <!-- check if the occupied seats are populated -->
                        <!-- had to go through this to fix the infinite update loop console error -->
                        <span v-if="occupiedSeats.length > 0">
                          <!-- if current seat is not already added to occupied seats array then add it  -->
                          <span
                            v-if="
                              !occupiedSeats.some(
                                (chair) =>
                                  chair.row === seat[contact.email].row &&
                                  chair.col === seat[contact.email].col
                              )
                            "
                            >{{
                              occupiedSeats.push({
                                row: seat[contact.email].row,
                                col: seat[contact.email].col,
                              })
                            }}</span
                          >
                        </span>
                        <!-- run for the first loop to populate the first occupied seat -->
                        <span v-if="occupiedSeats.length === 0">
                          <span>
                            {{
                              occupiedSeats.push({
                                row: seat[contact.email].row,
                                col: seat[contact.email].col,
                              })
                            }}
                          </span>
                        </span>
                      </span>
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
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import NewContact from '@/components/NewContact'

export default {
  middleware: 'auth',
  components: { NewContact },
  data() {
    return {
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
    this.getUserRoom(userId)
  },
  methods: {
    ...mapMutations({
      setUserContacts: 'contacts/contacts/setUserContacts',
      getAllContacts: 'contacts/contacts/setContact',
      getUserRoom: 'seats/settings/setUserRoom',
      setSeat: 'seats/core/setSeat',
      setUserSeats: 'seats/core/setUserSeats',
      addRow: 'seats/settings/addRow',
    }),
    clearSeat() {
      this.selectedSeat = {
        row: Number,
        col: Number,
        contact: '',
        isActive: false,
      }
    },
    attachContactToSeat(contact) {
      this.selectedSeat.contact = contact
    },
    getUserContacts() {
      this.setUserContacts(this.loggedInUser.id)
    },
    assignSeat(row, col) {
      this.selectedSeat.row = row
      this.selectedSeat.col = col
      this.selectedSeat.isActive = true
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
