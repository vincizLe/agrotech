<template>
  <v-container>
    <v-row class="mt-2 mb-4">
      <v-toolbar-title style="margin: 14px 0 0 6px" >Parcelas</v-toolbar-title>
      <v-divider
          class="mx-3"
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
              class="mt-3 mr-1"
              v-bind="attrs"
              v-on="on"
          >
            Nueva parcela
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
                      v-model="plot.id"
                      label="Id"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                      v-model="plot.name"
                      :rules="nameRules"
                      label="Nombre de la parcela"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                >
                  <v-textarea
                      v-model="plot.description"
                      :rules="descriptionRules"
                      label="Descripción"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="plot.location"
                      :rules="locationRules"
                      label="Ubicación"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="6"
                >
                  <v-text-field
                      v-model="plot.area"
                      :rules="areaRules"
                      label="Área"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="6"
                >
                  <v-text-field
                      v-model="plot.volume"
                      :rules="volumeRules"
                      label="Volumen"
                  ></v-text-field>
                </v-col>
                <v-col
                    class="d-flex"
                    cols="12"
                    sm="6"
                >
                  <v-select
                      :items="users"
                      item-text="name"
                      item-value="id"
                      v-model="plot.user_id"
                      :rules="userRules"
                      label="Usuario"
                  ></v-select>
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
          <v-card-title class="justify-center">¿Desea eliminar esta parcela?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row style="display: flex" class="mt-10 ml-2">
      <v-row justify="space-around" class="mr-4">
        <v-card
            width="270"
            class="mx-auto mb-10"
            v-for="plot in plots"
        >
          <v-img
              height="200px"
              :src="plot.photography"
          >
          </v-img>
          <v-card-title>{{plot.name}}</v-card-title>
          <v-card-text>
            <div class="my-4 text-subtitle-1">{{plot.location}}</div>
            <div class="my-4 text-subtitle-1">Área: {{plot.area}} m2</div>
            <div class="my-4 text-subtitle-1">Volumen: {{plot.volume}} m3</div>
            <div>{{plot.description}}</div>
          </v-card-text>
          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                    class="elevation-6"
                    alt=""
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{plot.user_id}}</v-list-item-title>
              </v-list-item-content>
              <v-row
                  align="center"
                  justify="end"
              >
                <v-btn icon @click="editItem(plot)">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn icon class="ml-3">
                  <v-icon @click="deleteItem(plot)">
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-row>
            </v-list-item>
          </v-card-actions>
          <v-divider class="mx-4"></v-divider>
        </v-card>
      </v-row>
    </v-row>
  </v-container>
</template>

<script>
import PlotService from "@/services/plot.service";
import UserService from "@/services/user.service";

export default {
  name: "PlotCRUDCard",
  data () {
    return {
      dialog: false,
      editedIndex:-1,
      nameRules:[
        v => !!v || 'El nombre de la parcela es requerido',
      ],
      descriptionRules:[
        v => !!v || 'La descripción es requerida',
      ],
      locationRules:[
        v => !!v || 'La ubicación es requerida',
      ],
      areaRules:[
        v => !!v || 'El área es requerida',
        v => !isNaN(v) || 'Ingrese el área en números',
      ],
      volumeRules:[
        v => !!v || 'El volumen es requerido',
        v => !isNaN(v) || 'Ingrese el volumen en números',
      ],
      userRules:[
        v => !!v || 'El usuario es requerido',
      ],
      user:{
        name:''
      },
      users:[],
      plot:{
        id:'',
        name:'',
        description: '',
        location:'',
        area:'',
        volume: '',
        photography: 'https://pbs.twimg.com/media/Ewt-ZNHWgAEIVAb.jpg',
        user_id:'',
      },
      plots:[],
      dialogDelete: false
    }
  },
  computed:{
    formTitle () {
      return this.editedIndex === -1 ? 'Nueva parcela' : 'Editar parcela'
    }
  },
  created() {
    this.retrieveAllPlots()
    this.retrieveAllUsers()
  },
  methods:{
    getDisplayPlot(plot){
      return{
        id:plot.id,
        name:plot.name,
        description: plot.description,
        location:plot.location,
        area:plot.area,
        volume: plot.volume,
        photography: plot.photography,
        user_id:plot.user_id,
      }
    },
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
    retrieveAllPlots(){
      PlotService.getAllPlots()
          .then(response => {
            this.plots=response.data.map(this.getDisplayPlot)
          })
    },
    createPlot(data){
      PlotService.create(data)
          .then(response => {
            this.dialog =false
            this.reset()
            location.reload();
          }).catch(e => {
        console.log(e);
      })
    },
    updatePlot(id,data){
      PlotService.update(id,data)
          .then(response => {
            console.log("Plot updated with success")
            location.reload();
          }).catch(e => {
        console.log(e);
      })
    },
    deletePlot(id){
      PlotService.delete(id)
          .then(response => {
            console.log("Plot deleted with success")
          }).catch(e => {
        console.log(e);
      })
    },
    retrieveAllUsers() {
      UserService.getAllUsers()
          .then(response => {
            this.users=response.data.map(this.getDisplayUser)
          }).catch(e => {
        console.log(e);
      })
    },
    /*getUser(id) {
      UserService.getUserById(id)
          .then(response => {
            console.log(response.data)
          }).catch(e => {
        console.log(e);
      })
    },*/

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
      this.editedIndex = this.plots.indexOf(item)
      this.plot = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.plots.indexOf(item)
      this.plot = Object.assign({}, item)
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
      this.plots.splice(this.editedIndex, 1)
      this.deletePlot(this.plot.id)
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
        this.updatePlot(this.plot.id,this.plot)
      } else {
        this.createPlot(this.plot)
      }
      this.close()
    },
  }
}
</script>

<style scoped>
</style>
