import { siteConfig } from '@/config/site';

const SocialIcons = () => (
  <div className="flex gap-4">
    {Object.values(siteConfig.socials).map((social) => (
      <a
        key={social.label}
        href={social.url}
        aria-label={social.label}
        className="hover:text-primary transition-colors"
      >
        <social.icon className="h-5 w-5" />
      </a>
    ))}
  </div>
);