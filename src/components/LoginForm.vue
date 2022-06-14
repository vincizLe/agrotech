<template>
  <v-container>
   <v-card
       style="box-shadow: 2px 3px 1px -4px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 10px 3px rgb(0 0 0 / 12%)"
       height="500">
     <v-icon size="160" color="primary" class="mb-6 mt-8">
       mdi-account-circle
     </v-icon>
     <v-form ref="form">
       <v-text-field
           class="ml-10 mr-10"
           v-model="user.username"
           :rules="usernameRules"
           label="Usuario"
           required
       ></v-text-field>
       <v-text-field
           class="ml-10 mr-10"
           v-model="user.password"
           :rules="passwordRules"
           :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
           :type="show1 ? 'text' : 'password'"
           label="Contraseña"
           @click:append="show1 = !show1"
           required
       ></v-text-field>
       <v-btn
           color="primary"
           class="mt-8"
           @click="validate"
       >
         Iniciar Sesión
       </v-btn>
     </v-form>
     <div class="mt-6">
       <p style="color: #FF5252">{{message}}</p>
     </div>
   </v-card>
  </v-container>
</template>

<script>
import User from '../models/user';
import UserService from "@/services/user.service";
export default {
  name: 'LoginForm',
  data: () => ({
    user: new User('',''),
    usernameRules: [
      v => !!v || 'Usuario es requerido',
    ],
    show1: false,
    passwordRules: [
      v => !!v || 'Contraseña es requerida',
    ],
    message:''
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
        this.$router.push('/index'); //evaluate
    }
  },
  methods:{
    handleLogin(){
      if (this.user.username && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
            (response) => {
              if(response==200){
                this.$router.push('/index');
              }
              this.message = response
            },
            error => {
              /*this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();*/
            }
        );
        /*UserService.getUserByEmailAndPassword(this.user.username,this.user.password)
        .then(response => {
          if(response.status==200){
            localStorage.setItem('user', JSON.stringify(response.data));
            this.$router.push('/index');
          }
        })
        .catch(error => console.log(error))*/
      }
    },
    validate () {
      this.$refs.form.validate()
      if(this.$refs.form.validate()){
        this.handleLogin()
      }
    }
  }
}
</script>
