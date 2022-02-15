import { createRouter, createWebHashHistory } from 'vue-router';
import PokemonLayout from '@/modules/pokemon/layouts/PokemonLayout';
import ZeldaLayout from '@/modules/zelda/layouts/ZeldaLayout';
import isAuthenticatedGuard from './auth-guard';

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
        beforeEnter: [ isAuthenticatedGuard ],
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

// Guard global - Síncrono
// router.beforeEach((to, from, next) => {
    // console.log(to, from, next);
    // const random = Math.random() * 100;
    // if( random > 50 ) {
    //     console.log('autenticado');
    //     next();
    // } else {
    //     console.log(random, 'bloqueado por el beforeEach Guard');
    //     next({ name: 'pokemon-home' });
    // }
// });

// const canAcces = () => {
//     return new Promise( resolve => {

//     const random = Math.random() * 100;

//     if( random > 50 ) {
//         console.log('autenticado - canAcces');
//         resolve(true);
//     } else {
//         console.log(random, 'bloqueado por el beforeEach Guard - canAcces');
//         resolve(false);
//     }
//     });
// }

// router.beforeEach( async(to, from, next) => {
//     const authorized = await canAcces();

//     authorized 
//         ? next() 
//         : next({ name: 'pokemon-home' });
// });

export default router;