<template>
  <v-container>
    <h3>Hola {{name}}</h3>
    <v-card
        class="mx-auto mt-4"
        max-width="500"
    >
      <v-container fluid>
        <v-row dense>
          <v-col
              v-for="card in cards"
              :key="card.title"
              :cols="card.flex"
          >
            <v-hover
                v-slot="{ hover }"
                open-delay="200"
                style="cursor: pointer"
            >
              <v-card
                  :elevation="hover ? 20 : 2"
                  :class="{ 'on-hover': hover }"
                  class="mb-4"
              >
                <v-img
                    :src="card.src"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                >
                  <v-card-title v-text="card.title"></v-card-title>
                </v-img>
              </v-card>
            </v-hover>

          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "IndexView",
  data: () => ({
    cards: [
      { title: 'Usuarios', src: 'https://e.rpp-noticias.io/normal/2020/06/11/291929_955284.jpg', flex: 12 },
      { title: 'Parcelas', src: 'https://www.inforegion.pe/wp-content/uploads/2018/10/San-Martin-Agricultores-siembran-aji-Cayena-en-reemplazo-de-arroz-2.jpg', flex: 12 },
      { title: 'Umbrales', src: 'https://media.istockphoto.com/vectors/electronic-components-pattern-on-blue-background-vector-id940543712?k=20&m=940543712&s=612x612&w=0&h=BT5YCaOlg40ApzX3RHVBxYpSAvz9PBedUSKNSCHE_Gg=', flex: 12 },
    ],
    name:''
  }),
  created() {
    console.log(JSON.parse(localStorage.getItem('user')))
    const user = JSON.parse(localStorage.getItem('user'))
    this.name=user.idResponse
    console.log(user.token)
  }
}
</script>

<style scoped>

</style>
