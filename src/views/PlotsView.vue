<template>
  <PlotCRUDCard></PlotCRUDCard>
</template>

<script>
import PlotService from "@/services/plot.service";
import UserService from "@/services/user.service";
import PlotCRUDCard from "@/components/PlotCRUDCard";

export default {
  name: "PlotsView",
  components: {PlotCRUDCard},
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
