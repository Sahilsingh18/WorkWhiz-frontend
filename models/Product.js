import mongoose, {model, Schema, models} from "mongoose";

const ServiceAgentSchema = new Schema({
  name: {type:String, required:true},
  description: {type:String, required:true},
  price: {type: Number, required: true},
  images: [{type: String}],
  services: {type:mongoose.Types.ObjectId, ref:'services'},
});

export const ServiceAgent = models.ServiceAgent || model('ServiceAgent', ServiceAgentSchema);