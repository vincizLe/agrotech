<template>
  <v-app>
    <v-app-bar app color="primary" dark >
      <v-spacer></v-spacer>
      <div class="d-flex align-center" >
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/logo-agrotech.png')"
          transition="scale-transition"
          width="75"
          style="cursor: pointer"
          @click="navigateToIndex"
        />
      </div>
      <v-spacer></v-spacer>
      <v-list-item-icon
          v-if="showAdminBoard"
          class="mt-1"
          @click="navigateToProfile">
        <v-btn icon>
          <v-icon large>mdi-account-circle</v-icon>
        </v-btn>
      </v-list-item-icon>
      <v-list-item-icon
          class="ml-4 mt-1"
          v-if="showAdminBoard"
          @click="logOut"
      >
        <v-btn icon>
          <v-icon large>mdi-power</v-icon>
        </v-btn>
      </v-list-item-icon>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed:{
    currentUser(){
      return this.$store.state.auth.user
    },
    showAdminBoard(){
      if (this.currentUser) {
        return this.currentUser;
      }
      return false;
    }
  },
  methods:{
    logOut(){
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
    navigateToProfile(){
      this.$router.push({name:'Profile'})
    },
    navigateToIndex(){
      this.$router.push({name:'index'})
    }
  }
};
</script>
