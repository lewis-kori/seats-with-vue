<template>
  <div class="mt-2 mb-3">
    <b-row class="mb-4">
      <b-col>
        <nuxt-link
          class="btn btn-sm btn-info float-left"
          :to="{ name: 'contacts' }"
          >Close</nuxt-link
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
            variant="info"
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
    attachContactToSeat() {
      this.$emit('attach-contact-to-seat', this.form.email)
    },
    completeContactCreation() {
      // ensure form is filled
      if (this.form.fullName && this.form.email) {
        this.setContact({ data: this.form, userId: this.userId })
        this.$router.push({ name: 'contacts' })
      }
      this.$toast.error('Fill in both email and full name please.')
    },
  },
}
</script>
