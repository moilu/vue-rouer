<template>
    <div>
        <CustomLink 
            v-for="link in links"
            :key="link.to"
            :link="link"/>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default{
    name: 'NavBar',
    components: {
        CustomLink: defineAsyncComponent(() => import('./CustomLink.vue')),
    },
    data() {
        return {
            links: [
                { to: 'pokemon-home', name: 'Pokemons' },
                { to: 'pokemon-id', name: 'Por ID', id: 151 },
                { to: 'pokemon-about', name: 'About' },

                { to: 'zelda-characters', name: 'Personajes' },
                { to: 'zelda-about', name: 'Zelda About' },
            ]
        }
    }
}
</script>

<style scoped>
div {
    padding: 0 50px;
}

div a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 10px;
}

a.router-link-exact-active {
    color: #42b983;
}

</style>