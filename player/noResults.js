module.exports = (client, message, query) => {
    message.channel.send(`${client.emotes.error} - No results found on YouTube for ${query} !`).then(msg => {
        setTimeout(() => msg.delete(), client.durasi.message)
      })
};