import mongoose, { Schema, model, models } from "mongoose";

// create an object video_dimentions
// Make a tranformation in our platform that video can be available only in reels format
// we can store the dimentions of video
export const VIDEO_DIMENTIONS = {
    width: 1080,
    height: 1920,
} as const //  so when we use video dimentions it will treate contantly.
// advantage of this const is that we can introduce additional property: "transformation"

export interface IVideo{
    _Id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls?: boolean; 
    transformation?: {
        height: number
        width: number;
        quality?: number
    }
    createdAt?: Date;
    updateAt?: Date
}

const videoSchema = new Schema<IVideo>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    videoUrl: {type: String, required: true},
    thumbnailUrl: {type: String, required: true},
    controls: {type: Boolean, default: true},
    transformation:{
        height: {type: Number, default: VIDEO_DIMENTIONS.height},
        width: {type: Number, default: VIDEO_DIMENTIONS.width},
        quality: {type: Number, min: 1, max: 100}
    }
}, { timestamps: true})

const Video = models?.Video || model<IVideo>("User", videoSchema)

 export default Video;

