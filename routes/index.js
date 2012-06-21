
/*
 * French
 */

/*
 * GET fr content
 */
exports.contentFr = function(req, res){
  res.render('content/fr', { title: 'Nvie'})
};


/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('content/fr/index', { title: 'Nvie'})
};

/*
 * GET contact page.
 */

exports.contact = function(req, res){
  res.render('content/fr/contact', { title: 'Contact' })
};

/*
 * GET about page.
 */

exports.about = function(req, res){
  res.render('content/fr/about', { title: 'About'})
};

/*
 * GET cv page.
 */

exports.cv = function(req, res){
  res.render('content/fr/cv', { title: 'CV' })
};


/*
 * Todo English
 */

