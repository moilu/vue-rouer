<template>
    <h1>Pokemon Page <span>#{{ id }}</span></h1>
    <div v-if="pokemon" class="pokemon">
        <span>{{ pokemon.name }}</span>
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
        <form @submit.prevent="getPokemon()">
            <input v-model="newId" type="text" placeholder="Ingresa un número">
            <button>Cargar pokemon</button>
        </form>
    </div>
</template>

<script>

export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            pokemon: null,
            newId: null
        }
    },
    created() {
        this.getPokemon();
    },
    methods: {
        async getPokemon() {
            if(this.newId != null) {
                this.$router.push(`/pokemonid/${ this.newId }`);
            }
            try {
                const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${ this.id }`).then(r => r.json());
                console.log(pokemon);
                this.pokemon = pokemon;
            } catch(error) {
                this.$router.push('/');
            }
        }
    },
    watch: {
        id() {
            this.getPokemon();
        }
    }
}
</script>

<style scoped>
.pokemon {
    display: grid;
    justify-content: center;
}

.pokemon span {
    font-size: 2em;
    font-weight: bold;
}
</style>
