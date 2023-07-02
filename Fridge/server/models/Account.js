import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String, required: false },
    glutenFree: { type: Boolean, default: false},
    vegetarian: { type: Boolean, default: false},
    vegan: { type: Boolean, default: false},
    dairyFree: { type: Boolean, default: false},
    lowCarb: { type: Boolean, default: false}
  },
  { timestamps: true, toJSON: { virtuals: true } }
)