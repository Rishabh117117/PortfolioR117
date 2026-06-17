/**
 * The STATIC read-plane. Body copy lives here and is structurally incapable of
 * a scroll-linked transform — reading text that drifts is nauseating. It is a
 * plain wrapper on purpose; the depth all happens around it, never under it.
 */
type Props = {
  className?: string;
  children: React.ReactNode;
};

export default function SceneText({ className, children }: Props) {
  return <div className={className}>{children}</div>;
}
