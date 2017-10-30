const commando = require("discord.js-commando");
const Discord = require("discord.js");

const fs = require("fs");

var request = require("request").defaults({encoding: null});

var Canvas = require("canvas")

module.exports = class ProfileCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "profile",
      group: "lol",
      memberName: "profile",
      description: "what do you expect",
      details: "why are you still reading this",
      examples: ["you don't need one"],

      args: [
        {
          key: "member",
          label: "member",
          prompt: "Tag a user",
          type: "member"
        }
      ]
    });
  }

  async run(msg, args) {

    var Image = Canvas.Image
    , canvas = new Canvas(700, 300)
    , ctx = canvas.getContext("2d");

    const member = args.member;
    const user = member.user;

    ctx.font = "28px Impact";

    var template = new Image;
    fs.readFile(__dirname + "/profiletemplate.png", function(err, image) {
      if (err) throw err;
      template.src = image;
    });

    template.onload = function() {
      ctx.drawImage(template, 0, 0, 700, 300);
    }

    var img = new Image;
    request.get(user.avatarURL, function(error, res, body) {
      img.src = res.body;
    });

    img.onload = function() {
      ctx.drawImage(img, 32, 32, 64, 64);
      ctx.fillText(`User: ${user.username}`, 32, 128);
      ctx.fillText(`Discriminator: ${user.discriminator}`, 32, 164);
      ctx.fillText(`ID: ${user.id}`, 32, 200);
      ctx.fillText(`Created: ${new Date(user.createdTimestamp).getMonth()}/${new Date(user.createdTimestamp).getDate()}/${new Date(user.createdTimestamp).getFullYear()}`, 32, 236);
      ctx.fillText(`Joined: ${new Date(member.joinedTimestamp).getMonth()}/${new Date(member.joinedTimestamp).getDate()}/${new Date(member.joinedTimestamp).getFullYear()}`, 400, 236)
      msg.channel.send("", {files:[{attachment:canvas.toBuffer(), name:"profile.png"}]});
    }
  }
}
