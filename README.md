# prueba-tecnica-kymatio Realizada en Vue 3

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Run your unit tests
```
npm run test:unit
```

### Router
    - Se utilizo el router de Vue para crear una navegación con rutas privadas.
    La ruta usuario funciona de manera independiente volviendo mas modular la app.

### Autentificacion / Registro
    - Se crearon 2 modales con formularios de registro y login, la funcionalidad esta creada
        aunque no funcione bastarian pocos cambios para que funcionara con una API real.

### Vuex
    - El estado global se maneja con vuex usando su capacidad de modulos (auth y chatbot)
    ambos funcionan de manera independiente creando un estado modular.

### Composables
    - Se hace uso de los composables (hooks) para abstraer los componentes de su funcionalidad,
    a mi parecer muy util para trabajar conjuntamente con Vuex.

### Chatbot
    - Es la primera vex que realizo un chatbot,me gusto desarrollarlo pero creo que se podria 
    mejorar mucho, la falta de tiempo y desconocimento me impidio presentar algo mejor.

### RWD 
    - Se que no pediais responsive en la prueba, pero actualmente creo que es indispensable, 
    se aplico mezclando grid con flexbox.
### Styles
    - Para los estilos se opto por una mezcla propia que trabaja con SCSS, arquiteqtura ITCSS 
    combinado con los estilos con escope de Vue. 
    Se que pediais bootstrap pero creo que este metodo funciona bastante bien.
### Testing
    - Dada la falta de tiempo no pude realizar tests en todos los componentes, opte por testear
    la ruta critica, Router - Vuex - Composables.
