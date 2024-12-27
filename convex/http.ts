import { httpRouter } from "convex/server";
import { internal } from "./_generated/api";
import { GenericActionCtx } from "convex/server";
import { DataModel } from "./_generated/dataModel";

const http = httpRouter();

const stripeHandler = {
    async handler(ctx: GenericActionCtx<DataModel>, request: Request) {
        const signature = request.headers.get("stripe-signature") as string;
        const res = await ctx.runAction(internal.stripe.fulfill, {
            signature, 
            payload: await request.text()
        });
        if (res.success) {
            return new Response(null, {
                status: 200,
            });
        } else {
            return new Response("Webhook Error", {
                status: 400
            });
        }
    },
    isHttp: true as const
};

http.route({
    path: "/stripe",
    method: "POST",
    handler: stripeHandler
});

export default http;
