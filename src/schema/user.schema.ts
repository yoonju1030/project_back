import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Timestamp } from "mongodb";
import mongoose from "mongoose";

export type UserDocument = User & Document;

@Schema({timestamps:{createdAt: "createTime", updatedAt: "updateTime"}})
export class User {
  @Prop({
    require: true,
    unique: true,
    type: mongoose.Schema.Types.String
  })
  userId: string;

  @Prop({
    require: true,
    type: mongoose.Schema.Types.String
  })
  userPw: string;

  @Prop({
    type: mongoose.Schema.Types.String
  })
  userName: string;

  @Prop({
    type: mongoose.Schema.Types.String
  })
  userEmail: string;

  @Prop({default: new Date(), type: mongoose.Schema.Types.Date})
  createTime: Timestamp;

  @Prop({default: new Date(), type: mongoose.Schema.Types.Date})
  updateTime: Timestamp;
}

export const UserSchema = SchemaFactory.createForClass(User);