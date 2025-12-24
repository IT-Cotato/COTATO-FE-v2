interface SocialLinkProps {
  href: string;
  children: React.ReactNode;
}

export const SocialLink = ({href, children}: SocialLinkProps) => {
  return (
    <a href={href} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  );
};
