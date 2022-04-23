<template>
  <v-data-table
      :headers="headers"
      :items="users"
      sort-by="calories"
      class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Usuarios</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="450px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              Nuevo usuario
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text >
              <v-form ref="form">
                <v-row>
                  <v-col
                      style="display: none"
                  >
                    <v-text-field
                        v-model="user.id"
                        label="Id"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <v-text-field
                        v-model="user.name"
                        :rules="nameRules"
                        label="Nombres"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <v-text-field
                        v-model="user.lastname"
                        :rules="lastnameRules"
                        label="Apellidos"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                  >
                    <v-text-field
                        v-model="user.email"
                        :rules="emailRules"
                        label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                  >
                    <v-text-field
                        v-model="user.password"
                        :rules="passwordRules"
                        label="Password"
                        type="password"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <v-text-field
                        v-model="user.dni"
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
                        v-model="user.cellphone"
                        :rules="cellphoneRules"
                        label="Celular"
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
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card class="align-center">
            <v-card-title class="justify-center">¿Desea eliminar este usuario?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  name: "UserCRUDTable",
  data () {
    return {
      dialog: false,
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
        v => v.length >= 8 || 'Mínimo 8 caracteres',
      ],
      cellphoneRules:[
        v => !!v || 'Celular es requerido',
        v => v.length >= 9 || 'Mínimo 9 caracteres',
      ],
      user:{
        id:'',
        name:'',
        lastname:'',
        dni:'',
        cellphone:'',
        email:'',
        password:'',
      },
      editedIndex: -1,
      search: '',
      headers: [
        {text: 'Nombres', align: 'start', value: 'name'},
        { text: 'Apellidos', value: 'lastname'},
        { text: 'DNI', value: 'dni', filterable: false},
        { text: 'Celular', value: 'cellphone', filterable: false },
        { text: 'Email', value: 'email', filterable: false },
        { text: 'Contraseña', value: 'password', filterable: false },
        { text: 'Accciones', value: 'actions', sortable: false },
      ],
      users:[],
      dialogDelete: false,

    }
  },
  computed:{
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo usuario' : 'Editar usuario'
    },
  },
  created() {
    this.retrieveAllUsers();
  },
  methods:{
    getDisplayUser(user){
      return{
        id:user.id,
        name:user.name,
        lastname:user.lastname,
        dni:user.dni,
        cellphone:user.cellphone,
        email:user.email,
        password:user.password,
      };
    },
    //---
    retrieveAllUsers(){
      UserService.getAllUsers()
          .then(response => {
            this.users=response.data.map(this.getDisplayUser);
          })
    },
    createUser(data){
      UserService.create(data)
          .then(response => {
            this.dialog=false;
            this.reset();
            location.reload();
          })
          .catch(e => {
            console.log(e);
          })
    },
    updateUser(id,data){
      UserService.update(id,data)
          .then(response => {
            console.log("User updated with success")
            location.reload();
          }).catch(e => {
        console.log(e);
      })
    },
    deleteUser(id){
      UserService.delete(id)
          .then(response => {
            console.log("User deleted with success")
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
    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.user = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.user = Object.assign({}, item)
      this.dialogDelete = true
    },
    //---
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedIndex = -1
      })
    },
    deleteItemConfirm () {
      this.users.splice(this.editedIndex, 1)
      this.deleteUser(this.user.id)
      this.closeDelete()
    },
    //---
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedIndex = -1
        this.reset()
      })
    },
    save () {
      if (this.editedIndex > -1) {
        this.updateUser(this.user.id,this.user)
      } else {
        this.createUser(this.user)
      }
      this.close()
    },
  }
}
</script>

<style scoped>

</style>
