import { createRouter, createWebHashHistory } from 'vue-router';
import PokemonLayout from '@/modules/pokemon/layouts/PokemonLayout';
import ZeldaLayout from '@/modules/zelda/layouts/ZeldaLayout';

const routes = [
    {
        path: '/pokemon',
        name: 'pokemon',
        component: PokemonLayout,
        children: [
            { 
                path: 'home', 
                name: 'pokemon-home',
                component: () => import(/* webpackChunkName: "ListPage" */ '@/modules/pokemon/pages/ListPage'),
            },
            { 
                path: 'about', 
                name: 'pokemon-about',
                component: () => import(/* webpackChunkName: "AboutPage" */ '@/modules/pokemon/pages/AboutPage')
            },
            { 
                path: 'pokemonid/:id',
                name: 'pokemon-id',
                component: () => import(/* webpackChunkName: "PokemonPage" */ '@/modules/pokemon/pages/PokemonPage'),
                props: ( route ) => {
                    const id = Number( route.params.id );
                    return isNaN( id ) ? { id: 1 } : { id }
                }
            },
            {
                path: '',
                redirect: 'pokemon'
            },
        ]
    },
    //Zelda layout
    {
        path: '/zelda',
        name: 'zelda',
        component: ZeldaLayout,
        children: [
            { 
                path: 'characters', 
                name: 'zelda-characters',
                component: () => import(/* webpackChunkName: "Characters" */ '@/modules/zelda/pages/Characters'),
            },
            { 
                path: 'about', 
                name: 'zelda-about',
                component: () => import(/* webpackChunkName: "About" */ '@/modules/zelda/pages/About')
            },
            {
                path: '',
                redirect: 'zelda-characters'
            },
        ]
    },
    { 
        path: '/:pathMatch(.*)*', 
        component: () => import(/* webpackChunkName: "NoPageFound" */ '../modules/shared/pages/NoPageFound')
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;