
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('content/index', { title: 'Nvie' })
};

/*
 * GET contact page.
 */

exports.contact = function(req, res){
  res.render('content/contact', { title: 'contact' })
};
