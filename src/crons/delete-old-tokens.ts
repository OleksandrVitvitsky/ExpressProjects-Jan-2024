import { CronJob } from "cron";

import { configs } from "../configs/configs";
import { timeHelper } from "../helpers/time.helper";
import { tokenRepository } from "../repositories/token.repository";

const deleteOldTokens = async () => {
  //console.log("--start deleteOldTokens <<");
  try {
    // console.log("[deleteOldTokens] Cron is running");
    const [value, unit] = timeHelper.parseString(
      configs.JWT_REFRESH_EXPIRES_IN,
    );
    await tokenRepository.deleteByParams({
      createdAt: { $lte: timeHelper.subtractByParams(value, unit) },
    });
    // console.log("[deleteOldTokens] Cron finished");
  } catch (error) {
    // console.error("[deleteOldTokens] Cron failed", error);
  }
  //console.log(">> finished deleteOldTokens --");
  //console.log("-----------------------------------------------------");
};
export const deleteOldTokens_Cron = new CronJob(
  "0 */30 * * * *",
  deleteOldTokens,
);
