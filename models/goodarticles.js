var articles = [
		{ _id: '1', articleUrl : 'http://www.nicholascloud.com/2016/08/new-presentation-github-is-your-resume-now/', articleTitle : 'Github Is Your Resume Now', articleAuthor : 'by Nicholas Cloud', clicked : false },
		{ _id: '2', articleUrl : 'https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/', articleTitle : 'How To Use NPM as a Build Tool', articleAuthor : 'by Keith Cirkel', clicked : false },
		{ _id: '3', articleUrl : 'https://github.com/happypoulp/redux-tutorial', articleTitle : 'Redux-Tutorial', articleAuthor : 'by Francois Bonnefont', clicked : false }
	];



module.exports.getGoodArticles = function(callback){
	callback(articles);
};
