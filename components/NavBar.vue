<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item
          ><b-button
            class="btn btn-primary"
            @click="toggleNewContactFormVisibility"
            >New Contact</b-button
          ></b-nav-item
        >
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    toggleNewContactFormVisibility() {
      this.$emit('toggle-contact-form-visibility')
    },
  },
}
</script>
