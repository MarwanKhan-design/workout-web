export const dynamic = "force-dynamic";

import { toNextHandler } from "@/lib/api-handler";
import * as userController from "@/controllers/User";

export const POST = toNextHandler(userController.logout);
