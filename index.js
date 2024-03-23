const {WebhookClient} = require('dialogflow-fulfillment');
const express = require("express");
app = express();

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.post("/webhook",express.json(),(request,response)=>{
    // const agent = new WebhookClient({ request, response });
    const agent = new WebhookClient({ request: request, response:response});
    console.log("Check Data")
    function welcome_intent(agent){
        var user_data = agent.parameters["person"];
        console.log(user_data)        
        agent.add(`Welcome to ${user_data.name} at PIAIC backend bot `)   
    }

    function add_numbers(agnet){
        var num_01 = agent.parameters["num_01"]
        var num_02 = agent.parameters["num_02"]
        agent.add(`The sum of ${num_01} and ${num_02} is this: ${num_01+num_02}`)
    }

    let intentMapping = new Map();
    intentMapping.set("Default Welcome Intent",welcome_intent)
    intentMapping.set("add_number",add_numbers)
    agent.handleRequest(intentMapping)
})

app.listen(4000,()=>{
    console.log("Port is up on 4000")
})