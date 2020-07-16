<template>
  <div>
    <NavBar @toggle-contact-form-visibility="toggleNewContactFormVisibility" />
    <div class="container">
      <!-- contact list section -->
      <div v-if="contactListVisible">
        <b-row class="mt-2 mb-3">
          <b-col>Full Name</b-col>
          <b-col>{{ contacts }} m</b-col>
          <b-col>Email</b-col>
          <b-col>Seat Number</b-col>
        </b-row>
        <!-- display when member has contacts -->
        <div v-if="!contactListVisible">
          <b-row v-for="contact in contacts" :key="contact.email">
            <b-col>{{ contact.fullName }}</b-col>
            <b-col>{{ contact.email }}</b-col>
            <b-col>{{ contact.seatNumber }}</b-col>
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
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import NavBar from '@/components/NavBar'
import NewContact from '@/components/NewContact'
export default {
  components: { NewContact, NavBar },
  layout: 'empty',
  data() {
    return {
      contactListVisible: true,
      newContactFormVisible: false,
    }
  },
  computed: {
    ...mapGetters({
      userContacts: 'contacts/contacts/userContacts',
      contacts: 'contacts/contacts/contacts',
      loggedInUser: 'loggedInUser',
    }),
  },
  created() {
    // this.getUserContacts(this.loggedInUser.id)
    this.getAllContacts()
  },
  methods: {
    toggleNewContactFormVisibility() {
      this.contactListVisible = !this.contactListVisible
      this.newContactFormVisible = !this.newContactFormVisible
    },
    ...mapMutations({
      setUserContacts: 'contacts/contacts/setUserContacts',
      getAllContacts: 'contacts/contacts/setContact',
    }),
    getUserContacts() {
      this.setUserContacts(this.loggedInUser.id)
    },
  },
}
</script>
