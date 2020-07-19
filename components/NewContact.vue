<template>
  <div class="mt-2 mb-3">
    <b-row class="mb-4">
      <b-col>
        <b-button
          class="btn btn-sm btn-info float-left"
          @click="hideContactForm"
          >Close</b-button
        >
        <b-button
          class="btn btn-sm btn-info float-right"
          @click="completeContactCreation"
          >Submit</b-button
        >
      </b-col>
    </b-row>
    <b-form method="post" @submit.prevent="completeContactCreation">
      <b-row>
        <b-col>
          <b-form-group
            ref="input-group-1"
            label="Full name:"
            label-for="fullname-input"
          >
            <b-form-input
              ref="fullname-input"
              v-model="form.fullName"
              type="text"
              required
              placeholder="Enter full name..."
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group ref="email-input" label="Email:" label-for="email">
            <b-form-input
              ref="email"
              v-model="form.email"
              type="email"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="text-center">
        <b-col>
          <!-- display button if all new contact details are populated -->
          <b-button
            v-if="form.email && form.fullName"
            variant="primary"
            @click="attachContactToSeat"
            >Select Seat Number</b-button
          >
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'NewContact',
  props: {
    userId: {
      type: Number,
      default() {
        return 1
      },
    },
  },
  data() {
    return {
      form: {
        fullName: '',
        email: '',
      },
    }
  },
  methods: {
    ...mapMutations({ setContact: 'contacts/contacts/setContact' }),
    hideContactForm() {
      this.$emit('toggle-contact-form-visibility')
    },
    attachContactToSeat() {
      this.$emit('attach-contact-to-seat', this.form.email)
    },
    completeContactCreation() {
      this.setContact({ data: this.form, userId: this.userId })
      this.$emit('get-user-contacts')
      this.hideContactForm()
    },
  },
}
</script>
