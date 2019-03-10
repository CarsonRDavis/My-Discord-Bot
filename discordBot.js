const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    client.user.setActivity("my bot-y is ready")
})

client.on('message', (receivedMessage) => {
    if(receivedMessage.author == client.user){
        return
    }

    if(receivedMessage.content.startsWith("!")){
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage){
    let fullCommand = receivedMessage.content.substr(1);
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    console.log("Command Received: " + primaryCommand)
    console.log("Arguments: " + arguments)

    switch(primaryCommand){
        case "help":
            receivedMessage.channel.send("All current commands are:\n" + "help, multiply, roll, time, and hewwo")
            return
        case "multiply":
            multiplyNums(arguments, receivedMessage)
            return
        case "roll":
            rollNum(arguments, receivedMessage)
            return
        case "hewwo":
            receivedMessage.channel.send("Hewwo OwO")
            return
        case "time":
            displayTime(receivedMessage)
            return
        default:
            receivedMessage.channel.send("I don't know what you want")
            return
    }
}

function multiplyNums(arguments, receivedMessage){
    if(arguments.length < 2){
        receivedMessage.channel.send("Need more numbers")
        return
    }

    let product = 1
    arguments.forEach((value) => {
        if(isNaN(parseInt(value))){
            receivedMessage.channel.send("Please use numbers only")
            return
        }
        product *= parseFloat(value)
    })

    receivedMessage.channel.send("The product of those numbers is: " + product)
}

function rollNum(arguemnts, receivedMessage){

    if(arguments.length != 2){
        receivedMessage.channel.send("Please enter one number to roll (ie !roll 5)")
        return
    }

    if(arguemnts[0] < 0){
        receivedMessage.channel.send("Please use a positive number")
        return
    }

    if(isNaN(arguments[0])){
        receivedMessage.channel.send("Please use a number")
        return
    }

    let roll = Math.floor(Math.random() * (Math.floor(arguments[0]) + 1))
    receivedMessage.channel.send(roll)
}

function displayTime(receivedMessage){
    var today = new Date()
    var date = "Todays date is: " + (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();
    var time = "The current time is: " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    receivedMessage.channel.send(date + "\n" + time)
}

token = "token"

client.login(token)