<template>
  <v-container>
    <v-row>
      <v-toolbar-title style="margin: 14px 0 0 6px" >Perfil</v-toolbar-title>
      <v-divider
          class="mx-3"
          inset
          vertical
      ></v-divider>
      <v-spacer></v-spacer>
    </v-row>
    <v-card
        class="mx-auto my-12 text-center"
        max-width="400"
    >
      <v-card-actions style="cursor: pointer">
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="450px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mt-3 mr-1"
                v-bind="attrs"
                v-on="on"
            >
              Editar
              <v-icon size="25" class="mb-1 ml-2">mdi-pencil</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Editar perfil</span>
            </v-card-title>
            <v-card-text >
              <v-form ref="form">
                <v-row>
                  <v-col
                      style="display: none"
                  >
                    <v-text-field
                        v-model="admin.id"
                        label="Id"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        v-model="admin.name"
                        :rules="nameRules"
                        label="Nombres"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                  >
                    <v-text-field
                        v-model="admin.lastname"
                        :rules="lastnameRules"
                        label="Apellidos"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6">
                    <v-text-field
                        v-model="admin.dni"
                        :rules="dniRules"
                        label="DNI"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <v-text-field
                        v-model="admin.cellphone"
                        :rules="cellphoneRules"
                        label="Celular"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                  >
                    <v-text-field
                        v-model="admin.email"
                        :rules="emailRules"
                        label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                  >
                    <v-text-field
                        v-model="admin.password"
                        :rules="passwordRules"
                        label="Password"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="primary"
                  text
                  @click="close"
              >
                Cerrar
              </v-btn>
              <v-btn
                  color="primary"
                  text
                  @click="validate"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
      <v-img
          width="300"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          class="mx-auto mt-4"
          style="display: none"
      ></v-img>
      <v-icon size="160" color="primary" class="mb-6 mt-8">
        mdi-account-circle
      </v-icon>
      <v-card-text >
        <v-row>
          <v-col cols="10" class="mx-auto mt-4  mb-lg-n6">
            <v-text-field
                v-bind:value="admin.name + ' ' + admin.lastname"
                label="Nombres y Apellidos"
                readonly
            ></v-text-field>
          </v-col>
          <v-col cols="5" class="mx-auto mr-0 mb-lg-n6">
            <v-text-field
                v-bind:value="admin.dni"
                label="DNI"
                readonly
            ></v-text-field>
          </v-col>
          <v-col cols="5" class="mx-auto ml-0 mb-lg-n6">
            <v-text-field
                v-bind:value="admin.cellphone"
                label="Celular"
                readonly
            ></v-text-field>
          </v-col>
          <v-col cols="10" class="mx-auto mb-lg-n6">
            <v-text-field
                v-bind:value="admin.email"
                label="Email"
                readonly
            ></v-text-field>
          </v-col>
          <v-col cols="10" class="mx-auto">
            <v-text-field
                v-bind:value="admin.password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                label="Contraseña"
                @click:append="show = !show"
                readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Admin2Service from "@/services/admin2.service";
import UserService from "@/services/user.service";

export default {
  name: "ProfileVue",
  data(){
    return{
      dialog:false,
      nameRules:[
        v => !!v || 'Nombres son requeridos',
      ],
      lastnameRules:[
        v => !!v || 'Apellidos son requeridos',
      ],
      emailRules:[
        v => !!v || 'Email es requerido',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules:[
        v => !!v || 'Contraseña es requerida',
      ],
      dniRules:[
        v => !!v || 'DNI es requerido',
      ],
      cellphoneRules:[
        v => !!v || 'Celular es requerido',
      ],
      admin:{
        id:'',
        name:'',
        lastname:'',
        dni:'',
        cellphone:'',
        email:'',
        password:'',
      },
      show:false
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.retrieveAdmin(user.specialist.idSpecialist)
  },
  methods:{
    retrieveAdmin(idAdmin){
      Admin2Service.getById(idAdmin)
          .then(response => {
            this.admin = response.data;
          })
    },
    updateAdmin(id,data){
      Admin2Service.update(id,data)
          .then(response => {
            console.log("Admin updated with success")
            location.reload();
          }).catch(e => {
        console.log(e);
      })
    },
    //---
    validate () {
      this.$refs.form.validate()
      if(this.$refs.form.validate()){
        this.save()
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    //---
    close () {
      this.dialog = false
      this.$nextTick(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        this.retrieveAdmin(user.specialist.idSpecialist)
      })
    },
    save () {
      this.updateAdmin(this.admin.id,this.admin)
      this.close()
    },
  }
}
</script>

<style scoped>

</style>
