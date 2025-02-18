// Inlinekeyboard button
import { Markup, Telegraf } from "telegraf";
// import dotenv from 'dotenv';

// dotenv.config();

// const token = process.env.BOTTOKEN;
const token = process.env.BOT_TOKEN;
if (!token) throw new Error('"BOT_TOKEN" env var is required!');
const bot = new Telegraf(token);

const WEB_APP_URL = "https://testnet.simplifinance.xyz";

bot.command("inlinekb", ctx =>
	ctx.reply(
		"Launch mini app from inline keyboard!",
		Markup.inlineKeyboard([Markup.button.webApp("Launch", WEB_APP_URL)]),
	),
);

bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('modern', ({ reply }) => reply('Yo'))
bot.command('hipster', Telegraf.reply('λ'))
bot.launch();

// Inline mode miniapp
// import { Telegraf } from "telegraf";

// const bot = new Telegraf(process.env.BOT_TOKEN!);

// const WEB_APP_URL = "https://feathers.studio/telegraf/webapp/example";

// bot.on("inline_query", ctx =>
// 	ctx.answerInlineQuery([], {
// 		button: { text: "Launch", web_app: { url: WEB_APP_URL } },
// 	}),
// );

// bot.launch()

// Keyboard button miniapp
// import { Markup, Telegraf } from "telegraf";

// const bot = new Telegraf(process.env.BOT_TOKEN!);

// const WEB_APP_URL = "https://feathers.studio/telegraf/webapp/example";

// bot.command("keyboard", ctx =>
// 	ctx.reply(
// 		"Launch mini app from keyboard!",
// 		Markup.keyboard([Markup.button.webApp("Launch", WEB_APP_URL)]).resize(),
// 	),
// );

// bot.launch();

// Menu button miniapp
// import { Telegraf } from "telegraf";

// const bot = new Telegraf(process.env.BOT_TOKEN!);

// const WEB_APP_URL = "https://feathers.studio/telegraf/webapp/example";

// bot.command("setmenu", ctx =>
// 	// sets Web App as the menu button for current chat
// 	ctx.setChatMenuButton({
// 		text: "Launch",
// 		type: "web_app",
// 		web_app: { url: WEB_APP_URL },
// 	}),
// );

// bot.launch();


// Custom context bot
/* eslint-disable @typescript-eslint/no-floating-promises */
// import { Context, Telegraf, Telegram } from 'telegraf'
// import { Update, UserFromGetMe } from 'typegram'

// const token = process.env.BOT_TOKEN
// if (token === undefined) {
//   throw new Error('BOT_TOKEN must be provided!')
// }

// class CustomContext extends Context {
//   constructor(update: Update, telegram: Telegram, botInfo: UserFromGetMe) {
//     console.log('Creating context for %j', update)
//     super(update, telegram, botInfo)
//   }

//   reply(...args: Parameters<Context['reply']>) {
//     console.log('reply called with args: %j', args)
//     return super.reply(...args)
//   }
// }

// const bot = new Telegraf(token, { contextType: CustomContext })
// bot.start((ctx) => ctx.reply('Hello'))
// bot.help((ctx) => ctx.reply('Help message'))
// bot.launch()

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))




// https://core.telegram.org/bots#deep-linking
// import { Telegraf } from "telegraf";

// const { BOT_TOKEN } = process.env;
// if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!');
// const bot = new Telegraf(BOT_TOKEN);

// bot.start(ctx => ctx.reply(`Deep link payload: ${ctx.startPayload}`));

// bot.launch();




// DOWNLOAD BOT
// import { Telegraf } from "telegraf";
// import { message } from "telegraf/filters";
// import { mkdirSync, createWriteStream } from "node:fs";
// import { Writable } from "node:stream";

// // ensure photos directory exists
// mkdirSync("./photos", { recursive: true });

// if (process.env.BOT_TOKEN === undefined) {
// 	throw new TypeError("BOT_TOKEN must be provided!");
// }

// const bot = new Telegraf(process.env.BOT_TOKEN);

// // small helper
// const download = async (fromFileId: string, toPath: string) => {
// 	const link = await bot.telegram.getFileLink(fromFileId);
// 	const res = await fetch(link.toString());
// 	await res.body!.pipeTo(Writable.toWeb(createWriteStream(toPath)));
// };

// // handler that downloads all photos the bot sees to a photos
// bot.on(message("photo"), async ctx => {
// 	// take the last photosize (highest size)
// 	const { file_id } = ctx.message.photo.pop()!;
// 	const path = `./photos/${file_id}.jpg`;

// 	await download(file_id, path);

// 	console.log("Downloaded", path);
// });

// bot.launch();





// ECHO BOT

// import { Telegraf, Markup } from "telegraf";

// const { BOT_TOKEN } = process.env;
// if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!');
// const bot = new Telegraf(BOT_TOKEN);

// const keyboard = Markup.inlineKeyboard([
// 	Markup.button.url("❤️", "http://telegraf.js.org"),
// 	Markup.button.callback("Delete", "delete"),
// ]);

// bot.start(ctx => ctx.reply("Hello"));
// bot.help(ctx => ctx.reply("Help message"));
// bot.on("message", ctx => ctx.copyMessage(ctx.message.chat.id, keyboard));
// bot.action("delete", ctx => ctx.deleteMessage());

// bot.launch();



// INLINE BOT

// import { Telegraf, Markup } from "telegraf";
// import { InlineQueryResult } from "telegraf/types";

// const bot = new Telegraf(token);

// bot.on("inline_query", async ctx => {
// 	const apiUrl = `http://recipepuppy.com/api/?q=${ctx.inlineQuery.query}`;
// 	const response = await fetch(apiUrl);
// 	const { results } = await response.json();
// 	const recipes = (
// 		results as { title: string; href: string; thumbnail: string }[]
// 	)
// 		.filter(({ thumbnail }) => thumbnail)
// 		.map(
// 			({ title, href, thumbnail }): InlineQueryResult => ({
// 				type: "article",
// 				id: thumbnail,
// 				title: title,
// 				description: title,
// 				thumb_url: thumbnail,
// 				input_message_content: {
// 					message_text: title,
// 				},
// 				...Markup.inlineKeyboard([Markup.button.url("Go to recipe", href)]),
// 			}),
// 		);
// 	return await ctx.answerInlineQuery(recipes);
// });

// bot.on("chosen_inline_result", ({ chosenInlineResult }) => {
// 	console.log("chosen inline result", chosenInlineResult);
// });

// bot.launch();



// Keyboard bot
// import { Telegraf, Markup } from "telegraf";

// const bot = new Telegraf(token);

// bot.use(Telegraf.log());

// bot.command("onetime", ctx =>
// 	ctx.reply(
// 		"One time keyboard",
// 		Markup.keyboard(["/simple", "/inline", "/pyramid"]).oneTime().resize(),
// 	),
// );

// bot.command("custom", async ctx => {
// 	return await ctx.reply(
// 		"Custom buttons keyboard",
// 		Markup.keyboard([
// 			["🔍 Search", "😎 Popular"], // Row1 with 2 buttons
// 			["☸ Setting", "📞 Feedback"], // Row2 with 2 buttons
// 			["📢 Ads", "⭐️ Rate us", "👥 Share"], // Row3 with 3 buttons
// 		])
// 			.oneTime()
// 			.resize(),
// 	);
// });

// bot.hears("🔍 Search", ctx => ctx.reply("Yay!"));
// bot.hears("📢 Ads", ctx => ctx.reply("Free hugs. Call now!"));

// bot.command("special", ctx => {
// 	return ctx.reply(
// 		"Special buttons keyboard",
// 		Markup.keyboard([
// 			Markup.button.contactRequest("Send contact"),
// 			Markup.button.locationRequest("Send location"),
// 		]).resize(),
// 	);
// });

// bot.command("pyramid", ctx => {
// 	return ctx.reply(
// 		"Keyboard wrap",
// 		Markup.keyboard(["one", "two", "three", "four", "five", "six"], {
// 			wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2,
// 		}),
// 	);
// });

// bot.command("simple", ctx => {
// 	return ctx.replyWithHTML(
// 		"<b>Coke</b> or <i>Pepsi?</i>",
// 		Markup.keyboard(["Coke", "Pepsi"]),
// 	);
// });

// bot.command("inline", ctx => {
// 	return ctx.reply("<b>Coke</b> or <i>Pepsi?</i>", {
// 		parse_mode: "HTML",
// 		...Markup.inlineKeyboard([
// 			Markup.button.callback("Coke", "Coke"),
// 			Markup.button.callback("Pepsi", "Pepsi"),
// 		]),
// 	});
// });

// bot.command("random", ctx => {
// 	return ctx.reply(
// 		"random example",
// 		Markup.inlineKeyboard([
// 			Markup.button.callback("Coke", "Coke"),
// 			Markup.button.callback("Dr Pepper", "Dr Pepper", Math.random() > 0.5),
// 			Markup.button.callback("Pepsi", "Pepsi"),
// 		]),
// 	);
// });

// bot.command("caption", ctx => {
// 	return ctx.replyWithPhoto(
// 		{ url: "https://picsum.photos/200/300/?random" },
// 		{
// 			caption: "Caption",
// 			parse_mode: "Markdown",
// 			...Markup.inlineKeyboard([
// 				Markup.button.callback("Plain", "plain"),
// 				Markup.button.callback("Italic", "italic"),
// 			]),
// 		},
// 	);
// });

// bot.hears(/\/wrap (\d+)/, ctx => {
// 	return ctx.reply(
// 		"Keyboard wrap",
// 		Markup.keyboard(["one", "two", "three", "four", "five", "six"], {
// 			columns: parseInt(ctx.match[1]),
// 		}),
// 	);
// });

// bot.action("Dr Pepper", (ctx, next) => {
// 	return ctx.reply("👍").then(() => next());
// });

// bot.action("plain", async ctx => {
// 	await ctx.answerCbQuery();
// 	await ctx.editMessageCaption(
// 		"Caption",
// 		Markup.inlineKeyboard([
// 			Markup.button.callback("Plain", "plain"),
// 			Markup.button.callback("Italic", "italic"),
// 		]),
// 	);
// });

// bot.action("italic", async ctx => {
// 	await ctx.answerCbQuery();
// 	await ctx.editMessageCaption("_Caption_", {
// 		parse_mode: "Markdown",
// 		...Markup.inlineKeyboard([
// 			Markup.button.callback("Plain", "plain"),
// 			Markup.button.callback("* Italic *", "italic"),
// 		]),
// 	});
// });

// bot.action(/.+/, ctx => {
// 	return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`);
// });

// bot.launch();




// Poll bot

// import { Telegraf, Markup } from "telegraf";

// const keyboard = Markup.keyboard([
// 	Markup.button.pollRequest("Create poll", "regular"),
// 	Markup.button.pollRequest("Create quiz", "quiz"),
// ]);

// const bot = new Telegraf(token);

// bot.on("poll", ctx => console.log("Poll update", ctx.poll));
// bot.on("poll_answer", ctx => console.log("Poll answer", ctx.pollAnswer));

// bot.start(ctx => ctx.reply("supported commands: /poll /quiz", keyboard));

// bot.command("poll", ctx =>
// 	ctx.replyWithPoll("Your favorite math constant", ["x", "e", "π", "φ", "γ"], {
// 		is_anonymous: false,
// 	}),
// );
// bot.command("quiz", ctx =>
// 	ctx.replyWithQuiz("2b|!2b", ["True", "False"], { correct_option_id: 0 }),
// );

// bot.launch();




// Session bot
// import { Context, session, Telegraf } from "telegraf";

// interface SessionData {
// 	messageCount: number;
// 	// ... more session data go here
// }

// Define your own context type
// interface MyContext extends Context {
// 	session?: SessionData;
// 	// ... more props go here
// }

// if (process.env.BOT_TOKEN === undefined) {
// 	throw new TypeError("BOT_TOKEN must be provided!");
// }

// // Create your bot and tell it about your context type
// const bot = new Telegraf<MyContext>(process.env.BOT_TOKEN);

// // Make session data available
// bot.use(session());

// // Register middleware
// bot.on("message", async ctx => {
// 	// set a default value
// 	ctx.session ??= { messageCount: 0 };
// 	ctx.session.messageCount++;
// 	await ctx.reply(`Seen ${ctx.session.messageCount} messages.`);
// });

// // Launch bot
// // eslint-disable-next-line @typescript-eslint/no-floating-promises
// bot.launch();

