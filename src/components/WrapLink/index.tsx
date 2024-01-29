import Link from "next/link"

const WrapLink = ({
  href, className, children
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    // TODO: disable以外に何か方法ありそうと思っている
    // eslint-disable-next-line react/forbid-elements
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

export {
  WrapLink,
}
