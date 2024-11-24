import fs from 'node:fs/promises';
import path from 'node:path';

interface InvitationTemplateParams {
  recipientName: string;
  appName: string;
  invitedByName: string;
}

const TEMPLATES_PATH = path.join(__dirname);

const readTemplate = async (templateName: string): Promise<string> => {
  const templatePath = path.join(TEMPLATES_PATH, `${templateName}.html`);
  try {
    return await fs.readFile(templatePath, 'utf-8');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to read template ${templateName}: ${error.message}`,
      );
    }
    throw error;
  }
};

const replaceTemplateVariables = (
  template: string,
  variables: Record<string, string>,
): string => {
  return Object.entries(variables).reduce(
    (content, [key, value]) =>
      content.replace(new RegExp(`{{${key}}}`, 'g'), value),
    template,
  );
};

const getListInvitationTemplate = async (
  params: InvitationTemplateParams,
): Promise<string> => {
  const template = await readTemplate('list-invitation-template');
  return replaceTemplateVariables(
    template,
    params as unknown as Record<string, string>,
  );
};

export { getListInvitationTemplate };
export type { InvitationTemplateParams };
