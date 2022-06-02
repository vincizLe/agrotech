<template>
  <v-container>
    <user-c-r-u-d-table></user-c-r-u-d-table>
  </v-container>
</template>

<script>
import UserCRUDTable from "@/components/UserCRUDTable";
export default {
  name: "UsersView.vue",
  components:{
    UserCRUDTable
  }
}
</script>

<style scoped>

</style>
