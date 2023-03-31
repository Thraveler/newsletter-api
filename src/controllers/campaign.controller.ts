import { Request, Response } from "express";
import * as CampaignService from "../services/campaign.service";
import * as NewsletterService from "../services/newsletter.service";
import * as NodemailUtils from "../utils/nodemailer.util";

const sendCampaign = async (req: Request, res: Response) => {
  const campaignFound = await CampaignService.getCampaignById(
    +req.params.campaignId
  );
  if (campaignFound?.newsletter?.id) {
    let newsletterFound = await NewsletterService.findNewsletterById(
      +campaignFound?.newsletter?.id
    );

    if (newsletterFound && newsletterFound.subscribers) {
      const transporter = NodemailUtils.createTransporter();
      const options = NodemailUtils.options(
        `${newsletterFound?.owner?.name} ${newsletterFound.owner?.lastname}`,
        `${newsletterFound?.owner?.email}`,
        newsletterFound.subscribers.map((s) => s.email),
        campaignFound.subject,
        campaignFound.content
      );

      campaignFound.sendDate = new Date();
      const result = await CampaignService.updateCampaign(campaignFound);

      NodemailUtils.sendMail(transporter, options);
      res.json({ message: "Newsletter sent", campaignFound });
    }
  }
};

export { sendCampaign };
