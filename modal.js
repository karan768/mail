const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const MailSchema = new Schema({
	name:
	{
		type: String
	},
	company:
	{
		type:String	
	},
	email:
	{
		type:String
	},
	password:
	{
		type:String
	},
	phonenumber:
	{
		type:Number
	},
	message:
	{
		type:String
	}
},
{timestamps:true});
const Mail = mongoose.model('Mail',MailSchema);
module.exports= Mail;