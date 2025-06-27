import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        clerkUserId: v.string(),
        email: v.string(),
        name: v.string(),
        avatar: v.optional(v.string()),
        role: v.union(v.literal("admin"), v.literal("manager"), v.literal("user")),
    }).index("by_clerk_id", ["clerkUserId"]),
})
