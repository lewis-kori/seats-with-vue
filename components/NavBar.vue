<template>
  <div>
    <b-navbar type="dark" variant="info">
      <b-navbar-nav>
        <b-navbar-brand v-if="$route.name === 'index'" href="#"
          >Seats</b-navbar-brand
        >
        <b-nav-item v-else-if="$route.name === 'contacts'">
          <nuxt-link class="btn btn-primary" :to="{ name: 'NewContact' }"
            >New Contact</nuxt-link
          >
        </b-nav-item>
        <b-nav-item v-else-if="$route.name === 'NewContact'">
          <nuxt-link class="btn btn-primary" :to="{ name: 'contacts' }"
            >My Contacts</nuxt-link
          >
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>
