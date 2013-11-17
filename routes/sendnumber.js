/*
 * GET
 */


exports.sendnumber = function(req, res){
	/*var sys = require('sys')
	var exec = require('child_process').exec;
	function puts(error, stdout, stderr) { sys.puts(stdout) }
	exec("ls -la", puts);
*/
	res.end("Welcome to the about page!");
	//res.render('index.html', { title: 'Express AngularJS app' });
};