<template>
    <div id="app">
        <slider
            :items="testObject"
            height="400px"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Slider from "@/components/Slider.vue";
import { Item } from "@/components/interfaces";

@Component( {
    components: {
        Slider
    }
} )
export default class App extends Vue {
    testObject: Array<Item> = [
        {
            "image": "https://s3.amazonaws.com/apps-static-resources/public/app-avsb-store-hhmwy487-prod/uploads/f366d530-9c9e-11ea-9a81-272377d2d130.jpg",
            "title": "Productos Agrícolas",
            "text": "Con una gran variedad de productos de alta calidad y con las mejores especificaciones, para garantizar que los cultivos y productos de nuestros campesinos tengan los estándares más altos del mercado. ",
            "link": {
                "url": "",
                "text": "Productos Agrícolas"
            }
        },
        {
            "image": "https://s3.amazonaws.com/apps-static-resources/public/app-avsb-store-hhmwy487-prod/uploads/b77e4790-8f30-11ea-8723-89ce2b7ff966.jpg",
            "title": "Asesorías Técnicas",
            "text": "Contamos con el mejor personal capacitado para brindarle a nuestros clientes accesorias técnicas para la producción",
            "link": {
                "url": "",
                "text": "Asesorías Técnicas"
            }
        },
        {
            "image": "https://s3.amazonaws.com/apps-static-resources/public/app-avsb-store-hhmwy487-prod/uploads/c367c350-9c9c-11ea-a383-051016df9261.jpg",
            "title": "Servicios Veterinarios",
            "text": "Agroveterinaria AVS en todas sus sucursales, San Bernardo, San Pablo y Buesaco, ofrece una gran variedad de productos y servicios de alta calidad para el cuidado y bienestar de tus mascotas.",
            "link": {
                "url": "",
                "text": "Servicios Veterinarios"
            }
        }
    ];

}
</script>

<style lang="scss"></style>
