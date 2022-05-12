import AWS from "aws-sdk";
import { Request, Response, NextFunction } from "express";
import { promises as fs } from "fs";

interface Errorcode extends Error {
  httpStatusCode?: number;
}

export default class EmailController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const store = req.app.get("store");
    const [, lang, templateId] = req.path.split("/");

    try {
      const HtmlPart = await (
        await fs.readFile(
          `./data/templates/${store.name}/${store.templates[lang][templateId].TemplateName}.html`
        )
      ).toString();

      var params = {
        Template: {
          TemplateName: store.templates[lang][templateId].TemplateName,
          HtmlPart,
          SubjectPart: store.templates[lang][templateId].SubjectPart,
          TextPart: store.templates[lang][templateId].TextPart,
        },
      };

      await new AWS.SES({
        region: "ap-southeast-2",
      })
        .createTemplate(params)
        .promise();
      res.send("created");
    } catch (err) {
      if (err instanceof Error) {
        const error: Errorcode = new Error("Error");
        error.httpStatusCode = 500;
        return next(error);
      }
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const store = req.app.get("store");
    const [, lang, templateId] = req.path.split("/");

    try {
      const HtmlPart = await (
        await fs.readFile(
          `./data/templates/${store.name}/${store.templates[lang][templateId].TemplateName}.html`
        )
      ).toString();

      var params = {
        Template: {
          TemplateName: store.templates[lang][templateId].TemplateName,
          HtmlPart,
          SubjectPart: store.templates[lang][templateId].SubjectPart,
          TextPart: store.templates[lang][templateId].TextPart,
        },
      };

      await new AWS.SES({
        region: "ap-southeast-2",
      })
        .updateTemplate(params)
        .promise();

      res.send(params);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        const error: Errorcode = new Error("Error");
        error.httpStatusCode = 500;
        return next(error);
      }
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const store = req.app.get("store");
    const [, lang, templateId] = req.path.split("/");

    try {
      var params = {
        TemplateName: store.templates[lang][templateId].TemplateName,
      };

      await new AWS.SES({
        region: "ap-southeast-2",
      })
        .deleteTemplate(params)
        .promise();
      res.send("deleted");
    } catch (err) {
      if (err instanceof Error) {
        const error: Errorcode = new Error("Error");
        error.httpStatusCode = 500;
        return next(error);
      }
    }
  }

  static async send(req: Request, res: Response, next: NextFunction) {
    const store = req.app.get("store");
    const [, lang, templateId] = req.path.split("/");
    const { to, template_data } = req.body;

    try {
      var params = {
        Source: `${template_data.z_store?.email_signoff || ""} ${store.source}`,
        Template: store.templates[lang][templateId].TemplateName,
        Destination: {
          ToAddresses: [...to],
        },
        TemplateData: JSON.stringify({
          ...template_data,
          year: new Date().getFullYear(),
        }),
        ConfigurationSetName: "email-notification",
      };

      await new AWS.SES({
        region: "ap-southeast-2",
      })
        .sendTemplatedEmail(params)
        .promise();

      res.send("sent");
    } catch (err) {
      if (err instanceof Error) {
        const error: Errorcode = new Error("Error");
        error.httpStatusCode = 500;
        return next(error);
      }
    }
  }
}
