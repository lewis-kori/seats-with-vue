<template>
  <div class="mt-2 mb-3">
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
          <b-button type="submit" variant="primary">Submit</b-button>
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
    completeContactCreation() {
      // const userIdKey = `{"${this.userId}" : ${JSON.stringify(this.form)}}`
      // const useridString = `"${this.userId}"`
      // const newContact = JSON.parse(userIdKey)
      // const newContact = { userId: JSON.parse(userIdKey) }
      this.setContact(this.form, '1')
      this.$emit('get-user-contacts')
      this.$emit('toggle-contact-form-visibility')
    },
  },
}
</script>
