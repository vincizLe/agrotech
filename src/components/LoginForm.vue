<template>
  <v-parallax height="550" :src="require('../assets/main-background.jpg')" >
    <v-overlay absolute="absolute" color="#000000">
      <v-icon size="160" color="secondary" class="mb-6">
        mdi-account-circle
      </v-icon>
      <v-form ref="form">
        <v-text-field
            v-model="user.username"
            :rules="usernameRules"
            label="Usuario"
            required
        ></v-text-field>
        <v-text-field
            v-model="user.password"
            :rules="passwordRules"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            label="Contraseña"
            @click:append="show1 = !show1"
            required
        ></v-text-field>
        <v-btn
            color="success"
            class="mt-8"
            @click="validate"
        >
          Iniciar Sesión
        </v-btn>
      </v-form>
      <div class="mt-4">
        <p style="color: #FF5252">{{message}}</p>
      </div>
    </v-overlay>
  </v-parallax>
</template>

<script>
import User from '../models/user';
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
        this.$router.push('/about'); //evaluate
    }
  },
  methods:{
    handleLogin(){
      if (this.user.username && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
            (response) => {
              switch (response.idResponse){
                case 1:
                  this.$router.push('/about');
                  break;
                case -2:
                  this.message = response.message
                  break
                case -3:
                  this.message = response.message
                  break
                default:
                  this.message = response.message
                  break
              }
            },
            error => {
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            }
        );
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
