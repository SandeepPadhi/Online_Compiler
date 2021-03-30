// import express JS module into app
// and creates its variable.
//var express = require('express');
//var app = express();
//var http=require("http").Server(app);

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path=require('path')
var filesys=require('fs');

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
      console.log('message: ' + msg);
    
  });
  
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  

    socket.on('msg',function(data){
        //console.log("msg from sandeep yaar..!!!"+data);

       console.log("MESSAGE:"+data);
        io.emit('typing',data);
    
    
    });


  });



 




var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.get('/jj', function(req, res){
    res.sendFile(__dirname + '/finaldemofinal.html');

     

    console.log("/ accessed jj");

});







app.post('/compile', function(req, res){
    console.log("compile");

    console.log('Form (from querystring): ' + req.body.codingarea);
    console.log("jlfdjalsdjf");
    
    

    var fs = require('fs');
    fs.writeFileSync("./hello.cpp", req.body.codingarea, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
    }); 



    var spawn = require("child_process").spawn;
    var process = spawn('g++',["./hello.cPP"] );

// Takes stdout data from script which executed
// with arguments and send this data to res object
    process.stdout.on('data', function(data) {
        console.log("process ended ...with data:"+data);
    });

    process.on('exit',function(data){

        var process2 = spawn('./a.out' );
        process.stdout.on('data', function(data) {
        res.send(data.toString());
    
    
    });





    });




});






app.get('/python',(req,res)=>{
console.log("working on python.js");

 
res.sendFile(__dirname+'/mode/python/python.js');


}
);



app.get('/javascript',(req,res)=>{
    console.log("working on javascript.js");

    res.sendFile(__dirname+'/mode/javascript/javascript.js');
    
    
});


app.get('/codemirror',(req,res)=>{
    console.log("working on codemirror.js");

    res.sendFile(__dirname+'/lib/codemirror.js');
    
});



app.get('/clike',(req,res)=>{
    console.log("working on clike.js");

    res.sendFile(__dirname+'/mode/clike/clike.js');
    
});


app.get('/closebrackets',(req,res)=>{
    console.log("working on closebrackets.js");

res.sendFile(__dirname+'/addon/edit/closebrackets.js');


});



app.get('/codemirrorcss',(req,res)=>{
    console.log("working on codemirrorcss");

    res.sendFile(__dirname+'/lib/codemirror.css');
    
    
    });


app.get('/lesserdarkcss',(req,res)=>{

    console.log("working on lessdarkercss");

        res.sendFile(__dirname+'/theme/lesser-dark.css');
        
        
});


app.get('/ideacss',(req,res)=>{
    console.log("working on ideacss");

    res.sendFile(__dirname+'/theme/idea.css');
    
    
});



app.post('/chattime', function(req, res){

    var compilertype=req.query.type;


    console.log("Requested "+compilertype+"  Compiler..!!!");

    console.log('Form (from querystring): ' + req.body.chatarea);
    var fs = require('fs');



    switch(compilertype){

        case "Cpp":{
            console.log("Cpp Compiler...!!!");

            fs.writeFileSync("./hello.cpp", req.body.chatarea, function(err) {
                if(err) {
                    console.log("Error hai re baba..!!!");
                    return console.log(err);
                }
                console.log("The file was saved!");
                }); 
            
                console.log('compiling hello.cpp...!!!')
            
                var spawn = require("child_process").spawn;
                var process = spawn('g++',['./hello.cpp'] );
            
            // Takes stdout data from script which executed
            // with arguments and send this data to res object
                process.stdout.on('data', function(data) {
                    //res.send(data.toString());
                    console.log("entered process data..!!!")
                    console.log(data.toString());
            
            
                    });
                
                
            
                process.on('exit',function(data){
                    console.log("Exiting process ..!!!");
                    var process2 = spawn('./a.out' );
                    var str=""
                    process2.stdout.on('data',function(data){
                        str=str+data;
                    console.log(data)
                    console.log("value aaya bee..!!!");
                    //
                    //res.send(data.toString());
              
            
                    });
            
            
                    process2.on('exit',function(data){
                  console.log("Exiting bhai..!!!");
                  console.log(str);
                  res.send(str)
            
                    });
            
                  process2.stderr.on('err',function(err){
            
                console.log("Error hai re bhai..");
                console.log(err);
            
                  });
            
                });








        }
        break;


        case "Python":

        {
            console.log("Python compiler..!!!!!");
            fs.writeFileSync("./hello.py", req.body.chatarea, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
                }); 
            
            
                console.log("After saving..");
                var spawn = require("child_process").spawn;
                var process = spawn('python',['hello.py'] );
            
            // Takes stdout data from script which executed
            // with arguments and send this data to res object
                process.stdout.on('data', function(data) {

                    console.log(data);
                    res.send(data.toString());
            
            
                    });

        }
    
        break;



        case "Java":{

            console.log("Java Compiler..!!!!");

            fs.writeFileSync("./hello.java", req.body.chatarea, function(err) {
                if(err) {
                    console.log("Error hai re baba..!!!");
                    return console.log(err);
                }
                console.log("The file was saved!");
                }); 
            
                console.log('compiling hello.java...!!!')
            
                var spawn = require("child_process").spawn;
                var process = spawn('javac',["./hello.java"] );
            
            // Takes stdout data from script which executed
            // with arguments and send this data to res object
                process.stdout.on('data', function(data) {
                    //res.send(data.toString());
                    console.log("entered process data..!!!")
                    console.log(data.toString());
            
            
                    });
                
                
            
                process.on('exit',function(data){
                    console.log("Exiting process ..!!!");
                    console.log("value  nahi aaya bee..!!!");
            
                
            
                    var process2 = spawn('java',['hello'] );
                    var str=""
                    process2.stdout.on('data',function(data){
                        str=str+data;
                    console.log(data)
                    console.log("value aaya bee..!!!");
                    //
                    //res.send(data.toString());
              
            
                    });
            
            
                    process2.on('exit',function(data){
            
                  res.send(str)
            
                    });
            
                  process2.stderr.on('err',function(err){
            
                console.log("Error hai re bhai..");
                console.log(err);
            
                  });
            
                });









        }
       break;


        case "C":{



            fs.writeFileSync("./hello.c", req.body.chatarea, function(err) {

                console.log("C compiler..!!!")

                if(err) {
                    console.log("Error hai re baba..!!!");
                    return console.log(err);
                }
                console.log("The file was saved!");
                }); 
            
                console.log('compiling hello.java...!!!')
            
                var spawn = require("child_process").spawn;
                var process = spawn('gcc',["./hello.c"] );
            
            // Takes stdout data from script which executed
            // with arguments and send this data to res object
                process.stdout.on('data', function(data) {
                    //res.send(data.toString());
                    console.log("entered process data..!!!")
                    console.log(data.toString());
            
            
                    });
                
                
            
                process.on('exit',function(data){
                    console.log("Exiting process ..!!!");
                    console.log("value  nahi aaya bee..!!!");
            
                
            
                    var process2 = spawn('./a.out' );
                    var str=""
                    process2.stdout.on('data',function(data){
                        str=str+data;
                    console.log(data)
                    console.log("value aaya bee..!!!");
                    //
                    //res.send(data.toString());
              
            
                    });
            
            
                    process2.on('exit',function(data){
            
                  res.send(str)
            
                    });
            
                  process2.stderr.on('err',function(err){
            
                console.log("Error hai re bhai..");
                console.log(err);
            
                  });
            
                });
                











        }



}







   

    
    });












app.get('/san', function(req, res){
    res.sendFile(__dirname + '/index.html');
    console.log("/ accessed san");

  });


app.get('/',function(req,res){
console.log("Load ..!!!");

res.sendFile(__dirname + '/load.html');

});


http.listen(5508,'192.168.43.63', function(){
    console.log('listening on *:5508');
  });
 

// Creates a server which runs on port 3000 and 
// can be accessed through localhost:3000

 
  


