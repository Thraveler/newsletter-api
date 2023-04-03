import { Request, Response } from "express";
import * as CampaignService from "../services/campaign.service";
import * as NewsletterService from "../services/newsletter.service";
import * as NodemailUtils from "../utils/nodemailer.util";

const getCampaignById = async (req: Request, res: Response) => {
  const campaignFound = await CampaignService.getCampaignById(
    +req.params.campaignId
  );

  res.json(campaignFound);
};

const sendCampaign = async (req: Request, res: Response) => {
  try {
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
          newsletterFound.subscribers.map((s) => s.email),
          campaignFound.subject,
          campaignFound.content,
          campaignFound.image
        );

        campaignFound.sendDate = new Date();
        await CampaignService.updateCampaign(campaignFound);

        await NodemailUtils.sendMail(transporter, options);

        res.json({ message: "Newsletter sent" });
      }
    }

  } catch (error) {
    res.status(500).json({ message: "There was an error during send campaign!" })
  }

};

export { sendCampaign, getCampaignById };
