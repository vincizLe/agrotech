<template>
  <v-row class="justify-center mt-5">
    <v-col cols="1" xs="0"></v-col>
    <v-col lg="3" md="4" sm="5" xs="1" class="text-center">
      <login-form />
    </v-col>
    <v-col cols="1" xs="0"></v-col>
  </v-row>
</template>

<script>
  import LoginForm from "@/components/LoginForm";

  export default {
    name: 'Home',
    components: {
      LoginForm
    },
  }
</script>
