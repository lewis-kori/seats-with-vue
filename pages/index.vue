<template>
  <div class="container mt-5">
    <b-form method="POST" @submit.prevent="login">
      <b-row>
        <b-col>
          <b-form-group
            ref="email-input"
            label="Email address:"
            label-for="email"
          >
            <b-form-input
              ref="email"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            ref="password-input"
            label="Password:"
            label-for="password"
          >
            <b-form-input
              ref="password"
              v-model="form.password"
              type="password"
              required
              placeholder="Enter passowrd"
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
import users from '@/static/users/users.json'
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
        id: '',
      },
      users,
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    login() {
      this.$toast.info('Logging in...')
      this.users.forEach((user) => {
        if (
          user.email === this.form.email &&
          user.password === this.form.password
        ) {
          this.$toast.success('Log in successful.')
          this.form.id = user.id
          parseInt(this.form.id)
          this.setUser(this.form)
          this.$router.push({ name: 'contacts' })
        } else if (
          user.email === this.form.email &&
          user.password !== this.form.password
        ) {
          // eslint-disable-next-line no-console
          this.$toast.error('Password is incorrect. Please Try again.')
        }
      })
    },
  },
}
</script>
