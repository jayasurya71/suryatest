const mongoose=require('mongoose');

const requestdetail_schema=mongoose.Schema({
        client:String,
        request:Object({
            method:String,
            url:String,
            headers:{
            "accept":String,
            "content-length":String,
            "user-agent":String,
            "content-length":Number,
            "host" :String,
            "connection":String
        },
          body:{
            ModifiedPicklist:Object({
                ItemModifiedPicklist:[]
            })
        },
     }),
        response:{
            status:String,
            code:Number
       },     
    },
    {  
    timestamps: true
  });


module.exports = {
	requestdetail_schema
};
