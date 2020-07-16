<template>
  <div>
    <b-row v-if="seat.isSactive">
      <b-col class="text-center">
        <span
          >you've selected row #{{ seat.row }} and col #{{ seat.col }}}</span
        >
      </b-col>
    </b-row>
    <div
      :class="[{ occupied: seat.contact, selected: seat.isSactive }, 'empty']"
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
