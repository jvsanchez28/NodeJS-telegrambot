var TelegramBot = require('node-telegram-bot-api');

var token = process.env.TOKEN_BOT;

// Setup polling way
var bot = new TelegramBot(token, {polling: true});

var imgHi = "Urlimg1";
var imgHappy = "Urlimg2";
var imgWhat = "Urlimg3";

bot.getMe()
	.then(function(me)
	{
		console.log('Hello! Im pingu bot, I can send you pingu pics if you message me');
		console.log('Also I am an Inline bot');
	});
	
	
/* 
* On text part: The bot responds to this messages with images
*/
// Matches /hi
bot.onText(/\/hi/, function (msg, match) {
    var chatId = msg.chat.id;
	var url = imgHi;
    bot.sendPhoto(chatId, url);
});

// Matches /happy
bot.onText(/\/happy/, function (msg, match) {
    var chatId = msg.chat.id;
	var url = imgHappy;
    bot.sendPhoto(chatId, url);
});

// Matches /what
bot.onText(/\/what/, function (msg, match) {
    var chatId = msg.chat.id;
	var url = imgWhat;
    bot.sendPhoto(chatId, url);
});

/*
* Inline part: you can use that in any group chat  
*/
bot.on('inline_query', function(msg)
{
    var q_id = msg.id;
    var q_query = msg.query;	
    var results = [];

	var img = "";
	switch(q_query){
		case "hi":
			img = imgHi;
			break;
		case "happy":
			img = imgHappy;
			break;
		case "what":
			img = imgWhat;
			break;
	}
			
	if (img != "") {
		for (var i = 0; i < 1; ++i) {
			var InlineQueryResultPhoto = {
			'type': 'photo', 
			'photo_url': img,
			'thumb_url': img,
			'id': '287878416582808857/' + i,
			'photo_width': 48,
			'photo_height': 48
			};
			results.push(InlineQueryResultPhoto);
		}	
		sendImage(q_id, results);
	}
});

function sendImage (query_id, result) {
	bot.answerInlineQuery(query_id, result);
}
