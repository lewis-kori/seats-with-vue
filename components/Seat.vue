<template>
  <div>
    <div
      :class="[
        {
          selected: seat.isActive && seat.contact,
          occupied: !seat.isActive && seat.contact,
        },
        'empty',
      ]"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Seat',
  props: {
    seat: {
      type: Object,
      default() {
        return { row: 1, col: 1, contact: '', isActive: false }
      },
    },
    isSactive: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
}
</script>

<style scoped>
.occupied {
  width: 320px;
  padding: 10px;
  border: 5px solid black;
  background-color: grey !important;
  margin: 0;
}
.selected {
  width: 320px;
  padding: 10px;
  border: 5px solid black;
  background-color: blue !important;
  margin: 0;
}
.empty {
  width: 100%;
  padding: 10px;
  border: 5px solid gray;
  background-color: white;
  margin: 0;
}
</style>
