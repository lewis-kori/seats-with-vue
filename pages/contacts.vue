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
                    <td>1.1</td>
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
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import NavBar from '@/components/NavBar'
import NewContact from '@/components/NewContact'
export default {
  middleware: 'auth',
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
      contacts: 'contacts/contacts/userContacts',
      loggedInUser: 'loggedInUser',
    }),
  },
  created() {
    this.getUserContacts(this.loggedInUser.id)
    // this.getAllContacts()
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
