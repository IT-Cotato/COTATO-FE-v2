interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
  ariaLabel: string;
}

export const SocialLink = ({href, children, ariaLabel}: SocialLinkProps) => {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={ariaLabel}>
      {children}
    </a>
  );
};
