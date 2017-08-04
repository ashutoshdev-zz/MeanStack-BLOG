var express = require('express'),
        path = require('path'),
        User = require('./models/user'),
        Post = require('./models/post'),
        Page = require('./models/page'),
        Portfolio = require('./models/portfolio'),
        rootPath = path.normalize(__dirname + '/../'),
        apiRouter = express.Router(),
        sm = require('sitemap'),
        router = express.Router();
module.exports = function(app, passport) {
    app.use('/api', apiRouter);
    app.use('/', router);
    // API routes
    require('./api/posts')(apiRouter);
    require('./api/pages')(apiRouter);
    require('./api/portfolios')(apiRouter);
    // home route
    router.get('/', function(req, res) {
        res.render('index');
    });
    // admin route
    router.get('/admin', function(req, res) {
        res.render('admin/login');
    });
    router.get('/admin/register', function(req, res) {
        res.render('admin/register');
    });
    router.get('/admin/dashboard', isAdmin, function(req, res) {
        res.render('admin/dashboard', {user: req.user});
    });
    router.post('/register', function(req, res) {
        // passport-local-mongoose: Convenience method to register a new user instance with a given password. Checks if username is unique
        User.register(new User({
            email: req.body.email
        }), req.body.password, function(err, user) {
            if (err) {
                console.error(err);
                return;
            }
            // log the user in after it is created
            passport.authenticate('local')(req, res, function() {
                console.log('authenticated by passport');
                res.redirect('/admin/dashboard');
            });
        });
    });
    router.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/admin/dashboard');
    });
     ///sitemap
    router.get('/sitemap.xml', function(req, res) {
        Post.find({}, 'paramal', function(err, mongourls)
        {
            //console.log(mongourls);
            var pageUrls=[];
            if (mongourls) {
                for (var i = 0; i < 2; i++) {
                    var obj = {url: "/" + mongourls[i].paramal, changefreq: 'daily', priority: 0.9};
                    
                    pageUrls.push(obj);
                }
            }
            var sitemap = sm.createSitemap({
                hostname: 'https://futureworktechnologies.com',
                cacheTime: 600000, // 600 sec - cache purge period 
                urls: pageUrls
            });
            sitemap.toXML(function(err, xml) {
                if (err) {
                    return res.status(500).end();
                }
                res.header('Content-Type', 'application/xml');
                res.send(xml);
            });
        });
    });
    
     router.get('/sitemap1.xml', function(req, res) {
        Post.find({}, 'paramal', function(err, mongourls)
        {
            //console.log(mongourls);
            var pageUrls=[];
            if (mongourls) {
                for (var i = 0; i < mongourls.length; i++) {
                    var obj = {url: "/" + mongourls[i].paramal, changefreq: 'daily', priority: 0.9};
                    
                    pageUrls.push(obj);
                }
            }
            var sitemap = sm.createSitemap({
                hostname: 'https://futureworktechnologies.com',
                cacheTime: 600000, // 600 sec - cache purge period 
                urls: pageUrls
            });
            sitemap.toXML(function(err, xml) {
                if (err) {
                    return res.status(500).end();
                }
                res.header('Content-Type', 'application/xml');
                res.send(xml);
            });
        });
    });
    
      router.get('/about',function(req, res) {
        res.render('home/about');
    });
    
     router.get('/contact',function(req, res) {
        res.render('home/contact');
    });
    
     router.get('/blog',function(req, res) {
        res.render('home/blog');
    });
     router.get('/clients',function(req, res) {
        res.render('home/clients');
    });
    
     router.get('/careers',function(req, res) {
        res.render('home/careers');
    });
    
    router.get('/howwework',function(req, res) {
        res.render('home/howwework');
    });
    
     router.get('/clients',function(req, res) {
        res.render('home/clients');
    });
    
    router.get('/testimonials',function(req, res) {
        res.render('home/testimonials');
    });
    
     router.get('/visionandmission',function(req, res) {
        res.render('home/visionandmission');
    });
    
      router.get('/whyfutureworktechnologies',function(req, res) {
        res.render('home/whyfutureworktechnologies');
    });
    
    router.get('/privacypolicy',function(req, res) {
        res.render('home/privacypolicy');
    });
    router.get('/termandconditions',function(req, res) {
        res.render('home/termandconditions');
    });
    router.get('/faq',function(req, res) {
        res.render('home/faq');
    });
        
      router.get('/admin/dashboard', isAdmin, function(req, res) {
        res.render('admin/dashboard', {user: req.user});
    });
    router.get('/404', function(req, res) {
        res.render('404');
    });
    router.get('/*', function(req, res) {

        var url = req.originalUrl;
        if (url != "/favicon.ico") {
            var metaTags = {};
            var main_url = url.split('/');
            //console.log(main_url[1]);
            Post.findOne({'paramal': main_url[1]}, function(err, post) {
                if (post) {
                   // console.log(post.paramal);
                    metaTags.metaTagsTitle = post.title; //title
                    metaTags.metaTagsUrl =  'https://futureworktechnologies.com/'+post.paramal;
                    metaTags.metaDescription = post.metadescription;
                    metaTags.metaTagsKeyWords = post.metakeywords;
                    res.render('home/post', metaTags);
                } else {
                    res.render('404');
                }
            });
        }

    });
    app.use(function(req, res, next) {
        res.status(404);
        res.render('404');
        return;
    });
};
function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.email === 'ashutosh@avainfotech.com') {
        console.log('cool you are an admin, carry on your way');
        next();
    } else {
        console.log('You are not an admin');
        res.redirect('/admin');
    }
}