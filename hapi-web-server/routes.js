const routes = [
  {
    method: 'GET',
    path: '/',
    handler: ( req, h ) =>{
      const {name = 'someone', place = 'somewhere'} = req.query;
      return h.response(`Hello ${name} from ${place}.`)
        .type('application/json');
    }
  },
  {
    method: '*',
    path: '/',
    handler: ( req, h ) =>{
      return h.response('Halaman tidak dapat diakses dengan method tersebut')
        .code(404);
    }
  },
  {
    method: 'GET',
    path: '/about',
    handler: ( req, h ) =>{
      return h.response('This is About page')
        .type('application/json')
    }
  },
  {
    method: '*',
    path: '/about',
    handler: ( req, h ) =>{
      return h.response('Halaman tidak dapat diakses dengan method tersebut')
        .code(404);
    }
  },
  {
    method: 'GET',
    path: '/hello/{name?}',
    handler: ( req, h ) =>{
      const {name = 'stranger'} = req.params;
      const {lang} = req.query;
      let msg = ''
      if(lang?.toLowerCase() === 'id'){
        msg =  `Halo ${name}!`;
      }else{
        msg =  `Hello ${name}!`;
      }
      return h.response(msg)
        .type('application/json');
    }
  },
  {
    method: '*',
    path: '/hello/{name?}',
    handler: ( req, h ) =>{
      const {name = 'stranger'} = req.params;
      return h.response(`Hello ${name}, Halaman ini tidak bisa diakses dengan method tersebut.`)
        .code(404);
    }
  },
  {
    method: '*',
    path: '/{any*}',
    handler: ( req, h ) =>{
      return h.response('Halaman tidak ditemukan')
        .code(404);
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: ( req, h ) =>{
      const {username, password} = req.payload;
      return h.response(`Welcome ${username}!`)
        .type('application/json')
    }
  },
  {
    method: '*',
    path: '/login',
    handler: ( req, h ) =>{
      const {username, password} = req.payload;
      return h.response(`Hello ${username}, Halaman ini tidak bisa diakses dengan method tersebut.`)
        .code(404)
    }
  },
]

module.exports = routes;