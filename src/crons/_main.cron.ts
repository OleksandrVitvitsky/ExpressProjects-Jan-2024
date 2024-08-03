import { deleteOldPasswords_Cron } from "./delete-old-passwords.cron";
import { deleteOldTokens_Cron } from "./delete-old-tokens";
import { oldVisitor_Cron } from "./old-visitor.cron";

export const jobRunner = () => {
  deleteOldTokens_Cron.start();
  deleteOldPasswords_Cron.start();
  oldVisitor_Cron.start();
};
