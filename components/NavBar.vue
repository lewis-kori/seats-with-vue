<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item
          ><b-button
            v-if="text === 'New Contact'"
            class="btn btn-primary"
            @click="toggleNewContactFormVisibility"
            >{{ text }}</b-button
          ></b-nav-item
        >
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
