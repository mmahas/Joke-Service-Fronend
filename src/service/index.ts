import { AuthService } from './auth.service';
import { SubmitService } from './submit.service';
import { DeliverService } from './deliver.service';
import { ModerateService } from './moderate.service';
import env_config from '../lib/config';

export const authService = new AuthService(
  `${env_config.moderate_service_url}/api/auth`,
);

export const submitService = new SubmitService(
  `${env_config.submit_service_url}/api/submit`,
);

export const deliverService = new DeliverService(
  `${env_config.deliver_service_url}/`,
);

export const moderateService = new ModerateService(
  `${env_config.moderate_service_url}/api/moderate`,
);
