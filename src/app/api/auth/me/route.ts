export const dynamic = "force-dynamic";

import { toNextHandler } from "@/lib/api-handler";
import * as userController from "@/controllers/User";

export const GET = toNextHandler(userController.getCurrentUser);
