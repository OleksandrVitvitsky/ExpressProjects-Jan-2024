import { CronJob } from "cron";

import { configs } from "../configs/configs";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { timeHelper } from "../helpers/time.helper";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../services/email.service";

const oldVisitor = async () => {
  try {
    // console.log("[oldVisitorCron] Cron is running");
    const date = timeHelper.subtractByParams(7, "day");
    const users = await userRepository.findWithOutActivityAfter(date);

    await Promise.all(
      users.map(async (user) => {
        await emailService.sendEmail(EmailTypeEnum.OLD_VISIT, user.email, {
          name: user.name,
          FRONTEND_URL: configs.FRONTEND_URL,
        });
      }),
    );
    //console.log("[oldVisitorCron] Cron finished");
  } catch (error) {
    // console.error("[oldVisitorCron] Cron failed", error);
  }
};

export const oldVisitor_Cron = new CronJob("0 */30 * * * *", oldVisitor);