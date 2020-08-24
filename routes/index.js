var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
      if(e) { return console.log(e); }
      res.render('index', { title: 'Lista Estoque', docs: docs });
  })
})
router.get('/new', function(req, res, next) {
  res.render('new', { title: 'Novo Cadastro', doc: {"codprod":"", "descprod":"", "unidade":"", "quantidade":""}, action: '/new' });
});
router.post('/new', function(req, res) {
  var codprod = parseInt(req.body.codprod);
  var descprod = req.body.descprod;
  var unidade = req.body.unidade;
  var qtdini = parseInt(req.body.qtdini)
  var qtdminimo = parseInt(req.body.qtdminimo)
  var fornecedor =req.body.fornecedor; 
global.db.insert({codprod,descprod, unidade, qtdini, qtdminimo, fornecedor}, (err, result) => {
          if(err) { return console.log(err); }
          res.redirect('/');
      })
})
router.get('/atualizar/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('atualizar', { title: 'Edição de Produto', doc: docs[0], action: '/atualizar/' + docs[0]._id });
    });
})
router.post('/atualizar/:id', function(req, res) {
  var id = req.params.id;
  var codprod = parseInt(req.body.codprod);
  var descprod = req.body.descprod;
  var unidade = req.body.unidade;
  var qtdini = parseInt(req.body.qtdini)
  var qtdminimo = parseInt(req.body.qtdminimo)
  var fornecedor =req.body.fornecedor; 
  global.db.update(id, {codprod, descprod, unidade, qtdini, qtdminimo, fornecedor}, (e, result) => {
      if(e) { return console.log(e); }
      res.redirect('/');
    });
})

router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});

module.exports = router;


