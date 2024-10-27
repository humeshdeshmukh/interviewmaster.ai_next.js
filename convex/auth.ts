import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { DataModel } from "./_generated/dataModel";
import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

const CustomPassword = Password<DataModel>({
  profile(params) {
    return {
      email: params.email as string,
      name: params.name as string,
      selectedTemplate: "",  
      hasPurchasedPremium: false,  
      hasPurchasedStarter: false, 
    }
  }
})

// TODO: You can add more providers here, but the popular ones are (Github, Google, and CustomPassword)
// Go checkout they provide a detailed guide: https://labs.convex.dev/auth-example
export const { auth, signIn, signOut, store } = convexAuth({
  providers: [GitHub, Google, CustomPassword],
});