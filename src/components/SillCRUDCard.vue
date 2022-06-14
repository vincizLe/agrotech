<template>
  <v-container>
    <v-row class="mt-2 mb-4">
      <v-toolbar-title style="margin: 14px 0 0 6px" >Umbrales</v-toolbar-title>
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
            Nueva umbral
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
                      v-model="sill.id"
                      label="Id"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="sill.name"
                      :rules="nameRules"
                      label="Nombre del umbral"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                >
                  <v-textarea
                      v-model="sill.description"
                      :rules="descriptionRules"
                      label="Descripción"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      v-model="sill.chiliImage"
                      :rules="chiliImageRules"
                      label="Url de la imagen del ají"
                  ></v-text-field>
                </v-col>
                <!--
                <v-col cols="12">
                  <v-text-field
                      v-model="sill.temperature"
                      :rules="temperatureRules"
                      label="Temperatura"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="6"
                >
                  <v-text-field
                      v-model="sill.humidity"
                      :rules="humidityRules"
                      label="Humedad"
                  ></v-text-field>
                </v-col>
                -->
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
          <v-card-title class="justify-center">¿Desea eliminar este umbral?</v-card-title>
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
            v-for="sill in sills"
        >
          <v-img
              height="200px"
              :src="sill.chiliImage"
          >
          </v-img>
          <v-card-title>{{sill.name}}</v-card-title>
          <v-card-text>
            <div class="my-4 text-subtitle-1">{{sill.description}}</div>
            <!--<div class="my-4 text-subtitle-1">°C: {{sill.temperature}}</div>
            <div class="my-4 text-subtitle-1">g/m3: {{sill.humidity}}</div>-->
          </v-card-text>
          <v-card-actions>
            <v-list-item class="grow">
              <v-row
                  align="center"
                  justify="end"
              >
                <v-btn icon @click="editItem(sill)">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn icon class="ml-3">
                  <v-icon @click="deleteItem(sill)">
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
import SillService from "@/services/sill.service";

export default {
  name: "SillCRUDCard",
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
      chiliImageRules:[
        v => !!v || 'La url de la imagen del ají es requerida',
      ],
      temperatureRules:[
        v => !!v || 'La temperatura es requerida',
        v => !isNaN(v) || 'Ingrese la temperatura en números',
      ],
      humidityRules:[
        v => !!v || 'La humedad es requerida',
        v => !isNaN(v) || 'Ingrese la humedad en números',
      ],
      user:{
        name:''
      },
      users:[],
      sill:{
        id:'',
        name:'',
        temperature: '',
        humidity:'',
        chiliImage: '',
      },
      sills:[],
      dialogDelete: false
    }
  },
  computed:{
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo umbral' : 'Editar umbral'
    }
  },
  created() {
    this.retrieveAllSills()
  },
  methods:{
    getDisplaySill  (sill){
      return{
        id:sill.id,
        name:sill.name,
        description: sill.description,
        temperature:sill.temperature,
        humidity:sill.humidity,
        chiliImage: sill.chiliImage,
      }
    },
    //---
    retrieveAllSills(){
      SillService.getAllSills()
          .then(response => {
            this.sills=response.data.content.map(this.getDisplaySill)
          })
    },
    createSill(data){
      SillService.create(data)
          .then(response => {
            this.dialog =false
            this.reset()
            location.reload();
          }).catch(e => {
        console.log(e);
      })
    },
    updateSill(id,data){
      SillService.update(id,data)
          .then(response => {
            console.log("Sill updated with success")
            location.reload();
          }).catch(e => {
        console.log(e);
      })
    },
    deletePlot(id){
      SillService.delete(id)
          .then(response => {
            console.log("Sill deleted with success")
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
      this.editedIndex = this.sills.indexOf(item)
      this.sill = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.sills.indexOf(item)
      this.sill = Object.assign({}, item)
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
      this.sills.splice(this.editedIndex, 1)
      this.deletePlot(this.sill.id)
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
        this.updateSill(this.sill.id,this.sill)
      } else {
        this.createSill(this.sill)
      }
      this.close()
    },
  }
}
</script>

<style scoped>
</style>
