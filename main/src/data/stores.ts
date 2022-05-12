interface stores {
    [key:string]: {
      name: string;
      source: string;
      api_key: string;
      templates: {
        [key:string]: {
          [key:string]: {
            TemplateName: string;
            SubjectPart: string;
            TextPart: string;
          }
        }
      }
    }
  }
  

export default {
  "942e50a6-fc2c-4f4e-83e4-0425814a04d4": {
    name: "aftersales",
    source: "<noreply@ysqhub.com>",
    api_key: "Ef58MK6GgQA3aqqNNp",
    templates: {
      en: {
        "new-password-admin": {
          TemplateName: "aftersales-en-new-password-admin",
          SubjectPart: "Hunn admin, your password has been changed.",
          TextPart: "Hunn admin, your password has been changed.",
        },
       
       "new-password-call-center-account": {
          TemplateName: "aftersales-en-new-password-call-center-account",
          SubjectPart: "Hunn call center, your password has been changed.",
          TextPart: "Hunn call center, your password has been changed.",
        },
        
        "new-password-distributor-account": {
          TemplateName: "aftersales-en-new-password-distributor-account",
          SubjectPart: "Hunn distributor, your password has been changed.",
          TextPart: "Hunn distributor, your password has been changed.",
        },
        
        "new-password-importer-account": {
          TemplateName: "aftersales-en-new-password-importer-account",
          SubjectPart: "Hunn importer, your password has been changed.",
          TextPart: "Hunn importer, your password has been changed.",
        },
        
        "new-password-service-center-account": {
          TemplateName: "aftersales-en-new-password-service-center-account",
          SubjectPart: "Hunn service center, your password has been changed.",
          TextPart: "Hunn service center, your password has been changed.",
        },
        
        "warranty-details": {
          TemplateName: "aftersales-en-warranty-details",
          SubjectPart: "Warranty Activated",
          TextPart: "Warranty Activated",
        },
      },
    },
  },
} as stores;
