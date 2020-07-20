<template>
  <div>
    <b-navbar type="dark" variant="info">
      <b-navbar-nav>
        <b-navbar-brand v-if="$route.name === 'index'" href="#"
          >Seats</b-navbar-brand
        >
        <b-nav-item v-else-if="$route.name === 'contacts'"
          ><b-button
            class="btn btn-primary"
            @click="toggleNewContactFormVisibility"
            >{{ text }}</b-button
          >
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    text: {
      type: String,
      default() {
        return 'New Contact'
      },
    },
  },
  methods: {
    toggleNewContactFormVisibility() {
      this.$emit('toggle-contact-form-visibility')
    },
  },
}
</script>
