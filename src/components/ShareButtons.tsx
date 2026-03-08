import { useState } from "react";
import { Twitter, Facebook, Linkedin, Link as LinkIcon, Check } from "lucide-react";

interface ShareButtonsProps {
  topic: string;
}

const ShareButtons = ({ topic }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const shareText = `🎙️ Just generated a podcast about "${topic}" using Podcast Generator!`;
  const shareUrl = window.location.origin;

  const shareLinks = [
    {
      icon: Twitter,
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  const copyLink = async () => {
    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-xs text-muted-foreground mr-1">Share:</span>
      {shareLinks.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          className="rounded-lg p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
        >
          <Icon size={18} />
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="rounded-lg p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
      >
        {copied ? <Check size={18} className="text-primary" /> : <LinkIcon size={18} />}
      </button>
    </div>
  );
};

export default ShareButtons;
