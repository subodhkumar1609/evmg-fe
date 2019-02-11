/**
 * 
 */

var nodemailer = require('nodemailer');
var count = 0;

exports.sendEmailToHost = function(obj) {
	
	var maxCount = parseInt(process.env.EMAILCOUNT, 10 );  
	
	if(count == maxCount) {
		count = 1;
	} else {
		count++;
	}
	
	var mailid = process.env.FROMID;
	var password = process.env.MAILPASS;
	var toid = process.env.TOID;
	
	mailid = mailid.replace('COUNT',count);

	var mailmsg = 'Sender Email : ' + obj.email + '\n Sender Phone : '
			+ obj.phone + '\n\n\n' + obj.message;
	
	var transporter = nodemailer.createTransport({
		service : 'gmail',
		auth : {
			user : mailid,
			pass : password
		}
	});
	
	var mailOptions = {
		from : mailid,
		to : toid,
		subject : '[SBDCHANNEL]-' + obj.name,
		text : mailmsg
	};
	
	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
			throw new Error("FAILED");
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}
