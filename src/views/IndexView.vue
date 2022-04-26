<template>
  <v-container>
    <h3 class="font-weight-regular">Hola {{name}}</h3>
    <v-card
        class="mx-auto mt-4"
        max-width="500"
    >
      <v-container fluid>
        <v-row dense>
          <v-col
              cols="12"
          >
            <v-hover
                v-slot="{ hover }"
                open-delay="200"
                style="cursor: pointer"
            >
              <router-link to="/users" class="text-decoration-none">
                <v-card
                    :elevation="hover ? 20 : 2"
                    :class="{ 'on-hover': hover }"
                    class="mb-4"
                >
                  <v-img
                      src='https://e.rpp-noticias.io/normal/2020/06/11/291929_955284.jpg'
                      class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="200px"
                  >
                    <v-card-title v-text="'Usuarios'"></v-card-title>
                  </v-img>
                </v-card>
              </router-link>
            </v-hover>
            <v-hover
                v-slot="{ hover }"
                open-delay="200"
                style="cursor: pointer"
            >
              <router-link to="/plots" class="text-decoration-none">
                <v-card
                    :elevation="hover ? 20 : 2"
                    :class="{ 'on-hover': hover }"
                    class="mb-4"
                >
                  <v-img
                      src='https://www.inforegion.pe/wp-content/uploads/2018/10/San-Martin-Agricultores-siembran-aji-Cayena-en-reemplazo-de-arroz-2.jpg'
                      class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="200px"
                  >
                    <v-card-title v-text="'Parcelas'"></v-card-title>
                  </v-img>
                </v-card>
              </router-link>
            </v-hover>
            <v-hover
                v-slot="{ hover }"
                open-delay="200"
                style="cursor: pointer"
            >
              <router-link to="/users" class="text-decoration-none">
                <v-card
                    :elevation="hover ? 20 : 2"
                    :class="{ 'on-hover': hover }"
                    class="mb-4"
                >
                  <v-img
                      src='https://media.istockphoto.com/vectors/electronic-components-pattern-on-blue-background-vector-id940543712?k=20&m=940543712&s=612x612&w=0&h=BT5YCaOlg40ApzX3RHVBxYpSAvz9PBedUSKNSCHE_Gg='
                      class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="200px"
                  >
                    <v-card-title v-text="'Umbrales'"></v-card-title>
                  </v-img>
                </v-card>
              </router-link>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import AdminService from "@/services/admin.service";

export default {
  name: "IndexView",
  data: () => ({
    name:''
  }),
  created() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.retrieveAdmin(user.specialist.idSpecialist)
  },
  methods:{
    retrieveAdmin(idAdmin){
      AdminService.getAdmin(idAdmin)
          .then(response => {
            this.name = response.data.username;
          })
    }
  }
}
</script>

<style scoped>

</style>
