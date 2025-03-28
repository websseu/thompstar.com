import { Document, Model, model, models, Schema } from 'mongoose'
import { IPostInput } from '@/lib/types'

export interface IPost extends Document, IPostInput {
  _id: string
  createdAt: Date
  updatedAt: Date
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String },
    subCategory: { type: String },
    components: { type: String },
    description: { type: String },
    contents: { type: String },
    isPublished: { type: Boolean, default: false },
    author: { type: String },
    images: { type: String },
    youtubeId: { type: String },
    tags: { type: [String], default: [] },
    numReviews: { type: Number, default: 0 },
    numViews: { type: Number, default: 0 },
    numLikes: { type: Number, default: 0 },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Post = (models.Post as Model<IPost>) || model<IPost>('Post', postSchema)

export default Post
