import { v } from "convex/values";
import { PRODUCT_TYPE } from "./schema";
import { getAuthUserId } from "@convex-dev/auth/server";
import { internalMutation, query } from "./_generated/server";

export const currentUser = query({
    handler: async (ctx, _args) => {
        const userId = await getAuthUserId(ctx);

        if (userId === null) return null;

        return await ctx.db.get(userId)
    }
});

export const updateUserAfterPurchase = internalMutation({
    args: {
        userId: v.id("users"),
        productType: PRODUCT_TYPE,
        selectedTemplate: v.optional(v.string()),
    },
    handler: async (ctx, {
        userId,
        productType,
        selectedTemplate,
    }) => {
        const updates: any = {};
        if (productType === "Premium Kit") {
            updates.hasPurchasedPremium = true;
        } else if (productType === "Starter Kit") {
            updates.hasPurchasedStarter = true;
            if (selectedTemplate) {
                updates.selectedTemplate = selectedTemplate;
            }
        };

        await ctx.db.patch(userId, updates)

        return userId;
    }
})