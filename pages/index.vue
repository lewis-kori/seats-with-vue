<template>
  <div class="container mt-5">
    <b-form method="POST" @submit.prevent="login">
      <b-row>
        <b-col>
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
          >
            <b-form-input
              ref="email-input"
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
              id="password"
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
      this.users.forEach((user) => {
        if (
          user.email === this.form.email &&
          user.password === this.form.password
        ) {
          this.form.id = user.id
          parseInt(this.form.id)
          this.setUser(this.form)
          this.$router.push({ name: 'contacts' })
        } else if (
          user.email === this.form.email &&
          user.password !== this.form.password
        ) {
          // eslint-disable-next-line no-console
          console.log('Password is incorrect')
        }
      })
    },
  },
}
</script>
